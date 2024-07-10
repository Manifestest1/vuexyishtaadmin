import React, { useState, useEffect, useMemo } from 'react'

import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  getPaginationRowModel
} from '@tanstack/react-table'
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
  TablePagination,
  Card
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { format } from 'date-fns'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import CustomTextField from '@core/components/mui/TextField'

import TablePaginationComponent from '@components/TablePaginationComponent'

import { userStatusUpdate, getAllUsers, userDelete } from '@/context/api/apiService'

const columnHelper = createColumnHelper()

const UserListDataTable = () => {
  const [open, setOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [alluser, setAllUser] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      getAllUsers()
        .then(response => {
          console.log(response.data, 'Check Api')
          setAllUser(response.data)
        })
        .catch(error => {
          if (error.response.status === 401) {
            // Handle unauthorized access
          }
        })
    }
  }, [])

  const handleClick = (userId, currentStatus) => {
    const newStatus = !currentStatus

    userStatusUpdate(userId, newStatus)
      .then(response => {
        console.log(response, 'User UPdate')
        const updatedUsers = alluser.map(user => (user.id === userId ? { ...user, is_active: newStatus } : user))

        setAllUser(updatedUsers)
      })
      .catch(error => {
        console.error('Error updating user status:', error)
      })
  }

  const handleClickUserDelete = userId => {
    setSelectedUserId(userId)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedUserId(null)
  }

  const handleConfirmDelete = async () => {
    try {
      await userDelete(selectedUserId)
      setAllUser(alluser.filter(user => user.id !== selectedUserId))
      handleClose()
    } catch (error) {
      console.error('Error deleting user:', error)
      handleClose()
    }
  }

  const columns = [
    columnHelper.accessor((row, index) => index + 1, {
      id: 'serialNo',
      header: () => 'Serial No.',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: info => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{info.getValue()}</Typography>
        </Box>
      )
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('createdAt', {
      header: () => 'Register Date',
      cell: info => format(new Date(info.getValue()), 'yyyy-MM-dd')
    }),
    columnHelper.accessor('is_active', {
      header: () => 'Status',
      cell: info => (
        <IconButton aria-label='status' onClick={() => handleClick(info.row.original.id, info.getValue())}>
          {info.getValue() ? <CheckIcon color='success' /> : <CloseIcon color='error' />}
        </IconButton>
      )
    }),
    columnHelper.accessor('id', {
      header: () => 'Action',
      cell: info => (
        <IconButton onClick={() => handleClickUserDelete(info.getValue())}>
          <i className='tabler-trash text-[22px] text-textSecondary' />
        </IconButton>
      )
    })
  ]

  const filteredData = useMemo(() => {
    return alluser.filter(user => {
      const searchValue = searchTerm.toLowerCase()

      return user.name.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue)
    })
  }, [alluser, searchTerm])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <Card>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
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
          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <TextField
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder='Search User'
              className='is-full sm:is-auto'
            />
          </div>
        </div>

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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Confirm Delete'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color='primary' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  )
}

export default UserListDataTable
