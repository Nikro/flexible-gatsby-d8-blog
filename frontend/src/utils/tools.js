import React from "react"
import ReactHtmlParser from "react-html-parser"
import Url from "url-parse";
import Img from 'gatsby-image'
import qs from "querystringify"

export default function normalize(content, files) {
  return new ReactHtmlParser(content, {
    transform: function transform(node) {
      if (node.type === 'tag' && node.name === 'img') {
        let url = node.attribs["src"];

        // Enforce secure path to images.
        if (url.includes('http://')) {
          url.replace('http://', 'https://');
        }
        let alt = node.attribs["alt"]
        let i = 0;
        for (i = 0; i < files.edges.length; i++) {
          if (files.edges[i].node.relationships.field_media_image &&
            files.edges[i].node.relationships.field_media_image.uri.url === url &&
            files.edges[i].node.relationships.field_media_image.localFile) {
            return <Img Tag="span" style={{ display: `flex`}} fluid={files.edges[i].node.relationships.field_media_image.localFile.childImageSharp.fluid} alt={alt}/>
          }
        }
      }
      else if (node.type === 'tag' && node.name === 'iframe') {
        let url = node.attribs.src;
        if (url.search('http') === -1) {
          if (url.search('//') === -1) {
            url = "//" + url;
          }
          url = "https:" + url;
        }
        let url_parsed = new Url(url)
        if (url_parsed['query']) {
          let parsed_query = qs.parse(url_parsed['query'])
          if ('url' in parsed_query) {
            url = parsed_query['url']


            if (url.search('youtube.com') !== -1) {
              url = url.replace('youtube.com', 'youtube.com/embed')
            }
            else if(url.search('youtu.be') !== -1) {
              url = url.replace('youtu.be', 'youtube.com/embed')
            }
          }
        }

        let id = url.split("/").pop();

        return <iframe src={url}
                       width={node.attribs.width}
                       height={node.attribs.height}
                       id={id}
                       key={id}
                       display="initial"
                       position="relative"
                       allowFullScreen />;
      }

      return undefined;
    }
  });
}