import React, { useState } from "react"

import HeaderInfo from "./HeaderInfo"
import HeaderCategories from "./HeaderCategories"
import HeaderInfoResponsive from "./HeaderInfoResponsive"
import { HeaderInfoProvider } from "./HeaderInfoContext"
import HeaderSearchResponsive from "./HeaderSearchResponsive"
import { Categories } from "./Categories"

function Header({ type }) {
  const [categories] = useState(Categories)

  return (
    <HeaderInfoProvider>
      <header>
        <HeaderInfo type={type} />
        {type === "article_edit" ? null : (
          <HeaderCategories categories={categories} />
        )}
        <HeaderInfoResponsive type={type} />
        {type === "article_edit" ? null : <HeaderSearchResponsive />}
      </header>
    </HeaderInfoProvider>
  )
}

export default Header
