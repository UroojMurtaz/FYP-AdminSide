import {useState,useEffect} from 'react'
import './OrderList.scss'
import Navbar from '../../../AdminSide/Navbar/Navbar'
import Sidebar from '../../../AdminSide/Sidebar/Sidebar'
import MetaData from "../../../components/MetaData/MetaData"
import { DataGrid } from "@mui/x-data-grid";
import { Link ,useLocation,useNavigate} from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { toast } from "react-toastify";

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState();
    const [refresh, setRefresh] = useState("");
    let [loading, setLoading] = useState(true);

  
    let { state } = useLocation();
    const navigate=useNavigate()

    const fetchOrders = async () => {
        const { data } = await axios.get(
          `http://localhost:5000/api/order/getTotal`
        );
        if (data.success === true) {
          setLoading(false)
          console.log("data",data.orders)
          // setTotal(data.Count)
          setOrders(data.orders);
    
      
        } else {
          toast.error(data.message)
          console.log(data.message);
        }
    
        // .then(fetchData())
      };
    
      useEffect(() => {
        fetchOrders();
      }, [refresh]);

      const userColumns = [
        {
          field: "SrNo",
          headerName: "SR.NO",
          width: 100,
        },
        {
            field: "trackigID",
            headerName: "TRACKING ID",
            width: 150,
          },
        {
          field: "name",
          headerName: "CUSTOMER",
          width: 150,
        },
        {
          field: "totalprice",
          headerName: "TOTAL PRICE",
          width: 150,
        },
        {
          field: "Status",
          headerName: "Status",
          width: 150,
          renderCell: (params) => {
            return (
              <div className={`cellWithStatus ${params.row.Status}`}>
                {params.row.Status}
              </div>
            );
          },
        },
      ];


      var count = 0;
      const rows = orders.map((order) => {
        count = count + 1;
          return {
            id: order._id,
            SrNo: count,
            trackigID: order.trackigID,
            // suborder:order.order.orderName,
            // suborderId:order.order._id,
            totalprice:order.totalPrice,
            name: order.user.name,
            email: order.user.email,
            Status: order.orderStatus,
            orderItems: order.orderItems,
            shippingPrice:order.shippingPrice,
            shippingInfo:order.shippingInfo
          };
      });
      console.log("rows", rows)

      const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellAction">
               <div >
                  <button class="ui button" onClick={()=>navigate('/orders/:orderid',{
            state: {
              Id: params.row.id,
              name: params.row.name,
              totalprice:params.row.totalprice,
              orderItems: params.row. orderItems,
              shippingPrice:params.row.shippingPrice,
              shippingInfo:params.row.shippingInfo,
              email:params.row.email,
              Status:params.row.Status
            //   status: params.row.Status,
            },
          })}>
                    <i class="edit icon" style={{fontSize:"18px"}}></i> Details
                  </button>
                  </div>
              </div>
            );
          },
        },
      ];
    
  return (
    <div className='order-list'>
      <MetaData title="Orders"/>
      <Sidebar/>
      <div className="order-listContainer">
        <Navbar/>
         <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
          All Orders
        </h2>
        <div className="suborderTable">
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          loading={loading}
        />
      </div>
      </div>
    </div>
  )
}

export default OrderList