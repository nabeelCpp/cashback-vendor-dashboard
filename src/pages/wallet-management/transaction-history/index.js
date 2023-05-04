import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
  import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const TransactionHistory = () => {
  const [data, setData] = useState([])
  const [amount, setAmount] = useState(0)
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/wallet-mgt/transactions`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(response=>{
      setData(response.data.transactions);
      setAmount(response.data.amount);
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
    { field: 'transaction_no', headerName: 'Transaction No', width: 200 },
    { field: 'full_name', headerName: 'Full Name', width: 200 },
    { field: 'sender_id', headerName: 'User Id', width: 150 },
    { field: 'credit_amt', headerName: `Credit (${process.env.NEXT_PUBLIC_CURRENCY})`, width: 100 },
    { field: 'debit_amt', headerName: `Debit (${process.env.NEXT_PUBLIC_CURRENCY})`, width: 100 },
    { field: 'TranDescription', headerName: 'Remark', width: 100 },
    {
      field: 'ts',
      headerName: 'Date',
      width: 250,
      renderCell: params => (new Date(params.row.ts).toLocaleDateString())+' '+(new Date(params.row.ts).toLocaleTimeString())
    }
  ]

  return (
    <>
    <Grid item xs={12}>
        <Box >
          <Typography variant='h5' sx={{my:8}}>Bonus Wallet Transaction History</Typography>
          <Typography variant='h6' sx={{my:8}}>Wallet Balance : {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(amount)}</Typography>

        </Box>
      </Grid>
    
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={data} columns={columns} pageSize={10} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default TransactionHistory


      