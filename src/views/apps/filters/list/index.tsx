// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import FilterListData from './FilterListData'

const FilterList = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FilterListData tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default FilterList
