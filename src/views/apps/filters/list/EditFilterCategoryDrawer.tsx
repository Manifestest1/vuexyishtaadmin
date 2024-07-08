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
  geteditCategoryData: string
  updateEditCategoryData: string
  updateFilterCategoryDataFun: (formData: FormData) => void
}

const EditFilterCategoryDrawer = ({
  open,
  addFilterDataDrawer,
  updateFilterCategoryDataFun,
  handleClose,
  defaultCategoryId,
  geteditCategoryData,
  updateEditCategoryData
}: Props) => {
  // States
  const [formData, setFormData] = useState({
    name: '',
    order_no: ''
  })

  const [error, setError] = useState(false)

  useEffect(() => {
    resetForm()
  }, [defaultCategoryId])

  const resetForm = () => {
    setFormData({
      name: '',
      order_no: ''
    })
  }

  // const handleSubmit = e => {
  //   e.preventDefault()

  //   handleClose()
  //   setError(false)

  //   const data = new FormData()

  //   data.append('category_id', formData.categoryId)
  //   data.append('sub_category', formData.sub_category)

  //   addFilterDataDrawer(data, resetForm)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    updateFilterCategoryDataFun({
      name: geteditCategoryData.name,
      order_no: geteditCategoryData.order_no,
      cat_id: geteditCategoryData.id
    })
    handleClose()
  }

  const handleReset = () => {
    handleClose()
    setError(false)
    setFormData({
      name: '',
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
        <Typography variant='h5'>Edit Category</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Parent Category'
            fullWidth
            id='select-role'
            placeholder='Select Category'
            value={geteditCategoryData?.name || ''}
            onChange={e => updateEditCategoryData({ ...geteditCategoryData, name: e.target.value })}
          />

          <CustomTextField
            label='Position'
            fullWidth
            value={geteditCategoryData?.order_no || ''}
            placeholder='Enter Title'
            onChange={e => updateEditCategoryData({ ...geteditCategoryData, order_no: e.target.value })}
          />

          {error && !formData.sub_category && <span className='input-error'>Please enter valid title.</span>}

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Update
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

export default EditFilterCategoryDrawer
