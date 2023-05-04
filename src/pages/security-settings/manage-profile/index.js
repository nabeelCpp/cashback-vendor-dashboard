// ** React Imports
import { useState, forwardRef } from 'react'

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

import { create } from 'src/services/client.service'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { toast } from 'react-hot-toast'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const ManageProfile = props => {
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
              Personal Information
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='USERNAME:' placeholder='USERNAME:' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='FirstName' placeholder='FirstName' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='LastName' placeholder='LastName' />
      </Grid>
      <Grid item xs={12}>
        <TextField onChange={e => setEmail(e.target.value)} fullWidth label='Email' placeholder='abc@gmail.com' />
      </Grid>
      <Grid item xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='COUNTRY' placeholder='COUNTRY' />
      </Grid>
      <Grid item md={3} xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='CODE:' placeholder='CODE:' />
      </Grid>
      <Grid item md={9} xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='MOBILE NUMBER:' placeholder='MOBILE NUMBER:' />
      </Grid>
      <Grid item md={9} xs={12}>
      <Button variant='contained' sx={{ mr: 2 }} component='label'>
        Upload Image
        <input hidden accept='image/*' multiple type='file' />
       
      </Button>
           Group 243.png have been uploaded
      </Grid>
      

      <Grid item md={6} xs={12}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default ManageProfile
