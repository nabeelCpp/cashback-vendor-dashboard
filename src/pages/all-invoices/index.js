import { DataGrid } from '@mui/x-data-grid'
import Card from '@mui/material/Card'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import { Table, Input } from 'antd'
const AllInvoices = () => {
  const auth = useAuth()
  const [history, setHistory] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const sorter = ['ascend', 'descend'];
  const [pagination, setPagination] = useState({
    pageSize: 10, // Initial page size
    current: 1 // Initial current page
  })
  const [searchedText, setSearchedText] = useState('')
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
    {
      title: 'SN#',
      dataIndex: 'key',
      width: 60,
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'User id',
      dataIndex: 'user_id',
      width: 250,
      sorter: (a, b) => a.user_id.localeCompare(b.user_id),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.user_id)
            .replace(' ', '')
            .toLowerCase()
            .trim()
            .includes(value.replace(' ', '').toLowerCase().trim()) ||
            String(record.username)
            .replace(' ', '')
            .toLowerCase()
            .trim()
            .includes(value.replace(' ', '').toLowerCase().trim()) ||
            String(record.invoice_no)
            .replace(' ', '')
            .toLowerCase()
            .trim()
            .includes(value.replace(' ', '').toLowerCase().trim()) ||
            String(record.net_amount)
            .replace(' ', '')
            .toLowerCase()
            .trim()
            .includes(value.replace(' ', '').toLowerCase().trim()) ||
            String(record.payment_date)
            .replace(' ', '')
            .toLowerCase()
            .trim()
            .includes(value.replace(' ', '').toLowerCase().trim())
        )
      }
    },
    {
      title: 'Username',
      dataIndex: 'username',
      width: 200,
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Invoice No',
      dataIndex: 'invoice_no',
      width: 200,
      sorter: (a, b) => a.invoice_no.localeCompare(b.invoice_no),
    },
    {
      title: `Total Amount (${process.env.NEXT_PUBLIC_CURRENCY})`,
      dataIndex: 'net_amount',
      width: 150,
      sorter: (a, b) => a.net_amount - b.net_amount,
    },
    {
      title: 'End Date',
      dataIndex: 'payment_date',
      width: 150,
      render: (text, record) => new Date(record.payment_date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.payment_date) - new Date(b.payment_date),
    },
    {
      title: 'View Invoice',
      dataIndex: 'view_invoice',
      width: 150,
      render: (text, record) => (
        <Link href={`/viewInvoices?inv=${record.invoice_no}`} variant="body2" onClick={() => viewInvoice(record.invoice_no)}>
          View Invoice
        </Link>
      ),
    },
  
  ]

  return (
    <>
      <h4>Eshop Invoices</h4>
      <Card component='div' sx={{ position: 'relative', mb: 7,p:7 }}>
      <Input.Search
      placeholder='Search here.....'
      style={{ maxWidth: 300, marginBottom: 8, display: 'block', height: 50, float: 'right', border: 'black' }}
      onSearch={value => {
        setSearchedText(value)
      }}
      onChange={e => {
        setSearchedText(e.target.value)
      }}
    />
    <Table
      columns={columns}
      dataSource={history}
      loading={tableLoading}
      sortDirections={sorter}
      pagination={
        history?.length > 0
          ? {
              defaultCurrent: 1,
              total: history?.length,
              defaultPageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `Total: ${total}`,
              pageSizeOptions: ['10', '20', '50', '100'],
              locale: { items_per_page: '' }
            }
          : false   
      }  
      onChange={pagination => setPagination(pagination)}
    />


         {/* <DataGrid rows={history} columns={columns} getRowId={(row) => row.key} pageSize={20} rowsPerPageOptions={[10]} autoHeight /> */}
      </Card>
    </>
  )
}

export default AllInvoices
