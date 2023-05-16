// ** MUI Imports
import Grid from '@mui/material/Grid'
import { divide } from 'lodash'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Welcome from 'src/views/dashboard/Welcome'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
// by nabeel
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import auth from 'src/configs/auth'


// end
const Dashboard = () => {
  const auth = useAuth()
  var [data, setData] = useState([])
  // by nabeel
  let loadData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
        if (error.response && error.response.status == 401) {
          auth.logout();
        }
      })
  }

  useEffect(() => {
    loadData()
  }, [])
  // end
  return (
    <div>
      <h2>VENDOR PANEL</h2>

      <Grid container spacing={2} className='match-height'>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                SALE (CURRENT MONTH)
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.totalEarning)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                ALL INVOICES
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {data.allInvoices}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                DUE AMOUNT (SAR)
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold',display:"flex",justifyContent:"space-between" }}>
                  {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.dueAmount)} 
                  <Link href="/payDues">Pay Dues</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                TOTAL CREDIT LIMIT (SAR)
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.creditLimit?data.creditLimit.total:0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                REST CREDIT LIMIT (SAR)
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                  {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.creditLimit?data.creditLimit.rest:0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                COMMISSION PERCENT (%)
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {data.commissionPercent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={6} md={12} className='match-height' sx={{ position: 'relative', mt: 7 }}>
        <Grid item xs={12} md={12}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <div sx={{ display: 'flex' }}>
                <Typography component='div' variant='p' sx={{ fontWeight: 'bold', mb: 10 }}>
                  PERSONAL INFORMATION
                </Typography>
              </div>

              <div sx={{  }}>
                <Avatar sx={{ width: 100, height: 100,mb:7 }}></Avatar>
                <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                  {data.profile?data.profile.first_name+' '+data.profile.last_name:''}
                </Typography>
                <Typography component='div' variant='p' sx={{ }}>
                  @{data.profile?data.profile.username:''}
                </Typography>
                <Typography component='div' variant='p' sx={{  }}>
                  {data.profile?`${data.profile.state}, ${data.profile.city}`:''}
                </Typography>
                <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Stockist Package :
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
