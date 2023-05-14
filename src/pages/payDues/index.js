import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useAuth } from 'src/hooks/useAuth'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
const PayDues = () => {
  return (
    <>
      <h2>PAY DUES</h2>
      <Card component='div' sx={{ position: 'relative', mb: 7, p: 7 }}>
        <Typography
          component='div'
          variant='p'
          sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
        >
          DUE AMOUNT : SAAAR 1.20
        </Typography>
        <Grid container spacing={2} className='match-height'>
          <Grid item xs={12} md={6}>
            <h3>Bank Details: </h3>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20,
                p: 5,
                borderBottom: '1px solid gray'
              }}
            >
              <span>Bank Name :</span>
              <span>HDFC</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20,
                p: 5,
                borderBottom: '1px solid gray'
              }}
            >
              <span>IFSC CODE:</span>
              <span>HDFC0000115</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                mb: 10,
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20,
                p: 5,
                borderBottom: '1px solid gray'
              }}
            >
              <span>AC No:</span>
              <span>50200058944662</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} sx={{ m: 5 }}>
              <TextField xs={12} fullWidth label='Payment Mode' placeholder='Payment Mode' />
            </Grid>
            <Grid item xs={12} sx={{ m: 5 }}>
              <TextField xs={12} fullWidth label='Amount:' placeholder='Amount:' />
            </Grid>
            <Grid item xs={12} sx={{ m: 5 }}>
              <Button variant='contained' sx={{ mr: 2 }} component='label'>
                Upload Proof
                <input hidden accept='image/*' type='file'  />
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ m: 5 }}>
              <Button variant='contained' sx={{ mr: 2 }} component='label'>
                Update
              
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default PayDues
