import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

function Login (){

    const navigate = useNavigate();
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");

    const submitHandler = async (e)=>{

      e.preventDefault();
      try {

        const {data} = await axios.post("/api/user/login",{email,password});
        localStorage.setItem("token",data.token);
        navigate("/home");

      } catch (error) {
        window.alert(error.response.data.message);
     }

    }

  return (
    <div className="loginpage">

        <div className="loginbackground">

           <h2 className="active">SIGN IN</h2>

           <h2 
              className="nonactive" 
              onClick={()=>navigate("/register")}
            >
              SIGN UP
            </h2>

           <form onSubmit={submitHandler} autoComplete="off">

             <span className="label-name">EMAIL</span>
             <input 
                autoComplete="off"
                className="text" 
                type="email"
                placeholder="Please Enter the Email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
             <br/>
             <br/>

             <span className="label-name" >PASSWORD</span>
             <input 
                autoComplete="off"
                className="text" 
                type="password"
                placeholder="Please Enter the Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />

             <br/>
             <br/>

             <button 
                 className="login-signin-btn"
             >
                 SIGN IN
            </button>

             <hr/>
             <br/>

             <h3 
               className="forget"
               onClick={()=>navigate('/forgotpassword')}
             >
               forget password
             </h3>
           </form>
       </div>
    </div>
  )
}

export default Login;
