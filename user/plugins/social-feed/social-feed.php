<?php

namespace Grav\Plugin;

use Grav\Common\Plugin;
use Grav\Plugin\SocialFeed\Twig\PostExtension;

/**
 * Class SocialFeedPlugin.
 */
class SocialFeedPlugin extends Plugin
{
    /**
     * Add Twig Extensions.
     */
    public function onTwigExtensions()
    {
        $this->grav['twig']->twig->addExtension(new PostExtension());
    }
}