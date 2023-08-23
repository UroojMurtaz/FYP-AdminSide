import "./productTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import ReactStars from "react-stars";
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '10%',
    left: '25%',
    // right: 'auto',
    // bottom: 'auto',
    width:"50rem",
    marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};

function ProductTable() {
  const [pageSize, setPageSize] = useState(9);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [refresh, setRefresh] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [mid, setid] = useState(false);
  const [rev, setrev] = useState([]);
  let [loading, setLoading] = useState(true);
  let subtitle;
  function openModal(id) {
    // setIsOpen(true);
    setid(id)
    fetchProduct(id)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setrev("")
  }


  var ShopOwner_id = localStorage.getItem("User");
  ShopOwner_id = JSON.parse(ShopOwner_id);

  const navigate = useNavigate();


  const fetchData = async (id) => {
    
    const { data } = await axios.get(`http://localhost:5000/api/product/products`);
    setIsLoading(true);
    if (data.success === true) {
      setIsLoading(false)
      setProducts(data.products);
     console.log("products",data.products)
     setLoading(false)
    } else {
      setIsLoading(false)
      console.log(data.message);
    }

    // .then(fetchData())
  };

  const fetchProduct = (id) => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then(function (response) {
        setProduct(response.data.product);
        // console.log(response.data.product)
        setrev(response.data.product.reviews)
        console.log(rev)
      });

      if(rev){
        setIsOpen(true);
      }

  };

  const fetchProductEdit = (id) => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then(function (response) {
        setProduct(response.data.product);
      });
    if (product) {
      navigate("/products/edit/productid", {
        state: {
          id: product._id,
          title: product.name,
          images: product.images,
          ratings: product.ratings,
          description: product.description,
          price: product.price,
          Skincolor: product.Skincolor,
          category: product.category,
          subCategory: product.subCategory,
          brand: product.brand,
          Stock: product.Stock,
          SKU: product.SKU,
          status: product.status,
          offerPrice: product.offerPrice,
          ActualPrice: product.ActualPrice,
        },
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // console.log("product",product)



  const productRows = products.map((products) => {
    return {
      id: products._id,
      title: products.name,
      img: `${products.images[0].imageUrl}`,
      Category: products.category.categoryName,
      stock: products.Stock,
      brand: products.brand,
      status: products.status,
      // reviews:product.reviews,
    };
  });
  // console.log(productRows)

  const productColumns = [
    // { field: 'id', headerName: 'ID', width: 170 },
    {
      field: "title",
      headerName: "PRODUCTS",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImage">
            <img src={params.row.img} alt="avatar" className="cellImg" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "Category",
      headerName: "CATEGORY",
      width: 160,
    },
    {
      field: "stock",
      headerName: "STOCK",
      width: 100,
    },
    {
      field: "brand",
      headerName: "BRAND",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  //temporary data

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           
      

<button className="ui button" onClick={()=>openModal(params.row.id)}>Reviews</button>
          </div>
        );
      },
    },
  ];



  const [modal, setModal] = useState(false);

  const toggleModal=()=>{
    setModal(!modal)
    alert(modal)
  }
  return (
    <>
    <div className="productTable">
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        // className="customStyles"
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
       <h2>Reviews</h2>
       <button onClick={()=>closeModal()}>Close</button>
       {
        rev.length===0 ? <div>
         No Reviews
        </div> :
       rev.map((rev) => (
        <div className="review" style={{ padding: "20px"}}>
          <div className="cellWrapper" style={{display: "flex",alignItems:"center"
          }}>
            <div className="img" >
              <img
                src="https://t3.ftcdn.net/jpg/03/91/19/22/240_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
                alt=""
                className="image"
                style={{width:"54px",height:"54px",marginRight:"10px",objectFit:"cover",borderRadius:"1rem"}}
              />
            </div>
            <div className="detail" style={{display: "flex",flexDirection:"column"}}>
              <span className="div" style={{fontSize:"14px",fontWeight:"500"}}>{rev.name}</span>
              <div className="div">
                <ReactStars
                  className="rate"
                  count={5}
                  size={20}
                  value={rev.rating}
                  color2={"#ffd700"}
                  edit={false}
                  
                />
              </div>
              <p className="div" style={{color:"#7B7780"}}>{rev.comment}</p>
            </div>
          </div>
          <div className="ui dividing header"></div>
        </div>
      ))
       }
      </Modal>
    </div>
      {isLoading ? <Spinner /> : <DataGrid
        style={{ height: 580, width: "100%" }}
        className="datagrid"
        rows={productRows}
        columns={productColumns.concat(actionColumn)}
        pageSize={pageSize}
        rowsPerPageOptions={[9, 25, 50]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection={true}
        loading={loading}
      /> }
      
    </div>
    
    </>
    
  );
}

export default ProductTable;
