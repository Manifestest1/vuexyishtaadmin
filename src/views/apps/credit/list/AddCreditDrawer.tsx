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
  label: string
  value: string
  credit: string
}

type Props = {
  open: boolean
  resetForm: () => void
  handleClose: () => void
  addCreditDrawerFun: () => void
}

const AddCreditDrawer = ({ open, handleClose, addCreditDrawerFun }: Props) => {
  // States
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      label: '',
      value: '',
      credit: ''
    }
  })

  const onSubmit = (data: FormValues) => {
    handleClose()
    console.log(data) // This will log your form data
    addCreditDrawerFun(data.label, data.value, data.credit, resetForm)
  }

  const resetForm = () => {
    reset({
      label: '',
      value: '',
      credit: ''
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
            name='label'
            control={control}
            defaultValue=''
            rules={{ required: 'Label Name is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Label'
                fullWidth
                placeholder='Enter Label'
                error={!!errors.label}
                helperText={errors.label ? errors.label.message : ''}
              />
            )}
          />
          <Controller
            name='value'
            control={control}
            defaultValue=''
            rules={{ required: 'Value is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Value'
                fullWidth
                placeholder='Enter Value'
                error={!!errors.value}
                helperText={errors.value ? errors.value.message : ''}
              />
            )}
          />

         <Controller
            name='credit'
            control={control}
            defaultValue=''
            rules={{ required: 'Credit is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Credit'
                fullWidth
                placeholder='Enter credit'
                error={!!errors.credit}
                helperText={errors.credit ? errors.credit.message : ''}
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

export default AddCreditDrawer
