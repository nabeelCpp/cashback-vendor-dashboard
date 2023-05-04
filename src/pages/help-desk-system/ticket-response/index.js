import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
const TicketResponse = () => {
  const [data, setData] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/help-desk/view-tickets`, {
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
  let sn = 0;
  const columns = [
    { field: '', headerName: 'SN#', width: 60, renderCell: params => sn++ },
    { field: 'ticket_no', headerName: 'Ticket no.', width: 80 },
    { field: 'subject', headerName: 'Subject', width: 400 },
    { field: 'tasktype', headerName: 'Category', width: 100 },
    {
      field: 't_date',
      headerName: 'Date',
      width: 300,
      renderCell: params => (new Date(params.row.t_date).toLocaleDateString())
    },
    { field: 'status', headerName: 'Status', width: 250, renderCell: params => params.row.status==0?"Pending":"Responsed" },
    { field: 'description', headerName: 'Query', width: 450},
    {
      field: 'c_t_date',
      headerName: 'Date Response',
      width: 200,
      renderCell: params => params.row.c_t_date?(new Date(params.row.c_t_date).toLocaleDateString()):''
    },
    { field: 'response', headerName: 'Response', width: 250}
  ]

  return (
    <>
    <Grid item xs={12}>
        <Box >
          <Typography variant='h5' sx={{my:8}}>Heading</Typography>

        </Box>
      </Grid>
      
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={data} columns={columns} pageSize={20} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default TicketResponse


      