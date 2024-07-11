// Component Imports
import FilterList from '@views/apps/filters/list'
import ProtectedRoute from '@/context/ProtectedRoute'

const UserListApp = async () => {
  return (
    <ProtectedRoute>
      <FilterList />
    </ProtectedRoute>
  )
}

export default UserListApp
