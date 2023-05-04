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

const IncomeWithdrawal = props => {
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
           Heading
            </Typography>
          </Box>
        </Box>
      </Grid>
      
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Full Name' placeholder='Full Name' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Account Name' placeholder='Account Name' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Account Number' placeholder='Account Number' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Bank Name' placeholder='Bank Name' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Bank Number' placeholder='Bank Number' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='IFSC Code' placeholder='IFSC Code' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='ENTER Amount' placeholder='ENTER Amount' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Description' placeholder='Description' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Enter Password' placeholder='Enter Password' />
      </Grid>


      <Grid item md={6} xs={12}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}



export default IncomeWithdrawal


      