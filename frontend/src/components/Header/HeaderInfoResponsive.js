import React, { useContext } from "react"

import { HeaderInfoContext } from "./HeaderInfoContext"
import { HeaderInfoLoader } from "./HeaderContentLoaders"

/* Header info (currencies, weather) for Mobile-layout */
function HeaderInfoResponsive() {
  const { currenciesContext, weatherContext, dateContext } =
    useContext(HeaderInfoContext)

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
    <section className="info-section info-section_xs">
      <ul className="list info-section__list">
        {time && weatherTemp && currencies ? (
          <>
            <li className="list-item info-section__list-item">
              <i className="ri-calendar-todo-line"></i> {time}
            </li>
            <li className="list-item info-section__list-item">
              <i className="ri-sun-cloudy-line"></i> Москва, {weatherTemp}°C
            </li>
            <li className="list-item info-section__list-item">
              <i className="ri-money-dollar-circle-line"></i> {currencies.usd}
            </li>
            <li className="list-item info-section__list-item">
              <i className="ri-money-euro-circle-line"></i> {currencies.eur}
            </li>
            <li className="list-item info-section__list-item">
              <i className="ri-bit-coin-line"></i> {currencies.btc} $
            </li>
          </>
        ) : (
          <li className="list-item info-section__list-item">
            <HeaderInfoLoader />
          </li>
        )}
      </ul>
    </section>
  )
}

export default HeaderInfoResponsive
