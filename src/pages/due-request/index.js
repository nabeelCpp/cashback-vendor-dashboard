import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
const DueRequest = () => {
  const [history, setHistory] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/dues/report`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(response => {
      const tempData = response.data.map((d, key) => {
        return {key, ...d}
      })
      setHistory(tempData)
    }).catch(error => {
      if(error){
        toast.error(`${error.response? error.response.status:''}: ${error.response?error.response.data.message:error}`);
        if (error.response && error.response.status == 401) {
          auth.logout();
        }
      }
    });

  }
  useEffect(()=>{
    loadData();
  }, []);
  const columns = [
    { field: '', headerName: 'SN#', width: 60, renderCell: params => params.row.key + 1 },
    { field: 'name', headerName: 'Name', width: 250, renderCell: params => params.row.first_name+' '+params.row.last_name },
    { field: 'amount', headerName: `Amount (${process.env.NEXT_PUBLIC_CURRENCY})`, width: 150 },
    { field: 'pay_proof', headerName: 'Pay Proof', width: 200 },
    { field: 'payment_mode', headerName: 'Payment Mode', width: 200 },
    { field: 'posted_date', headerName: `Start Date`, width: 150, renderCell: params => (new Date(params.row.posted_date).toLocaleDateString()) },
    { field: 'admin_remark', headerName: `Remark`, width: 250 },
    { field: 'status', headerName: `Status`, width: 250, renderCell: params => params.row.status == 0 ? "Pending" : (params.row.status == 2 ? "Cancelled" : "Approved") }
  ]

  return (
    <>
      <h4>View Due Request</h4>
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={history} columns={columns} pageSize={20} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default DueRequest
