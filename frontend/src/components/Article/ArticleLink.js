import React from "react"

function ArticleLink({ value, url }) {
  const src = url === null ? null : url.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/gm)

  return (
    <div className="article-link">
      <div className="article-link__text-container">
        <a className="article-link__text-container__title" href={url}>
          {value}
        </a>
        <p className="article-link__text-container__url">{src}</p>
      </div>
      <div className="article-link__icon-container">
        <i className="ri-external-link-line"></i>
      </div>
    </div>
  )
}

export default ArticleLink
