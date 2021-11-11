import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"

function HeaderSearch() {
  const location = useLocation()
  const history = useHistory()
  const [searchQuery, setSearchQuery] = useState(null)
  const [loc] = useState(location.pathname.slice(1).split("/")[0])

  /* Header search */
  const handleOnChange = (e) => {
    const { value } = e.target
    setSearchQuery(value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        searchQuery !== null
          ? history.push(`?search=${searchQuery}`)
          : history.push(`?`),
      300
    )
    return () => clearTimeout(timeoutId)
  }, [searchQuery, history])

  return loc === "editor" || loc === "" ? (
    <>
      <input
        className="category-bar__search"
        type="text"
        placeholder="Поиск новостей"
        onChange={handleOnChange}
      />
      <i className="ri-search-line"></i>
    </>
  ) : null
}

export default HeaderSearch
