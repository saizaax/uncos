import React from "react"
import reactHtmlParser from "react-html-parser"
import sanitizeHtml from "sanitize-html"

const sanitizeOptions = {
  allowedTags: ["b", "i", "em", "strong", "a", "br"],
  allowedAttributes: {
    a: ["href"],
  },
}

function ArticleText({ value }) {
  const text = value.replace(/\n/g, "<br />")

  return (
    <p className="article-text">
      {reactHtmlParser(sanitizeHtml(text, sanitizeOptions))}
    </p>
  )
}

export default ArticleText
