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
  defaultCreditId: string
  resetForm: () => void
  handleClose: () => void
  geteditCreditData: string
  updateEditCreditData: string
  updateCreditDataFun: (formData: FormData) => void
}

const EditCreditDrawer = ({
  open,
  updateCreditDataFun,
  handleClose,
  defaultCreditId,
  geteditCreditData,
  updateEditCreditData
}: Props) => {
  // States
  const [formData, setFormData] = useState({ 
    label: '',
    value: '',
    credit: ''
  })

  const [error, setError] = useState(false)

  useEffect(() => {
    resetForm()
  }, [defaultCreditId])

  const resetForm = () => {
    setFormData({
      label: '',
      value: '',
      credit: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    updateCreditDataFun({
      label: geteditCreditData.label,
      value: geteditCreditData.value,
      credit: geteditCreditData.credit,
      credit_id: geteditCreditData.id
    })
    handleClose()
  }

  const handleReset = () => {
    handleClose()
    setError(false)
    setFormData({
      label: '',
      value: '',
      credit: ''
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
        <Typography variant='h5'>Edit Credit</Typography>
        <IconButton onClick={handleReset}>
          <i className='tabler-x text-textPrimary' /> 
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6'>
          <CustomTextField
            label='Label'
            fullWidth
            id='select-role'
            placeholder='Select Category'
            value={geteditCreditData?.label || ''}
            onChange={e => updateEditCreditData({ ...geteditCreditData, label: e.target.value })} 
          />

          <CustomTextField
            label='Value'
            fullWidth
            value={geteditCreditData?.value || ''}
            placeholder='Enter Title'
            onChange={e => updateEditCreditData({ ...geteditCreditData, value: e.target.value })}
          />

          <CustomTextField
            label='Credit'
            fullWidth
            value={geteditCreditData?.credit || ''}
            placeholder='Enter Title'
            onChange={e => updateEditCreditData({ ...geteditCreditData, credit: e.target.value })}
          />

          {error && !formData.filter && <span className='input-error'>Please enter valid title.</span>}

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

export default EditCreditDrawer
