import { Link } from 'gatsby'
import React from 'react'
import Search from "./search/index"
import Logo from './pic.jpg'

const Sidebar = ({ siteMetadata }) => {
  const searchIndices = [
    { name: `Articles`, title: `Articles`, hitComp: `ArticleHit` },
  ]
  return (
    <>
      <aside className="sidebar">
        <header>
          <div className="about">
            <div className="cover-author-image">
              <Link to="/">
                <img src={Logo} alt={siteMetadata.author} />
              </Link>
            </div>
            <div className="author-name">{siteMetadata.author}</div>
            <p>Senior Drupal Developer -<br/>CTO & Co-founder at <a href="https://medicaltourism.review">MedicalTourism.Review</a></p>
            <section id="search" className="alt">
              <Search collapse indices={searchIndices} />
            </section>
          </div>
        </header>
        <footer>
          <section className="contact">
            <h3 className="contact-title">Contact me</h3>
            <ul>
              {siteMetadata.social.twitter && (
                <li>
                  <a
                    href={`https://twitter.com/${siteMetadata.social.twitter}`}
                    target="_blank"
                  >
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.facebook && (
                <li>
                  <a
                    href={`https://facebook.com/${siteMetadata.social.facebook}`}
                    target="_blank"
                  >
                    <i className="fa fa-facebook" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.github && (
                <li>
                  <a
                    href={`https://github.com/${siteMetadata.social.github}`}
                    target="_blank"
                  >
                    <i className="fa fa-github" aria-hidden="true" />
                  </a>
                </li>
              )}
              {siteMetadata.social.linkedin && (
                <li>
                  <a
                    href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}
                    target="_blank"
                  >
                    <i className="fa fa-linkedin" aria-hidden="true" />
                  </a>
                </li>
              )}
              <li>
                <Link to={`/rss.xml`}>
                  <i className="fa fa-rss" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to={`/contact`}>
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </section>
          <div className="copyright">
            <p>
              {new Date().getFullYear()} &copy; {siteMetadata.author}
            </p>
          </div>
        </footer>
      </aside>
    </>
  )
}

export default Sidebar
