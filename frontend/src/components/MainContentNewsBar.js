import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import ArticleItemRichLarge from "./ArticleItemRichLarge"
import ArticleItemRich from "./ArticleItemRich"

/* Articles container */
function MainContentNewsBar({ articles, type, setArticles }) {
  const [majorArticle] = articles === null ? [null] : articles.slice(0, 1)
  const otherArticles =
    articles === null ? null : type === "editor" ? articles : articles.slice(1)

  const animationContainer = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="content">
      <div className="article-container article-container_lg">
        {articles === null ||
        articles.length === 0 ||
        type === "editor" ? null : (
          <ArticleItemRichLarge
            id={majorArticle.id}
            time={new Date(majorArticle.updatedAt)}
            tags={majorArticle.tags}
            title={majorArticle.title}
            subtitle={majorArticle.subtitle}
            preview={majorArticle.preview}
          />
        )}
      </div>
      <motion.div
        className="article-container article-container_md"
        variants={animationContainer}
        initial="hidden"
        animate="visible"
      >
        {type === "editor" ? (
          <div className="article article_md article_new">
            <div className="article_new-btn-container">
              <Link to="/edit/new">
                <button className="red-articles-btn">Добавить статью</button>
              </Link>
            </div>
          </div>
        ) : null}
        {articles === null || articles.length === 0
          ? null
          : otherArticles.map((item) => (
              <ArticleItemRich
                key={item.id}
                id={item.id}
                time={new Date(item.updatedAt)}
                tags={item.tags}
                title={item.title}
                subtitle={item.subtitle}
                preview={item.preview}
                type={type}
                setArticles={setArticles}
                articles={articles}
              />
            ))}
      </motion.div>
    </section>
  )
}

export default MainContentNewsBar
