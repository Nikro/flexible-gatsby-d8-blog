import React from 'react'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash';
import Img from 'gatsby-image'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import normalize from "../utils/tools";
import ArticleTeaser from "../components/article-teaser";
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

class BlogPostTemplate extends React.Component {
  render() {
    let coverImg = '';
    const location = this.props.location
    const post = this.props.data.nodeArticle

    const files = this.props.data.allMediaImage
    const { previous, next } = this.props.pageContext
    if (post.relationships.field_cover
      && post.relationships.field_cover.file.field_media_image
      && post.relationships.field_cover.file.field_media_image.localFile.preview) {
      coverImg = post.relationships.field_cover.file.field_media_image.localFile.full;
    }

    let article_body_elements = normalize(post.body.processed, files);
    let createdDate = new Date(post.created);
    let cuttoffDate = new Date();
    cuttoffDate.setFullYear(cuttoffDate.getFullYear() - 3);
    let isOld = createdDate < cuttoffDate;


    let disqusConfig = {
      url: `https://nikro.me${location.pathname}`,
      identifier: post.id,
      title: post.title,
    }
    return (
      <DefaultLayout>
        <SEO title={post.title} description={post.body.summary} ogFB={post.relationships.field_cover.relationships.field_media_image.localFile.ogFB} />
        <article className="article-page">
          <div className="page-content">
            {coverImg && (
              <div className="page-cover-image">
                <figure>
                  <Img
                    className="page-image"
                    key={coverImg.fluid.src}
                    fluid={coverImg.fluid}
                  />
                </figure>
              </div>
            )}
            <div className="wrap-content">
              <header className="header-page">
                <h1 className="page-title">{post.title}</h1>
                <div className="article-type">
                  {post.relationships.field_article_type.name + ' Article'}
                  { isOld && (<strong><br/>This is an OLD POST...</strong>) }
                </div>
                <div className="page-date">
                  <span>{ createdDate.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' }) }</span>
                </div>
              </header>
              <div className="body-content">{article_body_elements}</div>
              <div className="page-footer">
                <div className="page-tag">
                  {post.relationships.field_tags.length >= 1 && (
                    <div className="tags-section">
                      <h3>Tags:</h3>
                      {
                        post.relationships.field_tags && post.relationships.field_tags.map(tag => (
                          <span key={tag.name}>
                            <Link  className="tag" to={tag.path.alias}>#{tag.name}</Link>
                          </span>
                        ))
                      }
                    </div>
                  )}
                  {post.relationships.field_categories.length >= 1 && (
                    <div className="tags-section">
                      <h3>Categories:</h3>
                      {
                        post.relationships.field_categories && post.relationships.field_categories.map(tag => (
                          <span key={tag.name}>
                            <Link  className="tag" to={tag.path.alias}>#{tag.name}</Link>
                          </span>
                        ))
                      }
                    </div>
                  )}
                  {post.relationships.field_related_countries.length >= 1 && (
                    <div className="tags-section">
                      <h3>Related Country Tags:</h3>
                      {
                        post.relationships.field_related_countries && post.relationships.field_related_countries.map(tag => (
                          <span key={tag.name}>
                            <Link  className="tag" to={tag.path.alias}>#{tag.name}</Link>
                          </span>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
              <div className="comments-wrapper">
                <h3>Comments:</h3>
                <p>Feel free to ask any question / or share any suggestion!</p>
                <Disqus config={disqusConfig} />
              </div>
              {post.relationships.field_related_articles.length >= 1 && (
                <div className="related-articles">
                  <h3>Related Articles:</h3>
                  {
                    post.relationships.field_related_articles && post.relationships.field_related_articles.map(node => (
                      <ArticleTeaser node={node} />
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        </article>
      </DefaultLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
 query($id: String!) {
    nodeArticle(drupal_id: { eq: $id }) {
      title
      body {
        summary
        processed
      }
      created
      fields {
        slug
      }
      ...NodeCover
      ...NodeTags
      ...NodeImages
      relationships {
        field_article_type {
          name
          id
          path {
            alias
          }
        }
        field_categories {
          name
          id
          path {
            alias
          }
        }
        field_article_type {
          name
        }
        field_related_countries {
          name
          id
          path {
            alias
          }
        }
        field_related_articles {
          id,
          title
          created
          path {
            alias
          }
          fields {
            slug
          }
          body {
            summary
            processed
          }
          ...NodeCover
          ...NodeTags
        }
      }
    }
    allMediaImage {
      edges {
        node {
          relationships {
            field_media_image {
              uri {
                url
              }
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1100) {
                    ...GatsbyImageSharpFluid
                    ...GatsbyImageSharpFluidLimitPresentationSize
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
