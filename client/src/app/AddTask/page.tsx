"use client";

import Header from "@/Components/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import "@/Components/Styles/AddTask.css";
import axios from "axios";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface AllTask {
  dueDate: string; 
  title: string;
  description: string;
  priority: "low" | "medium" | "high"; 
}

const AddTask = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<AllTask["priority"]>("low");

  const handleDateChange = (value: Value) => {
    setDate(value);
  };

  const handleSubmit = async () => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    if (!selectedDate) {
      alert("No due date selected from calendar");
      return;
    }
    const formattedDueDate = selectedDate.toISOString();

    const newTask: AllTask = {
      dueDate: formattedDueDate,
      title,
      description,
      priority,
    };
                      
    try {               
      await axios.post("https://checkflow.onrender.com/task/addTask", newTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Clear form
      setTitle("");
      setDescription("");
      setPriority("low");
      setDate(new Date());
    } catch (error: any) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="Alltask-main">
      <Header />
      <div className="task-container">
        <div className="calendar-section">
          <Calendar onChange={handleDateChange} value={date} selectRange={false} />
          <p>
            Selected due date:&nbsp;
            {Array.isArray(date)
              ? `${date[0]?.toDateString() || "N/A"} - ${date[1]?.toDateString() || "N/A"}`
              : date?.toDateString() || "N/A"}
          </p>
        </div>

        <div className="form-section">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as AllTask["priority"])}
          >
            <option value="low">low</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
          </select>

          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSubmit} className="Submit-btn">
            Submit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
