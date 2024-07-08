'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
// import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import CloseIcon from '@mui/icons-material/Close'
import { Box, Avatar } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports

import Dialog from '@mui/material/Dialog'

import DialogActions from '@mui/material/DialogActions'

import DialogContent from '@mui/material/DialogContent'

import DialogContentText from '@mui/material/DialogContentText'

import DialogTitle from '@mui/material/DialogTitle'

import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import AddFilterCategoryDrawer from './AddFilterCategoryDrawer'
import AddFilterDrawer from './AddFilterDrawer'
import EditFilterCategoryDrawer from './EditFilterCategoryDrawer'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import {
  getAllFilters,
  addFiltersData,
  addFiltersCategory,
  getFiltersCategory,
  filterDelete,
  filterCategoryEdit,
  filterCategoryDelete,
  updateFilterCategoryData
} from '@/context/api/apiService'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersTypeWithAction = UsersType & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler-crown', color: 'error' },
  author: { icon: 'tabler-device-desktop', color: 'warning' },
  editor: { icon: 'tabler-edit', color: 'info' },
  maintainer: { icon: 'tabler-chart-pie', color: 'success' },
  subscriber: { icon: 'tabler-user', color: 'primary' }
}

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const FilterListData = ({ tableData }: { tableData?: UsersType[] }) => {
  const theme = useTheme()

  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [addFilterDrawerOpen, setaddFilterDrawerOpen] = useState(false)
  const [category_id, setCategory_id] = useState(null)

  const [editCategoryData, setEditCategoryData] = useState({ name: '', order_no: '' })

  const [editFilterDrawerOpen, seteditFilterDrawerOpen] = useState(false)

  const [allCategory, setAllCategory] = useState(null)

  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[tableData])
  const [globalFilter, setGlobalFilter] = useState('')

  const [allFilterData, setFilterData] = useState(null)
  const image_base_path = 'http://localhost:8000/'

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
    console.log(filtercatid, 'Filter cat Id')
  }

  // Hooks
  // const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('fullName', {
        header: 'Category Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.fullName })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.fullName}
              </Typography>
              <Typography variant='body2'>{row.original.username}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('role', {
        header: 'Position',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Icon
              className={userRoleObj[row.original.role].icon}
              sx={{ color: `var(--mui-palette-${userRoleObj[row.original.role].color}-main)` }}
            />
            <Typography className='capitalize' color='text.primary'>
              {row.original.role}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('currentPlan', {
        header: 'Filters',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.currentPlan}
          </Typography>
        )
      }),
      columnHelper.accessor('billing', {
        header: 'Add Filter',
        cell: ({ row }) => <Typography>{row.original.billing}</Typography>
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: () => (
          <div className='flex items-center'>
            <IconButton>
              <i className='tabler-edit text-[22px] text-textSecondary' />
            </IconButton>
            {/* <IconButton>
              <Link href={getLocalizedUrl('apps/user/view', locale as Locale)} className='flex'>
                <i className='tabler-eye text-[22px] text-textSecondary' />
              </Link>
            </IconButton> */}
            <OptionMenu
              iconClassName='text-[22px] text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit text-[22px]',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as UsersType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = (params: Pick<UsersType, 'avatar' | 'fullName'>) => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName as string)}</CustomAvatar>
    }
  }

  return (
    <>
      <Card>
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search User'
            className='is-full sm:is-auto'
          />

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
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {allFilterData &&
                allFilterData.map((fdata, index) => (
                  <tr key={index}>
                    <td>
                      {' '}
                      <Checkbox />
                    </td>
                    <td>{fdata.name}</td>
                    <td>{fdata.order_no}</td>
                    <td>
                      {fdata.sub_categories.map((subCategory, index) => (
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
                            width: 'auto',
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover
                            }
                          }}
                        >
                          <Avatar
                            src={image_base_path + subCategory.image}
                            alt='Uploaded Preview'
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              marginRight: '12px'
                            }}
                          />
                          <Typography variant='body2' sx={{ marginRight: '8px' }}>
                            {subCategory.sub_category}
                          </Typography>
                          <IconButton aria-label='status'>
                            <CloseIcon onClick={() => handleClickFilterDelete(subCategory.id)} />
                          </IconButton>
                        </Box>
                      ))}
                    </td>
                    <td>
                      <Button
                        variant='contained'
                        startIcon={<i className='tabler-plus' />}
                        onClick={() => toggleAddFilterDrawer(fdata.id)}
                        className='is-full sm:is-auto'
                      >
                        Add Filter
                      </Button>
                    </td>

                    <td>
                      <div className='flex items-center'>
                        <IconButton onClick={() => toggleEditFilterCategoryDrawer(fdata.id)}>
                          <i className='tabler-edit text-[22px] text-textSecondary' />
                        </IconButton>
                        <IconButton onClick={() => handleClickFCDelete(fdata.id)}>
                          <i className='tabler-trash text-[22px] text-textSecondary' />
                        </IconButton>
                        {/* <OptionMenu
                          iconClassName='text-[22px] text-textSecondary'
                          options={[
                            {
                              text: 'Delete',
                              icon: 'tabler-trash text-[22px]',
                              menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' },

                            },

                            {
                              text: 'Edit',
                              icon: 'tabler-edit text-[22px]',
                              menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                            }
                          ]}
                        /> */}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            {/* {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )} */}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
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
            Are you sure you want to delete this user?
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

export default FilterListData
