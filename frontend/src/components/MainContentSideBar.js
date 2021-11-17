import React from "react"

import ArticleItem from "./ArticleItem"

/* Articles recommends */
function MainContentSideBar({ articles }) {
  return articles === null || articles.length === 0 ? null : (
    <section className="side-bar">
      <h3 className="side-bar__title">Популярное</h3>
      {articles.map((item) => (
        <ArticleItem
          key={item.id}
          id={item.id}
          title={item.title}
          time={new Date(item.updatedAt)}
          tags={item.tags}
        />
      ))}
    </section>
  )
}

export default MainContentSideBar
