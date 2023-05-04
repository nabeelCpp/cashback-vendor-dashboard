import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
const PlanHistory = () => {
  const [history, setHistory] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userpanel/plan/history`, {
      headers: {
        "Authorization": `Bearer ${localStorage.accessToken}`
      }
    }).then(response => {
      setHistory(response.data)
    }).catch(error => {
      if(error){
        toast.error(`${error.response.status}: ${error.response.data.message}`);
        if(error.response.status == 401){
          auth.logout();
        }
      }
    });

  }
  useEffect(()=>{
    loadData();
  }, []);
  const columns = [
    { field: 'sn', headerName: 'SR#', width: 100 },
    { field: 'lifejacket_id', headerName: 'Subscription No', width: 250 },
    { field: 'package_name', headerName: 'Package Name', width: 200 },
    { field: 'amount', headerName: `Amount (${process.env.NEXT_PUBLIC_CURRENCY})`, width: 150 },
    { field: 'date', headerName: `Start Date`, width: 150, renderCell: params => (new Date(params.row.date).toLocaleDateString()) },
    { field: 'expire_date', headerName: `End Date`, width: 150, renderCell: params => (new Date(params.row.expire_date).toLocaleDateString()) }
  ]

  return (
    <>
   
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={history} columns={columns} pageSize={20} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default PlanHistory
