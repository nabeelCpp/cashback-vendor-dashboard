import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
const Profile = () => {

  const [data, setData] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/terms-and-conditions`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(resp => {
      setData(resp.data)
    }).catch(error => {
      toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
        if (error.response && error.response.status == 401) {
          auth.logout();
        }
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  

  return (
    <>
    <Grid container spacing={6}>
    <h2>TERMS & CONDITIONS</h2>
    <Typography>
      {data.description}
    </Typography>
    </Grid>
      
    
    </>
  )
}

export default Profile


      