 // MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderListTable from './OrderListTable'
import OrderListCards from './OrderListCards'

const OrderList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <OrderListCards />
      </Grid>
      <Grid item xs={12}>
        <OrderListTable />
      </Grid>
    </Grid>
  )
}

export default OrderList
