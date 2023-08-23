import React from 'react'
import './List.scss'
import Navbar from '../../../AdminSide/Navbar/Navbar'
import Sidebar from '../../../AdminSide/Sidebar/Sidebar'
import User from '../../../components/UserTable/User'
import MetaData from "../../../components/MetaData/MetaData"

function List() {
  return (
    <div className='list'>
      <MetaData title="Users"/>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <User/>
      </div>
    </div>
  )
}

export default List