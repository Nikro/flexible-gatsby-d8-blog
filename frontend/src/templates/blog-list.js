import React from 'react'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash';
import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import "../components/fragments"
import ArticleTeaser from "../components/article-teaser";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.articles.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : '/' + (currentPage - 1).toString()
    const nextPage = '/' + (currentPage + 1).toString()

    return (
      <DefaultLayout>
        <SEO
          title='Homepage'
        />
        {posts.map(({ node }) => {
          return (
            <ArticleTeaser node={node} />
          )
        })}

        <nav className="pagination" role="pagination">
          <ul>
            {!isFirst && (
              <li>
                <Link to={prevPage} rel="prev" className="newer-posts">
                  ← Previous Page
                </Link>
              </li>
            )}
            <li>
              <span className="page-number">
                Page {currentPage} of {numPages}
              </span>
            </li>
            {!isLast && (
              <li>
                <Link to={nextPage} rel="next" className="older-posts">
                  Next Page →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </DefaultLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    articles: allNodeArticle(limit: $limit, skip: $skip, sort: {order: DESC, fields: [created]}, filter: { status: {eq: true}}) {
      edges {
        node {
          internalId: drupal_internal__nid
          drupalId: drupal_id
          title
          created
          body {
            summary
            processed
          }
          fields {
            slug
          }
          ...NodeCover
          ...NodeTags
        }
      }
    }
  }
`
