"use client";

import Header from "@/Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "@/Components/Styles/AllTask.css";  

interface Task {
  _id: string;
  dueDate: string;
  title: string;
  description: string;
  priority: string;
}

const DoneTask = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete=async(id: string)=>{
    try{
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/task/deleteTask/${id}`);
        setTask((prev)=>prev.filter((t)=>t._id !== id));
    }
    catch(error : any){
        console.log("error deleting ");
    }
  }

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/task/allTask`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTask(res.data);
      } catch (error: any) {
        setError(error.message || "Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  if (loading) return <div className="loading">LOADING TASK...</div>;
  if (error) return <div className="error">ERROR: {error}</div>;

  return (
    <>
      <Header />
      <div className="container">
        <h2>All Tasks are here</h2>
        {task.length === 0 ? (
          <p>No task found</p>
        ) : (
          <ul>
            {task.map((task) => (
              <li key={task._id}>
                <h3>Title-{task.title}</h3>
                <h4>Description-{task.description}</h4>
                <h4>Date-{new Date(task.dueDate).toLocaleDateString()}</h4>
                <h4>task-{task.priority}</h4>
                <button className="done-btn" onClick={() => handleDelete(task._id)}>Done ✅</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DoneTask;
