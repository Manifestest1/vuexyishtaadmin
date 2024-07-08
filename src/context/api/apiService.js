import axios from '../../utils/axios'

export const getAllUsers = () => {
  return axios.get('/get_all_users')
}

export const userStatusUpdate = (userId, newStatus) => {
  return axios.post('/user_status_update', { userId, newStatus })
}

export const userDelete = userId => {
  return axios.put(`/user/${userId}/delete`)
}

// Filters Api

export const addFiltersCategory = (name, order_no) => {
  return axios.post('/add_filters_category', { name, order_no })
}

export const getFiltersCategory = () => {
  return axios.get('/get_filters_category')
}

export const addFiltersData = formData => {
  return axios.post('/add_filters_data', formData)
}

export const getAllFilters = () => {
  return axios.get('/get_filters_data')
}

export const filterDelete = filterId => {
  return axios.put(`/filter/${filterId}/delete`)
}

export const filterCategoryEdit = filtercatId => {
  return axios.put(`/filter-category/${filtercatId}/edit`)
}

export const updateFilterCategoryData = formData => {
  return axios.post('/filter_category_update', formData)
}

export const filterCategoryDelete = filtercatId => {
  return axios.put(`/filter-category/${filtercatId}/delete`)
}
