import { useState, useEffect } from "react";
import "./ProductList.scss";
import Navbar from "../../AdminSide/Navbar/Navbar";
import Sidebar from "../../AdminSide/Sidebar/Sidebar";
import Productlist from "../../components/ProductTable/ProductTable";

function ProductList() {
  var user = localStorage.getItem("User");
  user = JSON.parse(user);
  const [role, setRole] = useState(true);
  useEffect(() => {
    if (user.role == "admin") {
      setRole(false);
    }
  });
  return (
    <>
      <div className="product">
        <Sidebar />
        <div className="productContainer">
          <Navbar />
          <h2
            className="ui dividing header"
            style={{ color: "#56606E", padding: "5px" }}
          >
            All Products
          </h2>
          <Productlist />
        </div>
      </div>
    </>
  );
}

export default ProductList;
