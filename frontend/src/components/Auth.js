import React from "react"

import HeaderInfo from "./Header/HeaderInfo"
import HeaderInfoResponsive from "./Header/HeaderInfoResponsive"
import { HeaderInfoProvider } from "./Header/HeaderInfoContext"
import Login from "./Login"

function Auth() {
  return (
    <HeaderInfoProvider>
      <HeaderInfo type="auth" />
      <HeaderInfoResponsive />
      <main className="main">
        <section className="authorization">
          <Login />
        </section>
      </main>
    </HeaderInfoProvider>
  )
}

export default Auth
