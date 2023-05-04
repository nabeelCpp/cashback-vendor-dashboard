import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
 import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
const WithdrawalRequest = () => {
  const [data, setData] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/wallet-mgt/my-withdrawal-requests`, {
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
    loadData();
  }, [])
  const columns = [
    { field: 'sn', headerName: 'SN#', width: 60 },
    { field: 'transaction_number', headerName: 'Transaction No', width: 100 },
    { field: 'request_amount', headerName: 'Requested Amount', width: 100 },
    { field: 'total_paid_amount', headerName: 'Paid Amount', width: 100 },
    { field: 'transaction_charge', headerName: 'Transaction Charge', width: 200 },
    {
      field: 'posted_date',
      headerName: 'Request date',
      width: 200,
      renderCell: params => (new Date(params.row.posted_date).toLocaleDateString())
    },
    { field: 'admin_remark', headerName: 'Admin Response', width: 200 },
    {
      field: 'admin_response_date',
      headerName: 'Response Date',
      width: 100,
      renderCell: params => (new Date(params.row.admin_response_date).toLocaleDateString())
    },
    { field: 'status', headerName: 'Status', width: 100 }
  ]

  return (
    <>
    <Grid item xs={12}>
        <Box >
          <Typography variant='h5' sx={{my:8}}>Withdrawal Request</Typography>

        </Box>
      </Grid>
     
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={data} columns={columns} pageSize={10} rowsPerPageOptions={[10]} autoHeight />
      </Card>
      
    </>
  )
}

export default WithdrawalRequest


      