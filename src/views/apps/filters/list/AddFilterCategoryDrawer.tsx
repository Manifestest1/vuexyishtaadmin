// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { addFiltersCategory } from '@/context/api/apiService'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
}

type FormDataType = {
  title: string
  order_no: string
}

// Vars
const initialData = {
  title: '',
  order_no: ''
}

const AddFilterCategoryDrawer = ({ open, handleClose }: Props) => {
  // States
  const [formData, setFormData] = useState<FormDataType>(initialData)

  const [categoryName, setCategoryName] = useState('');
  const [categoryOrder, setCategoryOrder] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleClose()
    console.log(e,"Get For File");

    addFiltersCategory(categoryName, categoryOrder)
    .then(response => {
      console.log(response,"Category Added Succefully");
      setFormData(initialData);
    })
    .catch(error => {
      console.error('Error updating user status:', error);
    });

    setFormData(initialData)
  }

  const handleReset = () => {
    handleClose()
    setFormData({
      title: '',
      order_no: ''
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
        <Typography variant='h5'>Add Category</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Title'
            fullWidth
            placeholder='Enter Title'
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <CustomTextField
            label='Position'
            fullWidth
            placeholder='Enter Position'
            onChange={(e) => setCategoryOrder(e.target.value)}
          />

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

export default AddFilterCategoryDrawer
