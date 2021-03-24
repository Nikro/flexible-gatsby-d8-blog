const articlesQuery = ` {
   articles: allNodeArticle (filter: { status: {eq: true}}) {
     edges {
       node {
         id
         title
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
`

const flatten = arr =>
  arr.map(({ node: { fields, body, ...rest } }) => ({
    ...fields,
    ...body,
    ...rest,
  }))
const settings = { attributesToSnippet: [`summary:30`] }
const queries = [
  {
    query: articlesQuery,
    transformer: ({ data }) => flatten(data.articles.edges),
    indexName: `Articles`,
    settings,
  },
]
module.exports = queries