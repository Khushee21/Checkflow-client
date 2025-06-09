"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AddTaskController_1 = require("../controllers/AddTaskController");
const router = express_1.default.Router();
router.post('/addTask', AddTaskController_1.addTask);
router.get('/allTask', AddTaskController_1.allTask);
router.delete('/deleteTask/:id', AddTaskController_1.deleteTask);
exports.default = router;
