import { useState, useEffect } from "react";
import Sidebar from "../../../AdminSide/Sidebar/Sidebar";
import Navbar from "../../../AdminSide/Navbar/Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation ,useNavigate} from "react-router-dom";
import "./addSubCat.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import ClipLoader
 from "react-spinners/ClipLoader";

function AddSubCategory() {
  const [subcategoryStatus, setSubCategoryStatus] = useState();
  const [subcategoryName, setsubCategoryName] = useState();
  const [category, setCategory] = useState();
  const [Category, setcategory] = useState();
  const [file, setFile] = useState();
  let [loading, setLoading] = useState(false);


  const navigate=useNavigate()
  let { state } = useLocation();

  const { id } = state ?? "";

  console.log(id);

  const Add = async () => {
    if (
      subcategoryName == null ||
      subcategoryStatus == null ||
      Category == null
    ) {
      toast.error("Please add all fields");
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subcategoryName",subcategoryName);
      formData.append("subcategoryStatus",subcategoryStatus);
      formData.append("Category",Category);
      const { data } = await axios.post(
        "http://localhost:5000/api/subcategory/add",
        formData
      );
      if (data.success === true) {
        toast.success("SubCategory Add Successfully");
          navigate("/category/SubCategory", {
            state: {
              id: Category,
            },
          })
        
      } else {
        toast.error(data.message);
      }
      // toast.success("Shop Owner Add Successfully");
      console.log("data", data);
    }

    // toast.success("Shop Owner Add Successfully")
  };

  const fetchCategory = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/category/Allcategories`
    );
    if (data.success === true) {
      console.log("data", data.categories);
      // setTotal(data.Count)
      setCategory(data.categories);
    } else {
      console.log(data.message);
    }

    // .then(fetchData())
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  console.log("hello");

  return (
    <div className="AddCategory">
      <Sidebar />
      <div className="AddcategoryContainer">
        <Navbar />
        <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
          New SubCategory
        </h2>
        <div
          style={{
            color: "#56606E",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <Link to='/category/SubCategory'> */}
          <div className="AddCategory-Back-Button">
            <KeyboardBackspaceIcon
              className="AddCategory-icon"
              onClick={() =>
                navigate("/category/SubCategory", {
                  state: {
                    id: id,
                  },
                })
              }
            />

            <span>Back</span>
          </div>
          {/* </Link> */}


          {/* <button
            className="ui button"
            style={{
              color: "white",
              backgroundColor: "#7451f8",
              marginLeft: "15px",
            }}
            onClick={() => Add()}
          >
            Save SubCategory
          </button> */}
           <div
          style={{
            color: "#56606E",
            backgroundColor: "#F5F5F5",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <div className="AddCategory-Back-Button">
            <KeyboardBackspaceIcon className="AddCategory-icon" />

            <span>Back</span>
          </div> */}
          {loading ? 
          <div 
          style={{
          // width:" 100%",
          // display: "flex",
          // justifyContent: "flex-end",
          marginLeft: "15px",
          }}>
            <ClipLoader
        color="#6436d6"
        loading={loading}
        size={50}
      />
            </div>
          :  <button
          className="ui button"
          style={{
            color: "white",
            backgroundColor: "#7451f8",
            marginLeft: "15px",
          }}
          onClick={()=>Add()}
        >
          Save SubCategory
        </button>}
        </div>
        </div>


        <div className="Addcategory-main">
          <div className="bottom"></div>
          <h3 className="ui dividing header" style={{ color: "#56606E" }}>
            SubCategory
          </h3>
          <div className="stepper-image">
                  <div className="stepper-image-left">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="steeper-image-right">
                    <div className="formInput">
                      <label htmlFor="file">
                        Image: <DriveFolderUploadOutlinedIcon />
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
          <div style={{ padding: "inherit" }}>
            <form className="ui forms">
              <div class="ui form">
                <div class="inline required field">
                  <label>Select Parent Category</label>
                  <select
                    class="ui fluid dropdown"
                    onChange={(e) => setcategory(e.target.value)}
                    style={{ width: "25rem", marginLeft: "2rem" }}
                  >
                    <option value="" disabled selected>
                      Select Status
                    </option>

                    {category &&
                      category.map((e) => (
                        <option value={e._id}>{e.categoryName}</option>
                      ))}
                  </select>
                </div>
                <div class="inline required field">
                  <label>Category Name</label>
                  <input
                    type="text"
                    placeholder="Enter Category Title"
                    onChange={(e) => setsubCategoryName(e.target.value)}
                    style={{ width: "25rem", marginLeft: "5.3rem" }}
                  />
                </div>

                {/* <div class="inline required field">
                <label>Hello</label>
                <input type="text" placeholder="hello"/>
              </div> */}

                <div class="inline required field">
                  <label>Select Status</label>
                  <select
                    class="ui fluid dropdown"
                    onChange={(e) => setSubCategoryStatus(e.target.value)}
                    style={{ width: "25rem", marginLeft: "6.2rem" }}
                  >
                    <option value="" disabled selected>
                      Select Status
                    </option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategory;
