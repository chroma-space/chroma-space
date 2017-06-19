<?php

namespace Deployer;

require_once 'recipe/common.php';

// Configuration
serverList('deploy/servers.yml');

set('env', 'prod');
set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('http_user', 'www-data');
set('default_stage', 'production');
set('repository', 'git@github.com:tchapi/chroma-space.git');
set('writable_dirs', ['cache', 'logs', 'images', 'user', 'backup', 'tmp']);
set('shared_dirs', ['user/data', 'user/pages', 'backup']);
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
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
]);

// Tasks
desc('Deploy production parameters and accounts');
task('deploy:parameters', function () {
    upload('./deploy/admin.{{env}}.yaml', '{{deploy_path}}/release/user/accounts/admin.yaml');
    upload('./deploy/kate.{{env}}.yaml', '{{deploy_path}}/release/user/accounts/kate.yaml');
    upload('./deploy/security.{{env}}.yaml', '{{deploy_path}}/release/user/config/security.yaml');
});

desc('Restart PHP-FPM service');
task('php-fpm:restart', function () {
    // The user must have rights for restart service
    // /etc/sudoers: username ALL=NOPASSWD:/bin/systemctl restart php-fpm.service
    run('sudo systemctl restart php7.1-fpm.service');
});

// Hooks
after('deploy', 'success');
after('deploy:symlink', 'php-fpm:restart');
after('deploy:update_code', 'deploy:parameters');
after('deploy:failed', 'deploy:unlock');

// Special task to upload all the pages while developing
desc('Send fixtures to server');
task('fixtures', function () {
    run('mv {{deploy_path}}/shared/user/pages {{deploy_path}}/shared/user/pages.old');
    upload('./user/pages', '{{deploy_path}}/shared/user/pages');
});