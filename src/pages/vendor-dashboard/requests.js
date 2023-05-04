import React, { useEffect, useState } from 'react'
import BounceLoader from 'react-spinner'
import { RequestsHeader, RequestsBody } from '/src/views/teacherRequests'

import { RequestProvider, useRequests } from '/src/context/requests'
import { SocketProvider, useSocket } from '/src/context/socket/teacherSocket'

import { useAuth } from 'src/hooks/useAuth'
import { getByClientId as getGrades } from 'src/services/grade.service'
import { Box } from '@mui/material'

const Requests = props => {
  return (
    <RequestProvider>
      <SocketProvider>
        <Main {...props} />
      </SocketProvider>
    </RequestProvider>
  )
}

const Main = () => {
  const [socket] = useSocket()
  const auth = useAuth()
  const [requests, setRequests] = useRequests()
  const [show, setShow] = useState(true)
  const [grades, setGrades] = useState([])

  useEffect(() => {
    if (socket) {
      // Attach events to the Socket
      socket.on('connect', () => {
        console.log('Connected to Socket Server')
      })

      socket.on('disconnect', () => {
        console.log('Disconnected from Socket Server')
      })

      socket.on('_client_requests', data => {
        console.log('[CLIENT] Existing Requests: ', data)
        setRequests(data)
      })





      socket.on('_new_request', data => {
        console.log('[TEACHER] New Request: ', data);

        // Check if there are any existing requests
        if (requests) {
          // Check if the new request is already present in the array
          const existing_request = requests.find(r => r.id === data.id);

          if (existing_request) {
            // Replace the existing request's values with new ones
            const updatedRequests = requests.map(
              r => r.id === data.id ? data : r
            )

            // Update the requests
            setRequests(updatedRequests);
          } else {
            // Add the new request to the requests object.
            setRequests([data, ...requests])
          }
        } else {
          setRequests([data])
        }
      })
    }

  }, [socket])
  const base64Url = window.localStorage.getItem("aliasToken").split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const jwtToken =JSON.parse(window.atob(base64));

  useEffect(() => {
    getGrades(jwtToken.id).then(res => {
      if (res.success) {
        setGrades(res.grades)
      }
    })
  }, [auth])

  return (
    <Box>
      {/* <RequestsHeader /> */}

      <RequestsBody grades={grades} />
    </Box>
  )
}

export default Requests
