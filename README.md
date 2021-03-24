# Flexible Gatsby.JS + Drupal 8 (blog)

Hey there!

This is a decoupled setup with Drupal 8 CMS and Gatsby frontend.

- Q: *Is this a fully polished Gatsby Template?* 
- A: Nope. It's just a "dump" of [my blog](https://nikro.me/) with some adjustments here and there. But it definitely can be used to create similar blogs.


- Q: *Can I have more details on how you did it and why?*
- A: Sure, I wrote 2 blog-posts: [why](https://nikro.me/articles/professional/drupal-7-drupal-8-gatsbyjs/) and [how](https://nikro.me/).

![Small Preview](https://raw.githubusercontent.com/Nikro/flexible-gatsby-d8-blog/main/frontend/static/preview.png)

## Features

- **Drupal 8** based content editing - I dumped my configs in the repo but you can ignore those and provide your own structure;
- **Algolia**-based search with autocomplete;
- **Pagination** (also pagination for tags)
- **Feed** (RSS) setup and **Sitemap**
- **Disqus** for comments
- **Contact Form** - using GetForm.io
- **Others** - idk what else, facebook previews, in-body image replacements, etc.

## Why?

In short - I had some trouble keeping my Drupal 7 blog up to date, and it constantly got hacked. I decided to implement a different approach - a decoupled approach - Gatsby.JS frontend and Drupal 8 as the CMS.
This also allowed me to have a blazing fast website, without paying anything for the hosting - win-win.

To understand this deeper, go to [my article (1st part)](https://nikro.me/articles/professional/drupal-7-drupal-8-gatsbyjs/).

## Setup / Implementation:

If you want to set up a blog using this repo (or if you're looking for other gatsby themes) - [my second article (2nd part)](https://nikro.me) might be useful for you.

I'm too lazy to explain a step-by-step process, just jump into the article and you'll get a full ~~tutorial~~ guide on what I did and why.

Ah, all the keys (so far just Algolia and Google Analytics) - live in the frontend/**.env** file (copy .env.SAMPLE to .env and replace the values).

## Credits / Based on:

This template is based on:

* [Docksal Setup](https://github.com/docksal/boilerplate-drupal-gatsby) (docker) - this is the repo that demonstrates how Gatsby can be used together with Drupal 8 (decoupled).
* [Flexible Gatsby template](https://github.com/wangonya/flexible-gatsby) - I used this template, but then again I adopted it to be used with Drupal, and naturally extended it a bit.
* The template from above is itself based on this [Flexible Jekyll](https://github.com/artemsheludko/flexible-jekyll) template.



