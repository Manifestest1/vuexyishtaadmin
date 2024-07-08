// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  defaultCategoryId: string
  resetForm: () => void
  handleClose: () => void
  addFilterDataDrawer: (formData: FormData) => void
  setCategory: string
  setAllFiltersCategory: () => void
}

const AddFilterDrawer = ({
  open,
  addFilterDataDrawer,
  handleClose,
  defaultCategoryId,
  setAllFiltersCategory,
  setCategory
}: Props) => {
  // States
  const [formData, setFormData] = useState({
    categoryId: defaultCategoryId,
    sub_category: '',
    api_key: '',
    image: ''
  })

  const [error, setError] = useState(false)

  useEffect(() => {
    setAllFiltersCategory()
  }, [])

  useEffect(() => {
    resetForm()
  }, [defaultCategoryId])

  const resetForm = () => {
    setFormData({
      categoryId: defaultCategoryId,
      sub_category: '',
      api_key: '',
      image: ''
    })
  }

  const handleCategoryChange = e => {
    console.log('Selected category ID:', e.target.value)
    setFormData({ ...formData, categoryId: e.target.value })
  }

  const handleFileChange = e => {
    setFormData({ ...formData, image: e.target.files[0] })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!formData.sub_category || !formData.image) {
      setError(true)

      return false
    } else {
      handleClose()
      setError(false)

      const data = new FormData()

      data.append('category_id', formData.categoryId)
      data.append('sub_category', formData.sub_category)
      data.append('api_key', formData.api_key)

      if (formData.image) {
        data.append('image', formData.image)
      }

      addFilterDataDrawer(data, resetForm)
    }
  }

  const handleReset = () => {
    handleClose()
    setError(false)
    setFormData({
      categoryId: defaultCategoryId,
      sub_category: '',
      api_key: '',
      image: ''
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add Filter</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            placeholder='Select Category'
            onChange={handleCategoryChange}
            value={formData.categoryId}
            label='Parent Category'
          >
            {setCategory &&
              setCategory.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
          </CustomTextField>

          <CustomTextField
            label='Title'
            fullWidth
            placeholder='Enter Title'
            value={formData.sub_category}
            onChange={e => setFormData({ ...formData, sub_category: e.target.value })}
          />

          {error && !formData.sub_category && <span className='input-error'>Please enter valid title.</span>}

          <CustomTextField
            label='Api Key'
            fullWidth
            placeholder='Enter Api Key'
            value={formData.api_key}
            onChange={e => setFormData({ ...formData, api_key: e.target.value })}
          />

          <CustomTextField label='Attachment' fullWidth onChange={handleFileChange} type='file' />

          {error && !formData.sub_category && <span className='input-error'>Please enter valid image.</span>}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Discard
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddFilterDrawer
