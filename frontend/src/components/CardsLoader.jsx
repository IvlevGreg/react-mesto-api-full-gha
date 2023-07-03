import ContentLoader from 'react-content-loader'

export const CardsLoader = (props) => (
  <ContentLoader
    speed={2}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#fffafa"
    foregroundColor="#201e1e"
    preserveAspectRatio="none"
    {...props}
  >
    <rect x="16" y="9" rx="2" ry="2" width="400" height="400" />
    <rect x="22" y="428" rx="0" ry="0" width="126" height="31" />
    <rect x="356" y="428" rx="0" ry="0" width="27" height="31" />
  </ContentLoader>
)
