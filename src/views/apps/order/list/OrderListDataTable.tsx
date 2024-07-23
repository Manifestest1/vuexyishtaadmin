import React, { useEffect, useState } from 'react'

// Next Imports
// import { useParams } from 'next/navigation'

import Checkbox from '@mui/material/Checkbox'

import { useTheme } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import { format } from 'date-fns'

import {
  Table,
  TableHead,
  TableRow, 
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  TableContainer,
  Avatar,
  Card
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

// Third-party Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'

// Type Imports

import Dialog from '@mui/material/Dialog'

import DialogActions from '@mui/material/DialogActions'

import DialogContent from '@mui/material/DialogContent'

import DialogContentText from '@mui/material/DialogContentText'

import DialogTitle from '@mui/material/DialogTitle'

// Component Imports
// import AddFilterCategoryDrawer from './AddFilterCategoryDrawer'
import AddCreditDrawer from './AddCreditDrawer'
import EditCreditDrawer from './EditCreditDrawer'
import SetImageCreditDrawer from './SetImageCreditDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import {
  getAllOrders,
  getAllCredit,
  addCreditData,
  setCreditData,
  creditDataDelete,
  CreditEditData,
  updateCreditData,
  addFiltersData,
} from '@/context/api/apiService'

const columnHelper = createColumnHelper()

