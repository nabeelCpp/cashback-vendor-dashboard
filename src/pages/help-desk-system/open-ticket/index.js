// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Autocomplete from '@mui/material/Autocomplete';

import { create } from 'src/services/client.service'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const OpenTicket = props => {
  // get categories
  const [categories, setCategories] = useState([]);
  let loadCategories = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/help-desk/ticket-categories`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(response=>{
      let temp = [];
      response.data.categories.map((cat) => {
        let tempCats = {}
        tempCats.label = cat
        temp.push(tempCats)
      })
      setCategories(temp);
    }).catch(error => {
      toast.error(`${error.response.status}: ${error.response.data.message}`);
      if(error.response.status == 401){
        auth.logout();
      }
    })
  }
  useEffect(()=>{
    loadCategories()
  }, [])
  const top100Films = [
    { label: 'The Shawshank Redemption' }
  ];
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box
          sx={{
            py: 3,
            px: 4,
            borderRadius: 1,
            cursor: 'pointer',

            border: theme => `1px solid ${theme.palette.primary.main}`
          }}
        >
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
            <Icon icon='mdi:home-outline' />
            <Typography variant='h6' sx={{ color: 'primary.main' }}>
            OpenTicket
            </Typography>
          </Box>
        </Box>
      </Grid>
      
      <Grid item  xs={12}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='SUBJECT' placeholder='SUBJECT' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='MESSAGE' placeholder='MESSAGE' />
      </Grid>
     
      
      

      <Grid item md={6} xs={12}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default OpenTicket
