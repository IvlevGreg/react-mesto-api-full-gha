import ContentLoader from 'react-content-loader'

export const UserLoader = (props) => (
  <ContentLoader
    speed={2}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#fffafa"
    foregroundColor="#201e1e"
    preserveAspectRatio="none"
    {...props}
  >
    <rect x="-9" y="74" rx="3" ry="3" width="414" height="16" />
    <rect x="-4" y="105" rx="3" ry="3" width="407" height="16" />
    <circle cx="215" cy="35" r="30" />
  </ContentLoader>
)
