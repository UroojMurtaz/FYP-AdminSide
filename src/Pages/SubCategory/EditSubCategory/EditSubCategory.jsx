import { useState, useEffect } from "react";
import Sidebar from "../../../AdminSide/Sidebar/Sidebar";
import Navbar from "../../../AdminSide/Navbar/Navbar";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation ,useNavigate} from "react-router-dom";
import "./EditSubCategory.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import ClipLoader
 from "react-spinners/ClipLoader";

function EditSubCategory() {
  let { state } = useLocation();

  const {
    Id,
    name,
    image,
    status,
    subcategory
  } = state ?? "";

  console.log(subcategory)

  const [subcategoryStatus, setSubCategoryStatus] = useState(status);
  const [subcategoryName, setsubCategoryName] = useState(name);
  const [category, setCategory] = useState();
  const [Category, setcategory] = useState(subcategory);
  const [file, setFile] = useState();
  let [loading, setLoading] = useState(false);

  const navigate=useNavigate()

  const { id } = state ?? "";

  // console.log(id);

  const Edit = async () => {
    if (
      subcategoryName == null ||
      subcategoryStatus == null ||
      Category == null
    ) {
      toast.error("Please Edit all fields");
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subcategoryName",subcategoryName);
      formData.append("subcategoryStatus",subcategoryStatus);
      formData.append("Category",Category);
      const { data } = await axios.put(
        `http://localhost:5000/api/subcategory/${Id}`,
        formData
      );
      if (data.success === true) {
        toast.success("SubCategory Edit Successfully");
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
    <div className="EditSubCategory">
      <Sidebar />
      <div className="EditSubCategoryContainer">
        <Navbar />
        <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
         Edit SubCategory
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
          <div className="EditSubCategory-Back-Button">
            <KeyboardBackspaceIcon
              className="EditSubCategory-icon"
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
          {loading ? 
          <div 
          style={{
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
          onClick={() => Edit()}
        >
          Save Changes
        </button>
       }
          
        </div>

        <div className="EditSubCategory-main">
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
                          : image
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
                    value={Category}
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
                    value={subcategoryName}
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
                    value={subcategoryStatus}
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

export default EditSubCategory;
