import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
const LevelIncome = () => {
  const [data, setData] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/earning-reports/level-income`, {
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
    { field: 'user_id', headerName: 'User Id', width: 200 },
    { field: 'full_name', headerName: 'User Name', width: 200 },
    { field: 'investment', headerName: `Investment (${process.env.NEXT_PUBLIC_CURRENCY})`, width: 200,  renderCell: params =>  new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(params.row.investment) },
    { field: 'percentage', headerName: 'Percentage(%)', width: 140 },
    { field: 'credit_amt', headerName: `Amount (${process.env.NEXT_PUBLIC_CURRENCY})`, width: 100 },
    {
      field: 'date',
      headerName: 'Date',
      width: 250,
      renderCell: params => (new Date(params.row.date).toLocaleDateString())+' '+(new Date(params.row.date).toLocaleTimeString())
    },
    { field: 'status', headerName: 'Status', width: 100 },
  ]

  return (
    <>
    <Grid item xs={12}>
        <Box >
          <Typography variant='h5' sx={{my:8}}>LEVEL INCOME REPORT</Typography>

        </Box>
      </Grid>
      
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={data} columns={columns} pageSize={10} getRowId={(row) => row.sn} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default LevelIncome


      