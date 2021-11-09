import React from "react"

function ArticleVideo({ url }) {
  const src = url === null ? null : url.match(/([a-z0-9_-]{11})/gim)

  return (
    <div className="article-video">
      <iframe
        title="video"
        height="400"
        src={`https://www.youtube.com/embed/${src}`}
      ></iframe>
    </div>
  )
}

export default ArticleVideo
