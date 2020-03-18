chroma.space
===

This is the website at [chroma.space](http://chroma.space). We use the [Grav](https://getgrav.org) CMS.

### Installation

To install, just use [Composer](https://getcomposer.org/) :

    composer install

### Cron

To fetch Instagram post once, run :

    cd /var/www/chroma.space/current/ && bin/plugin social-feed fetch:posts

### Deployment

We use [Deployer](https://deployer.org/) to build the site and deploy it on the [chroma.space](http://chroma.space) server. Deployer expects a `server.yml` file in `/deploy` that lists the stages, especially `production`.

Then, just use :

    vendor/bin/dep deploy -v

Some files are in the `/shared` folder : they are the files that must not be on the repository. They reside on the server only, and they are linked to from the current release.

These include : the `accounts` folder, the user `config` (specific to the chroma.space instance) and `media`, the `pages` and `backups`.

### Licenses

_Grav is licensed under the MIT terms._