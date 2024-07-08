import { useContext, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import AuthContext from '../context/AuthContext'

const ProtectedLoginRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/en/dashboards/crm')
    }
  }, [loading, user, router])

  return children
}

export default ProtectedLoginRoute
