<?php

namespace Grav\Plugin\Console;

use Grav\Common\Grav;
use Grav\Common\Page\Page;
use Grav\Console\ConsoleCommand;
use Grav\Plugin\SocialFeed\Model\Post;
use Grav\Plugin\SocialFeed\Manager\PostManager;
use Grav\Common\GPM\Response;

/**
 * SocialFeedCommand.
 */
class SocialFeedCommand extends ConsoleCommand
{
    public function __construct($name = null)
    {
        parent::__construct($name);
        self::$grav = Grav::instance();
    }

    /**
     * {@inherit}.
     */
    protected function configure()
    {
        $this
            ->setName('fetch:posts')
            ->setDescription('This command fetch posts from Facebook, Twitter and Instagram, for all accounts listed in the plugin configuration form.');
    }

    /**
     * {@inherit}.
     */
    protected function serve()
    {
        $posts = array();
        $manager = new PostManager(true);

        $posts = $this->get();

        if (!$posts) {
            $this->error('No posts could be retrieved.');
            return;
        }

        foreach ($posts as $item) {
            
            $post = new Post();
            
            $post->setProvider("instagram");
            $post->setPostId($item->id);
            $post->setAuthorUsername($item->user->username);
            $post->setAuthorName($item->user->full_name);
            $post->setAuthorFileUrl($item->user->profile_picture);

            if (isset($item->caption->text)) {
                $post->setHeadline(strip_tags($item->caption->text));
                $text = $this->getFormattedTextFromPost($item);
                $post->setBody($text);
            }
            
            $post->setFileUrl($item->images->standard_resolution->url);
            $post->setLink($item->link);

            $publishedAt = new \DateTime();
            $publishedAt->setTimestamp($item->created_time);

            $post->setPublishedAt($publishedAt);

            $manager->storeAttachments($post);
            $posts[] = $post;
        }

        $manager->savePosts($posts);
        $this->success('Social network post fetching has finished.');
    }

    /**
     * get the data of the given user's feed
     *
     * @param null $username
     * @return bool | Object
     */
    private function get() {

        $config = self::$grav['config']->get('plugins.social-feed');
        $username = $config['instagram_username'];
        
        try {
            $feed = 'https://www.instagram.com/'.$username.'/media/';
            // using the Grav Response Class for the curl request to instagram.
            $result = Response::get($feed);
        } catch(\Exception $e) {
            return false;
        }

        return $this->parseData($result);
    }

    /**
     * parse json data;
     *
     * @param string $json
     * @return bool | Object
     */
    private function parseData($json) {
        if (!is_string($json)) {
            return false;
        }

        $data = json_decode($json);

        if ($data->status == 'ok') {
            return $data->items;
        } else {
            return false;
        }
    }
 
    /**
     * Get formated text from post.
     *
     * @param \stdClass $item
     *
     * @return string
     */
    private function getFormattedTextFromPost($item)
    {
        $text = $item->caption->text;
        // Add href for links prefixed with ***:// (*** is most likely to be http(s) or ftp
        $text = preg_replace("#(^|[\n ])([\w]+?://[\w]+[^ \"\n\r\t< ]*)#", '\\1<a href="\\2" target="_blank">\\2</a>', $text);
        // Add href for links starting with www or ftp
        $text = preg_replace("#(^|[\n ])((www|ftp)\.[^ \"\t\n\r< ]*)#", '\\1<a href="http://\\2" target="_blank">\\2</a>', $text);

        return $text;
    }

    /**
     * Notify error.
     *
     * @param string $message
     */
    protected function error($message)
    {
        self::$grav['log']->error($message);
        $this->output->writeln('<red>'.$message.'</red>');
    }

    /**
     * Notify success.
     *
     * @param string $message
     */
    protected function success($message)
    {
        $this->output->writeln('<green>'.$message.'</green>');
    }
}
