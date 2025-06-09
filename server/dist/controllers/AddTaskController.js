"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.allTask = exports.addTask = void 0;
const AddTask_1 = __importDefault(require("../models/AddTask"));
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { duedate, title, description, priority } = req.body;
        console.log(duedate, title, description, priority);
        const missingField = [];
        if (!duedate)
            missingField.push('duedate');
        if (!title)
            missingField.push('title');
        if (!description)
            missingField.push('description');
        if (!priority)
            missingField.push('priority');
        if (missingField.length > 0) {
            // console.log(`${missingField.join(', ')} is missing`);
            res.status(400).json({ error: `Missing required fields: ${missingField.join(', ')}`
            });
            return;
        }
        const newTask = yield AddTask_1.default.create({
            duedate,
            title,
            description,
            priority
        });
        res.status(201).json(newTask);
        //console.log(newTask);
        //console.log('kkk');
        return;
    }
    catch (err) {
        //console.error("Error creating task:", err);
        res.status(500).json({ error: err.message || 'Internal server error' });
        return;
    }
});
exports.addTask = addTask;
const allTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield AddTask_1.default.find();
        //console.log(task);
        res.status(200).json(task);
        return;
    }
    catch (error) {
        //console.error("Error fetching tasks");
        res.status(500).json({ error: error.message || 'Internal server error' });
        return;
    }
});
exports.allTask = allTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        yield AddTask_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete task", error });
    }
});
exports.deleteTask = deleteTask;
