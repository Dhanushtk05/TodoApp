import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

import "./ShowTask.css";
import LayoutHead from "../Layout/LayoutHead";



function ShowTask() {

  const navigate = useNavigate();
  const [tasks,setTasks] = React.useState("");

  React.useEffect(()=>{
    async function gettask(){
      const {data} = await axios.get("/api/user/showactions");
      setTasks(data.action);
    }
    gettask();
  },[tasks]);

  async function deleteTask(id){
    await axios.delete(`/api/user/deleteactions/${id}`);
  }

  return (
    <div className="showtask">
        <div>
            <LayoutHead/>
        </div>
        <h1 className="show-text">TASKS</h1>
        <table className="table">
        <thead className="text-cente">
          <tr>
             <th scope="col">S.NO</th>
             <th scope="col">Task</th>
             <th scope="col">Date</th>
             <th scope="col">Time</th>
             <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            tasks && tasks.map((task,index)=>{
              return(
                <tr>
                <td>{index+1}</td>
                <td>{task.task}</td>
                <td>{task.date}</td>
                <td>{task.time}</td>
                <td>

                   <button 
                     type="button" 
                     className="show-task-btn"
                     onClick={()=>navigate(`/updatetask/${task._id}`)}
                    >
                    <FaEdit size="15px"/>
                   </button>

                   <button 
                       type="button" 
                       className="show-task-btn"
                       onClick={()=>deleteTask(task._id)}
                   >
                      <RiDeleteBin6Fill size="15px"/>
                  </button>
                  
                </td>
               </tr>

              )
            })
          }
         </tbody>
       </table>
    </div>
  )
}

export default ShowTask;
