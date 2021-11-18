import React from "react"

function NothingFound() {
  return (
    <section className="content">
      <div className="article-container">
        <h1 style={{ margin: "0 10px" }}>
          По вашему запросу ничего не найдено :(
        </h1>
      </div>
      <img
        alt=""
        src="https://media.tenor.com/images/10d3c44528017cd627b9f0fd8c36538c/tenor.gif"
        style={{
          maxWidth: "100%",
          height: "360px",
          maxHeight: "100%",
          position: "relative",
          top: "25px",
        }}
      />
    </section>
  )
}

export default NothingFound
