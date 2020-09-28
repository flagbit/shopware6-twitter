# Twitter Plugin for Shopware 6

This plugin will add custom twitter cms elements to your shopware 6 store.  
All possible twitter elements you can see at [publish.twitter.com](https://publish.twitter.com/).

## Custom twitter elements 

* Twitter Timelines
  * For profiles :white_check_mark:
  * For collections :white_check_mark:
  * For lists :white_check_mark:
  * For profile likes :white_check_mark:
* Twitter Buttons
  * Share :white_check_mark:
  * Follow :white_check_mark:
  * Mention :white_check_mark:
  * Hashtag :white_check_mark:
  * Message :white_check_mark:
* Twitter tweet as quote :construction:
* Twitter moment :construction:

> Legend: Implemented :white_check_mark:, Under construction :construction:

## Requirements
* Shopware 6.1. at least
* PHP 7.2 at least

## Installation
Require the module via composer  
`composer require "flagbit/plugin-twitter" "v0.0.2"`  

Check if the plugin is known by shopware  
`bin/console plugin:refresh && bin/console plugin:list`  

If the plugin is known, install and activate the plugin  
`bin/console plugin:install --activate --clearCache PluginTwitter`  

Build a new fresh administration with all the updated js  
`php psh.phar administration:build`  

## Screens

### Twitter timeline frontend
![Twitter timeline in frontend](https://raw.githubusercontent.com/flagbit/shopware6-twitter/master/docs/images/shopware-6-twitter-timeline-frontend.png "Twitter timeline in frontend")

### Twitter timeline backend
![Twitter timeline backend configuration](https://raw.githubusercontent.com/flagbit/shopware6-twitter/master/docs/images/shopware-6-twitter-timeline-backend.png "Twitter timeline backend configuration")
