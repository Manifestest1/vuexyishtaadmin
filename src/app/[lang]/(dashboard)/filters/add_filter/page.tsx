"use Client"
// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports

import Filterscategoryform from '@/views/filters/add_filter'





const AddFilterCategory = async () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12}>
        <Filterscategoryform />
      </Grid>
    </Grid>
  )
}

export default AddFilterCategory
