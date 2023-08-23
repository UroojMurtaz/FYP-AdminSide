import './CategoryList.scss'
import Navbar from '../../../AdminSide/Navbar/Navbar'
import Sidebar from '../../../AdminSide/Sidebar/Sidebar'
import Categorylist from '../../../components/categoryTable/CategoryTable'
import {Link} from "react-router-dom"


function CategoryList() {
   
  return (
    <div className="CategoryList">
        <Sidebar/>
        <div className="CategoryListContainer">
            <Navbar/>
            <h2 className="ui dividing header" style={{ color: "#56606E", padding: "5px" }}>All Categories</h2>
            <div className="CategoryList-top">
                <Link to='/category/addCategory'>
                  <div style={{
            color: "#56606E",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}>
                  <div className='ui button' style={{
              color: "white",
              backgroundColor: "#7451f8",
              
            }}>
                Add Category
             </div>
                  </div>
              
                </Link>
             
            </div>
            <div className="CategoryList-bottom"></div>
            {/* <h2 className="ui dividing header" style={{ color: "#56606E", padding: "5px" }}>All Categories</h2> */}
            <Categorylist/>
        </div>
    </div>
  )
}

export default CategoryList