import React from "react"
import TextareaAutosize from "react-textarea-autosize"

function EditArticleVideo({ id, values, setValues, handleInputChange }) {
  const handleRemove = (id) => {
    setValues({
      ...values,
      content: values.content.filter((item, index) => index !== id),
    })
  }

  return (
    <div className="data-input__container_content-container">
      <div className="data-input__video">
        <TextareaAutosize
          className="data-input__textarea data-input__textarea_video"
          placeholder="Вставьте ссылку на YouTube видео"
          rows="1"
          name="url"
          onChange={(e) => handleInputChange(e, "content", id)}
          value={values.content[id].url}
        />
      </div>
      <div className="data-input__delete-icon" onClick={() => handleRemove(id)}>
        <i className="ri-delete-bin-line"></i>
      </div>
    </div>
  )
}

export default EditArticleVideo
