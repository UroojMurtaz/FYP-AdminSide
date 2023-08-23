import React,{useContext} from 'react'
import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import {Link,useNavigate} from "react-router-dom"
import { DarkModeContext } from '../../context/darkModeContext';
import { toast } from 'react-toastify';

export default function Sidebar() {
    const {dispatch}=useContext(DarkModeContext)
    const navigate=useNavigate()
    const Logout=()=>{
        localStorage.clear()
        toast.success("Logout Successfully")
        navigate('/')

    }
    return (
        <div className='sidebar'>
            <div className="topp">
                <Link to="/admin">
                <span className='logo'>BareBeauty</span>
               <div>
               <span className='logo'>Admin</span>
               </div>
                </Link>            
            </div>
            <hr />
            <div className="center">
                <ul>
                <p className='title'>MAIN</p>
                <Link to="/">
                <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                </Link>
                    <p className='title'>LISTS</p>
                    <Link to="/admin/users">
                    <li>
                        <PersonOutlineIcon className="icon" />
                        <span>Users</span>
                    </li>
                    </Link>
                    <Link to='/admin/ShopownerList'>
                    <li>
                        <StoreIcon className="icon" />
                        <span>ShopOwners</span>
                    </li>
                    </Link>
                    <Link to="/category">
                    <li>
                        <PersonOutlineIcon className="icon" />
                        <span>Category</span>
                    </li>
                    </Link>
                    <Link to='/orders'>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders</span>
                    </li>
                    </Link>
                    <Link to='/products'>
                    <li>
                        <LocalShippingIcon className="icon" />
                        <span>Products</span>
                    </li>
                    </Link>
                   
                    <p className='title'>USEFUL</p>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>Stats</span>
                    </li>
                    <Link to='/notifications'>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>Notifications</span>
                    </li>
                    </Link>
        
                    <p className='title'>USER</p>
                    {/* <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li> */}
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span onClick={()=>Logout()}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
               <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
               <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
             


            </div>
        </div>
    )
}
