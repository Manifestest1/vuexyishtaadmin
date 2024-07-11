// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import { useForm, Controller } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'

type FormValues = {
  categoryName: string
  categoryOrder: string
}

type Props = {
  open: boolean
  resetForm: () => void
  handleClose: () => void
  addFilterCategoryDrawerFun: () => void
}

const AddFilterCategoryDrawer = ({ open, handleClose, addFilterCategoryDrawerFun }: Props) => {
  // States
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      categoryName: '',
      categoryOrder: ''
    }
  })

  const onSubmit = (data: FormValues) => {
    handleClose()
    console.log(data) // This will log your form data
    addFilterCategoryDrawerFun(data.categoryName, data.categoryOrder, resetForm)
  }

  const resetForm = () => {
    reset({
      categoryName: '',
      categoryOrder: ''
    })
  }

  const handleReset = () => {
    handleClose()
    resetForm()
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          <Controller
            name='categoryName'
            control={control}
            defaultValue=''
            rules={{ required: 'Category Name is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Title'
                fullWidth
                placeholder='Enter Title'
                error={!!errors.categoryName}
                helperText={errors.categoryName ? errors.categoryName.message : ''}
              />
            )}
          />
          <Controller
            name='categoryOrder'
            control={control}
            defaultValue=''
            rules={{ required: 'Category Order is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Position'
                fullWidth
                placeholder='Enter Position'
                error={!!errors.categoryOrder}
                helperText={errors.categoryOrder ? errors.categoryOrder.message : ''}
              />
            )}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button variant='tonal' color='error' type='button' onClick={handleReset}>
              Discard
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddFilterCategoryDrawer
