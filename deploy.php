<?php

namespace Deployer;

require_once 'recipe/common.php';

// Configuration
inventory('deploy/servers.yml');

set('env', [
    'APP_ENV' => 'prod',
]);

set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('http_user', 'www-data');

set('default_stage', 'production');
set('repository', 'git@github.com:chroma-space/chroma-space.git');
set('writable_dirs', ['cache', 'logs', 'images', 'user', 'backup', 'tmp', 'user/accounts', 'user/pages', 'user/data', 'user/media', 'user/chroma.space']);

set('shared_dirs', ['user/accounts', 'user/data', 'user/pages', 'user/media', 'backup', 'images', 'user/chroma.space']);
set('clear_paths', [
  './README.md',
  './LICENSE.txt',
  './TODO.todo',
  './.gitignore',
  './.git',
  './deploy',
  './deploy.php',
  './tests',
]);

// Deploy main task
task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'deploy:clear_paths',
    'deploy:writable',
    'folder_rights:enforce',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
]);

// Tasks

desc('Restart PHP-FPM service');
task('php-fpm:restart', function () {
    // The user must have rights for restart service
    // /etc/sudoers: username ALL=NOPASSWD:/bin/systemctl restart php-fpm.service
    run('sudo systemctl restart php7.2-fpm.service');
});

desc('Make sure release folder belongs to www-data');
task('folder_rights:enforce', function () {
    run('chown -R www-data:www-data {{release_path}}');
});

// Hooks
after('deploy', 'success');
after('deploy:symlink', 'php-fpm:restart');
after('deploy:failed', 'deploy:unlock');

// Special task to upload all the pages while developing
desc('Send fixtures to server');
task('fixtures', function () {
    run('rm -rf {{deploy_path}}/shared/user/pages.old');
    run('mv {{deploy_path}}/shared/user/pages {{deploy_path}}/shared/user/pages.old');
    upload('./user/pages', '{{deploy_path}}/shared/user/.');
});
after('fixtures', 'deploy:writable');
