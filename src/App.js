import React,{useContext,useState,useEffect} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import List from './Pages/User/List/List'
import Single from './AdminSide/Shopowner/SingleShopOwner/Single'
import AddCategory from './Pages/Category/AddCategory/AddCategory'
import EditCategory from './Pages/Category/EditCategory/EditCategory'
import './Style/dark.scss'
import { DarkModeContext } from './context/darkModeContext';
import AdminHome from "./AdminSide/Home/home"
import AdminUsers from "./AdminSide/Users/Users"
import AddShopOwner from './AdminSide/Shopowner/AddShopowner/addShopowner'
import Profile from './Pages/User/Profile/Profile'
import EditProfile from './Pages/User/EditProfile/EditProfile';
import AllShopOwner from './AdminSide/Shopowner/ShopownerList/ShopOwnerList';
import CategoryList from './Pages/Category/CategoryList/CategoryList'
import SubCategoryList from './components/SubcategoryTable/SubCategoryTable'
import AddSubCategory from "./Pages/SubCategory/AddSubCategory/AddSubCat"
import EditSubCategory from './Pages/SubCategory/EditSubCategory/EditSubCategory'
import OrderList from "./Pages/Order/OrderList/OrderList"
import OrderDetail from './Pages/Order/OrderDetail/OrderDetail';
import Notification from './Pages/Notifications/notification';
import ProductList from "./Pages/ProductList/ProductList"
import Register from './Pages/User/Register/Register';
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function App() {
  const {darkMode}=useContext(DarkModeContext)
  const [login,setLogin]=useState(true)
  // const token=localStorage.getItem("Token")
  // if(token){
  //   setLogin(true)
  // }else{
  //   setLogin(false)
  // }

  const token = localStorage.getItem("Token");

  // useEffect(()=>{
    axios.interceptors.request.use((request) => {
      request.headers.common.token = localStorage.getItem("Token");
      // console.log("token",localStorage.getItem("Token"))
      return request;
    });
  // })
 
  
  return (
    <>
    {login ? 
     <div className= {darkMode ? "app dark" : "app"}>
     <BrowserRouter>
       <Routes>
         <Route path='/'>
           {/* <Route index element={<Login />} /> */}
           <Route index element={<Register />} />
           <Route path='/Home' element={<AdminHome />} />
           <Route path='admin'>
             <Route path='us' element={<AdminUsers />} />
             <Route path=':ShopOwnerid' element={<Single />} />
             <Route path='addShopowner' element={<AddShopOwner />}/>
             <Route path='ShopownerList' element={<AllShopOwner />}/>
             <Route path="users" element={<List />} />
           </Route>
           <Route path='category'>
             <Route index element={<CategoryList />} />
             <Route path='addCategory' element={<AddCategory />}/>
             <Route path='editCategory' element={<EditCategory />}/>
             <Route path='SubCategory' element={<SubCategoryList />}/>
             <Route path='addSubCategory' element={<AddSubCategory />}/>
             <Route path='editSubCategory' element={<EditSubCategory />}/>
           </Route>

           <Route path='products'>
             <Route index element={<ProductList />} />
             
           </Route>
           <Route path='orders'>
             <Route index element={<OrderList />} />
             <Route path=':orderid' element={<OrderDetail />} />
           </Route>

           <Route path='notifications'>
             <Route index element={<Notification />} />
             
           </Route>

          
             
          

         </Route>
       </Routes>
     </BrowserRouter>
     <ToastContainer 
     />

   </div>
   :
   <h1>Not login</h1>
   }
    </>
   
  );
}

export default App;