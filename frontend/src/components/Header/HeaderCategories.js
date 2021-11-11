import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"

import HeaderSearch from "./HeaderSearch"

function HeaderCategories({ categories }) {
  const history = useHistory()
  const location = useLocation()
  const [menuState, setMenuState] = useState(false)

  /* Sorts articles by categories */
  const handleCategory = (name, index) => {
    if (
      location.pathname.length > 6 &&
      location.pathname.slice(0, 7) === "/editor"
    )
      index === 0 ? history.push("/editor") : history.push(`/editor/${name}`)
    else index === 0 ? history.push("/") : history.push(`/${name}`)
  }

  return (
    <section className="category-bar">
      <nav className="container category-bar__container">
        <ul
          className={
            menuState
              ? "list category-bar__list_active"
              : "list category-bar__list"
          }
        >
          {categories.map((item, index) => (
            <li
              className="list-item category-bar__list-item"
              key={index}
              onClick={() => handleCategory(item.name, index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <button
          className="category-bar__more-btn"
          onClick={() => setMenuState(!menuState)}
        >
          <i className={menuState ? "ri-close-fill" : "ri-menu-2-line"}></i>
        </button>
        <div className="category-bar__search-container">
          <HeaderSearch />
        </div>
      </nav>
    </section>
  )
}

export default HeaderCategories
