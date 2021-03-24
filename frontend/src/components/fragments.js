import { graphql } from "gatsby";

// Document all fragments for paragraphs here.
//
// Include this file at least once so that webpack can pick it up, it's important to be picked up by Gatsby
// during build process so Gatsby can process all the fragments.
export const query = graphql`
  fragment MediaField on media__image {
    file: relationships {
      field_media_image {
        localFile {
          preview: childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
          full: childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        } 
      }
    }
  }
  fragment NodeCover on node__article {
    relationships {
      field_cover {
        ...MediaField
        relationships {
          field_media_image {
            localFile {
              ogFB: childImageSharp {
                fixed(width: 1200, height: 630, quality: 100, cropFocus: CENTER) {
                  ...GatsbyImageSharpFixed
                } 
              }
            }
          }
        }
      }
    }
  }
  fragment NodeTags on node__article {
    relationships {
      field_tags {
        name
        path {
          alias
        }
      }
    }
  }
  fragment NodeImages on node__article {
    relationships {
      field_media {
        relationships {
          field_media_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 300, maxHeight: 200, quality: 100, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
                original {
                  src
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;
