import React from "react";
import { useNavigate } from "react-router-dom";
import {FaHome} from "react-icons/fa";
import axios from "axios";

import "./LayoutHead.css";


function LayoutHead() {

    const navigate = useNavigate();
    const logoutHandler = async () => {
        localStorage.removeItem("token");
        await axios.get("/api/user/logout");
        navigate("/");
    }

  return (

    <div className="layouthead">

        <button 
            className="layouthome"
            onClick={()=>{navigate(`/home`)}}
        >
          <FaHome size="40px"/>
        </button>

        <button 
          className="layoutlogout"
          onClick={logoutHandler}
        >
          Logout
        </button>

    </div>
  )
}

export default LayoutHead;
