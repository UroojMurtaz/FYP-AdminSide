import { useEffect, useState } from "react";
import "./notification.scss";
import Navbar from "../../AdminSide/Navbar/Navbar";
import Sidebar from "../../AdminSide/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Notification() {
  const [isActive, setIsActive] = useState(false);
  const [rej, setRej] = useState(false);
  const [request, setRequest] = useState(false);
  const [refresh, setRefresh] = useState();
  const [description, setDescription] = useState();
  const [reply, setreply] = useState(true);
  const [Status, setStatus] = useState("Accept");
  const getRequests = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/request/All`);
    if (data.success === true) {
      console.log(data);
      setRequest(data.Requests);
    } else {
      toast.error(data.message);
    }
  };

  const Send = async (id) => {
    console.log(id);
    const Data = {
      Status: Status,
      Reply: description,
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/request/adminReply/${id}`,
      Data
    );
    if (data.success === true) {
      console.log(data);
      setRefresh(!refresh);
      // setRequest(data.Requests);
    } else {
      toast.error(data.message);
    }
  };

  const Accept = () => {
    setIsActive((current) => !current);
    setStatus("Accepted")
    setRej(false);
  };

  const Reject = () => {
    setRej((current) => !current);
    setStatus("Rejected")
  
    setIsActive(false);
  };

  useEffect(() => {
    getRequests();
  }, [refresh]);
  return (
    <div className="Notification">
      <Sidebar />
      <div className="NotificationContainer">
        <Navbar />
        <h2
          className="ui dividing header"
          style={{ color: "#56606E", padding: "5px" }}
        >
          All Requests
        </h2>

        {request &&
          request.map((r) => {
            return (
              <>
                <div className="request-container">
                  <div className="notificatio-top">
                    <img
                      src={r.RequestBy.profilePhoto.imageUrl}
                      alt="avatar"
                      className="cellImg"
                    />
                    <span
                      style={{
                        color: "#56606E",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {r.RequestBy.FullName}
                    </span>
                  </div>
                  <div className="notification-between">
                    <p
                      style={{
                        color: "#56606E",
                        fontSize: "13.5px",
                        fontWeight: "400px",
                      }}
                    >
                      {r.Description}
                    </p>
                    {r.Status === "null" ? (
                      <div>
                        <span
                          style={{
                            color: "#56606E",
                            fontSize: "13.3px",
                            fontWeight: "400px",
                          }}
                        >
                          Would you accept this request?
                        </span>

                        <span
                          style={{
                            backgroundColor: isActive ? "salmon" : "white",
                            color: isActive ? "white" : "#606060",
                            padding: "5px",
                            borderRadius: "10px",
                            border: "0.5px solid #606060",
                            marginLeft: "2.5rem",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          onClick={() => Accept()}
                        >
                          Accept
                        </span>
                        <span
                          style={{
                            backgroundColor: rej ? "blue" : "white",
                            color: rej ? "white" : "#606060",
                            padding: "5px",
                            borderRadius: "10px",
                            border: "0.5px solid #606060",
                            marginLeft: "1rem",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                          onClick={() => Reject()}
                        >
                          Reject
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span
                          style={{
                            color: "#56606E",
                            fontSize: "13.3px",
                            fontWeight: "400px",
                          }}
                        >
                          Would you accept this request?
                        </span>
                        <span className={`Status ${r.Status}`}>{r.Status}</span>
                      </div>
                    )}
                  </div>
                  <div className="notification-bottom">
                    {r.AdminReply.Reply == "null" ? (
                      <div>
                        <div className="ui form">
                          <div>
                            {/* <span>Reply</span> */}
                            <textarea
                              rows="2"
                              placeholder="Reply"
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                          <div
                          style={{
                            // textAlign: "end",
                            color: "#6439ff",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "max-content",
                            marginLeft:"96%"
                          }}
                          onClick={() => Send(r._id)}
                        >
                          Send
                        </div>
                        </div>
                        
                      </div>
                      
                    ) : (
                      <div>
                        <span
                          style={{
                            padding: "10px",
                            marginBottom: "12px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#606060",
                          }}
                        >
                          Your Reply
                        </span>
                        <div className="admin_reply">{r.AdminReply.Reply}</div>
                      </div>
                    )}
                  </div>
                </div>
                <br />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Notification;
