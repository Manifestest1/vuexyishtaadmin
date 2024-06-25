// React Imports
import { useState,useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  resetForm: () => void
  handleClose: () => void
  addFilterCategoryDrawerFun: () => void
}

const AddFilterCategoryDrawer = ({ open, handleClose,addFilterCategoryDrawerFun}: Props) => {
  // States

  const [categoryName, setCategoryName] = useState(null);
  const [categoryOrder, setCategoryOrder] = useState(null);

  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setCategoryName(null);
    setCategoryOrder(null);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleClose()
    console.log(e,"Get For File");
    addFilterCategoryDrawerFun(categoryName, categoryOrder,resetForm);

  }

  const handleReset = () => {
    handleClose()
    resetForm();
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
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <CustomTextField
            label='Position'
            fullWidth
            placeholder='Enter Position'
            value={categoryOrder}
            onChange={(e) => setCategoryOrder(e.target.value)}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>Add</Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>Discard</Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddFilterCategoryDrawer
