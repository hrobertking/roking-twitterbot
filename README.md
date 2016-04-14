# rokingbot
================

A Twitter exercise to demonstrate coding ability and approach.

##Quick Start
You will need valid Twitter developer credentials - both consumer and access token keys. If you do
not have the proper keys, you can get them through https://apps.twitter.com/. This application
does not require write permissions.

``
npm install
``

##Starting the application
To start the application in default, pass your Twitter security profile on the command line
``
node server.js --consumer_key <YOUR-KEY> --consumer_secret <YOUR-SECRET> --access_key <YOUR-TOKEN-KEY> --access_secret <YOUR-TOKEN-SECRET>
``

##Configuring the application
To retrieve status updates for a different Twitter handle, pass the --screen <NAME> parameter on the command line
``
node server.js --consumer_key <YOUR-KEY> --consumer_secret <YOUR-SECRET> --access_key <YOUR-TOKEN-KEY> --access_secret <YOUR-TOKEN-SECRET> --screen <NAME>
``

To retrieve more or less than 10 tweets, pass the count on the command line
``
node server.js --consumer_key <YOUR-KEY> --consumer_secret <YOUR-SECRET> --access_key <YOUR-TOKEN-KEY> --access_secret <YOUR-TOKEN-SECRET> --count <NUMBER>
``

To switch into 'debug' mode, using sample data rather than authenticating with Twitter, pass the debug switch on the command line
``
node server.js --debug
``
