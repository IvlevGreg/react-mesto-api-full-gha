import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRouteElement = ({ children, ...props }) => {
  return props.loggedIn ? children : <Navigate to="/sign-in" replace />
}
