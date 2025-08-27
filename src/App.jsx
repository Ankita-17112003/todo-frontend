import { useEffect, useState } from "react";
axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {...})
axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {...})
axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`)import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fbc2eb] via-[#a18cd1] to-[#fbc2eb] flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a9e] via-[#fad0c4] to-[#ff9a9e] mb-8">
        To-Do App
      </h1>
      <div className="w-full max-w-md bg-gradient-to-r from-[#ffecd2] via-[#fcb69f] to-[#ffecd2] rounded-3xl shadow-2xl p-6">
        <TaskForm setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
      
    </div>
  );
}
