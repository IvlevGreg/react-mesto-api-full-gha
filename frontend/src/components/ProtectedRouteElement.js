import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRouteElement = ({ children,userStatus, ...props }) => {
  if (userStatus === 'loading' || userStatus === 'initial') return children
  return props.loggedIn ? children : <Navigate to="/sign-in" replace />
}
