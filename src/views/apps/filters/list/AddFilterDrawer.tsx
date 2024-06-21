 // React Imports
import { useState,useEffect } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { getFiltersCategory} from '@/context/api/apiService'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  updateFilterData: (formData: FormData) => void
}

type FormDataType = {
  fullName: string
  username: string
  email: string
  company: string
  country: string
  contact: string
  role: string
  plan: string
  status: string
}

// Vars
const initialData = {
  fullName: '',
  username: '',
  email: '',
  company: '',
  country: '',
  contact: '',
  role: '',
  plan: '',
  status: ''
}


const AddFilterDrawer = ({ open,updateFilterData, handleClose }: Props) => {



  // States
  const [formData, setFormData] = useState<FormDataType>(initialData)
  const [allCategory, setAllCategory] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  useEffect(() => {

    getFiltersCategory()
        .then(response => {
            console.log(response.data,"Get All Category Api");

            setAllCategory(response.data);

        })
        .catch((error) => {
            if (error.response.status === 401)
            {
              // Handle unauthorized access
            }
        });


}, []);

const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  const reader = new FileReader();
  const file = e.target.files?.[0];

  if (file)
  {
    reader.readAsDataURL(file);
    setUploadedImage(file);
  }
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleClose()
    setFormData(initialData)

    const formData = new FormData();

    formData.append('category_id', selectedCategory);
    formData.append('sub_category', subCategory);

    if(uploadedImage)
    {
      formData.append('image', uploadedImage);
    }


    updateFilterData(formData);
  }

    // Assuming you have an API service function to handle the upload
  //   try
  //   {
  //       addFiltersData(formData)
  //       .then(response => {
  //           console.log(response,"Filter Data Added");
  //           updateFilterData(response.data.add_filters_data);
  //       })
  //       .catch((error) => {
  //           if (error.response.status === 401)
  //           {
  //           // Handle unauthorized access
  //           }
  //       });

  //     // Handle success (e.g., show a success message, reset form, etc.)

  //   }
  //   catch (error)
  //   {
  //     // Handle error (e.g., show an error message)
  //   }
  // }

  const handleReset = () => {
    handleClose()
    setFormData({
      fullName: '',
      username: '',
      email: '',
      company: '',
      country: '',
      contact: '',
      role: '',
      plan: '',
      status: ''
    })
  }

  return (
    <Drawer open={open} anchor='right' variant='temporary' onClose={handleReset} ModalProps={{ keepMounted: true }}
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
            onChange={(e) => setSelectedCategory(e.target.value as string)}
            label='Parent Category'
          >
            {allCategory && allCategory.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}

          </CustomTextField>

          <CustomTextField
            label='Title'
            fullWidth
            placeholder='Enter Title'
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <CustomTextField
            label='Attachment'
            fullWidth
            placeholder='johndoe'
            onChange={onChange}
            type="file"
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

export default AddFilterDrawer
