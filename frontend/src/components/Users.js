import React, { useState, useEffect, useContext } from "react"
import axios from "axios"

import config from "../config.json"

import { AuthContext } from "./AuthContext"
import UsersContent from "./UsersContent"
import Header from "./Header/Header"
import Footer from "./Footer"

function Users() {
  const [users, setUsers] = useState(null)

  const { tokenContext } = useContext(AuthContext)
  const [token] = tokenContext

  useEffect(() => {
    axios({
      method: "get",
      url: `${config.API}/users?size=50`,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.data) {
        setUsers(response.data.content)
      }
    })
  }, [token])

  const deleteUser = (id) => {
    axios({
      method: "delete",
      url: `${config.API}/users/${id}`,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 200) setUsers(users.filter((i) => i.id !== id))
    })
  }

  return (
    <>
      <Header />
      <UsersContent users={users} deleteUser={deleteUser} />
      <Footer />
    </>
  )
}

export default Users
