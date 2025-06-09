import AddTask from "../models/AddTask";
import { Request, RequestHandler, Response } from "express";

export const addTask : RequestHandler = async (req, res) : Promise<void> =>{
  try {
    const { duedate, title, description, priority } = req.body;
    console.log(duedate, title, description, priority);
    const missingField: string[] = [];

    if (!duedate) missingField.push('duedate');
    if (!title) missingField.push('title');
    if (!description) missingField.push('description');
    if (!priority) missingField.push('priority');

    if (missingField.length > 0) {
     // console.log(`${missingField.join(', ')} is missing`);
      res.status(400).json({error: `Missing required fields: ${missingField.join(', ')}`
      });
       return;
    }
    const newTask = await AddTask.create({
      duedate,
      title,
      description,
      priority
    });
    res.status(201).json(newTask);
    //console.log(newTask);
    //console.log('kkk');
    return;
  } catch (err: any) {
    //console.error("Error creating task:", err);
    res.status(500).json({ error: err.message || 'Internal server error' });
    return;
  }
};

export const allTask: RequestHandler = async(req , res): Promise<void>=>{
  try{
     const task= await AddTask.find();
     //console.log(task);
     res.status(200).json(task);
     return;
  }
  catch(error : any){
    //console.error("Error fetching tasks");
    res.status(500).json({ error: error.message || 'Internal server error'});
    return;
  }
}

export const deleteTask: RequestHandler= async(req , res) : Promise<void> => {
  try {
    const { id } = req.params;
    console.log(id);
    await AddTask.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
}