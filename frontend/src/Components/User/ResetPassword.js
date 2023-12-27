import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const navigate = useNavigate();
    const [password , setPassword] = React.useState("");
    const [confirmPassword , setconfirmPassword] = React.useState("");
    const {token} = useParams();

  
    const submitHandler = async (e)=>{

        e.preventDefault();
        const formdata = new FormData();
        formdata.append("password",password);
        formdata.append("confirmPassword",confirmPassword);

        const config = {
          headers: {
              "Content-type": "application/json"
          }
        }
        try{
            const {data} = await axios.post(`/api/user/password/reset/${token}`,formdata,config);
            console.log(data);
            navigate("/login");
        }catch(error){
          console.log(error);
          window.alert(error.response.data.message);
        }  
    }
    
    
  return (
    <div className="loginpage">

        <div className="loginbackground">
           <h1>RESET PASSWORD</h1>
           <form onSubmit={submitHandler}>
             <span className="label-name" >NEW PASSWORD</span>          
             <input 
                className="text" 
                type="password"
                placeholder="Enter your Password"
                required
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
             <br/>
             <br/>

             <span className="label-name">CONFIRM PASSWORD</span>
             <input 
               className="text" 
               type="text"
               placeholder="Re-Enter the password"
               required
               value={confirmPassword}
               onChange={e=>setconfirmPassword(e.target.value)}
            />
             <br/>
             <button className="login-signin-btn">Reset Password</button>
           </form>  
       </div>
    </div>
  )
}

export default ResetPassword
