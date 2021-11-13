import React, { useState, useEffect, createContext } from "react"
import Cookies from "js-cookie"
import axios from "axios"

import config from "../config.json"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(Cookies.get("token"))
  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState(null)

  /* Check for Tokens in DB */
  useEffect(() => {
    if (token && Cookies.get("user")) {
      axios({
        method: "get",
        url: `${config.API}/auth/preauthorize`,
        responseType: "json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.data) {
          setRoles(response.data.map((item) => item.authority))
          setUser(Cookies.get("user"))
        }
      })
    } else setUser(null)
    setIsLoading(false)
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        tokenContext: [token, setToken],
        userContext: [user, setUser],
        roleContext: [roles, setRoles],
        loadingContext: [isLoading, setIsLoading],
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
