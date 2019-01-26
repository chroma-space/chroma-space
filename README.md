chroma.space
===

This is the website at [chroma.space](http://chroma.space). We use the [Grav](https://getgrav.org) CMS.

### Installation

To install, just use [Composer](https://getcomposer.org/) :

    composer install

### Cron

To fetch Instagram post once, run :

    cd /var/www/chroma.space/current/ && bin/plugin social-feed fetch:posts

> NB : if the token expires, just call : https://www.instagram.com/oauth/authorize/?client_id=c2b2fbe772e64ffd92edf8809c7feb1a&redirect_uri=http://www.chroma.space&response_type=token in a browser, login as chroma.space and authorize the app, the page will redirect and you will get an access token

### Deployment

We use [Deployer](https://deployer.org/) to build the site and deploy it on the [chroma.space](http://chroma.space) server. Deployer expects a `server.yml` file in `/deploy` that lists the stages, especially `production`.

The configuration files are also deployed via the standard workflow (`security.yml`, `admin.yml` and `kate.yml`) and should be located in the `/deploy` folder.

Then, just use :

    vendor/bin/dep deploy -v

### Licenses

_Grav is licensed under the MIT terms._