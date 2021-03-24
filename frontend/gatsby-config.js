const queries = require("./src/utils/algolia")
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Sergiu Nagailic (Nikro) Blog`,
    description: `I'm Senior Drupal Developer, CTO & Co-founder at MedicalTourism.Review`,
    author: `Sergiu Nagailic`,
    siteUrl: `https://nikro.me`,
    social: {
      twitter: `nikro_md`,
      facebook: ``,
      github: `Nikro`,
      linkedin: `nagailic`,
      email: `nikro.md@gmail.com`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `${process.env.DRUPAL_URI}`
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [
          `/category/*`,
          `/category/*/*/*`,
          `/tags/*`,
          `/tags/*/*/*`,
          `/countries/*`,
          `/countries/*/*/*`
        ],
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://nikro.me',
        sitemap: 'https://nikro.me/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nikro Blog`,
        short_name: `Nikro.me`,
        start_url: `/`,
        background_color: `#2c3e50`,
        theme_color: `#2c3e50`,
        display: `minimal-ui`,
        icon: `./static/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `nikro`
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, articles } }) => {
              return articles.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.body.summary,
                  date: edge.node.created,
                  url: 'https://nikro.me' + edge.node.fields.slug,
                  guid: edge.node.drupalId
                })
              })
            },
            query: `
              {
                articles: allNodeArticle(sort: {order: DESC, fields: [created]}, filter: { status: {eq: true}}) {
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
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Sergiu Nagailic's RSS Feed",
            link: "https://nikro.me",
          },
        ],
      },
    },
  ],
}
