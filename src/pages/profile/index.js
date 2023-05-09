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
import { toast } from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
const Profile = () => {
  const auth = useAuth()
  const [profile, setProfile] = useState([])
  const [companyregno, setCompanyregno] = useState("")
  const [username, setUsername] = useState("")
  const [firstname, setFirstname] = useState("")
  const [commisionper, setCommisionper] = useState(0)
  const [creditlimit, setCreditlimit] = useState(0)
  const [email, setEmail] = useState("")
  // const [country, setCountry] = useState("")
  const [address, setAddress] = useState("")
  const [lendmark, setLendmark]= useState("")
  const [telephone, setTelephone] = useState("")
  const [phonecode, setPhonecode] = useState("")
  const [description, setDescription] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accountNo, setAccountNo] = useState("")
  const [bankName, setBankName] = useState("")
  const [branchName, setBranchName] = useState("")
  const [swiftCode, setSwiftCode] = useState("")
  const loadProfile = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/profile`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    })
      .then(response => {
        let user = response.data
        setCompanyregno(user.company_reg_no||"")
        setUsername(user.username||"")
        setFirstname(user.first_name||"")
        setCommisionper(user.commission_percent||0)
        setCreditlimit(user.credit_limit||"")
        setEmail(user.email||"")
        setAddress(user.address||"")
        setLendmark(user.lendmark||"")
        // setCountry(user.country||"")
        setPhonecode(user.phonecode||"")
        setTelephone(user.telephone||"")
        setDescription(user.description||"")
        setAccountName(user.acc_name||"")
        setAccountNo(user.ac_no||"")
        setBankName(user.bank_nm||"")
        setBranchName(user.branch_nm||"")
        setSwiftCode(user.swift_code||"")
        setProfile(user)
      })
      .catch(error => {
        toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
        if (error.response && error.response.status == 401) {
          auth.logout();
        }
      })
  }
  useEffect(() => {
    loadProfile()
  }, [])

  const submitHandler = () => {
    let dataToUpdate = {
      "company_reg_no": companyregno,
      "first_name": firstname,
      "email": email,
      "address" : address,
      "lendmark": lendmark,
      // "country": country,
      "state" : "Punjab",
      "city": "Attock",
      "phonecode": "+92",
      "telephone" : "7905929530",
      "description": "Zomato is an Indian multinational restaurant aggregator and food delivery company founded by Deepinder Goyal and Pankaj Chaddah in 2008. Zomato provides information, menus and user-reviews of restaurants as well as food delivery options from partner resta"
  }
  console.log(dataToUpdate);
  }

  const updateProfile = () => {
    let dataToUpdate = {
      "company_reg_no": companyregno,
      "first_name": firstname,
      "email": email,
      "address" : address,
      "lendmark": lendmark,
      // "country": country,
      "state" : "Punjab",
      "city": "Attock",
      "phonecode": phonecode,
      "telephone" : telephone,
      "description": description
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/profile/update`,dataToUpdate, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(resp => {
      let data = resp.data
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message)
      }
    }).catch(error => {
      toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
        if (error.response && error.response.status == 401) {
          auth.logout();
        }
    });
    
  }

  const updateBankInfo = ()  => {
    let dataToUpdate = {
        "acc_name" : accountName,
        "ac_no" : accountNo,
        "bank_nm" : bankName,
        "branch_nm" : branchName,
        "swift_code" : swiftCode
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/bank/update`,dataToUpdate, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(resp => {
      let data = resp.data
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message)
      }
    }).catch(error => {
      toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
        if (error.response && error.response.status == 401) {
          auth.logout();
        }
    });
  }

  return (
    <>
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
      <Grid item xs={12} md={6}>
        <TextField xs={6} onChange={e => setCompanyregno(e.target.value)} value={companyregno} fullWidth label='Company Registration Number:' placeholder='Company Registration Number::' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setFirstname(e.target.value)} value={firstname} fullWidth label='Company Name:' placeholder='Company Name:' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setCommisionper(e.target.value)} disabled value={commisionper} fullWidth label='Commission Percentage (%)' placeholder='Commission Percentage (%)' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setCreditlimit(e.target.value)} disabled value={creditlimit} fullWidth label='Credit Limit' placeholder='Credit Limit' />
      </Grid>
      <Grid item xs={12}>
        <TextField onChange={e => setEmail(e.target.value)} disabled value={email} fullWidth label='Email' placeholder='abc@gmail.com' />
      </Grid>
      {/* <Grid item xs={12}>
        <TextField xs={6} onChange={e => setName(e.target.value)} fullWidth label='Password:' placeholder='Password:' />
      </Grid> */}
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setAddress(e.target.value)} value={address} fullWidth label='Full Address(With Google map link):' placeholder='Full Address(With Google map link):' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setLendmark(e.target.value)} value={lendmark} fullWidth label='Landmark:' placeholder='Landmark:' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setPhonecode(e.target.value)} value={phonecode} fullWidth label='Country Code:' placeholder='Country Code:' type="number" />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setTelephone(e.target.value)} value={telephone} fullWidth label='Contact Number:' placeholder='Contact Number:' />
      </Grid>
      <Grid item  xs={12}>
        <TextField xs={6} onChange={e => setDescription(e.target.value)} value={description} fullWidth label='Profile Description:' placeholder='Profile Description:' multiline />
      </Grid>
      <Grid item md={6} xs={12}>
        <Button variant='contained' onClick={updateProfile} sx={{ mr: 2 }}>
          Update Profile
        </Button>
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
            UPDATE BANK INFORMATION
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TextField xs={6} onChange={e => setAccountName(e.target.value)} value={accountName} fullWidth label='Account Name:' placeholder='Account Name:' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setAccountNo(e.target.value)} value={accountNo} fullWidth label='Bank Account Number:' placeholder='Bank Account Number:' />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField xs={6} onChange={e => setBankName(e.target.value)} value={bankName} fullWidth label='Bank Name' placeholder='Bank Name' />
      </Grid>
      <Grid item xs={12}>
        <TextField onChange={e => setBranchName(e.target.value)} value={branchName} fullWidth label='Branch Name' placeholder='Branch Name' />
      </Grid>
      <Grid item xs={12}>
        <TextField xs={6} onChange={e => setSwiftCode(e.target.value)} value={swiftCode} fullWidth label='Swift Code' placeholder='Swift Code' />
      </Grid>

      <Grid item md={6} xs={12}>
        <Button variant='contained' onClick={updateBankInfo} sx={{ mr: 2 }}>
          Update Bank Info
        </Button>
      </Grid>


      <Grid  item md={9} xs={12}>
      <h4>CHANGE BRAND LOGO</h4>
      </Grid>
       
      <Grid  item md={9} xs={12}>
      <Button variant='contained' sx={{ mr: 2 }} component='label'>
        Upload Image
        <input hidden accept='image/*' multiple type='file' />
       
      </Button>
           Group 243.png have been uploaded
      </Grid>
      <Grid  item md={9} xs={12}>
      <h4>CHANGE PRODUCT GALLERY</h4>
      </Grid>
      
      <Grid item md={9} xs={12}>
      <Button variant='contained' sx={{ mr: 2 }} component='label'>
        Upload Image
        <input hidden accept='image/*' multiple type='file' />
       
      </Button>
           Group 243.png have been uploaded
      </Grid>
      <Grid item md={6} xs={12}>
        <Button variant='contained' onClick={submitHandler} sx={{ mr: 2 }}>
          Submit
        </Button>
      </Grid>
    </Grid>
      
    
    </>
  )
}

export default Profile


      