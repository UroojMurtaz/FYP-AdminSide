import React, { useEffect, useState } from "react";
import './piechart.scss'
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Stack } from "@mui/material";
import SquareIcon from '@mui/icons-material/Square';
import axios from "axios";

const COLORS = ["#6439ff", "#8a72e2", "#a79fc9", "#625a81"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PeieChart() {
  const [user, setUser] = useState();
  const [shopOwner, setShopOwner] = useState();
  const [activate, setActivate] = useState();
  const [deactivate, setDeactivate] = useState();

  const count = async () => {
    const { data } = await axios.get("http://localhost:5000/api/admin/count");
    // console.log(data)
    // setUser(data.users)
    if (data.success === true) {
      console.log(data);
      setUser(data.Totaluser);
      setShopOwner(data.TotalShopOwners);
      setActivate(data.activate);
      setDeactivate(data.deactivate);
    } else {
      console.log(data.message);
    }
  };

  useEffect(() => {
    count();
  }, []);
  const data = [
    { name: "Group A", value: user },
    { name: "Group B", value: shopOwner },
    { name: "Group C", value: activate },
    { name: "Group D", value: deactivate },
  ];
  return (
    <div>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <h4>Total Users</h4>
      <Stack direction="row" spacing={2}>
        <div><SquareIcon className="icon1"/>
       <div><h5>App Users  </h5></div></div>
      <div><SquareIcon className="icon2"/>
       <div><h5>ShopOwners</h5></div></div>
       <div><SquareIcon className="icon3"/>
       <div><h5>Activated</h5></div></div>
       {/* <div><h5>Activated</h5></div> */}
       <div><SquareIcon className="icon4"/>
       <div><h5>Deactivated</h5></div></div>
      </Stack>
      
    </div>
  );
}
