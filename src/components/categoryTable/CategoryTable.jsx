import React, { useEffect, useState } from "react";
import "./categoryTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import axios from "axios";
import { toast } from "react-toastify";

function User() {
  const [category, setCategory] = useState([]);
  const [Editcategory, setEditCategory] = useState([]);
  const [total, setTotal] = useState();
  const [refresh, setRefresh] = useState("");
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const fetchCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/category/categories"
    );
    if (data.success === true) {
      setLoading(false)
      console.log(data);
      // setTotal(data.Count)
      setCategory(data.categorie);
    } else {
      toast.error(data.message)
      console.log(data.message);
    }

    // .then(fetchData())
  };

  useEffect(() => {
    fetchCategory();
  }, [refresh]);

 
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
      width: 200,
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
      headerName: "SUBCATEGORY",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            style={{
              color: "rgb(102, 143, 189)",
              fontWeight: "500",
              fontSize: "13.5px",
              marginLeft: "40%",
            }}
            onClick={() =>
              navigate("/category/subcategory", {
                state: {
                  id: params.row.id,
                },
              })
            }
          >
            {params.row.subcategory}
          </div>
        );
      },
    },
    {
      field: "Status",
      headerName: "STATUS",
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
      id: category._doc._id,
      SrNo: count,
      img: category._doc.image.imageUrl,
      subcategory: category.count,
      name: category._doc.categoryName,
      Status: category._doc.categoryStatus,
    };
  });
  console.log("rows", rows);

  const actionColumn = [
    {
      field: "action",
      headerName: "ACTION",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           
           <div >
              <button class="ui button" onClick={()=>navigate('/category/editCategory',{
        state: {
          id: params.row.id,
          name: params.row.name,
          image: params.row.img,
          status: params.row.Status,
        },
      })}>
                <i class="edit icon" style={{fontSize:"18px"}}></i> Edit
              </button>
              </div>
             
              
            

            {/* <div>
<input type="checkbox" id="toggle" />
            <label for="toggle" class="toggleWrapper">
              <div class="toggle"></div>
            </label>
</div> */}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="categoryTable">
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
    </>
  );
}

export default User;
