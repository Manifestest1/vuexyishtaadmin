// Component Imports
import CreditList from '@views/apps/credit/list'
import ProtectedRoute from '@/context/ProtectedRoute' 

const CreditListApp = async () => {
  return ( 
    <ProtectedRoute>
      <CreditList />
    </ProtectedRoute>
  )
}

export default CreditListApp
