import React, { useEffect, useState, useContext } from "react"
import { useLocation, Link } from "react-router-dom"
import axios from "axios"

import config from "../config.json"
import { MainContentLoader } from "./ContentLoaders"
import MainContentNewsBar from "./MainContentNewsBar"
import MainContentSideBar from "./MainContentSideBar"
import NothingFound from "./NothingFound"
import { AuthContext } from "./AuthContext"

function MainContent({ type, match }) {
  const sidebarAmount = 5

  const [articlesCount, setArticlesCount] = useState(0)
  const [articleIndex, setArticleIndex] = useState(10)
  const [articles, setArticles] = useState(null)
  const [sidebarArticles, setSidebarArticles] = useState(null)

  const category = match.params.category
  const search = new URLSearchParams(useLocation().search).get("search")

  const { userContext, roleContext, tokenContext } = useContext(AuthContext)
  const [user] = userContext
  const [roles] = roleContext
  const [token] = tokenContext

  const { API } = config

  const query = {
    size: `size=${articleIndex + sidebarAmount}`,
    published: `${type === "editor" ? "&published=false" : ""}`,
    search: `${search ? `&search=` + search : ""}`,
  }

  const urls = {
    category: `${API}/articles/category/${category}?${query.size}${query.published}${query.search}`,
    default: `${API}/articles?${query.size}${query.published}${query.search}`,
  }

  const getUrl = category !== undefined ? urls.category : urls.default

  /* Getting articles */
  useEffect(() => {
    const source = axios.CancelToken.source()

    axios({
      method: "get",
      url: getUrl,
      responseType: "json",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
      cancelToken: source.token,
    })
      .then((response) => {
        const { content } = response.data

        if (content.length < 10 || type === "editor") setArticles(content)
        else setArticles(content.slice(0, -sidebarAmount))

        content.length < 10
          ? setSidebarArticles(null)
          : setSidebarArticles(content.slice(-sidebarAmount))
        setArticlesCount(response.data.totalElements)
      })
      .catch((error) => !axios.isCancel(error) && console.log(error))

    return () => {
      source.cancel()
    }
  }, [category, articleIndex, search, getUrl, token, type])

  return (
    <main className="main">
      <div className="container main__container">
        {user === null ||
        type === "editor" ||
        (roles &&
          !(
            roles.includes("ROLE_MODERATOR") || roles.includes("ROLE_ADMIN")
          )) ? null : (
          <div className="edit-options">
            <Link to="/editor">
              <button className="edit-options-btn">
                Меню редактора <i className="ri-edit-line"></i>
              </button>
            </Link>
            {roles && roles.includes("ROLE_ADMIN") ? (
              <Link to="/users">
                <button className="edit-options-btn">
                  Пользователи <i className="ri-user-settings-line"></i>
                </button>
              </Link>
            ) : null}
          </div>
        )}
        <h1 className="head-title">{category}</h1>
        <div className="content-container">
          {articles === null ? (
            <MainContentLoader />
          ) : articles.length === 0 && type !== "editor" ? (
            <NothingFound />
          ) : (
            <>
              {type === "editor" ? null : (
                <MainContentSideBar articles={sidebarArticles} />
              )}
              <MainContentNewsBar
                articles={articles}
                type={type}
                setArticles={setArticles}
              />
            </>
          )}
        </div>
        {articlesCount <= articleIndex + sidebarAmount ? null : (
          <div className="more-articles-btn-container">
            <button
              className="red-articles-btn"
              onClick={() => setArticleIndex((prev) => prev + 10)}
            >
              Больше новостей
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default MainContent
