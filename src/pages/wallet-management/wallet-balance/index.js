import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import DialogAddClient from "src/views/clients/DialogAddClient";
import * as React from "react";
import {useEffect, useState} from "react";

import {getAll} from "src/services/client.service";
import ClientsTable from "../../../views/clients/ClientsTable";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios  from 'axios';
import { toast } from 'react-hot-toast';


const walletBalance = () => {
  const [data, setData] = useState([]);

  function createData(number, calories, fat, carbs, protein) {
    return { number, calories, fat, carbs, protein };
  }
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/wallet-mgt/mywallet`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(response=>{
      setData(response.data);
    }).catch(error => {
      toast.error(`${error.response.status}: ${error.response.data.message}`);
      if(error.response.status == 401){
        auth.logout();
      }
    })
  }

  useEffect(()=>{
    loadData()
  }, []);

  const rows = [
    createData(1,'Income Wallet', new Intl.NumberFormat( `${localStorage.localization}`, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(data.amount)),
  ];
  return (

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell align='center' >Wallet</TableCell>
          <TableCell align='center'>Amount</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.number}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.number}
            </TableCell>
            <TableCell align='center'>{row.calories}</TableCell>
            <TableCell align='center'>{row.fat}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}


export default walletBalance
