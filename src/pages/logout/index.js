import { useAuth } from 'src/hooks/useAuth'
import React, { useEffect } from 'react'

const index = () => {
  const { logout } = useAuth()
  useEffect(() => {
    logout()
  }, [])
  return <div></div>
}

export default index
