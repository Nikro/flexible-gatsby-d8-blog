const path = require(`path`)
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`)

// Create a slug for each Drupal node and set it as a field on the node.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type.indexOf(`node__`) === 0) {
    // Use path alias if exists, otherwise fallback to /node/[nid] for slug.
    let slug = node.path.alias
      ? node.path.alias
      : `/node/${node.drupal_internal__nid}`;

    // Normalize all paths to end with /.
    slug = slug + "/";


    // Create a new field on all graphql nodes of type "node__" that
    // will store the slug, this will be used to build page URLs in createPages.
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

function createArticlePages(createPage, graphql) {
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
    // Query for recipe nodes to use in creating pages.
    return graphql(
      `
        {
          articles: allNodeArticle {
            edges {
              node {
                internalId: drupal_internal__nid
                drupalId: drupal_id
                title
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    ).then((result) => {
      if (result.errors) {
        throw result.errors;
      }

      let articles = result.data.articles;

      // Create pages for each article.
      articles.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: blogPostTemplate,
          context: {
            slug: node.fields.slug,
            internalId: node.internalId,
            id: node.drupalId,
            title: node.title
          },
        });
      });

      // Create blog post list pages
      const postsPerPage = 10;
      const numPages = Math.ceil(articles.edges.length / postsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/${i + 1}`,
          component: path.resolve("./src/templates/blog-list.js"),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      });

      resolve();
    });
  });
}

function createTermPages(createPage, graphql) {
  return new Promise((resolve, reject) => {
    const termsTemplate = path.resolve(`src/templates/terms.js`);
    return graphql(
      `
        {
           allNodeArticle (filter: { status: {eq: true}}) {
             edges {
               node {
                 id
                 path {
                   alias
                 }
                 relationships {
                   field_categories {
                     id
                   }
                   field_tags {
                     id
                   }
                   field_related_countries {
                     id
                   }
                 }
               }
             }
           }
          allTaxonomyTermTags(sort: {order: ASC, fields: name}) {
            edges {
              node {
                id
                name
                path {
                  alias
                }
              }
            }
          }
          allTaxonomyTermCategory(sort: {order: ASC, fields: name}) {
            edges {
              node {
                id
                name
                path {
                  alias
                }
              }
            }
          }
          allTaxonomyTermCountries(sort: {order: ASC, fields: name}) {
            edges {
              node {
                id
                name
                path {
                  alias
                }
              }
            }
          }
        }
      `
    ).then((result) => {
      if (result.errors) {
        throw result.errors;
      }

      const postsPerPage = 9;
      let termsStats = {};

      result.data.allNodeArticle.edges.forEach(({ node }) => {
        // We want to collect these so we can create proper pagination below.
        let termsPerNode = [];
        node.relationships.field_tags.forEach(term => {
          if (term.id !== undefined && !termsPerNode.includes(term.id)) {
            termsStats[term.id] = Object.keys(termsStats).includes(term.id) ? termsStats[term.id] + 1 : 1;
            termsPerNode.push(term.id);
          }
        });
        node.relationships.field_categories.forEach(term => {
          if (term.id !== undefined && !termsPerNode.includes(term.id)) {
            termsStats[term.id] = Object.keys(termsStats).includes(term.id) ? termsStats[term.id] + 1 : 1;
            termsPerNode.push(term.id);
          }
        });
        node.relationships.field_related_countries.forEach(term => {
          if (term.id !== undefined && !termsPerNode.includes(term.id)) {
            termsStats[term.id] = Object.keys(termsStats).includes(term.id) ? termsStats[term.id] + 1 : 1;
            termsPerNode.push(term.id);
          }
        })
      });

      // Create tags / categories.
      result.data.allTaxonomyTermTags.edges.forEach(({ node }) => {
        const numPages = Math.ceil(termsStats[node.id] / postsPerPage);

        Array.from({ length: numPages }).forEach((__, i) => {
          createPage({
            path: i === 0 ? node.path.alias : node.path.alias + `/page/${i + 1}`,
            component: path.resolve(`./src/templates/terms.js`),
            context: {
              limit: postsPerPage,
              skip: i === 0 ? 0 : i * postsPerPage,
              numPages,
              currentPage: i + 1,
              name: node.name,
              id: node.id,
              tags_id: node.id,
              alias: node.path.alias
            },
          })
        })
      });

      result.data.allTaxonomyTermCategory.edges.forEach(({ node }) => {
        const numPages = Math.ceil(termsStats[node.id] / postsPerPage);
        Array.from({ length: numPages }).forEach((__, i) => {
          createPage({
            path: i === 0 ? node.path.alias : node.path.alias + `/page/${i + 1}`,
            component: path.resolve(`./src/templates/terms.js`),
            context: {
              limit: postsPerPage,
              skip: i === 0 ? 0 : i * postsPerPage,
              numPages,
              currentPage: i + 1,
              name: node.name,
              id: node.id,
              category_id: node.id,
              description: node.description != null ? node.description.processed : '',
              alias: node.path.alias
            },
          })
        })
      });


      result.data.allTaxonomyTermCountries.edges.forEach(({ node }) => {
        const numPages = Math.ceil(termsStats[node.id] / postsPerPage);
        Array.from({ length: numPages }).forEach((__, i) => {
          createPage({
            path: i === 0 ? node.path.alias : node.path.alias + `/page/${i + 1}`,
            component: path.resolve(`./src/templates/terms.js`),
            context: {
              limit: postsPerPage,
              skip: i === 0 ? 0 : i * postsPerPage,
              numPages,
              currentPage: i + 1,
              name: node.name,
              id: node.id,
              country_id: node.id,
              alias: node.path.alias
            },
          })
        })
      });

      resolve();
    });
  });
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  // For each page type we designate a separate callback that returns a promise.
  // We consider the createPages process done when all page types are done.
  return Promise.all([
    createArticlePages(createPage, graphql),
    createTermPages(createPage, graphql),
    createPage({
      path: `/contact`,
      component: path.resolve(`./src/templates/contact.js`),
      context: {},
    })
  ]);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    # Entity interface used as common ground for entity reference fields.
    # TODO: Add more common fields.
    interface Entity {
      drupal_id: String! 
      internal: Internal!
    }
    interface DrupalNode {
      path: Path!
    }
    type Path {
      pid: Int
      alias: String
      langcode: String
    }
    type FormattedText {
      value: String
      format: String
      processed: String
      summary: String
    }
    type Link {
      uri: String
      title: String
    }
    # This is an example of Drupal node type.
    type NodeArticle implements Node & DrupalNode {
      path: Path!
      title: String
      body: FormattedText
    }
  `;
  createTypes(typeDefs);
};
