import { useEffect,useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import axios from "axios"



const Chart = ({ aspect, title }) => {
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

  const data = [
    { name: "Users", Total: user },
    { name: "ShopOwners", Total: shopOwner },
    { name: "Activated", Total: activate },
    { name: "Deactivated", Total: deactivate },
    // { name: "May", Total: 900 },
    // { name: "June", Total: 1700 },
  ];
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
           <YAxis/>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;