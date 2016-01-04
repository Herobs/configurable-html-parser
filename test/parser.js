var request = require('request');

request('https://github.com/Herobs?tab=repositories', function(err, res, body) {
  console.log(module.exports(body, {
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
