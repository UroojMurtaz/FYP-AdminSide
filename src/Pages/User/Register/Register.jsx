import { useState,useEffect } from "react";
import "./register.scss";
import { login } from "../../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"

function Register() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  var user = localStorage.getItem("User");
  user = JSON.parse(user);
  var status = localStorage.getItem("Status");
  status = JSON.parse(status);


  const { error, loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );

  // console.log("error", message);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registerEmail, setRegisterEmail] = useState();
  const [newpassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  
  const Login = (event) => {
    event.preventDefault()
    dispatch(login(email, password));
  };

  const RegisterShopOwner=async()=>{
    const role="ShopOwner"
    if(registerEmail==null || newpassword==null || confirmPassword == null){
      toast.error("Please fill all fields",{
        position: "top-center",
      })
    }
    if(newpassword!==confirmPassword){
      toast.error("Password is not matched with confirm Password",{
        position: "top-center",
      })
      
    }
    if(newpassword.length<8){
      toast.error("Password should be greater than 8",{
        position: "top-center",
      })
    }
    else{
     const {data}=await axios.post("http://localhost:5000/api/shopowner/register",{
       registerEmail,newpassword,role
     })
     if(data.success===true){
      toast.success("Registered Add Successfully");
     }
     else{
      toast.error(data.message);
    }
    console.log(data)
    }
    
  }
  useEffect(() => {
    if (token) {
      if (user.role === "Admin") {
          toast.success("Login Successfully")
          navigate("/Home");
      }
       else {
        navigate("/");
        toast.error("Your Email and password is incorrected!")
        localStorage.clear();
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, token]);
  return (
    <>
      <div className="auth-main-header">
        <div className="auth-left">
          <div className="auth-logo">
            <h2>Bare Beauty Admin</h2>
          </div>
        </div>
        {/* <div className="auth-right">
          <div className="auth-top">
            <form className="ui small form">
              <div class="fields" style={{margin:0}}>
                <div class="six wide field">
                  <label className="auth-label">Email</label>
                  <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div class="six wide field">
                  <label className="auth-label">Password</label>
                  <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="auth-login-button" onClick={(e)=>Login(e)}>Login</button>
              </div>
            </form>
          </div>
          <div className="auth-bottom">
            <Link
              to="/users/password/forgot"
              style={{ color: "#150BD4", font: "bold"}}
            >
              Forgot Password?
            </Link>
          </div>
        </div> */}
      </div>
      <div className="auth-main-body">
        <div className="auth-register-left">
          <p className="auth-heading">Sell on Pakistan’s #1 Marketplace</p>
          {/* <p className="auth-heading">#1 Marketplace</p> */}
          <div>
            <p className="auth-exp">
              Create a Bare Beauty seller account in 5 minutes and reach
              millions of customers today!
            </p>
          </div>
        </div>
        <div className="auth-register-right">
          <h3>Login</h3>
          <p>Welcome! </p>
            <form className="ui form">
            <div class="ui form">
              <div class="inline field">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  onChange={(e)=>setEmail(e.target.value)}
                  style={{"width":"25rem","marginLeft":"22px"}}
                />
              </div>
              <div class="inline field">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="Enter password"
                  style={{"width":"25rem"}}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>

              {/* <div class="inline required field">
                <label>Hello</label>
                <input type="text" placeholder="hello"/>
              </div> */}
             
            </div>
          </form>
          <button
              class="ui button"
              style={{ backgroundColor: "#6439ff", color: "white" ,marginTop:"20px",width:"450px"}}
              onClick={(e)=>Login(e)}
            >
              Login
            </button>
        </div>
      </div>
    </>
  );
}

export default Register;
