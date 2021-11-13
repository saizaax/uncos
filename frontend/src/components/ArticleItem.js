import React from "react"
import { getPublicationTime } from "./Article/ArticleHelper"
import { Link } from "react-router-dom"

/* Side-bar Article item */
function ArticleItem({ id, title, time, tags }) {
  return (
    <div className="side-bar__item-container">
      <p className="side-bar__item-meta">{getPublicationTime(time)}</p>
      <Link to={`/article/${id}`} className="text-link">
        <p className="side-bar__item">{title}</p>
      </Link>
      <p className="side-bar__item-meta side-bar__item-meta_tag">
        {tags.join(", ")}
      </p>
    </div>
  )
}

export default ArticleItem
