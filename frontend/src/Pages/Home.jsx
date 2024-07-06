import React from 'react'
import { AuthData } from "../utils/AuthWrapper.jsx"
function Home() {
  const { user } = AuthData()
  return (
    
    <p>Home of Username: {user.name}</p>
  )
}

export default Home