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

import { useAuth } from 'src/hooks/useAuth'
// by nabeel
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import auth from 'src/configs/auth'

// end 
const Dashboard = () => {
  var [data, setData] = useState([]);
  // by nabeel
  let loadData =  () => {
    
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel`, {
        headers: {
          "Authorization": `Bearer ${localStorage.accessToken}`
        }
      }).then(response => {
        setData(response.data);
      }).catch(error => {
       
        toast.error(`${error.response.status}: ${error.response.data.message}`);
        // if(error.response.status == 401){
        //   auth.logout();
        // }
      });
    
  }


  useEffect(() => {
    loadData()
  }, []
  );
  // end
  return (
    <div>
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
        <CardContent>
          <Typography variant='p'>
            Referral Link: <a className='btn btn-light' href={process.env.NEXT_PUBLIC_BASE_URL+'userpanel/register?referral='+data.referralLink!=undefined && data.referralLink||''}>{process.env.NEXT_PUBLIC_BASE_URL}userpanel/register?referral={data.referralLink!=undefined && data.referralLink||''}</a>
          </Typography>
          <link></link>
        </CardContent>
      </Card>

      <Grid container spacing={6} className='match-height' sx={{ position: 'relative', mb: 7 }}>
        <Grid item xs={12} md={4}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                Capping
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {/* {new Intl.NumberFormat(process.env.NEXT_PUBLIC_LANG, { style: 'currency', currency:  process.env.NEXT_PUBLIC_CURRENCY}).format(data.capping)} 
                 */}
                 {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.capping)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={6} md={12} className='match-height' sx={{ position: 'relative', mb: 7 }}>
        <Grid item xs={12} md={12}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <div sx={{ display: 'flex' }}>
                <Typography component='div' variant='p' sx={{ fontWeight: 'bold', mb: 10 }}>
                  Your Monthly Target Meter
                  <Avatar sx={{ width: 'auto', mt: 5 }} variant='rounded'>
                    {data.monthlyTargetMeterPercentage?.toFixed(2)}%
                  </Avatar>
                </Typography>
              </div>
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Monthly Target: {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(0)} -  {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.monthlyTarget)}
              </Typography>
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Monthly Purchase: {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.currentMonthSale)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <div sx={{ display: 'flex' }}>
                <Typography component='div' variant='p' sx={{ fontWeight: 'bold', mb: 10 }}>
                  Your Annual Target Meter
                  <Avatar sx={{ width: 'auto', mt: 5 }} variant='rounded'>
                    {data.annualTargetMeterPercentage?.toFixed(2)} %
                  </Avatar>
                </Typography>
              </div>
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Annual Target: {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(0)} - {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.anualTarget)}
              </Typography>
              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                Annual Purchase: {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.totalSale)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} className='match-height'>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                Level Earning
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.totalIncome)}
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
                Income Wallet
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.walletAmount)}
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
                Purchase(Current month)
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.currentMonthSale)}
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
                Target(Current month)
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.monthlyTarget)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 5 }} className='match-height'>
        <Grid item xs={12} md={3}>
          <Card component='div' sx={{ position: 'relative', mb: 7 }}>
            <CardContent>
              <Typography
                component='div'
                variant='p'
                sx={{ fontWeight: 'bold', mb: 10, display: 'flex', justifyContent: 'space-between' }}
              >
                Co-founder Income
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.totalCofounderIncome)}
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
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.totalSale)}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                TOTAL PURCHASE
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
                {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.totalIncome)}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                TOTAL INCOME
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
                {data.total_downline}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                TOTAL DOWNLINE
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
                {data.direct_downline}
                <Avatar sx={{}} variant='rounded'></Avatar>
              </Typography>

              <Typography component='div' variant='p' sx={{ fontWeight: 'bold' }}>
                TOTAL DIRECT
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
