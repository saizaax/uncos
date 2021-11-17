import React from "react"

import Header from "./Header/Header"
import MainContent from "./MainContent"
import Footer from "./Footer"

function Main(props) {
  return (
    <>
      <Header />
      <MainContent {...props} />
      <Footer />
    </>
  )
}

export default Main
