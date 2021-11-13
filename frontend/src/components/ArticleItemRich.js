import React, { useContext, useState } from "react"
import Loading from "react-fullscreen-loading"
import { getPublicationTime } from "./Article/ArticleHelper"
import { Link } from "react-router-dom"
import axios from "axios"

import config from "../config.json"
import { toast } from "react-toastify"
import { AuthContext } from "./AuthContext"
import { motion } from "framer-motion"

/* Default Article Item */
function ArticleItemRich({
  id,
  time,
  title,
  subtitle,
  tags,
  preview,
  type,
  setArticles,
  articles,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { tokenContext } = useContext(AuthContext)
  const [token] = tokenContext

  /* Remove article */
  const handleRemove = (id) => {
    setIsLoading(true)
    axios({
      method: "delete",
      url: `${config.API}/articles/id/${id}`,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: id,
      },
    })
      .then(() => {
        setArticles(articles.filter((item) => item.id !== id))
        toast.info("Статья была успешно удалена!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        toast.error("При удалении статьи произошла ошибка!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
  }

  const animationItem = {
    hidden: { x: -100, y: 20, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.div className="article article_md" variants={animationItem}>
      <Loading loading={isLoading} />
      <div className="article-info">
        <div className="meta-info">
          <p className="publication-time">{getPublicationTime(time)}</p>
          <ul className="list">
            <li className="list-item meta-info__tag-item">
              {tags.slice(0, 1)}
            </li>
          </ul>
        </div>
        {type === "editor" ? (
          <Link to={`/edit/${id}`} className="text-link">
            <h2 className="article-title">{title}</h2>
          </Link>
        ) : (
          <Link to={`/article/${id}`} className="text-link">
            <h2 className="article-title">{title}</h2>
          </Link>
        )}
        <p className="article-subtitle">
          {subtitle.length > 200 ? `${subtitle.slice(0, 200)}...` : subtitle}
        </p>
      </div>
      <div
        className="article__preview article__preview_md stripe-background"
        style={preview !== null ? { backgroundImage: `url(${preview})` } : {}}
      ></div>
      {type === "editor" && (
        <div
          className="data-input__delete-icon"
          onClick={() => handleRemove(id)}
        >
          <i className="ri-delete-bin-line"></i>
        </div>
      )}
    </motion.div>
  )
}

export default ArticleItemRich
