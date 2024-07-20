import axios from '../../utils/axios'

export const image_base_path = () => {
  return 'http://localhost:8000/'
}

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

// Credit Api

export const getAllCredit = () => {
  return axios.get('/get_credits_data')
}

export const addCreditData = (label, value, credit) => {
  return axios.post('/add_credit_data', { label, value, credit })
}

export const setCreditData = (image_credit) => {
  return axios.post('/set_credit_image', { image_credit })
}

export const creditDataDelete = creditId => {
  return axios.put(`/credit-data/${creditId}/delete`)
}

export const CreditEditData = creditId => {
  return axios.put(`/credit-data/${creditId}/edit`)
}
export const updateCreditData = formData => {
  return axios.post('/credit_data_update', formData)
}
