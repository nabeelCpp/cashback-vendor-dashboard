// ** React Imports
import { useState, forwardRef } from 'react'

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

import { create } from 'src/services/client.service'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'
import { toast } from 'react-hot-toast'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogAddClient = props => {
  const { isOpen, handleClose, onSubmit } = props

  // ** States
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // ** Hooks
  const bgColors = useBgColor()

  const handleSubmit = async () => {
    const result = await create(name, email)

    if (result.success) {
      onSubmit(result.client)
      toast.success('Client has been added.')
      handleClose()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <Dialog
      fullWidth
      open={isOpen}
      maxWidth='md'
      scroll='body'
      onClose={handleClose}
      TransitionComponent={Transition}
      onBackdropClick={handleClose}
    >
      <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 9, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
            Add New Client
          </Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12}>
            <Box
              sx={{
                py: 3,
                px: 4,
                borderRadius: 1,
                cursor: 'pointer',
                ...bgColors.primaryLight,
                border: theme => `1px solid ${theme.palette.primary.main}`
              }}
            >
              <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }} onClick={handleClose}>
                <Icon icon='mdi:home-outline' />
                <Typography variant='h6' sx={{ color: 'primary.main' }}>
                  Client
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              label='Client Name'
              placeholder='Client Name'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              label='Email'
              placeholder='abc@gmail.com'
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAddClient
