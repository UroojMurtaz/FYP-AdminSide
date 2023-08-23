import { useState,useEffect } from "react";
import Sidebar from "../../../AdminSide/Sidebar/Sidebar";
import Navbar from "../../../AdminSide/Navbar/Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./addCategory.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import ClipLoader
 from "react-spinners/ClipLoader";
 import {useNavigate} from "react-router-dom";

function AddCategory() {
  const [categoryStatus, setCategoryStatus] = useState();
  const [categoryName, setCategoryName] = useState();
  const [file, setFile] = useState();
  let [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const Add = async () => {
   if (
      categoryStatus == null ||
      categoryName == null 
    ) {

      toast.error("Please add all fields");
    } 

    else {
      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("categoryStatus",categoryStatus);
      formData.append("categoryName", categoryName);
      const { data } = await axios.post(
        "http://localhost:5000/api/category/addCategory",
        formData
      );
      if(data.success==true){
        // setLoading(false)
        navigate('/category')
        toast.success("Category Add Successfully");
      }
      else{
        toast.error(data.message);
      }
      // toast.success("Shop Owner Add Successfully");
      console.log("data",data)
    }

    // toast.success("Shop Owner Add Successfully")
  };
  useEffect(()=>{
    console.log("hello")
  },[])
 
  return (
    <div className="AddCategory">
      <Sidebar />
      <div className="AddcategoryContainer">
        <Navbar />
        <h2 className="ui dividing header" style={{ color: "#56606E", padding: "5px" }}>New Category</h2>
        <div
          style={{
            color: "#56606E",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <div className="AddCategory-Back-Button">
            <KeyboardBackspaceIcon className="AddCategory-icon" />

            <span>Back</span>
          </div> */}
          {loading ? 
          <div 
          style={{
          // width:" 100%",
          // display: "flex",
          // justifyContent: "flex-end",
          marginLeft: "15px",
          }}>
            <ClipLoader
        color="#6436d6"
        loading={loading}
        size={50}
      />
            </div>
          :  <button
          className="ui button"
          style={{
            color: "white",
            backgroundColor: "#7451f8",
            marginLeft: "15px",
          }}
          onClick={()=>Add()}
        >
          Save Category
        </button>}
        </div>
       

        <div className="Addcategory-main">
          <div className="top">
          
          </div>

          <div className="bottom"></div>
          <h3 className="ui dividing header" style={{ color: "#56606E" }}>
            Category
          </h3>
          <div className="stepper-image">
                  <div className="stepper-image-left">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="steeper-image-right">
                    <div className="formInput">
                      <label htmlFor="file">
                        Image: <DriveFolderUploadOutlinedIcon />
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
          <form className="ui forms">
            <div class="ui form">
              <div class="inline required field">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="Enter Category Title"
                  onChange={(e) => setCategoryName(e.target.value)}
                  style={{"width":"25rem"}}
                />
              </div>

              {/* <div class="inline required field">
                <label>Hello</label>
                <input type="text" placeholder="hello"/>
              </div> */}
             
              <div class="inline required field">
                <label>Select Status</label>
                <select
                  class="ui fluid dropdown"
                  onChange={(e) => setCategoryStatus(e.target.value)}
                  style={{"width":"25rem",marginLeft:"14.5px"}}
                >
                  <option value="" disabled selected>
                    Select Status
                  </option>
                  <option value="Enabled">Enabled</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
