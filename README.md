HTML Body Parser
================

Parse html document with a specific configuration object.

##Usage

Parser my personal github repositories for an example.

```js
var request = require('request');
var parser = require('../lib/parser.js');

request('https://github.com/Herobs?tab=repositories', function(err, res, body) {
  console.log(parser(body, {
    anthor: {
      selector: 'h1.vcard-names > span.vcard-username'
    },
    repositories: {
      selector: 'ul.repo-list.js-repo-list > li',
      children: {
        name: {
          selector: 'h3.repo-list-name',
          regexp: /<a[\s\S]*?>([\s\S]*?)<\/a>/
        },
        url: {
          selector: 'h3.repo-list-name',
          regexp: /<a\s+href="([\s\S]*?)">([\s\S]*?)<\/a>/
        },
        desc: {
          selector: 'p.repo-list-description'
        }
      }
    }
  }));
});
```

Parser will return an object which construction match the configuration object. The first param is the html body will be parsed, and the second is the configuration object. The configuration rule as following:
- each key - value as a output item
- `selector` is the css selector apply to current dom context
- `regexp` is a regular expression to extract data exactly
-  `childMatch` is the regular expression child match. If not specified and there is a child match, the first child match will be returned, or the full match string will be returned.
-  `children` is context flag, if specified, current value will as a context to the children, and will parse the children recursively.
