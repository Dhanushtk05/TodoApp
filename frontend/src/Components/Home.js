import React from "react";
import { useNavigate } from "react-router-dom";

import LayoutHead from "./Layout/LayoutHead";
import LayoutFooter from "./Layout/LayoutFooter";
import "./Home.css";


function Home(){

  const navigate = useNavigate();

  return (

    <div className ="homepage">

        <div>
          <LayoutHead/>
        </div>
        
        <div className="main-content">

          <div className="create">
            <button 
                onClick={()=>navigate("/addtask")}
            >
              CREATE TASK
            </button>
          </div>

          <div className="show">
            <button  
               onClick={()=>navigate("/showtask")}
            >
              SHOW TASKS
            </button>
          </div>

          <div className="delete">
            <button 
                onClick={()=>navigate("/profile")}
            >
              SHOW PROFILE
            </button>
          </div>

        </div>

        <div className="Homefoot">
          <LayoutFooter/>
        </div>

    </div>
  )
}

export default Home;
