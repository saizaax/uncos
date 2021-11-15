import React, { useEffect, useState, useContext } from "react"
import Loading from "react-fullscreen-loading"
import { motion } from "framer-motion"
import axios from "axios"
import ImageUploading from "react-images-uploading"

import config from "../config.json"
import { useHistory } from "react-router-dom"
import { getPublicationTime } from "./Article/ArticleHelper"
import { AuthContext } from "./AuthContext"

import EditArticleImage from "./EditArticleImage"
import EditArticleLink from "./EditArticleLink"
import EditArticleQuote from "./EditArticleQuote"
import EditArticleText from "./EditArticleText"
import EditArticleVideo from "./EditArticleVideo"

import ArticleText from "./Article/ArticleText"
import ArticleQuote from "./Article/ArticleQuote"
import ArticleLink from "./Article/ArticleLink"
import ArticleImage from "./Article/ArticleImage"
import ArticleVideo from "./Article/ArticleVideo"

function EditArticleContent({ match }) {
  const { userContext, tokenContext } = useContext(AuthContext)
  const history = useHistory()

  const [user] = userContext
  const [token] = tokenContext
  const [currentTime, setCurrentTime] = useState(new Date())

  const [isLoading, setIsLoading] = useState(false)

  /* Setting current time */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000)
    return () => clearInterval(timer)
  })

  /* Default Edit-article data template */
  const [values, setValues] = useState({
    title: "Заголовок",
    subtitle: "Подзаголовок",
    preview: null,
    author: user,
    tags: ["Новости"],
    content: [],
  })

  /* Getting article data */
  useEffect(() => {
    if (match.params.id !== "new") {
      setIsLoading(true)
      const source = axios.CancelToken.source()

      axios({
        method: "get",
        url: `${config.API}/articles/id/${match.params.id}`,
        responseType: "json",
        cancelToken: source.token,
      })
        .then((response) => {
          setValues(response.data)
          setIsLoading(false)
        })
        .catch((error) => console.log(error))

      return () => {
        source.cancel()
      }
    }
  }, [match.params.id])

  const [isSaved, setIsSaved] = useState(true)

  /* Setting data on edit */
  const handleInputChange = (e, type = null, id = null) => {
    setIsSaved(false)
    const { name, value } = e.target
    if (type === null)
      setValues({
        ...values,
        [name]:
          name === "tags"
            ? value.split(",").map((i) => i.replace(/\s/g, ""))
            : value,
      })
    else
      setValues({
        ...values,
        content: values.content.map((item, index) => {
          if (index === id) item[name] = value
          return item
        }),
      })
  }

  /* Check if images presented in Base64 & uploads it to hosting */
  const convertImages = async (data) => {
    try {
      if (data.preview !== null && data.preview.slice(0, 4) !== "http")
        data.preview = await uploadImage(data.preview, data.id)

      const content = await Promise.all(
        data.content.map(async (item) => {
          if (
            item.type === "image" &&
            item.url !== null &&
            item.url.slice(0, 4) !== "http"
          ) {
            const res = await uploadImage(item.url, data.id)
            item.url = res
          }
          return item
        })
      )
      return { ...data, content: content }
    } catch (error) {
      console.log(error)
    }
  }

  /* Posting article */
  const handleArticlePost = async (type = null) => {
    try {
      setIsLoading(true)
      const data = match.params.id === "new" ? { ...values } : { ...values }
      const coverted = await convertImages(data)

      const response = await axios({
        method: "post",
        url: `${config.API}/articles`,
        responseType: "json",
        data: {
          ...coverted,
          published: type === "publish" ? true : false,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIsLoading(false)

      if (response.status === 200 && type === "publish")
        history.push(`/article/${response.data.id}`)
      else history.push(`/edit/${response.data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  /* Editing article */
  const handleArticlePatch = async (type = null) => {
    try {
      setIsLoading(true)
      const published =
        type === "publish"
          ? true
          : type === "unpublish"
          ? false
          : values.published

      const data = { ...values, published: published }
      const converted = await convertImages(data)

      await axios({
        method: "put",
        url: `${config.API}/articles/id/${values.id}`,
        responseType: "json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: converted,
      })
      setValues(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  /* Upload image to hosting */
  const uploadImage = (img, id) => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/xaazias/image/upload/",
        responseType: "json",
        data: {
          file: img,
          folder: "assets",
          upload_preset: "h60h18dh",
        },
      })
        .then((response) => {
          if (response.status === 200) resolve(response.data.secure_url)
        })
        .catch((error) => reject(error))
    })
  }

  const animations = {
    editContainer: {
      hidden: {
        opacity: 0,
        x: -100,
        y: 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
      },
    },
    previewContainer: {
      hidden: {
        opacity: 0,
        x: 100,
        y: 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
      },
    },
  }

  return (
    <main className="main">
      <Loading loading={isLoading} background="#fff" />
      <div className="container main__container">
        <div className="content-container content-container_article-edit">
          <motion.section
            className="content content_article-edit"
            variants={animations.editContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="data-input">
              <div className="data-input__container data-input__container_meta">
                <div
                  className="data-input__container_meta-container data-input__container_image stripe-background"
                  style={
                    values.preview === null
                      ? {}
                      : { backgroundImage: `url(${values.preview})` }
                  }
                >
                  {values.preview !== null && <div className="darken"></div>}
                  <ImageUploading
                    onChange={(img) => {
                      setValues({ ...values, preview: img[0].data_url })
                      setIsSaved(false)
                    }}
                    dataURLKey="data_url"
                    resolutionType="more"
                  >
                    {({ onImageUpload, dragProps }) =>
                      values.preview !== null ? (
                        <label
                          className="data-input__input-label data-input__input-label_active"
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <p>Изменить обложку</p>
                        </label>
                      ) : (
                        <label
                          className="data-input__input-label"
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <i className="ri-drag-drop-line"></i>
                          <p>Загрузить обложку (мин. 500x500)</p>
                        </label>
                      )
                    }
                  </ImageUploading>
                </div>
                <div className="data-input__container_meta-container">
                  <p className="data-input__title">Заголовок</p>
                  <input
                    type="text"
                    className="data-input__input data-input__input_title"
                    placeholder="Введите заголовок статьи"
                    name="title"
                    onChange={handleInputChange}
                    value={values.title}
                  />
                </div>
                <div className="data-input__container_meta-container">
                  <p className="data-input__title">Подзаголовок</p>
                  <input
                    type="text"
                    className="data-input__input data-input__input_subtitle"
                    placeholder="Введите подзаголовок статьи"
                    name="subtitle"
                    onChange={handleInputChange}
                    value={values.subtitle}
                  />
                </div>
                <div className="data-input__container_meta-container">
                  <p className="data-input__title">Категория</p>
                  <input
                    type="text"
                    className="data-input__input data-input__input_tags"
                    placeholder="Введите категорию статьи"
                    name="tags"
                    onChange={handleInputChange}
                    value={values.tags.join(", ")}
                  />
                </div>
                {values.content.map((item, index) =>
                  item.type === "text" ? (
                    <EditArticleText
                      key={index}
                      id={index}
                      {...{ handleInputChange, values, setValues }}
                    />
                  ) : item.type === "quote" ? (
                    <EditArticleQuote
                      key={index}
                      id={index}
                      {...{ handleInputChange, values, setValues }}
                    />
                  ) : item.type === "link" ? (
                    <EditArticleLink
                      key={index}
                      id={index}
                      {...{ handleInputChange, values, setValues }}
                    />
                  ) : item.type === "image" ? (
                    <EditArticleImage
                      key={index}
                      id={index}
                      {...{
                        handleInputChange,
                        values,
                        setValues,
                        setIsSaved,
                        uploadImage,
                      }}
                    />
                  ) : item.type === "video" ? (
                    <EditArticleVideo
                      key={index}
                      id={index}
                      {...{ handleInputChange, values, setValues }}
                    />
                  ) : null
                )}
              </div>
              <div className="data-input__instruments">
                <div
                  className="data-input__instruments-item"
                  onClick={() =>
                    setValues({
                      ...values,
                      content: [...values.content, { type: "text", value: "" }],
                    })
                  }
                >
                  <i className="ri-text"></i>
                </div>
                <div
                  className="data-input__instruments-item"
                  onClick={() =>
                    setValues({
                      ...values,
                      content: [
                        ...values.content,
                        { type: "quote", value: "" },
                      ],
                    })
                  }
                >
                  <i className="ri-double-quotes-l"></i>
                </div>
                <div
                  className="data-input__instruments-item"
                  onClick={() =>
                    setValues({
                      ...values,
                      content: [
                        ...values.content,
                        { type: "image", url: null },
                      ],
                    })
                  }
                >
                  <i className="ri-image-fill"></i>
                </div>
                <div
                  className="data-input__instruments-item"
                  onClick={() =>
                    setValues({
                      ...values,
                      content: [
                        ...values.content,
                        { type: "link", value: "", url: "" },
                      ],
                    })
                  }
                >
                  <i className="ri-external-link-line"></i>
                </div>
                <div
                  className="data-input__instruments-item"
                  onClick={() =>
                    setValues({
                      ...values,
                      content: [...values.content, { type: "video", url: "" }],
                    })
                  }
                >
                  <i className="ri-live-line"></i>
                </div>
              </div>
              <div className="data-input__action">
                <div className="data-input__action-buttons">
                  <button
                    className="data-input__action-buttons_btn data-input__action-buttons_publish"
                    onClick={
                      match.params.id === "new"
                        ? () => handleArticlePost("publish")
                        : isSaved === true
                        ? null
                        : () => {
                            handleArticlePatch()
                            setIsSaved(true)
                          }
                    }
                  >
                    {match.params.id === "new"
                      ? "Опубликовать"
                      : isSaved === true
                      ? "Изменения сохранены"
                      : "Сохранить изменения"}
                  </button>
                  <button
                    className="data-input__action-buttons_btn data-input__action-buttons_save"
                    onClick={
                      match.params.id === "new"
                        ? () => handleArticlePost()
                        : values.published
                        ? () => handleArticlePatch("unpublish")
                        : () => handleArticlePatch("publish")
                    }
                  >
                    {match.params.id === "new"
                      ? "Сохранить черновик"
                      : values.published
                      ? "Снять с публикации"
                      : "Опубликовать"}
                  </button>
                </div>
                <button
                  className="data-input__action-buttons_btn data-input__action-buttons_delete"
                  onClick={() => history.push("/editor")}
                >
                  Назад
                </button>
              </div>
            </div>
          </motion.section>

          {/* Preview Article */}
          <motion.section
            className="content content_overview"
            variants={animations.previewContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="article-info article-info_overview">
              <div className="meta-info">
                <p className="publication-time">
                  {values.updatedAt
                    ? getPublicationTime(new Date(values.updatedAt))
                    : getPublicationTime(currentTime)}
                </p>
                <ul className="list">
                  <li className="list-item meta-info__tag-item">
                    {values.tags.length === 0
                      ? "Категория"
                      : values.tags.slice(0, 1)}
                  </li>
                </ul>
              </div>
              <h2 className="article-title article-title_overview">
                {values.title}
              </h2>
              <p className="article-subtitle article-subtitle_overview">
                {values.subtitle}
              </p>
              <div
                className="article-image stripe-background"
                style={
                  values.preview === null
                    ? {}
                    : { background: `url(${values.preview})` }
                }
              ></div>
              {values.content.map((item, index) =>
                item.type === "text" ? (
                  <ArticleText key={index} value={item.value} />
                ) : item.type === "quote" ? (
                  <ArticleQuote key={index} value={item.value} />
                ) : item.type === "link" ? (
                  <ArticleLink key={index} value={item.value} url={item.url} />
                ) : item.type === "image" ? (
                  <ArticleImage key={index} url={item.url} />
                ) : item.type === "video" ? (
                  <ArticleVideo key={index} url={item.url} />
                ) : null
              )}
              <div className="article-author">
                <p className="article-author__text">Автор статьи • {user}</p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  )
}

export default EditArticleContent
