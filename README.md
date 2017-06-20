chroma.space
===

This is the website at [chroma.space](http://chroma.space). We use the [Grav](https://getgrav.org) CMS.

### Installation

To install, just use [Composer](https://getcomposer.org/) :

    composer install

### Deployment

We use [Deployer](https://deployer.org/) to build the site and deploy it on the [chroma.space](http://chroma.space) server. Deployer expects a `server.yml` file in `/deploy` that lists the stages, especially `production`.

The configuration files are also deployed via the standard workflow (`security.yml`, `admin.yml` and `kate.yml`) and should be located in the `/deploy` folder.

Then, just use :

    vendor/bin/dep deploy -v

### Licenses

_Grav is licensed under the MIT terms._