HTML Body Parser
================

Parser html document with a specific configuration object.

##Usage

Parser my personal github repositories for an example.

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
