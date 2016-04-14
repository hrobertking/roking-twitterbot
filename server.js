#!/usr/bin/env node

var express = require('express')
  , engines = require('consolidate')
  , twitter = require('twitter')
  , opts = require('./cli-opts')
  , app = express()
  , __dirname = process.cwd()
  , __debug
  , __invoked = process.argv[0].split(/[\/\\]/).pop() + ' ' + process.argv[1].split(/[\/\\]/).pop()
  , __params
  , __profile = { }
  , __twitter_client
  , __tweets
;

// collect the command-line parameters
__params = opts.parse(process.argv);
__debug = __params.d || __params.debug || false;
__profile = {
    consumer_key: __params.ck || __params.consumer_key,
    consumer_secret: __params.cs || __params.consumer_secret,
    access_token_key: __params.ak || __params.access_key,
    access_token_secret: __params.as || __params.access_secret
  };

// Usage information
function usage() {
  console.log('');
  console.log('Syntax: ' + __invoked + ' <PARAMETERS>');
  console.log('');
  console.log('--access_token_key <KEY>        Twitter application setting');
  console.log('--access_token_secret <SECRET>  Twitter application setting')
  console.log('--consumer_key <KEY>            Twitter application setting');
  console.log('--consumer_secret <SECRET>      Twitter application setting')
  console.log('--count <NUMBER>                Optional. The number of tweets to retrieve');
  console.log('--screen <NAME>                 Optional. Twitter screen name')
  console.log('');
  console.log('--d[ebug]                       Use debug mode with sample data');
  console.log('--h[elp]                        Display this usage information')
  console.log('');
}

// if any piece of the security profile is missing or if the user wants the syntax, so help
if ( __params.h || __params.help ||
    !__profile.consumer_key ||
    !__profile.consumer_secret ||
    !__profile.access_token_key ||
    !__profile.access_token_secret) {
  usage();
} else {
  // register the dustjs engine and set up the views
  app.engine('dust', engines.dust);
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');

  // configure Express to render static resources
  app.use(express.static(__dirname));

  // bind the request and response pair for GET to the 'feed' path
  app.get('/feed', function(req, res) {
      function do_render(tweets) {
        res.render('feed', {
            format: req.query.format || 'json',
            tweets: tweets
          });
      }

      // get the tweets
      if (__debug) {
        __twitter_client = require('./js/sample-twitter-feed');
        do_render(__twitter_client.data);
      } else {
        __twitter_client = new twitter(__profile);
        __twitter_client.get(
            'https://api.twitter.com/1.1/statuses/user_timeline.json' +
              '?screen_name=' + (__params.screen || 'hrobertking') + 
              '&count=' + (__params.count || 10),
            function(error, tweets, response) {
               do_render(tweets);
            }
          );
      }
    });

  // bind the request and response pair for GET to the server root
  app.get('/', function(req, res) {
      function do_render(tweets) {
        res.render('index', {
            copy: (new Date()).getFullYear(),
            lang: 'en',
            page: req.query.page || 'main',
            title: 'The Awesome Feed',
            tweets: tweets
          });
      }

      // get the tweets
      if (__debug) {
        __twitter_client = require('./js/sample-twitter-feed');
        do_render(__twitter_client.data);
      } else {
        __twitter_client = new twitter(__profile);
        __twitter_client.get(
            'https://api.twitter.com/1.1/statuses/user_timeline.json' +
              '?screen_name=' + (__params.screen || 'hrobertking') + 
              '&count=' + (__params.count || 10),
            function(error, tweets, response) {
               do_render(tweets);
            }
          );
      }
    });

  // start the server
  app.listen(8080, function() {
      console.log('Listening on port 8080');
    });
}
