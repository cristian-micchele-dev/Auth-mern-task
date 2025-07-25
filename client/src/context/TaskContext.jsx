import { createContext, useContext, useState } from "react";
import { createTasksRequest, getTasksRequest, deleteTasksRequest, getTaskRequest, updateTasksRequest } from "../api/task";


const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};



export function TaskProvider({ children }) {

    const getTasks = async() => {
      try {
        const res = await getTasksRequest();
        console.log(res);
        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    }



const createTask = async(task) => {
  try {
    const res = await createTasksRequest(task);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async(id) => {
  try {
    const res = await deleteTasksRequest(id);
    if(res.status === 200) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};


const getTask = async(id) => {
  try {
    const res = await getTaskRequest(id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async(id, task) => {
  try {
    const res = await updateTasksRequest(id, task);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const [tasks, setTasks] = useState([]);
   
  return (
    <TaskContext.Provider value={{tasks, createTask, getTasks, deleteTask, getTask, updateTask}}>
      {children}
    </TaskContext.Provider>
  );
}