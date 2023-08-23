import { useState } from "react";
import "./orderDetail.scss";
import Navbar from "../../../AdminSide/Navbar/Navbar";
import Sidebar from "../../../AdminSide/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderDetail() {
  var user = localStorage.getItem("User");
  user = JSON.parse(user);
  const navigate = useNavigate();

  const [status, setStatus] = useState();
  const [Email, setEmail] = useState("uroojmurtaza12@gmail.com");

  let { state } = useLocation();
  const {
    id,
    amount,
    address,
    country,
    city,
    phone,
    customer,
    pinCode,
    State,
    subCategory,
    quantity,
    price,
    img,

    Id,
    name,
    totalprice,
    orderItems,
    shippingPrice,
    shippingInfo,
    email,
    Status,
  } = state ?? "";

  console.log(shippingInfo);

  const updateOrder = async (Id) => {
    const Updatedproduct = {
      orderStatus: status,
      email: Email,
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/order/changeOrderStatus/${Id}`,
      Updatedproduct
    );

    if (data.success === true) {
      toast.success(`Order ${status} Successfully`);
      navigate("/orders");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="detail">
      <Sidebar />
      <div className="ordercontainer">
        <Navbar />
        <div className="main">
          <div className="bottom">
            <div className="left">
              <h1>Order Number #54737</h1>
              <div className="itemsSummary">
                <table class="ui celled table">
                  <thead>
                    <tr>
                      <th>
                        <h4>Items Summary</h4>
                      </th>
                      <th>QTY</th>
                      <th>Price</th>
                      <th>Total Price</th>
                      <th>Shop Owner</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems &&
                      orderItems.map((e) => {
                        return (
                          <tr>
                            <td>
                              <h4 class="ui image header">
                                <img
                                  src={e.product.images[0].imageUrl}
                                  alt=""
                                  class="ui  rounded image"
                                />
                                <div class="content">
                                  {e.product.name}
                                  <div class="sub header">
                                    {e.product.brand}
                                  </div>
                                </div>
                              </h4>
                            </td>
                            <td>x{e.quantity}</td>
                            <td>Rs:{e.product.price}</td>
                            <td>Rs:{e.quantity * e.product.price}</td>
                            <td>{e.product.user.FullName}</td>
                            <td>
                              <span className={`status ${e.orderStatus}`}>
                                {e.orderStatus}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <div className="orderdetail">
                <div className="ui dividing header">
                  Customer and Order Details
                </div>
                <table class="ui table">
                  <tbody>
                    <tr>
                      <td>Customer Name</td>
                      <td class="right aligned">{name}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td class="right aligned">{shippingInfo.phoneNo}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td class="right aligned">{email}</td>
                    </tr>
                    <tr>
                      <td>Delivery Method</td>
                      <td class="right aligned">Cash on Delivery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="right">
              <div className="customer">
                <h3>Order Status</h3>

                <div className="cellWrapper">
                  <span>Current Status : </span>
                  <span className={`status ${Status}`}>{Status}</span>
                </div>
                <br />
                <div className="cellWrapper">
                  <div className="ui form">
                    <div class="inline field">
                      <label>Select Status</label>
                      <select
                        class="ui fluid dropdown"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        // style={{ width: "25rem", marginLeft: "6.2rem" }}
                      >
                        <option value="" disabled selected>
                          Select Status
                        </option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>
                  <div className="ui button" onClick={() => updateOrder(Id)}>
                    Save Update
                  </div>
                </div>
              </div>

              <div className="orderSummary">
                <h3>Order Summary</h3>
                <div className="bottom">
                  <div className="left">
                    <span>Order Created</span>
                    <span>Order Time</span>
                    <span>SubTotal</span>
                    <span>Delivery </span>
                  </div>
                  <div className="right">
                    <span>May 17,2021</span>
                    <span>06:24 pm</span>
                    <span>Rs:{totalprice}</span>
                    <span>Rs:{shippingPrice}</span>
                  </div>
                </div>
              </div>
              <div className="total">
                <span style={{ fontSize: "14px", fontWeight: 600 }}>Total</span>
                <span style={{ float: "right" }}>
                  Rs: {totalprice + shippingPrice}
                </span>
              </div>
              <div className="address">
                <h3>Delivery Address</h3>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    Street Address :{" "}
                  </span>
                  <span>{shippingInfo.address}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    City :{" "}
                  </span>
                  <span>{shippingInfo.city}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    Province :{" "}
                  </span>
                  <span>{shippingInfo.state}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    Country/Region :{" "}
                  </span>
                  <span>{shippingInfo.country}</span>
                </div>
                <div>
                  <span style={{ fontSize: "13px", fontWeight: 570 }}>
                    Postalcode :{" "}
                  </span>
                  <span>{shippingInfo.pinCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
