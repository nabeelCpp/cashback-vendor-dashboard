import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import DialogAddClient from "src/views/clients/DialogAddClient";
import * as React from "react";
import {useEffect, useState} from "react";

import {getAll} from "src/services/client.service";
import ClientsTable from "../../views/clients/ClientsTable";

const Clients = () => {
  const [ isAddModalVisible, setAddModalVisible ] = useState(false)

  const [clients, setClients] = useState([])

  useEffect(
    () => {
      const fn = async () => {
        const data = await getAll()

        if (data.success) {
          setClients(data.clients)
        }
      }

      fn()
    }, []
  )

  const addClient = (client) => {
    setClients([client, ...clients])
  }
  const handleOpen = () => {
    setAddModalVisible(true)
  }
  const handleClose = () => {
    setAddModalVisible(false)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Box sx={styles.headingContainer}>
          <Typography variant='h5'>Clients</Typography>
          <Button variant='contained' color='primary' onClick={() => handleOpen()}>
            Add Client
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <ClientsTable clients={clients} setClients={setClients} />
      </Grid>
      <DialogAddClient onSubmit={addClient} isOpen={isAddModalVisible} handleClose={handleClose} />
    </Grid>
  )
}

const styles = {
  headingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}

export default Clients
