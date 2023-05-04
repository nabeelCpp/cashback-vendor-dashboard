import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'

const PackagePurchase = () => {
  const [data, setData] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/invoice/package-purchase`, {
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
  useEffect(() => {
    loadData()
  }, [])
  const columns = [
    { field: 'sn', headerName: 'SN#', width: 60 },
    { field: 'invoice_no', headerName: 'Invoice No', width: 250 },
    { field: 'package_name', headerName: 'Package Name', width: 250 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    {
      field: 'date',
      headerName: 'Date',
      width: 250,
      renderCell: params => (new Date(params.row.date).toLocaleDateString())
    }
  ]

  return (
    <>
    <Grid item xs={12}>
        <Box >
          <Typography variant='h5' sx={{my:8}}>PURCHASE PACKAGE REPORT</Typography>

        </Box>
      </Grid>
      
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={data} getRowId={(row) => row.sn}  columns={columns} pageSize={20} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default PackagePurchase


      