import React, { useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthContext } from "./components/AuthContext"
import Main from "./components/Main"
import Auth from "./components/Auth"
import Article from "./components/Article/Article"
import Editor from "./components/Editor"
import EditArticle from "./components/EditArticle"
import Page404 from "./components/Page404"
import Users from "./components/Users"

/* Application Routes */
function Routes() {
  const { userContext, roleContext } = useContext(AuthContext)
  const [user] = userContext
  const [roles] = roleContext

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/auth" component={Auth} />
        <Route
          path="/editor"
          exact
          component={
            user === null ||
            (roles &&
              !(
                roles.includes("ROLE_MODERATOR") || roles.includes("ROLE_ADMIN")
              ))
              ? Main
              : Editor
          }
        />
        <Route
          path="/editor/:category"
          exact
          component={
            user === null ||
            (roles &&
              !(
                roles.includes("ROLE_MODERATOR") || roles.includes("ROLE_ADMIN")
              ))
              ? Main
              : Editor
          }
        />
        <Route path="/article/:id" exact component={Article} />
        <Route
          path="/edit/:id"
          exact
          component={
            user === null ||
            (roles &&
              !(
                roles.includes("ROLE_MODERATOR") || roles.includes("ROLE_ADMIN")
              ))
              ? Main
              : EditArticle
          }
        />
        <Route
          path="/users"
          exact
          component={
            user === null || (roles && roles.includes("ROLE_ADMIN"))
              ? Users
              : Editor
          }
        />
        <Route path="/:category" exact component={Main} />
        <Route component={Page404} />
      </Switch>
    </Router>
  )
}

export default Routes
