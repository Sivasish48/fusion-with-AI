import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function ProtectedRoutes() {
 const user = null 

 return user ? <Outlet /> : <Navigate to="/dashboard" />
}
export default ProtectedRoutes