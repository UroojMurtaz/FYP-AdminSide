import React, { useEffect, useState } from "react";
import "./shopOwnerList.scss";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { toast } from "react-toastify";

function ShopOwner() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const[refresh,setRefresh]=useState()
  let [loading, setLoading] = useState(true);

  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/admin/user?`,{ params: { role: "ShopOwner" } });
    if (data.success === true) {
     setUsers(data.users);
     setLoading(false)
    } else {
      console.log(data.message);
      toast.error(data.message)
    }

    // .then(fetchData())
  };

  useEffect(() => {
    getUser();
  }, [refresh]);

  console.log("Users", users);

  const DeleteUser=async(id)=>{
     console.log(id)
    const {data}=await axios.delete(`http://localhost:5000/api/admin/user/${id}`)
    if(data.success===true){
      toast.success(data.message)
      setRefresh(!refresh)
    }else{
      toast.error(data.message)
    }
  }

  const rows = users.map((user) => {
    return {
      id: user._id,
      name: user.FullName,
      img: user.profilePhoto.imageUrl,
      email: user.email,
      role: user.role,
      Status: user.Status,
      username: user.name,
      phoneNumber: user.phoneNumber,
      Address: user.Address,
      Country:user.Country,
    };
  });
  console.log("rows", rows);

  const shopOwnerColumns = [
    // { field: 'id', headerName: 'ID', width: 70},
    {
      field: "name",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImage">
            <img src={params.row.img} alt="avatar" className="cellImg" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
    //   {
    //     field: "Status",
    //     headerName: "Status",
    //     width: 100,
    //   },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.Status}`}>
            {params.row.Status}
          </div>
        );
      },
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <VisibilityOutlinedIcon
              className="icon"
              onClick={() => {
                navigate("/admin/ShopOwnerid", {
                  state: {
                    id:params.row.id,
                    username: params.row.username,
                    name: params.row.name,
                    email: params.row.email,
                    img: params.row.img,
                    phoneNumber: params.row.phoneNumber,
                    Address:params.row.Address,
                    Country:params.row.Country,
                    Status:params.row.Status
                  },
                });
              }}
            />

            <DeleteOutlineOutlinedIcon className="icon" onClick={()=>DeleteUser(params.row.id)}/>
          </div>
        );
      },
    },
  ];

  return (
    <div className="shopOwner">
      <Sidebar />
      <div className="shopOwner_container">
        <Navbar />
        <div className="ShopOwnerTable">
          <div className="top">
            <Link to="/admin/addShopowner">
              <div className="ui button">Add ShopOwner</div>
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={rows}
            columns={shopOwnerColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ShopOwner;
