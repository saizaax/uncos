import React from "react"
import TextareaAutosize from "react-textarea-autosize"

function EditArticleLink({ id, values, setValues, handleInputChange }) {
  const handleRemove = (id) => {
    setValues({
      ...values,
      content: values.content.filter((item, index) => index !== id),
    })
  }

  return (
    <div className="data-input__container_content-container">
      <div className="data-input__link">
        <TextareaAutosize
          className="data-input__textarea data-input__textarea_link"
          placeholder="Введите название источника"
          rows="1"
          name="value"
          onChange={(e) => handleInputChange(e, "content", id)}
          value={values.content[id].value}
        />
        <TextareaAutosize
          className="data-input__textarea data-input__textarea_url"
          placeholder="Вставьте ссылку"
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

export default EditArticleLink
