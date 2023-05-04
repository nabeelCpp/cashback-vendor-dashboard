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
import Button from '@mui/material/Button'
// end
const RefferLink = () => {
  var [data, setData] = useState([])
  // by nabeel
  let loadData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel`, {
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`
        }
      })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        toast.error(`${error.response.status}: ${error.response.data.message}`)
        if (error.response.status == 401) {
          auth.logout()
        }
      })
  }

  useEffect(() => {
    loadData()
  }, [])
  // end
  return (
    <div>
      <h3>REFERRAL LINK</h3>
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
        <CardContent>
          <Typography variant='p' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>
              Referral Link:{' '}
              <a
                className='btn btn-light'
                href={
                  (process.env.NEXT_PUBLIC_BASE_URL + 'userpanel/register?referral=' + data.referralLink != undefined &&
                    data.referralLink) ||
                  ''
                }
              >
                {process.env.NEXT_PUBLIC_BASE_URL}userpanel/register?referral=
                {(data.referralLink != undefined && data.referralLink) || ''}
              </a>
            </Typography>

            <Typography>
              <Button variant='contained' sx={{ mr: 2 }}>
                Copy
              </Button>
            </Typography>
          </Typography>

          <link></link>

          <Grid item md={6} xs={12}  sx={{ mt: 20,mb:10 }}>
            <Button variant='contained' sx={{ mr: 2 }}>
            Share on facebook
            </Button>
            <Button variant='contained' sx={{ mr: 2 }}>
            Share on Whatsapp
            </Button>
            <Button variant='contained' sx={{ mr: 2 }}>
            Share on Twitter
            </Button>
            <Button variant='contained' sx={{ mr: 2 }}>
            Share on Google
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default RefferLink
