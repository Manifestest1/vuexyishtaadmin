// Component Imports
import UserList from '@views/apps/filters/list'

const getData = async () => {
  // Vars
  const res = await fetch('http://localhost:8000/api/get_filters_data')

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  const data = res.json()

  console.log('Fetched data:', data); // Log data

return data;
}

const UserListApp = async () => {
  // Vars
  const data = await getData()

  return <UserList userData={data} />
}

export default UserListApp
