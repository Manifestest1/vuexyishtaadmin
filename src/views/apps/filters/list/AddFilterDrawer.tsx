import { useState, useEffect } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useForm, Controller } from 'react-hook-form'

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [imageName, setImageName] = useState('')

  useEffect(() => {
    setAllFiltersCategory()
  }, [])

  useEffect(() => {
    resetForm()
  }, [defaultCategoryId])

  const resetForm = () => {
    reset({
      categoryId: defaultCategoryId, 
      filter: '',
      api_key: '',
      image: null
    })
  }

  const onSubmit = formData => {
    const data = new FormData()

    data.append('category_id', formData.categoryId)
    data.append('filter', formData.filter)
    data.append('api_key', formData.api_key)

    if (formData.image) {
      data.append('image', formData.image[0])
    }

    addFilterDataDrawer(data, resetForm)
    handleClose()
    setImageName('')
  }

  const handleFileChange = e => {
    const file = e.target.files[0]

    if (file) {
      setImageName(file.name) // Update the selected file name
    }
  }

  const handleReset = () => {
    setImageName('')
    resetForm()
    handleClose()
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          <Controller
            name='categoryId'
            control={control}
            defaultValue={defaultCategoryId}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-role'
                placeholder='Select Category'
                onChange={e => field.onChange(e.target.value)} 
                value={field.value}
                label='Parent Category'
              >
                {setCategory &&
                  setCategory.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='filter'
            control={control}
            defaultValue=''
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <CustomTextField
                label='Title'
                fullWidth
                placeholder='Enter Title'
                value={field.value}
                onChange={field.onChange}
                error={!!errors.filter}
                helperText={errors.filter ? errors.filter.message : ''}
              />
            )}
          />
          <Controller
            name='api_key'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <CustomTextField
                label='Api Key'
                fullWidth
                placeholder='Enter Api Key'
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {/* <Controller
            name='image'
            control={control}
            rules={{ required: 'Image is required' }}
            render={({ field }) => (
              <CustomTextField
                label='Attachment'
                fullWidth
                onChange={e => {
                  field.onChange(e.target.files)
                }}
                type='file'
                error={!!errors.image}
                helperText={errors.image ? errors.image.message : ''}
              />
            )}
          /> */}

          <Controller
            name='image'
            control={control}
            rules={{ required: 'Image is required' }}
            render={({ field }) => (
              <>
                <CustomTextField
                  label='Attachment'
                  fullWidth
                  type='file'
                  onChange={e => {
                    field.onChange(e.target.files)
                    handleFileChange(e) // Handle file change separately
                  }}
                  error={!!errors.image}
                  helperText={errors.image ? errors.image.message : ''}
                />
                {imageName && <p>Selected File: {imageName}</p>}
              </>
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

export default AddFilterDrawer
