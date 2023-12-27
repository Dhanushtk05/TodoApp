import React from "react";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";


function LandingPage() {

  const navigate = useNavigate();

  return (

    <div className="landingpage">
        <div className="pagecontent">

            <div className="headcontent">
                <h1>
                  Elevate your productivity. Check off tasks, unlock possibilities
                </h1>
            </div>

            <div className="landbuttons">

                <button 
                   className="signup"
                   onClick={()=>navigate("/register")}
                >
                  SIGNUP
                </button>

                <button 
                   className="login"
                   onClick={()=>navigate("/login")}
                 >
                  LOGIN
                </button>
            </div>

        </div>
      
    </div>
  )
}

export default LandingPage;
