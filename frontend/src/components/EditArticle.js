import React from "react"

import EditArticleContent from "./EditArticleContent"
import Header from "./Header/Header"

function EditArticle(props) {
  return (
    <>
      <Header type={"article_edit"} />
      <EditArticleContent {...props} />
    </>
  )
}

export default EditArticle
