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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const ViewInvoices = () => {
  let urlString = window.location.href
  let paramString = urlString.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  // const [invoiceNo, setInvoiceNo] = useState(null)
  let invoiceNo = null;
  for (let pair of queryString.entries()) {
    if(pair[0] == 'inv'){
      invoiceNo = pair[1]
    }
  }
  return (
    <>
      <h1 sx={{ mb: 10 }}>SUMMARY/PAYMENT</h1>
      <h2>Purchase Invoices</h2>
      <Typography
          component='div'
          variant='p'
          sx={{ fontWeight: 'bold', mb: 5, display: 'flex', justifyContent: 'flex-end' }}
        >
          <div>
            PAID AMOUNT:
            <Card component='div' sx={{ position: 'relative', mb: 3, p: 5, minWidth: '250px' }}>
              {' '}
              SAR 200.00
            </Card>
          </div>
        </Typography>
      <Card component='div' sx={{ position: 'relative', mb: 10, p: 7 }}>
       
        <Grid container spacing={2} className='match-height'>
          <Grid item xs={12} md={6}>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20,
                fontWeight:'bold'
              }}
            >
              <span>To</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20
              }}
            >
              <span>Altahir</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20
              }}
            >
              <span>Bahrain</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20
              }}
            >
              <span>Tel: 8956565112154</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20,
                 fontWeight:'bold'
              }}
            >
              <span>Invoice Info</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20
              }}
            >
              <span>Invoice Number: 2265656565</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20
              }}
            >
              <span>Invoice Date: 2022-05-25</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20
              }}
            >
              <span>Stokist ID: Emark656565</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20
              }}
            >
              <span>Stokist Name: Zomato Ltd, zomato</span>
            </Typography>
          </Grid>
        </Grid>
     
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650,mb:7 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell align='center' >ITEM</TableCell>
          <TableCell align='center'>Unit Cost</TableCell>
          <TableCell align='center'>Quantity</TableCell>
          <TableCell align='center'>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
          <TableCell>1</TableCell>
          <TableCell align='center' >Testing</TableCell>
          <TableCell align='center'>100.00</TableCell>
          <TableCell align='center'>2</TableCell>
          <TableCell align='center'>200.00</TableCell>
        </TableRow>
          
      
      </TableBody>
    </Table>
  </TableContainer>
 </Card>
  <Grid container spacing={2} className='match-height'>
  <Grid item xs={12} md={6}>
            Payment Status: PAID
          </Grid>
          <Grid item xs={12} md={6}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
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
              <span>SubTotal:</span>
              <span>SAR200.00</span>
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20,
                p: 5,
                borderBottom: '1px solid gray',
                fontWeight:'bold'
              }}
            >
              <span>Grand Total:</span>
              <span>SAR200.00</span>
            </Typography>
    
            </Card>
          </Grid>
          
        </Grid>
        <Typography
              component='div'
              variant='p'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pr: 20,
                p: 5,
                borderBottom: '1px solid gray',
                fontWeight:'bold',
                mt:10
              }}
            >
              <Button variant='contained'>Print</Button>
              <Button variant='outlined'>Back to Dashboard</Button>
            </Typography>
 
    </>
  )
}

export default ViewInvoices
