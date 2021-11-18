import React from "react"
import { Link } from "react-router-dom"

function Page404() {
  return (
    <div className="page-404">
      <h1 className="page-404__title">Ошибка 404</h1>
      <p className="page-404__subtitle">Запрашиваемая страница не найдена</p>
      <Link to="/" className="page-404__link">
        <button className="page-404__btn">Вернуться на главную</button>
      </Link>
    </div>
  )
}

export default Page404
