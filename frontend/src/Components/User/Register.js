import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import "./Login.css";

const Register = () => {

    const navigate = useNavigate();
    const [name , setName] = React.useState("");
    const [email , setEmail] = React.useState("");
    const [password , setPassword] = React.useState("");
  
    const submitHandler = async (e)=>{

        e.preventDefault();
        if(password.length>12 || password.length<8){
          window.alert("Password should Contain between 8-12 Characters");
          return;
        }
        const formdata = new FormData();
        formdata.append("name",name);
        formdata.append("email",email);
        formdata.append("password",password);

        const config = {
          headers: {
              "Content-type": "application/json"
          }
        }

        try{

          const {data} = await axios.post("/api/user/register",formdata,config);
          localStorage.setItem("token",data.token);
          navigate("/home");

        }catch(error){
          console.log(error);
          window.alert(error.response.data.message);
        }  
    }
    
    
  return (
    <div className="loginpage">

        <div className="loginbackground">
           <h2 
             className="nonactive" 
             onClick={()=>navigate("/login")}
            >
              SIGN IN
            </h2>

           <h2 className="active">SIGN UP</h2>

           <form onSubmit={submitHandler}>
             <span className="label-name" >USER NAME</span>
             <input 
                className="text"
                type="text"
                placeholder="Enter your Name..."
                required
                value={name}
                onChange={e=>setName(e.target.value)}
             />
             <br/>
             <br/>

             <span className="label-name" >Email</span>
             <input 
                className="text" 
                type="email"
                placeholder="Enter your Email..."
                required
                value={email}
                onChange={e=>setEmail(e.target.value)}
            />
             <br/>
             <br/>

             <span className="label-name">PASSWORD</span>
             <input 
               className="text" 
               type="password"
               placeholder="Enter the Password between 8-12 characters"
               required
               value={password}
               onChange={e=>setPassword(e.target.value)}
            />
             <br/>
             <span className="label-name" >
                 *Password should Contain between 8-12 Characters
              </span>
             <br/>

             <button className="login-signin-btn">SIGN UP</button>
           </form>  
       </div>
    </div>
  )
}

export default Register;
