import React from "react"
import UsersItem from "./UserItem"

function UsersContent({ users, deleteUser }) {
  return (
    <main className="main">
      <div className="container users-container">
        {users !== null
          ? users.map((user) => (
              <UsersItem
                key={user.id}
                username={user.username}
                id={user.id}
                roles={user.roles.map((i) => i.name)}
                deleteUser={deleteUser}
              ></UsersItem>
            ))
          : null}
      </div>
    </main>
  )
}

export default UsersContent
