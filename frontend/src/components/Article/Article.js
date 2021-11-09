import React from "react"

import Header from "../Header/Header"
import ArticleContent from "./ArticleContent"
import Footer from "../Footer"

/* Article Parent Component */
function Article(props) {
  return (
    <>
      <Header />
      <ArticleContent {...props} />
      <Footer />
    </>
  )
}

export default Article
