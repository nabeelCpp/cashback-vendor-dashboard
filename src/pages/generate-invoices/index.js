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
import { useRouter } from 'next/router'
import { create } from 'src/services/client.service'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth'

import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link'

  

const OpenTicket = props => {
  const auth = useAuth()
  const router = useRouter()
  // get categories
  const [userId, setUserId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState(null)
  const [unitPrice, setUnitPrice] = useState(null)
  const [quantity, setQuantity] = useState(null)
 
  
  const deleteItem = (key) => {
    console.log(products[key])
    let arr = products.filter((r, k)  => k != key)
    setProducts(arr)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    let errors = 0;
    if(!invoiceNo){
      toast.error("Invoice number is required!");
      errors++;
    }
    if(!userId){
      toast.error("Userid is required!");
      errors++;
    }

    if(products.length == 0){
      toast.error("Atleast 1 Product is required!");
      errors++;
    }
    
    // TODO: Add API call here
    if(!errors){
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/invoice/generate`,{
        user_id: userId,
        invoice_no: invoiceNo,
        current_url: "/franchisepanel/puc-generateinvoice.php",
        products: products
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.accessToken}`
        }
      })
        .then(response => {
          toast.success(`${response.data.message}`)
          router.replace('/all-invoices/')
        })
        .catch(error => {
          toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
          if (error.response && error.response.status == 401) {
            auth.logout();
          }
        })
    }
  }

  const addProductDom = () => {
    let errors = false
    if(!productName){
      toast.error('Product name is required')
      errors = true
    }

    if(!unitPrice){
      toast.error('Unit price is required')
      errors = true
    }
    if(!quantity){
      toast.error('Quantity is required')
      errors = true
    }

    if(!errors){
      let obj = {
        name: productName,
        price: unitPrice,
        qty: quantity
      }
      products.push(obj)
      setProducts(products)
      setProductName('')
      setUnitPrice('')
      setQuantity('')
    }
  }
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
            <Typography variant='h6' sx={{ color: 'primary.main' }}>
              GENERATE INVOICE
            </Typography>
          </Box>
        </Box>
      </Grid>
      
      
      <Grid item  xs={6}>
        <TextField xs={6} onChange={e => setUserId(e.target.value)} value={userId} fullWidth label='User ID:' placeholder='User ID:' />
      </Grid>
      <Grid item  xs={6}>
        <TextField xs={6} onChange={e => setInvoiceNo(e.target.value)} value={invoiceNo} fullWidth label='Invoice No:' placeholder='Invoice No:' />
      </Grid>

     
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
            <Typography variant='h6' sx={{ color: 'primary.main' }}>
            ADD PRODUCT ENTRY
            </Typography>
          </Box>
        </Box>
      </Grid>
          {products.length > 0 ?
            <Grid item md={12} xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="Services Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Product Name</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((row, key) => (
                        <TableRow
                          key={key}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {key+1}
                          </TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.qty}</TableCell>
                          <TableCell align="right">{row.qty * row.price}</TableCell>
                          <TableCell align="right">
                            <Grid container spacing={0}>
                              <Grid item xs={6}>
                                <Link href='javascript:void(0)' onClick={() => deleteItem(key)}>Delete</Link>
                              </Grid>
                            </Grid>
                            </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>:''}
      <Grid item md={4}  xs={12}>
        <TextField xs={6} onChange={e => setProductName(e.target.value)} name='pname' value={productName} fullWidth label='Product Name' placeholder='Product Name' />
      </Grid>
      <Grid item md={4}  xs={12}>
        <TextField xs={6} onChange={e => setUnitPrice(e.target.value)} name='price' value={unitPrice}  fullWidth label='Unit Price' placeholder='Unit Price' type='number' />
      </Grid>
      <Grid item md={4}  xs={12}>
        <TextField xs={6} onChange={e => setQuantity(e.target.value)} name='pqty' value={quantity} fullWidth label='Quantity' placeholder='Quantity' type='number' />
      </Grid>
      <Grid item  xs={12}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={addProductDom}>
         ADD
        </Button>
      </Grid>

      <Grid item md={6} xs={12}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={submitHandler}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default OpenTicket

