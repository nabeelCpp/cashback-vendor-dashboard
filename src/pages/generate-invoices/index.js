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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
const initialvalue = {
  name : "",
  qty :"",
  price : ""
}

const productsArr = [];
  

const OpenTicket = props => {
  const router = useRouter()
  // get categories
  const [userId, setUserId] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [products, setProducts] = useState(initialvalue)
 
  

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

    if(!products){
      toast.error("Atleast 1 Product is required!");
      errors++;
    }
    
    // TODO: Add API call here
    if(!errors){
      productsArr.push(products)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/invoice/generate`,{
        user_id: userId,
        invoice_no: invoiceNo,
        current_url: "/franchisepanel/puc-generateinvoice.php",
        products: productsArr
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
  const setPName = (e)=>{
    if(e.name == 'pqty'){
      setProducts({...products, qty : e.value})
    }
    if(e.name == 'price'){
      setProducts({...products, price : e.value})
    }

    if(e.name == 'pname'){
      setProducts({...products, name : e.value})
    }

  }

  const addProductDom = () => {
    productsArr.push(products)
    setProducts(initialvalue);
    console.log(productsArr);
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
            <Icon icon='mdi:home-outline' />
            <Typography variant='h6' sx={{ color: 'primary.main' }}>
            INVOICE INFORMATION
            </Typography>
          </Box>
        </Box>
      </Grid>
      
      
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setUserId(e.target.value)} value={userId} fullWidth label='User ID:' placeholder='User ID:' />
      </Grid>
      <Grid item  xs={12}>
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
            <Icon icon='mdi:home-outline' />
            <Typography variant='h6' sx={{ color: 'primary.main' }}>
            ADD PRODUCT ENTRY
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item md={4}  xs={12}>
        <TextField xs={6} onChange={e => setPName(e.target)} name='pname' value={products.name} fullWidth label='Product Name' placeholder='Product Name' />
      </Grid>
      <Grid item md={4}  xs={12}>
        <TextField xs={6} onChange={e => setPName(e.target)} name='price' value={products.price}  fullWidth label='Unit Price' placeholder='Unit Price' />
      </Grid>
      <Grid item md={4}  xs={12}>
        <TextField xs={6} onChange={e => setPName(e.target)} name='pqty' value={products.qty} fullWidth label='Quantity' placeholder='Quantity' />
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

