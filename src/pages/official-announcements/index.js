import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
const OfficialAnnouncement = () => {
  const  [data, setData] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/official-announcements`, {
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
    loadData();
  }, [])
  const columns = [
    { field: 'sn', headerName: 'SN#', width: 60 },
    { field: 'news_name', headerName: 'Name', width: 400 },
    {
      field: 'posted_date',
      headerName: 'Date',
      width: 300,
      renderCell: params => (new Date(params.row.posted_date).toLocaleDateString())
    },
    { field: '', headerName: 'Detail', width: 250, renderCell: params => "View" }
  ]

  return (
    <>
    <Grid item xs={12}>
        <Box >
          <Typography variant='h5' sx={{my:8}}>OFFICIAL ANNOUNCEMENTS</Typography>

        </Box>
      </Grid>
      
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={data} getRowId={(row) => row.sn} columns={columns} pageSize={20} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default OfficialAnnouncement


      