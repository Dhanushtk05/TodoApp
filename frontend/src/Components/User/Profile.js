import axios from "axios";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

import LayoutHead from "../Layout/LayoutHead";
import LayoutFooter from "../Layout/LayoutFooter";
import "./Profile.css";

function Profile() {
    const [user ,setUser] = React.useState("");

    React.useEffect(()=>{

       async function getUserProfile(){
         const {data} = await axios.get("/api/user/myprofile");
         setUser(data.user);
       }
       getUserProfile();

    },[]);

  return (

    <div className="profilepage">

        <div>
            <LayoutHead/>
        </div>

        <div className="Profile-details">

            <h1>PROFILE</h1>

            <FaUserAlt size="100px" className="profileimage"/>

            <div className="profile-text">

                <h3><span>Name  : </span>{user.name}</h3>
                <h3 className="profile-text2">
                  <span>Email : </span>
                  {user.email}
                </h3>

            </div>
        </div>

        <div className="profilefooter">
            <LayoutFooter/>
        </div>

    </div>
  )
}

export default Profile;
