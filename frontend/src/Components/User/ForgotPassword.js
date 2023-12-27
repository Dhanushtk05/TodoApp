import React from "react";
import axios from "axios";

import "./Login.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword (){

    const [email,setEmail] = React.useState("");
    const navigate = useNavigate("");
    
    async function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        await axios.post(`/api/user/password/forgot`, formData, config);
        } catch (error) {
            window.alert(error.response.data.message);
        } 
        navigate("/login");   
    }

  return (
    <div className="loginpage">

        <div className="forgotbackground">
            <h1>FORGOT PASSWORD</h1>

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
             <button 
                 className="login-signin-btn"
             >
                 SEND MAIL
            </button>
           </form>
       </div>
    </div>
  )
}

export default ForgotPassword
