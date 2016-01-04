var cheerio = require('cheerio');

/**
 * css selector solution
 */
module.exports = function(body, config) {
  var $ = cheerio.load(body);
  var doc = $.root();

  return parser(doc, config, $);
};

/**
 * support some pseudo selector which css select not supported
 * :eq, :first, :last support now
 */
var splitter = /^(.*?)(?:\:(eq|first|last)(?:\((\d+)\))?)(.*)$/;
var selectors = {
  eq: function(index) {
    index = parseInt(index, 10);
    return function(context) {
      return context.eq(index);
    };
  },
  first: function() {
    return function(context) {
      return context.first();
    };
  },
  last: function() {
    return function(context) {
      return context.last();
    }
  }
};

function parser(doc, config, $) {
  var results = {}, key, value;
  for (key in config) {
    value = config[key];
    var selectorString = value.selector,
        match = selectorString.match(splitter),
        context = doc,
        selector;
    while (match) {
      context = context.find(match[1]);
      selector = selectors[match[2]](match[3]);
      context = selector(context);
      selectorString = match[4].trim();
      match = selectorString.match(splitter);
    }
    if (selectorString) {
      context = context.find(selectorString);
    }

    if (value.children) {
      var contents = [];
      context.each(function() {
        contents.push(parser($(this), value.children, $));
      });
      if (contents.length === 1) {
        contents = contents[0];
      }
      results[key] = contents;
    } else {
      var content = context.html();
      var childMatch = 0;
      if (value.regexp && content) {
        content = content.match(value.regexp);
        if (content) {
          if (value.childMatch) {
            childMatch = value.childMatch;
          } else if (content[1]) {
            childMatch = 1;
          }
          content = content[childMatch];
        }
      }
      content = content || '';
      content = content.trim();
      results[key] = content;
    }
  });

  return results;
}
