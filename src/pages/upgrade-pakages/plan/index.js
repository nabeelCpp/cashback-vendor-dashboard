// ** MUI Imports
import Grid from '@mui/material/Grid'
import { divide } from 'lodash'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// ** Demo Components Imports
import Welcome from 'src/views/dashboard/Welcome'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useAuth } from 'src/hooks/useAuth'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
// by nabeel
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react';
import axios from 'axios';
// end
const Plan = () => {
  // by nabeel
  const auth = useAuth()
  const [data, setData] = useState([]);
  let loadData = async () => {
    console.log('asdasda')
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/upgrade/plan`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(response => {
      setData(response.data);
    }).catch(error => {
      toast.error(`${error.response.status}: ${error.response.data.message}`);
      if(error.response.status == 401){
        auth.logout();
      }
    });

  }
  useEffect(() => {
    loadData()
  }, []
  );
  // end
  return (
    <div>
     <h3>Plan Subscription</h3>
     {data.success ? (
        <Grid item xs={12} md={5}>
            <Card component='div' sx={{ position: 'relative', mb: 7,textAlign:'center',minHeight:'300px' ,display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
              <CardContent>
                <Typography component='div' variant='p' >
                  {data.message}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ):(
          Array.isArray(data) ? (
            <Grid container spacing={6} className='match-height' sx={{ position: 'relative', mb: 7,textAlign:'center',minHeight:'300px' }}>
              {data.map(pack=>{
                return <Grid item xs={12} md={5}>
                  <Card component='div' sx={{ position: 'relative', mb: 7,textAlign:'center',minHeight:'300px' ,display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
                    <CardContent>
                      <Typography component='div' variant='p' sx={{ fontWeight: 'bold', mb: 3 }}>
                        {pack.name}
                      </Typography>

                      <Typography component='h1' variant='p' sx={{ fontWeight: '500' }}>
                        {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(pack.amount)}
                      </Typography>
                      <Typography component='div' variant='p' >
                        Validity (Days): {pack.roi_duration}
                      </Typography>
                      <Typography component='div' variant='p' >
                        Target Duration : 1 Month
                      </Typography>
                      <Typography component='div' variant='p' >
                      Target Sale : {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(pack.amount)}
                      </Typography>
                      <Typography component='div' variant='p' >
                      Max Earning : {new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(pack.capping)}
                      </Typography>

                    </CardContent>
                    <Button sx={{maxWidth:'150px',mb:'20px'}}  variant="contained">Subscribe</Button>
                  </Card>
                </Grid>
              })}
            </Grid>
          ):(
            <Grid item xs={12} md={5}>
            <Card component='div' sx={{ position: 'relative', mb: 7,textAlign:'center',minHeight:'300px' ,display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
              <CardContent>
                <Typography component='div' variant='p' >
                  No package Found!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          )
        )}
    </div>
  )
}

export default Plan
