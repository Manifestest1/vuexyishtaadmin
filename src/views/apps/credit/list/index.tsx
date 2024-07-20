 // MUI Imports
 import Grid from '@mui/material/Grid'

 // Component Imports
 import CreditListTable from './CreditListTable'

 
 const CreditList = () => {
   return (
     <Grid container spacing={6}>
       <Grid item xs={12}>
         <CreditListTable />
       </Grid>
     </Grid>
   )
 }
 
 export default CreditList
 