import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ShoppingInvoice = () => {
  const [data, setData] = useState([]);
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/invoice/my-shopping`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(response=>{
      setData(response.data);
    }).catch(error => {
      toast.error(`${error.response.status}: ${error.response.data.message}`);
      if(error.response.status == 401){
        auth.logout();
      }
    })
  }
  useEffect(()=>{
    loadData()
  }, [])
  const columns = [
    { field: 'sn', headerName: 'SN#', width: 60 },
    { field: 'seller_id', headerName: 'Seller ID', width: 250 },
    { field: 'seller_username', headerName: 'Seller username', width: 250 },
    { field: 'total_amount', headerName: 'Total Amount', width: 200 },
    {
      field: 'date',
      headerName: 'Date',
      width: 250,
      renderCell: params => (new Date(params.row.date).toLocaleDateString())
    },
    { field: '', headerName: 'View Invoice', width: 200, renderCell: params => "View Invoice" }
  ]

  return (
    <>
    <Grid item xs={12}>
        <Box >
          <Typography variant='h5' sx={{my:8}}>Heading</Typography>

        </Box>
      </Grid>
      
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={data} getRowId={(row) => row.sn} columns={columns} pageSize={10} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default ShoppingInvoice


      