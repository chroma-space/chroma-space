How-to
===

## Backend

The backend is available at http://chroma.space/edition

There are several views but the main one is the **pages** view, that you can access via the left side menu.

Each post, project or page is defined in Grav simply as a "page".

Each page contains several attributes : 

  - the content in itself, which is in Markdown syntax
  - a header that gives the pages some custom attributes, which is called the "frontmatter"
  - some accessible parameters (**options** and **advanced** tabs) that define the page template, it's publishing status, etc

> The frontmatter is only available in "Expert" mode (_toggle at the top right of the edition page_).

## Creating a new post or project

You can create a new post or project by clicking "Add" in the top bar. You must provide :

  - the title of the page
  - the "slug", that will be in the url. It's automatically created but you can change it (not recommended for SEO, though)
  - the template, either "post" or "project"
  - the root : either "(events)" or "(now)" (that's where all the posts should be) or "(projects)" (that's where all the projects should be)

> If you create a project, make sure to toggle the "Visible" state to "True", not "Auto". It's required for projects only.

### Content

The content is Markdown. You can input standard HTML too, of course.

#### Images, media

To include any kind of media, just drag and drop your file under the content zone after the page has been saved once. They will be uploaded directly to the server.

Once it's uploaded, you can reference it in your content directly:

    ![Alt text](my_picture.jpg)

    ![Alt text](y_video.mp4)

If you want to output a panorama, use this code in your content (`my_pano.jpg` should be changed with your file name) :

    <canvas class="panorama" panorama-images="{{ page.media['my_pano.jpg'].url }}" user-control="true"></canvas>

For video files, only upload a MP4 file. Other formats are not evenly supported. Make sure that the video is encoded in H.264 and the audio in AAC, if necessary.

> Note : By clicking the plus button next to a media, a tag will be automatically added in your content

#### Quick reminder for medias

Photos (real life) → use **JPG** (this includes panoramas)

Graphics, illustrations, drawings → use **PNG**

### Header and thumbnails

Headers and thumbnail are automatically retrieved front the medias with the following rules, in this order :

**Header**
1. If a file called `header.mp4`  is present, it will be used in the header, as a video. If a file `poster.png`  or `poster.jpg` is present too, it will be used as the video poster.

2. If a file called `header.png` or `header.jpg` is present, it will be used as the header

3. If a file called `header-panorama.jpg` or `header-panorama.png` is present, it will be used as the header, with the panorama style (draggable by the user)

4. If nothing like that is present, the header will be blank

**Thumbnail**

1. If `thumbnail.png`  or  `thumbnail.jpg`  is present, it will be used as the thumbnail accross the site (including in related content)

2. If no such file is present but that the post or project contains at least _one_ image (PNG or JPG or GIF), this image will be used, at a lower resolution, and in a circle format, as the thumbnail.

3. If the post or project have no image, then the thumbnail.svg file (Chroma wheel) will be used  

### Frontmatter

The frontmatter part is an advanced editing technique. It allows to define variables to further alter the page (post or project).

One thing that is always present in the frontmatter is the _title_ of the page, as well as the taxonomy (see further down), that you can change in the normal mode anyway. Other available custom variables are :

**For the header, when it's a video**

```yml
video_pause: true # or false
video_mute: true # or false
play_once: true # or false
```

**For the header, when it's a panorama**

```yml
panorama_longitude-speed: 0.01 # any float
panorama_user_control: true # or false
```

**For the header alignement**

```yml
banner_align: top # or center, bottom, etc
```

**For the credit box in the header**

```yml
splash_description: "This artwork is from <a href='url'>Cyril</a>"
```

> Do not mix single and double quotes : use double quotes for the whole string, and single quotes if you need HTML tags inside this string

**If you want to invert the navigation menu color (black / white)**

```yml
invert_nav: true  # or false
```

#### Related pages

The related pages / posts is edited directly in the frontmatter too :

    related_pages:
        - /now/artist-talk-brighton-digital-festival-2013
        - /now/state-of-mind

You must supply the actual path (url) of the related content. When on a post, it can be any project(s). When on a project, it can by any post(s).

> It's important that the content (post or project) be created _before_ adding this metadata to another page.

### Taxonomies

The taxonomies are tags that you assign to every page. For projects, they are used on the home page, under each thumbnail. We use them for SEO too, it's important to put at least 3 for each page.

### Other options

You shouldn't have to fiddle with other options. You may want to change the order of the pages in the projects root, at the margins. It's in the "Advanced" tab.


## The "events" page

This page is organised as a simple grid of all the posts that are under the "(events)" root, and is mainly used for calendar-based posts.

There is no thumbnail on the events page, but you can still add a header in the post itself (_see above_).


## The "now" page

Every 30 minutes, a script runs on the server to fetch the latest Instagram posts. They are stored on the server and aggregated to "now" posts (_posts that are under the "(now)" root_).

The layout on the now page is random, each tile taking a random size (multiple of 210px) for each refresh. The can thus not be perfect all the times, depending on the tiles.

The tiles will display in order of publication (most recent at the top) and posts from Instagram and posts from the platform will be mixed together; the Instagram posts will directly link to the instagram page for it, whereas the platform post will lead to the post page (as per events).

To fetch Instagram post once, run :

    cd /var/www/chroma.space/current/ && bin/plugin social-feed fetch:posts

> NB : if the token expires, just call : https://www.instagram.com/oauth/authorize/?client_id=c2b2fbe772e64ffd92edf8809c7feb1a&redirect_uri=http://www.chroma.space&response_type=token in a browser, login as chroma.space and authorize the app, the page will redirect and you will get an access token

## The "about" page

**Collaborators**

You can add pictures above collaborators' names, just add the media in the content section (upload the file - should be square), and input the following tag in the `<div class="row"></div>`  section:

    <div class="collaborator col-md-3">
      <img src="/user/pages/03.about/louis_a.png">
      <a href="http://www.the.website.for.this.author.com/">Name of Author</a>
    </div>


Where `louis_a.png` is the name of the picture. A standard link, without picture is :

    [Louis d'Aboville](https://vimeo.com/leskos)

## Other things

#### Social links

The social links in the footer can be changed in the theme configuration in the backend.

Go to **Themes** then click on **Chroma Theme**, and change the according texts. Click "Save" in the top right header to submit your changes. Voila !

#### Quotes (Javascript console)

The quotes appear in the javascript console (accessible for developers). They can be changed in the theme configuration too.

Go to **Themes** then click on **Chroma Theme**; in the "Quotes" section you can add or remove quotes, and modify them accordingly. Clic "Save" in the top right header to submit your changes


#### Clearing cache

When you make modifications to pages or parameters, they are not always available — that's because there's a cache system to improve the site performance.

When you have made modifications and want to see them live, you have to clear the cache manually (the cache has a lifetime, so eventually it will clear out itself automatically).

To do so, go on the dashboard page and in the top header, click "Clear cache".
