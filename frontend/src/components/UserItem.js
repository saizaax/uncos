import axios from "axios"
import React, { useContext, useState } from "react"

import config from "../config.json"

import { AuthContext } from "./AuthContext"

function UsersItem(props) {
  const { username, id, roles, deleteUser } = props

  const { tokenContext } = useContext(AuthContext)
  const [token] = tokenContext

  const [currentRoles, setCurrentRoles] = useState(roles)

  const changeRole = (e) => {
    const { value } = e.target

    if (currentRoles.includes(value) && currentRoles.length > 1) {
      postRoles(currentRoles.filter((i) => i !== value))
    } else {
      if (!currentRoles.includes(value)) {
        postRoles([...currentRoles, value])
      }
    }
  }

  const postRoles = (values) => {
    axios({
      method: "put",
      url: `${config.API}/users/${id}/roles`,
      responseType: "json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        role: values,
      },
    }).then((response) => {
      if (response.data) {
        setCurrentRoles(response.data.roles.map((i) => i.name))
      }
    })
  }

  return (
    <div className="users-item">
      <div className="user-info">
        <h3>{username}</h3>
        <p>{id}</p>
      </div>
      <div className="button-container">
        <button
          className={
            currentRoles.includes("ROLE_USER") ? "button-container_active" : ""
          }
          onClick={changeRole}
          value={"ROLE_USER"}
        >
          USER
        </button>
        <button
          className={
            currentRoles.includes("ROLE_MODERATOR")
              ? "button-container_active"
              : ""
          }
          onClick={changeRole}
          value={"ROLE_MODERATOR"}
        >
          MODERATOR
        </button>
        <button
          className={
            currentRoles.includes("ROLE_ADMIN") ? "button-container_active" : ""
          }
          onClick={changeRole}
          value={"ROLE_ADMIN"}
        >
          ADMIN
        </button>
        <button
          className="button-container_delete"
          onClick={() => deleteUser(id)}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

export default UsersItem
