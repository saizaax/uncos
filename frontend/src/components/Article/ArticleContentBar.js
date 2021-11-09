import React from "react"
import { motion } from "framer-motion"

import { getPublicationTime } from "./ArticleHelper"

import ArticleText from "./ArticleText"
import ArticleQuote from "./ArticleQuote"
import ArticleLink from "./ArticleLink"
import ArticleImage from "./ArticleImage"
import ArticleVideo from "./ArticleVideo"

/* Article Display Data */
function ArticleContentBar({ article }) {
  const animations = {
    hidden: {
      opacity: 0,
      x: -100,
      y: 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }

  if (article !== null) {
    const { updatedAt, tags, title, subtitle, preview, content, author } =
      article

    return article === null ? null : (
      <motion.section
        className="content content_overview"
        variants={animations}
        initial="hidden"
        animate="visible"
      >
        <div className="article-info article-info_overview">
          <div className="meta-info">
            <p className="publication-time">
              {getPublicationTime(new Date(updatedAt))}
            </p>
            <ul className="list">
              <li className="list-item meta-info__tag-item">
                {tags.slice(0, 1)}
              </li>
            </ul>
          </div>
          <h2 className="article-title article-title_overview">{title}</h2>
          <p className="article-subtitle article-subtitle_overview">
            {subtitle}
          </p>
          {preview !== null && (
            <div
              className="article-image"
              style={{ backgroundImage: `url(${preview !== null && preview})` }}
            ></div>
          )}
          {content.map((item, index) =>
            item.type === "text" ? (
              <ArticleText key={index} value={item.value} />
            ) : item.type === "quote" ? (
              <ArticleQuote key={index} value={item.value} />
            ) : item.type === "link" ? (
              <ArticleLink key={index} value={item.value} url={item.url} />
            ) : item.type === "image" ? (
              <ArticleImage key={index} url={item.url} />
            ) : item.type === "video" ? (
              <ArticleVideo key={index} url={item.url} />
            ) : null
          )}
          <div className="article-author">
            <p className="article-author__text">Автор статьи • {author}</p>
          </div>
        </div>
      </motion.section>
    )
  } else return null
}

export default ArticleContentBar
