import express from 'express';
import { addTask,  allTask, deleteTask}  from "../controllers/AddTaskController";

const router=express.Router();

router.post('/addTask' , addTask);
router.get('/allTask', allTask);
router.delete('/deleteTask/:id' , deleteTask);

export default router;