const OrderListDataTable = () => {
  const theme = useTheme()

  // States
  const [addCreditOpen, setAddCreditOpen] = useState(false)
  const [imageCreditOpen, setImageCreditOpen] = useState(false)
  const [credit_id, setCredit_id] = useState(null)

  const [editCreditData, setEditCreditData] = useState({ name: '', order_no: '' })

  const [editCreditDrawerOpen, seteditCreditDrawerOpen] = useState(false) 

  const [allFilterData, setFilterData] = useState([])

  const [open, setOpen] = useState(false)
  const [selectedFilterCatId, setSelectedFilterCatId] = useState(null)

  const getAllCreditApiFun = () => {
    getAllOrders()
      .then(response => {
        console.log(response.data, 'Orders Data')
        setFilterData(response.data)
      })
      .catch(error => {
        if (error.response.status === 401) {
          // Handle unauthorized access
        }
      })
  }



  useEffect(() => {
    getAllCreditApiFun() 
  }, [])

  const handleAddCreditDataFun = (label, value, credit, resetForm) => {
    addCreditData(label, value, credit)
      .then(response => {
        console.log(response, 'Filter Category')
        getAllCreditApiFun()
        resetForm()
      })
      .catch(error => {})
  }

  const handlesetCreditDataFun = (image_credit, resetForm) => {
    setCreditData(image_credit)
      .then(response => {
        console.log(response, 'Filter Category')
        resetForm()
      })
      .catch(error => {})
  }

  const handleEditFilters = (formData, resetForm) => {
    addFiltersData(formData)
      .then(response => {
        console.log(response, 'Filter Data Added')
        getAllCreditApiFun()
        resetForm()
      })
      .catch(error => {})
  }

  const toggleEditCreditDrawer = creditId => {
    CreditEditData(creditId)
      .then(response => {
        console.log(response.data.credit_edit_data, 'Credit Data get')
        setEditCreditData(response.data.credit_edit_data)
        seteditCreditDrawerOpen(!editCreditDrawerOpen)
        setCredit_id(creditId)
      })
      .catch(error => {})

    // Set the category_id before opening the drawer
  }

  const handleCloseEditCreditDrawer = () => {
    seteditCreditDrawerOpen(false)
  }

  const handleupdateEditCreditDataFun = formData => {
    updateCreditData(formData).then(response => {
      console.log(response, 'User Update')
      getAllCreditApiFun()
    })
  }

  const handleClickFCDelete = creditid => {
    setSelectedFilterCatId(creditid)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedFilterCatId(null)
  }

  const handleConfirmFilterCatDelete = async () => {
    creditDataDelete(selectedFilterCatId)
      .then(response => {
        getAllCreditApiFun()
        handleClose()
      })
      .catch(error => {})
  }

  const columns = [
    columnHelper.accessor('checkbox', {
      header: () => <Checkbox />,
      cell: () => <Checkbox />
    }),
    columnHelper.accessor('order_id', {
      header: () => 'ORDER',
      cell: info => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography>
        </Box>
      )
    }),

    columnHelper.accessor('createdAt', {
      header: () => 'DATE', 
      cell: info => format(new Date(info.getValue()), 'yyyy-MM-dd')
    }),

    // columnHelper.accessor('filters', {
    //     header: () => 'FILTERS',
    //     cell: info => (
    //       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //         {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography> */}
    //         <span><img src='/images/avatars/1.png' alt='Static Image' height={40} width={40} style={{marginRight:'5px',borderRadius:'50%'}}/>test</span>
    //       </Box>
    //     )
    //   }),

      columnHelper.accessor('filters', {
        header: () => 'FILTERS',
        cell: info => (
          <div style={{ maxWidth: '400px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '5px',
                    padding: '5px',
                    cursor: 'pointer',
                    backgroundColor: theme.palette.action.hover,
                    marginRight: '5px',
                    marginBottom: '5px',
                    maxWidth: 'calc(100% - 10px)',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover 
                    }
                  }}
                >
                  <Avatar
                    src='/images/avatars/1.png'
                    alt='Uploaded Preview'
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      marginRight: '12px'
                    }}
                  />
                  <Typography variant='body2' sx={{ marginRight: '8px' }}>
                    test
                  </Typography>
                  
                </Box>
            
            </div>
          </div>
        )
      }),

    columnHelper.accessor('results', {
        header: () => 'RESULTS',
        cell: info => (
          <Box sx={{ display: 'flex' }}>
            {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography> */}
            <img src='/images/avatars/1.png' alt='Static Image' height={40} width={40} style={{marginRight:'5px'}}/>
            <img src='/images/avatars/1.png' alt='Static Image' height={40} width={40} />
          </Box>
        )
      }),

    columnHelper.accessor('status', {
        header: () => 'STATUS',
        cell: info => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography> */}
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>Completed</Typography>
          </Box>
        )
      }),

    columnHelper.accessor('credits', {
        header: () => 'CREDITS',
        cell: info => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography> */}
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>50</Typography>
          </Box>
        )
      }),

    columnHelper.accessor('id', {
      header: () => 'Action',
      cell: info => (
        <div className='flex items-center'>
          {/* <IconButton onClick={() => toggleEditCreditDrawer(info.getValue())}>
            <i className='tabler-edit text-[22px] text-textSecondary' />
          </IconButton> */}
          <IconButton onClick={() => handleClickFCDelete(info.getValue())}>
            <i className='tabler-trash text-[22px] text-textSecondary' />
          </IconButton>
        </div>
      )
    })
  ]

  const table = useReactTable({
    data: allFilterData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <Card>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <TextField placeholder='Search Order' className='is-full sm:is-auto' />

          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='is-[70px]'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='25'>25</MenuItem>
              <MenuItem value='50'>50</MenuItem>
            </CustomTextField>

            {/* <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddCreditOpen(!addCreditOpen)}
              className='is-full sm:is-auto'
            >
              Add Credit
            </Button>

            <Button
              variant='contained'
            //   startIcon={<i className='tabler-plus' />}
              onClick={() => setImageCreditOpen(!imageCreditOpen)}
              className='is-full sm:is-auto'
            >
              Image Credit
            </Button> */}
          </div>
        </div>
        <div className='overflow-x-auto'>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'> 
              <TableHead>
                <TableRow>
                  {table.getHeaderGroups().map(headerGroup => (
                    <React.Fragment key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableCell key={header.id}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>
                      ))}
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component={() => <TablePaginationComponent table={table} />}
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => {
              table.setPageIndex(page)
            }}
          />
        </div>
      </Card>

      {/* <AddCreditDrawer
        open={addCreditOpen}
        handleClose={() => setAddCreditOpen(!addCreditOpen)}
        addCreditDrawerFun={handleAddCreditDataFun}
      />

        <SetImageCreditDrawer
        open={imageCreditOpen}
        handleClose={() => setImageCreditOpen(!imageCreditOpen)}
        setCreditDrawerFun={handlesetCreditDataFun}
      />

      <EditCreditDrawer
        open={editCreditDrawerOpen}
        defaultCreditId={credit_id} // Pass category_id as a prop
        handleClose={handleCloseEditCreditDrawer}
        geteditCreditData={editCreditData}
        updateEditCreditData={setEditCreditData}
        updateCreditDataFun={handleupdateEditCreditDataFun}
      /> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this filter category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmFilterCatDelete} color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OrderListDataTable
