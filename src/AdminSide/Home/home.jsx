import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../widget/Widget'
import Chart from '../chart/Chart'
import PieChart from '../PieChart/piechart'
import './home.scss'


function Home() {
  return (
    <div className="home_container">
        <Sidebar/>
        <div className="home_new_container">
            <Navbar/>
            <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          {/* <Featured/> */}
          <div className="size">
          <Chart title="Total Users" aspect={2.3/ 1}/>
          </div>
          <div className="pie">
          <PieChart/>
          </div>
        </div>
        {/* <div>
          <PieChart/>
          </div> */}
        </div>
    </div>
  )
}

export default Home