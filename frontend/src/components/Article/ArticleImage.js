import React from "react"

function ArticleImage({ url }) {
  return (
    <div
      className={
        url === null ? "article-image stripe-background" : "article-image"
      }
      style={url === null ? {} : { backgroundImage: `url(${url})` }}
    ></div>
  )
}

export default ArticleImage
