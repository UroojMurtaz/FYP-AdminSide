import {useState} from "react"
import "./Single.scss";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import axios from 'axios'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Single = () => {
  const [act,setAct]=useState('Activated')
  const [diact,setDiAct]=useState('Deactivated')
  const navigate=useNavigate()
  let { state } = useLocation();

  const { id, name, email, img, phoneNumber ,Address,Country,Status} = state ?? "";

  const Activated=async(id)=>{
      const Updatedproduct={
        Status:act,
      }
      await axios.put(`http://localhost:5000/api/admin/updateStatus/${id}`, Updatedproduct)
      .then((res)=>console.log(res.data))
      toast.success("ShopOwner Activated Successfully")
      navigate('/admin/ShopownerList')
  }
  const Deactivated=async(id)=>{
    const Updatedproduct={
      Status:diact,
    }
    await axios.put(`http://localhost:5000/api/admin/updateStatus/${id}`, Updatedproduct)
    .then((res)=>console.log(res.data))
    toast.success("ShopOwner Deactivated Successfully")
    navigate('/admin/ShopownerList')
  }
 
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="users">
          <Link to="/shopowner">
            <div className="ui button">Back</div>
          </Link>
        </div>
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+92 {phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                   {Address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{Country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className={`status ${Status}`}>{Status}</span>
                </div>
                <div className="button">
        <div className="ui positive button" onClick={()=>Activated(id)}>Activate</div>
        <div className="ui negative button" onClick={()=>Deactivated(id)}>Deactivate</div>
        </div>
            </div>
              </div>
              
          </div>
          <div className="right">
            {/* <div className="ui positive button">
Activate
            </div>
            <div className="ui negative button">
Deactivate
            </div> */}
          </div>
          
        </div>
        {/* <div className="button">
        <div className="ui positive button">Activate</div>
        <div className="ui negative button">Deactivate</div>
        </div> */}
        
      </div>
    </div>
  );
};

export default Single;
