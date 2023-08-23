import { useState,useEffect } from "react";
import Sidebar from "../../../AdminSide/Sidebar/Sidebar";
import Navbar from "../../../AdminSide/Navbar/Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./EditCategory.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import ClipLoader
 from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";

function EditCategory() {
  let { state } = useLocation();

  const {
    id,
    name,
    image,
    status,
  } = state ?? "";
  const [categoryStatus, setCategoryStatus] = useState(status);
  const [categoryName, setCategoryName] = useState(name);
  const [file, setFile] = useState();
  const [Image, setImage] = useState(image);
  let [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  console.log(image)

  
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
      const { data } = await axios.put(
        `http://localhost:5000/api/category/${id}`,
        formData
      );
      if(data.success==true){
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
 
 
  return (
    <div className="EditCategory">
      <Sidebar />
      <div className="EditCategoryContainer">
        <Navbar />
        <h2 className="ui dividing header" style={{ color: "#56606E", padding: "5px" }}>Edit Category</h2>
        {/* <div
          style={{
            color: "#56606E",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="EditCategory-Back-Button">
            <KeyboardBackspaceIcon className="EditCategory-icon" />

            <span>Back</span>
          </div>
          <button
            className="ui button"
            style={{
              color: "white",
              backgroundColor: "#7451f8",
              marginLeft: "15px",
            }}
            onClick={()=>Add()}
          >
            Save Update
          </button>
        </div> */}
         <div
          style={{
            color: "#56606E",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
         
          {loading ? 
          <div 
          style={{
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
          Save Changes
        </button>}
        </div>
       

        <div className="EditCategory-main">
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
                          : Image
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
                  value={categoryName}
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
                  value={categoryStatus}
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

export default EditCategory;
