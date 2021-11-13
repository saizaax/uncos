import React from "react"
import { getPublicationTime } from "./Article/ArticleHelper"
import { Link } from "react-router-dom"

/* Large Article item */
function ArticleItemRichLarge({ id, time, title, subtitle, tags, preview }) {
  return (
    <div
      className="article article_lg stripe-background"
      style={preview !== null ? { backgroundImage: `url(${preview})` } : {}}
    >
      <div className="darken"></div>
      <div className="article-info article-info_lg">
        <div className="meta-info">
          <p className="publication-time publication-time_lg">
            {getPublicationTime(time)}
          </p>
        </div>
        <div className="article-text-container article-text-container_lg">
          <Link to={`/article/${id}`} className="text-link">
            <h2 className="article-title article-title_lg">{title}</h2>
          </Link>
          <p className="article-subtitle article-subtitle_lg">
            {subtitle.length > 250 ? `${subtitle.slice(0, 250)}...` : subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ArticleItemRichLarge
