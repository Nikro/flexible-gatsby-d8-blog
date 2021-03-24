import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { kebabCase } from 'lodash';
import readingTime from 'reading-time'

const ArticleTeaser = ({node}) => {
  let coverImg = '';

  if (node.relationships.field_cover
    && node.relationships.field_cover.file.field_media_image
    && node.relationships.field_cover.file.field_media_image.localFile.preview) {
    coverImg = node.relationships.field_cover.file.field_media_image.localFile.preview;
  }
  let readingStats = readingTime(node.body.processed);
  let createdDate = new Date(node.created);
  let cuttoffDate = new Date();
  cuttoffDate.setFullYear(cuttoffDate.getFullYear() - 3);
  let isOld = createdDate < cuttoffDate;

  return (
    <article className={`post` + (isOld ? ` old` : ``)} key={node.fields.slug}>
      {coverImg.fluid && (
        <Link
          to={node.fields.slug}
          className="post-thumbnail"
          style={{
            backgroundImage: `url(${coverImg.fluid.src})`,
          }}
        />
      )}

      <div className="post-content">
        <h2 className="post-title">
          <Link to={node.fields.slug}>{node.title}</Link>
        </h2>
        { isOld && (<span className="old-notice">Outdated post - content might not be relevant...</span>) }
        <p>{node.body.summary}</p>

        <span className="post-date">
          { createdDate.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' }) }
        </span>
        &nbsp;&nbsp;—&nbsp;&nbsp;
        <span className="post-words">
          {readingStats.text}
        </span>
        <div className="page-footer">
          <div className="page-tag">
            {node.relationships.field_tags &&
            node.relationships.field_tags.map(tag => (
              <span key={tag.name}>
                <Link  className="tag" to={tag.path.alias}>#{tag.name}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

ArticleTeaser.propTypes = {
  node: PropTypes.object.isRequired
}

export default ArticleTeaser

