import React from "react"
import ImageUploading from "react-images-uploading"

function EditArticleImage({ id, values, setValues, setIsSaved, uploadImage }) {
  const handleRemove = (id) => {
    setValues({
      ...values,
      content: values.content.filter((item, index) => index !== id),
    })
  }

  return (
    <div
      className={
        values.content[id].url === null
          ? "data-input__container_content-container stripe-background"
          : "data-input__container_content-container"
      }
    >
      <div
        className="data-input__image"
        style={
          values.content[id].url === null
            ? {}
            : { backgroundImage: `url(${values.content[id].url})` }
        }
      >
        {values.content[id].url !== null && <div className="darken"></div>}
        <ImageUploading
          onChange={(img) => {
            setValues({
              ...values,
              content: values.content.map((item, index) => {
                if (index === id) item.url = img[0].data_url
                return item
              }),
            })
            setIsSaved(false)
          }}
          dataURLKey="data_url"
          resolutionType="more"
          resolutionHeight="500"
          resolutionWidth="500"
        >
          {({ onImageUpload, dragProps }) =>
            values.content[id].url !== null ? (
              <label
                className="data-input__input-label data-input__input-label_active"
                onClick={onImageUpload}
                {...dragProps}
              >
                <p>Изменить изображение</p>
              </label>
            ) : (
              <label
                className="data-input__input-label"
                onClick={onImageUpload}
                {...dragProps}
              >
                <i className="ri-drag-drop-line"></i>
                <p>Загрузить изображение (мин. 500x500)</p>
              </label>
            )
          }
        </ImageUploading>
      </div>
      <div className="data-input__delete-icon" onClick={() => handleRemove(id)}>
        <i className="ri-delete-bin-line"></i>
      </div>
    </div>
  )
}

export default EditArticleImage
