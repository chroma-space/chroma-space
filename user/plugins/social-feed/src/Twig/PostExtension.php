<?php

namespace Grav\Plugin\SocialFeed\Twig;

use Grav\Common\Page\Collection;
use Grav\Plugin\SocialFeed\Manager\PostManager;

/**
 * PostExtension allows to fetch posts from twig templates.
 */
class PostExtension extends \Twig_Extension
{
    /**
     * Returns extension name.
     *
     * @return string
     */
    public function getName()
    {
        return 'PostExtension';
    }

    /**
     * Adding filters.
     *
     * @return array
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('aggregate', [$this, 'aggregateSocialPostsWithPages']),
        ];
    }

    /**
     * Get posts and mix them with pages
     *
     * @param Collection $pages
     *
     * @return array
     */
    public function aggregateSocialPostsWithPages(Collection $pages)
    {
        $manager = new PostManager();
        $socialPosts = $manager->getPosts();

        $aggregated = [];
        foreach ($pages as $page) {
            $aggregated[] = [
                "type" => "page",
                "date" => $page->date(),
                "data" => $page,
            ];
        }

        foreach ($socialPosts["posts"] as $post) {
            $aggregated[] = [
                "type" => "post",
                "provider" => $post["provider"],
                "date" => (new \DateTime($post["publishedAt"]))->getTimestamp(),
                "data" => $post,
            ];
        }

        uasort($aggregated, function($a,$b) { return $a["date"] < $b["date"]; });

        return $aggregated;
    }
}