<?php

namespace Grav\Plugin\SocialFeed\Api;

use Grav\Common\Grav;
use Grav\Plugin\SocialFeed\Model\Post;

/**
 * Class SocialApi.
 */
abstract class SocialApi
{
    /**
     * @var mixed
     */
    protected $api;

    /**
     * @var string
     */
    protected $providerName;

    /**
     * @param string $username
     *
     * @return array[]|\stdClass[]
     */
    abstract public function getUserPosts($username);

    /**
     * @param \stdClass|array $socialPost
     *
     * @return Post|false
     */
    abstract protected function getMappedPostObject($socialPost);

    /**
     * @param string $username
     *
     * @return Post[]
     */
    public function getUserPostObjects($username)
    {
        $socialPosts = $this->getUserPosts($username);
        $postObjectList = [];

        foreach ($socialPosts as $socialPost) {
            try {
                $postObject = $this->getMappedPostObject($socialPost);
                if (is_array($postObject) || is_object($postObject)) {
                    $postObjectList[] = $postObject;
                }
            } catch (\Exception $e) {
                Grav::instance()['log']->error(sprintf('An error occured during social posts array conversion. Error: %s', $e->getMessage()));
            }
        }

        return $postObjectList;
    }
}
