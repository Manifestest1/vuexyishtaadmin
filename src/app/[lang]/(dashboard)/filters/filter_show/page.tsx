"use client"

// ** MUI Imports
import { useState, useEffect } from 'react';

import { Grid, Card, Typography, Box, Button} from '@mui/material';

// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

// import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

import type { ThemeColor } from 'src/@core/layouts/types'

import {getAllFilters} from '../../../../../context/api/apiService';

// ** Types Imports

interface RowType {
  age: number
  name: string
  date: string
  email: string
  salary: string
  status: string
  designation: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}



const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const DashboardTable = () => {

  const [allFilterData, setFilterData] = useState(null);
  const image_base_path = 'http://localhost:8000/';

  useEffect(() => {
      const token = localStorage.getItem('token');

      if (token)
      {

              getAllFilters()
              .then(response => {
                  console.log(response.data,"Filter Data");
                  setFilterData(response.data.filters);

              })
              .catch((error) => {
                  if (error.response.status === 401)
                  {
                    // Handle unauthorized access
                  }
              });
      }

  }, []);

  return (
    <Card>
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Button variant="contained" component="label"  sx={{ mt: 4,mr:4, display: 'block', width:'140px',float:'right' }} >Add Category</Button>
            </Grid>
        </Grid>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Category Name.</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Filters</TableCell>
              <TableCell>Add Filter</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFilterData && allFilterData.map((data, index) => (
              <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{data.category_name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{data.order_no}</TableCell>
                <TableCell>
                {data.sub_categories.map((subCategory, index) => (
                      <span key={index} style={{justifyContent: 'center',borderRadius: '4px',padding: '20px',cursor: 'pointer',}}>
                        <img src={image_base_path+subCategory.image} alt="Uploaded Preview" width={20} height={20} style={{borderRadius:'50%',marginTop:'13px',marginRight:'12px'}} /><span>{subCategory.sub_category}</span>
                      </span>
                ))}
                </TableCell>
                <TableCell>
                    <Button variant="contained" component="label"  sx={{ mt: 2, display: 'block', width:'140px' }}>Add Filter</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Box For User Delete */}


    </Card>


  )
}

export default DashboardTable
