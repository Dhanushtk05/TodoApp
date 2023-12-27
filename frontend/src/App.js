import React from "react";
import {BrowserRouter as Router , Route,Routes, Navigate} from"react-router-dom"

import LandingPage from "./Components/Landing/LandingPage";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Home from "./Components/Home";
import AddTask from "./Components/Task/AddTask";
import ShowTask from "./Components/Task/ShowTask";
import UpdateTask from "./Components/Task/UpdateTask";
import Profile from "./Components/User/Profile";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";

import "./App.css";




function ProtectedRoute({children}){

  const data = localStorage.getItem("token");
  if (!data){
    return <Navigate to="/"/>
  }
  return children;
}

function BackRoute({children}){

  const data = localStorage.getItem("token");
  if (data){
    return <Navigate to="/home"/>
  }
  return children;

}

function App() {
  
  return (

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BackRoute><LandingPage/></BackRoute>}/>
          <Route path="/login" element={ <BackRoute><Login/></BackRoute>}/>
          <Route path="/register" element={<BackRoute><Register/></BackRoute>}/>
          <Route path='/password/reset/:token' element={<ResetPassword/> } />
          <Route path="/forgotpassword" element={<BackRoute><ForgotPassword/></BackRoute>}/>
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/addtask" element={<ProtectedRoute><AddTask/></ProtectedRoute>}/>
          <Route path="/showtask" element={<ProtectedRoute><ShowTask/></ProtectedRoute>}/>
          <Route path="/updatetask/:id" element={<ProtectedRoute><UpdateTask/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
