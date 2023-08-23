import React from "react";
import Navbar from "../../../AdminSide/Navbar/Navbar";
import Sidebar from "../../../AdminSide/Sidebar/Sidebar";
import Categorylist from "../../../components/SubcategoryTable/SubCategoryTable";
import { Link } from "react-router-dom";
import "./subCategory.scss";

function subCategory() {
  return (
    <div className="SubCategoryList">
      <Sidebar />
      <div className="SubCategoryListContainer">
        <Navbar />
        <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
          SubCategories
        </h2>
        <div className="CategoryList-top">
          <Link to="/category/addSubCategory">
            <div
              style={{
                color: "#56606E",
                backgroundColor: "#F5F5F5",
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                className="ui button"
                style={{
                  color: "white",
                  backgroundColor: "#7451f8",
                }}
              >
                Add SubCategory
              </div>
            </div>
          </Link>
        </div>
        <div className="CategoryList-bottom"></div>
        {/* <h2 className="ui dividing header" style={{ color: "#56606E", padding: "5px" }}>All Categories</h2> */}
        <Categorylist />
        
      </div>
    </div>
  );
}

export default subCategory;
