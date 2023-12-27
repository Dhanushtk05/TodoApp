import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import "./AddTask.css";
import LayoutHead from "../Layout/LayoutHead";
import LayoutFooter from "../Layout/LayoutFooter";



function UpdateTask (){

  const {id:taskid} = useParams();
  const [tasks,setTasks] = React.useState("");
  const [task,setTask] = React.useState("");
  const [time,setTime] = React.useState("");
  const [date,setDate] = React.useState("");
  const navigate = useNavigate();
  

  React.useEffect(()=>{

    async function getsingleTask(id){
        const {data} = await axios.get(`/api/user/getsingletask/${id}`);
        setTasks(data.task);
    }
    getsingleTask(taskid)

  },[taskid]);

  React.useEffect(()=>{
    setTask(tasks.task);
    setDate(tasks.date);
    setTime(tasks.time);

  },[tasks]);

  const submitHandler = async(e) => {

    e.preventDefault();
    const formdata = new FormData();
    formdata.append("task",task);
    formdata.append("date",date);
    formdata.append("time",time);

    const config = {
      headers: {
          "Content-type": "application/json"
      }
    }
    
    await axios.put(`/api/user/updatetask/${taskid}`, formdata, config);
    navigate("/showtask"); 

  }


  return (
    <div className="addtask">

        <div>
            <LayoutHead/>
        </div>

        <div className="addtask-form">

          <h2>Add Task</h2>

          <form className="task-form" onSubmit={submitHandler}>

            <span>Task</span>
            <input 
                type="text"
                className="task-text"
                placeholder="Enter the Task..."
                value={task}
                onChange={e=>setTask(e.target.value)}
            />
            <br/>
            <br/>

            <span>DATE</span>
            <input 
                type="date"
                className="task-text"
                placeholder="Enter the task date..."
                value={date}
                onChange={e=>setDate(e.target.value)}
            />
            <br/>
            <br/>

            <span>TIME</span>
            <input 
              type="time"
              className="task-text"
              placeholder="Enter the task time...."
              value={time}
              onChange={e=>setTime(e.target.value)}
            />
            <br/>
            <br/>
            
            <button 
                className="task-button"
            >
              UPDATE TASK
            </button>
          </form>
          
      </div>

      <div className="addtaskfooter"> 
          <LayoutFooter/>
      </div>
   </div>
  )
}

export default UpdateTask;
