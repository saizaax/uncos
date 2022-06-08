import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { HeaderInfoLoader, HeaderProfileLoader } from "./HeaderContentLoaders"
import { HeaderInfoContext } from "./HeaderInfoContext"
import { AuthContext } from "../AuthContext"
import HeaderSignin from "./HeaderSignin"
import HeaderProfile from "./HeaderProfile"

import logo from "../../assets/svg/logo.svg"

/* Header info (currencies, weather) */
function HeaderInfo({ type }) {
  const { currenciesContext, weatherContext, dateContext } =
    useContext(HeaderInfoContext)
  const { userContext, loadingContext } = useContext(AuthContext)

  const [isLoading] = loadingContext
  const [user] = userContext
  const [currencies] = currenciesContext
  const [weatherTemp] = weatherContext
  const [currentDate] = dateContext

  const formatTime = (date) => ("0" + date).slice(-2)
  const time = `${formatTime(currentDate.getDate())}.${formatTime(
    currentDate.getMonth() + 1
  )}.${currentDate.getFullYear()}, ${formatTime(
    currentDate.getHours()
  )}:${formatTime(currentDate.getMinutes())}`

  return (
    <section className="info-section">
      <div
        className={
          type === "auth"
            ? "container info-section__container_login"
            : "container"
        }
      >
        <Link to="/">
          <img src={logo} alt="" className="info-section__logo" />
        </Link>
        {type === "article_edit" ? (
          <ul className="list info-section__list">
            <Link className="text-link" to="/">
              <li className="list-item info-section__list-item info-section__nav-item">
                На главную
              </li>
            </Link>
            <Link className="text-link" to="/editor">
              <li className="list-item info-section__list-item info-section__nav-item">
                Панель редактирования
              </li>
            </Link>
          </ul>
        ) : (
          <ul className="list info-section__list">
            {time && weatherTemp && currencies ? (
              <>
                <li className="list-item info-section__list-item">
                  {time}
                </li>
                <li className="list-item info-section__list-item">
                  Москва, {weatherTemp}°C
                </li>
              </>
            ) : (
              <li className="list-item info-section__list-item">
                <HeaderInfoLoader />
              </li>
            )}
          </ul>
        )}
        {type === "auth" ? null : user !== null ? (
          <HeaderProfile />
        ) : isLoading ? (
          <HeaderProfileLoader />
        ) : (
          <HeaderSignin />
        )}
      </div>
    </section>
  )
}

export default HeaderInfo
