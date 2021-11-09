import React, { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"

import Loading from "react-fullscreen-loading"
import config from "../../config.json"
import { ArticleContentLoader } from "../ContentLoaders"
import { AuthContext } from "../AuthContext"
import ArticleContentBar from "./ArticleContentBar"
import ArticleContentRecommends from "./ArticleContentRecommends"

function ArticleContent({ match }) {
  const history = useHistory()
  const [article, setArticle] = useState(null)

  const { userContext } = useContext(AuthContext)
  const [user] = userContext
  const [isLoading, setIsLoading] = useState(false)

  /* Check if article exists */
  useEffect(() => {
    const source = axios.CancelToken.source()
    setIsLoading(true)
    axios({
      method: "get",
      url: `${config.API}/articles/id/${match.params.id}`,
      responseType: "json",
      cancelToken: source.token,
    })
      .then((response) => {
        response.data.published === true || user !== null
          ? setArticle(response.data)
          : history.push("/")
        setIsLoading(false)
      })
      .catch((error) => {
        !axios.isCancel(error) && console.log(error)
        setIsLoading(false)
      })

    return () => {
      source.cancel()
    }
  }, [match.params.id, history, user])

  return (
    <main className="main">
      <Loading loading={isLoading} background="#fff" />
      <div className="container main__container">
        <div className="content-container">
          {article === null ? (
            <ArticleContentLoader />
          ) : (
            <>
              <ArticleContentBar article={article} />
              <ArticleContentRecommends article={article} />
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default ArticleContent
