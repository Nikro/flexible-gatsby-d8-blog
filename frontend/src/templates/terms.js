import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import "../components/fragments"
import ArticleTeaser from "../components/article-teaser";

const Terms = ({ pageContext, data }) => {
  const { name } = pageContext;
  const { edges } = data.articles;
  const totalCount = edges.length;

  const { currentPage, numPages, alias } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? alias : alias + '/page/' + (currentPage - 1).toString()
  const nextPage = alias + '/page/' + (currentPage + 1).toString()

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
    } tagged with "${name}" ${
    numPages !== 1 ? '(Page ' + currentPage + ' of ' + numPages + ')' : ''
    }`;
  return (
    <Layout>
      <div className="blog-tags">
        <h1>{tagHeader}</h1>
        <div className="tag-list">
          {edges.map(({ node }) => {
            return (
              <ArticleTeaser node={node}/>
            );
          })}
        </div>
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
        <div>
          <span>
            <Link to="/">← Back to Homepage</Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};


export default Terms

export const termsQuery = graphql`
  query TermsPageQuery ($limit: Int!, $skip: Int!, $tags_id: String, $category_id: String, $country_id: String) {
    articles: allNodeArticle (
      limit: $limit, 
      skip: $skip, 
      sort: {order: DESC, fields: [created]}, 
      filter: { status: {eq: true}, 
      relationships: {
        field_tags: {elemMatch: {id: {eq: $tags_id}}},
        field_categories: {elemMatch: {id: {eq: $category_id}}},
        field_related_countries: {elemMatch: {id: {eq: $country_id}}}}
      }) {
      edges {
        node {
          id,
          title
          created
          body {
            summary
            processed
          }
          path {
            alias
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
`;
