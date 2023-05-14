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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const PayDues = () => {
  const [paymentMode, setPaymentMode] = useState(null)
  const [amount, setAmount] = useState(0)
  const [uploadProof, setUploadProof] = useState(null)
  const [dueAmount, setDueAmount] = useState(0)

  const loadData = () => {
    axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel`, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`
      }
    })
    .then(response => {
      setDueAmount(response.data.dueAmount)
    })
    .catch(error => {
      toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
      if (error.response && error.response.status == 401) {
        auth.logout();
      }
    })
  }
  useEffect(()=> {
    loadData()
  }, [])

  const handleProofUpload = (event) => {
    const selectedImage = event.target.files[0];
    setUploadProof(selectedImage);
  }

  const submitHandler = () => {
    let errors = 0;
    if(!amount){
      toast.error("Amount must be greater than 0");
      errors++
    }
    if(!paymentMode){
      toast.error("Payment Method is required");
      errors++
    }
    
    if(!uploadProof){
      toast.error("Upload Proof is required");
      errors++
    }
    if(!errors){  
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/pay-dues`,{payment_mode: paymentMode, amount: amount}, {
        headers: {
          "Authorization": `Bearer ${localStorage.accessToken}`
        }
      }).then(resp => {
        // Upload Proof
        let data = resp.data
        let id = data.id
        if(data.success){
          toast.success(data.message);
        }else{
          toast.error(data.message)
        }
        const formData = new FormData();
        formData.append('payment_proof', uploadProof);
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/pay-dues/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${localStorage.accessToken}`
          }
        }).then(response => {
          Router.push('/due-request')
        })
      }).catch(error => {
        toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
          if (error.response && error.response.status == 401) {
            auth.logout();
          }
      });
    }
  }
  return (
    <>
      <h2>PAY DUES</h2>
      <Card component='div' sx={{ position: 'relative', mb: 7, p: 7 }}>
        <Typography
          component='div'
          variant='p'
          sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
        >
          DUE AMOUNT : {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(dueAmount)} 
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
              <TextField xs={12} fullWidth label='Payment Mode' placeholder='Payment Mode' onChange={e => setPaymentMode(e.target.value)} value={paymentMode} />
            </Grid>
            <Grid item xs={12} sx={{ m: 5 }}>
              <TextField xs={12} fullWidth label='Amount:' placeholder='Amount:' onChange={e => setAmount(e.target.value)} value={amount} />
            </Grid>
            <Grid item xs={12} sx={{ m: 5 }}>
              <Button variant='contained' sx={{ mr: 2 }} component='label'>
                Upload Proof
                <input hidden accept='image/*' type='file' onChange={handleProofUpload} />
              </Button>
              {uploadProof &&  (
                  <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={164}>
                      <ImageListItem key={URL.createObjectURL(uploadProof)}>
                      <img
                        src={`${URL.createObjectURL(uploadProof)}`}
                        srcSet={`${URL.createObjectURL(uploadProof)}`}
                        alt={URL.createObjectURL(uploadProof)}
                        loading="lazy"
                      />
                    </ImageListItem>
                </ImageList>)}
            </Grid>
            <Grid item xs={12} sx={{ m: 5 }}>
              <Button variant='contained' sx={{ mr: 2 }} component='label' onClick={submitHandler} >
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
