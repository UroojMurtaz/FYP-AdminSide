import {useEffect,useState} from 'react'
import './Widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios"
function Widget({ type }) {
    const[user,setUser]=useState()
    const[shopOwner,setShopOwner]=useState()
    const[activate,setActivate]=useState()
    const[deactivate,setDeactivate]=useState()

    const count=async()=>{
        const {data}=await axios.get("http://localhost:5000/api/admin/count")
        // console.log(data)
        // setUser(data.users)
        if(data.success===true){
            console.log(data)
            setUser(data.Totaluser)
            setShopOwner(data.TotalShopOwners)
            setActivate(data.activate)
            setDeactivate(data.deactivate)


        }else{
            console.log(data.message)
        }
    }

    useEffect(()=>{
        count()
    },[])
    // console.log("user",user)
    let Data;
    let total;

    //temporary
    // const amount = 100;
    const diff = 20;


    switch (type) {
        case "user":
            Data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                total:user,
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                        color: "purple",
                           
                        }}
                    />
                ),
            };
            console.log(shopOwner)
            break;
            // console.log(shopOwner)
        case "order":
            Data = {
                title: "SHOPOWNERS",
                isMoney: false,
                link: "View all Shopowners",
                total:shopOwner,
                icon: <PersonIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        color: "goldenrod",
                    }} />,

            };
            break;
        case "earning":
            Data = {
                title: "ACTIVATED SHOPOWNERS",
                isMoney: true,
                link: "View all shopowners",
                total:activate,
                icon: <PersonOutlinedIcon className="icon"
                    style={{
                        backgroundColor: "rgba(0, 128, 0, 0.2)",
                        color: "green"
                    }} />,

            };
            break;
        case "balance":
            Data = {
                title: "DEACTIVATED SHOPOWNERS",
                isMoney: true,
                link: "See all shopowners",
                total:deactivate,
                icon: <PersonIcon className="icon"
                    style={{
                        color: "crimson",
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                    }} />,

            };
            break;
        default:
            break;
    }

    return (
        <div className="Admin_widget">
            <div className="left">
                <span className="title">{Data.title}</span>
                <span className="counter">
                    {Data.total}
                </span>
                <span className="link">{Data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {/* {diff} % */}
                </div>
                {Data.icon}
            </div>
        </div>
    );
}

export default Widget