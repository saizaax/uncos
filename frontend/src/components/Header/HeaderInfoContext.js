import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const HeaderInfoContext = createContext()

export function HeaderInfoProvider(props) {
  /* Current USD/EUR/BTC Currencies & Moscow Weather Temperature */
  const [currencies, setCurrencies] = useState({
    usd: null,
    eur: null,
    btc: null,
  })
  const [weatherTemp, setWeatherTemp] = useState(null)

  useEffect(() => {
    const source = axios.CancelToken.source()

    /* USD & EUR */
    axios({
      method: "get",
      url: "https://www.cbr-xml-daily.ru/latest.js",
      responseType: "json",
      cancelToken: source.token,
    })
      .then((response) =>
        setCurrencies((prevState) => ({
          ...prevState,
          usd: (1 / response.data.rates.USD).toFixed(2),
          eur: (1 / response.data.rates.EUR).toFixed(2),
        }))
      )
      .catch((error) => !axios.isCancel(error) && console.log(error))

    /* BTC */
    axios({
      method: "get",
      url: "https://api.coinbase.com/v2/exchange-rates?currency=BTC",
      responseType: "json",
      cancelToken: source.token,
    })
      .then((response) =>
        setCurrencies((prevState) => ({
          ...prevState,
          btc: Number(response.data.data.rates.USD).toFixed(2),
        }))
      )
      .catch((error) => !axios.isCancel(error) && console.log(error))

    /* Moscow Weather */
    axios({
      method: "get",
      url: "http://api.openweathermap.org/data/2.5/weather?q=moscow&appid=178ae9a5a359aa5a542be240bd36bc59&units=metric",
      responseType: "json",
      cancelToken: source.token,
    })
      .then((response) =>
        setWeatherTemp(Math.round(response.data.main.feels_like))
      )
      .catch((error) => !axios.isCancel(error) && console.log(error))

    return () => {
      source.cancel()
    }
  }, [])

  /* Current Date & Time */
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 10000)
    return () => clearInterval(timer)
  })

  return (
    <HeaderInfoContext.Provider
      value={{
        currenciesContext: [currencies, setCurrencies],
        weatherContext: [weatherTemp, setWeatherTemp],
        dateContext: [currentDate, setCurrentDate],
      }}
    >
      {props.children}
    </HeaderInfoContext.Provider>
  )
}
