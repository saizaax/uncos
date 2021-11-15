import React from "react"
import TextareaAutosize from "react-textarea-autosize"

function EditArticleQuote({ id, values, setValues, handleInputChange }) {
  const handleRemove = (id) => {
    setValues({
      ...values,
      content: values.content.filter((item, index) => index !== id),
    })
  }

  return (
    <div className="data-input__container_content-container">
      <div className="data-input__quote">
        <TextareaAutosize
          className="data-input__textarea autoExpand"
          placeholder="Введите текст цитаты"
          rows="1"
          name="value"
          onChange={(e) => handleInputChange(e, "content", id)}
          value={values.content[id].value}
        />
      </div>
      <div className="data-input__delete-icon" onClick={() => handleRemove(id)}>
        <i className="ri-delete-bin-line"></i>
      </div>
    </div>
  )
}

export default EditArticleQuote
