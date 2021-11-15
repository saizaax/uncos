import React from "react"
import TextareaAutosize from "react-textarea-autosize"

function EditArticleText({ id, values, setValues, handleInputChange }) {
  const handleRemove = (id) => {
    setValues({
      ...values,
      content: values.content.filter((item, index) => index !== id),
    })
  }

  return (
    <div className="data-input__container_content-container">
      <TextareaAutosize
        className="data-input__textarea autoExpand"
        placeholder="Введите текст"
        name="value"
        onChange={(e) => handleInputChange(e, "content", id)}
        value={values.content[id].value}
      />
      <div className="data-input__delete-icon" onClick={() => handleRemove(id)}>
        <i className="ri-delete-bin-line"></i>
      </div>
    </div>
  )
}

export default EditArticleText
