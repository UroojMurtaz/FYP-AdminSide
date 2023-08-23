import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./addShopowner.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddShopowner() {
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [country, setCountry] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState();

  const Add = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("FullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("Country", country);
    formData.append("Address", address);
    formData.append("phoneNumber", phoneNumber);
    formData.append("file", file);
    formData.append("role", "ShopOwner");

    // for (let i = 0; i < image.length; i++) {
    //   formData.append("files", image[i]);
    // }

    if (file == null) {
      toast.error("Please add profile photo");
    } else if (
      name == null ||
      fullName == null ||
      email == null ||
      password == null ||
      country == null ||
      address == null ||
      phoneNumber == null
    ) {
      toast.error("Please add all fields");
    } 
    else if(password.length<8){
      setError("Password should be greater than 8");
    }
    else {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/addShopowner",
        formData
      );
      if(data.success==true){
          toast.success("Shop Owner Add Successfully");
      }
      else{
        toast.error(data.message);
      }
      // toast.success("Shop Owner Add Successfully");
      console.log("data",data)
    }

    // toast.success("Shop Owner Add Successfully")
  };
  // console.log("URL,",URL.createObjectURL(file))
  // console.log(file);

  return (
    <div className="shopowner_container">
      <Sidebar />
      <div className="shopowner_new_container">
        <Navbar />
        <div className="top">
          <h1>Add ShopOwner</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
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
              <div className="formInput">
                <label>Username</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Name and Surname</label>
                <input
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  type="number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />
                 {error ? <span className='error'>{error}</span>:null}
              </div>
             
              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input
                  type="text"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <button type="button" onClick={() => Add()}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddShopowner;
