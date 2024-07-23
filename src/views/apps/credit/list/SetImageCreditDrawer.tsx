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
  image_credit: string
}

type Props = {
  open: boolean
  resetForm: () => void
  handleClose: () => void
  setCreditDrawerFun: () => void
}

const SetImageCreditDrawer = ({ open, handleClose, setCreditDrawerFun }: Props) => {
  // States
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      image_credit: ''
    }
  })

  const onSubmit = (data: FormValues) => {
    handleClose()
    console.log(data) // This will log your form data
    setCreditDrawerFun(data.image_credit, resetForm) 
  }

  const resetForm = () => {
    reset({
      image_credit: ''
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
        <Typography variant='h5'>Add Credit</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

         <Controller
            name='image_credit'
            control={control}
            defaultValue=''
            rules={{ required: 'Credit is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Credit'
                fullWidth
                placeholder='Enter credit'
                error={!!errors.image_credit}
                helperText={errors.image_credit ? errors.image_credit.message : ''}
              />
            )}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Save
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

export default SetImageCreditDrawer
