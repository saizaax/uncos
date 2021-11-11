import ContentLoader from "react-content-loader"

export const HeaderInfoLoader = () => (
  <ContentLoader style={{ maxHeight: "30px", maxWidth: "210px" }}>
    <rect x="0" y="0" rx="5" ry="5" width="210" height="25" />
  </ContentLoader>
)

export const HeaderProfileLoader = () => (
  <ContentLoader
    style={{ maxHeight: "30px", maxWidth: "80px", marginLeft: "auto" }}
  >
    <rect x="0" y="0" rx="5" ry="5" width="80" height="25" />
  </ContentLoader>
)
