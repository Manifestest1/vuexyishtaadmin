import React, { useEffect, useState } from 'react'

// Next Imports
// import { useParams } from 'next/navigation'

import Checkbox from '@mui/material/Checkbox'

import { useTheme } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination' 
import MenuItem from '@mui/material/MenuItem'

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
import AddFilterCategoryDrawer from './AddFilterCategoryDrawer'
import AddFilterDrawer from './AddFilterDrawer'
import EditFilterCategoryDrawer from './EditFilterCategoryDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import {
  getAllFilters,
  addFiltersData,
  addFiltersCategory,
  getFiltersCategory,
  filterDelete,
  filterCategoryEdit,
  filterCategoryDelete,
  updateFilterCategoryData,
  image_base_path
} from '@/context/api/apiService'

const columnHelper = createColumnHelper()

const FilterListTableData = () => {
  const theme = useTheme()

  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [addFilterDrawerOpen, setaddFilterDrawerOpen] = useState(false)
  const [category_id, setCategory_id] = useState(null)

  const [editCategoryData, setEditCategoryData] = useState({ name: '', order_no: '' })

  const [editFilterDrawerOpen, seteditFilterDrawerOpen] = useState(false)

  const [allCategory, setAllCategory] = useState(null)

  const [allFilterData, setFilterData] = useState([])

  const [open, setOpen] = useState(false)
  const [selectedFilterCatId, setSelectedFilterCatId] = useState(null)

  const getAllFiltersApiFun = () => {
    getAllFilters()
      .then(response => {
        console.log(response.data, 'Filter Data')
        setFilterData(response.data.filters)
      })
      .catch(error => {
        if (error.response.status === 401) {
          // Handle unauthorized access
        }
      })
  }

  const getAllFiltersCategory = () => {
    getFiltersCategory()
      .then(response => {
        console.log(response.data, 'Get All Category Api')
        setAllCategory(response.data)
      })
      .catch(error => {
        if (error.response.status === 401) {
          // Handle unauthorized access
        }
      })
  }

  useEffect(() => {
    getAllFiltersApiFun() 
  }, [])

  const handleAddFilters = (formData, resetForm) => {
    addFiltersData(formData)
      .then(response => {
        console.log(response, 'Filter Data Added')
        getAllFiltersApiFun()
        resetForm()
      })
      .catch(error => {})
  }

  const handleAddFiltersCategory = (name, order_no, resetForm) => {
    addFiltersCategory(name, order_no)
      .then(response => {
        console.log(response, 'Filter Category')
        getAllFiltersCategory()
        getAllFiltersApiFun()
        resetForm()
      })
      .catch(error => {})
  }

  const handleEditFilters = (formData, resetForm) => {
    addFiltersData(formData)
      .then(response => {
        console.log(response, 'Filter Data Added')
        getAllFiltersApiFun()
        resetForm()
      })
      .catch(error => {})
  }

  const toggleAddFilterDrawer = categoryId => {
    console.log('catergory id', categoryId)
    setaddFilterDrawerOpen(!addFilterDrawerOpen)
    setCategory_id(categoryId) // Set the category_id before opening the drawer
  }

  const toggleEditFilterCategoryDrawer = categoryId => {
    filterCategoryEdit(categoryId)
      .then(response => {
        console.log(response.data.filter_cat_data, 'Filter Category Data get')
        setEditCategoryData(response.data.filter_cat_data)
        seteditFilterDrawerOpen(!editFilterDrawerOpen)
        setCategory_id(categoryId)
      })
      .catch(error => {})

    // Set the category_id before opening the drawer
  }

  const handleCloseDrawer = () => {
    setaddFilterDrawerOpen(false)
  }

  const handleCloseEditFilterDrawer = () => {
    seteditFilterDrawerOpen(false)
  }

  const handleupdateEditFilterCategoryDataFun = formData => {
    updateFilterCategoryData(formData).then(response => {
      console.log(response, 'User Update')
      getAllFiltersApiFun()
    })
  }

  const handleClickFilterDelete = filterId => {
    filterDelete(filterId)
      .then(response => {
        getAllFiltersApiFun()
        console.log(response, 'Filter Category')
      })
      .catch(error => {})
    console.log(filterId, 'Sub Filter Id')
  }

  const handleClickFCDelete = filtercatid => {
    setSelectedFilterCatId(filtercatid)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedFilterCatId(null)
  }

  const handleConfirmFilterCatDelete = async () => {
    filterCategoryDelete(selectedFilterCatId)
      .then(response => {
        getAllFiltersApiFun()
        handleClose()
      })
      .catch(error => {})
  }

  const columns = [
    columnHelper.accessor('checkbox', {
      header: () => <Checkbox />,
      cell: () => <Checkbox />
    }),
    columnHelper.accessor('name', {
      header: () => 'CATEGORY NAME',
      cell: info => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography>
        </Box>
      )
    }),
    columnHelper.accessor('order_no', {
      header: () => 'POSITION',
      cell: info => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography>
        </Box>
      )
    }),
    columnHelper.accessor('sub_categories', {
      header: () => 'FILTERS',
      cell: info => (
        <div style={{ maxWidth: '400px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {info.getValue().map((subCategory, index) => (
              <Box
                key={index}
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
                  src={image_base_path() + subCategory.image}
                  alt='Uploaded Preview'
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    marginRight: '12px'
                  }}
                />
                <Typography variant='body2' sx={{ marginRight: '8px' }}>
                  {subCategory.filter}
                </Typography>
                <IconButton aria-label='status' onClick={() => handleClickFilterDelete(subCategory.id)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </div>
        </div>
      )
    }),
    columnHelper.accessor('id', {
      header: () => 'ADD FILTER',
      cell: info => (
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={() => toggleAddFilterDrawer(info.getValue())}
          className='is-full sm:is-auto'
        >
          Add Filter
        </Button>
      )
    }),

    columnHelper.accessor('id', {
      header: () => 'Action',
      cell: info => (
        <div className='flex items-center'>
          <IconButton onClick={() => toggleEditFilterCategoryDrawer(info.getValue())}>
            <i className='tabler-edit text-[22px] text-textSecondary' />
          </IconButton>
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
          <TextField placeholder='Search Filter' className='is-full sm:is-auto' />

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

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='is-full sm:is-auto'
            >
              Add Category
            </Button>
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
      <AddFilterCategoryDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        addFilterCategoryDrawerFun={handleAddFiltersCategory}
      />

      <AddFilterDrawer
        open={addFilterDrawerOpen}
        defaultCategoryId={category_id} // Pass category_id as a prop
        addFilterDataDrawer={handleAddFilters}
        handleClose={handleCloseDrawer}
        setAllFiltersCategory={getAllFiltersCategory}
        setCategory={allCategory}
      />

      <EditFilterCategoryDrawer
        open={editFilterDrawerOpen}
        defaultCategoryId={category_id} // Pass category_id as a prop
        addFilterDataDrawer={handleEditFilters}
        handleClose={handleCloseEditFilterDrawer}
        geteditCategoryData={editCategoryData}
        updateEditCategoryData={setEditCategoryData}
        updateFilterCategoryDataFun={handleupdateEditFilterCategoryDataFun}
      />

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

export default FilterListTableData
