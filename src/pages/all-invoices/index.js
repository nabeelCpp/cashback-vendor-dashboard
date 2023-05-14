import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import { useAuth } from 'src/hooks/useAuth'
const AllInvoices = () => {
  const auth = useAuth()
  const [history, setHistory] = useState([])
  const loadData = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/franchisepanel/invoices/all`, {
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
  const viewInvoice = (id) => {
    console.log(id);
  }
  const columns = [
    { field: '', headerName: 'SN#', width: 60, renderCell: params => params.row.key + 1 },
    { field: 'user_id', headerName: 'User id', width: 250 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'invoice_no', headerName: 'Invoice No', width: 200 },
    { field: 'net_amount', headerName: `Total Amount (${process.env.NEXT_PUBLIC_CURRENCY})`, width: 150 },
    { field: 'payment_date', headerName: `End Date`, width: 150, renderCell: params => (new Date(params.row.payment_date).toLocaleDateString()) },
    { field: 'view_invoice', headerName: `View Invoice`, width: 150, renderCell: params => {
      return (<Link
                href={"/viewInvoices?inv="+params.row.invoice_no}
                
                variant="body2"
                onClick={ () => {
                  viewInvoice(params.row.invoice_no)
                } }
              >
                View Invoice
              </Link>
              )
    } },
  ]

  return (
    <>
      <h4>Eshop Invoices</h4>
      <Card component='div' sx={{ position: 'relative', mb: 7 }}>
         <DataGrid rows={history} columns={columns} getRowId={(row) => row.key} pageSize={20} rowsPerPageOptions={[10]} autoHeight />
      </Card>
    </>
  )
}

export default AllInvoices
