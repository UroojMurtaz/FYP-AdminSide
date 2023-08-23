import React, { useEffect, useState } from "react";
import "./subCat.scss";
import Navbar from "../../AdminSide/Navbar/Navbar";
import Sidebar from "../../AdminSide/Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link ,useLocation,useNavigate} from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { toast } from "react-toastify";

function User() {
  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState();
  const [refresh, setRefresh] = useState("");
  let [loading, setLoading] = useState(true);


  let { state } = useLocation();
  const navigate=useNavigate()

  const {
    id
  } = state ?? "";


  console.log(id)


  const fetchSubCategory = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/subcategory/subcategories/${id}`
    );
    if (data.success === true) {
      setLoading(false)
      console.log("data",data.SubCat)
      // setTotal(data.Count)
      setCategory(data.SubCat);
      

  
    } else {
      console.log(data.message);
    }

    // .then(fetchData())
  };

  useEffect(() => {
    fetchSubCategory();
  }, [refresh]);

 

  const DeleteUser = async (id) => {
    console.log(id);
    const { data } = await axios.delete(
      `http://localhost:5000/api/admin/user/${id}`
    );
    if (data.success === true) {
      toast.success(data.message);
      setRefresh(!refresh);
    } else {
      toast.error(data.message);
    }
  };

  const userColumns = [
    // { field: 'id', headerName: 'ID', width: 70},
    {
      field: "SrNo",
      headerName: "SR.NO",
      width: 100,
    },
    {
      field: "name",
      headerName: "CATEGORY",
      width: 280,
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
      field: "subcategory",
      headerName: "PARENT SUBCATEGORY",
      width: 200,
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
  const rows = category.map((category) => {
    count = count + 1;
      return {
        id: category._id,
        SrNo: count,
        img: category.image.imageUrl,
        subcategory:category.Category.categoryName,
        subcategoryId:category.Category._id,
        name: category.subcategoryName,
        Status: category.subcategoryStatus
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
              <button class="ui button" onClick={()=>navigate('/category/editSubCategory',{
        state: {
          Id: params.row.id,
          name: params.row.name,
          subcategory:params.row.subcategoryId,
          image: params.row.img,
          status: params.row.Status,
        },
      })}>
                <i class="edit icon" style={{fontSize:"18px"}}></i> Edit
              </button>
              </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
    <div className="SubCategoryList">
      <Sidebar />
      <div className="SubCategoryListContainer">
        <Navbar />
        <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
          SubCategories
        </h2>
        <div className="CategoryList-top">
            <div
              style={{
                color: "#56606E",
                backgroundColor: "#F5F5F5",
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                className="ui button"
                style={{
                  color: "white",
                  backgroundColor: "#7451f8",
                }}
                onClick={()=>(navigate('/category/addSubCategory',{
                  state:{
                    id:id
                  }
                }))}
               
              >
                Add SubCategory
              </div>
            </div>
        </div>
        <div className="CategoryList-bottom"></div>
        {/* <h2 className="ui dividing header" style={{ color: "#56606E", padding: "5px" }}>All Categories</h2> */}
        <div className="subcategoryTable">
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
     
    </>
  );
}

export default User;
