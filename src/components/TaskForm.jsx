import { useState } from "react";
import axios from "axios";

export default function TaskForm({ setTasks }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    const res = await axios.post("http://localhost:5000/api/tasks", { title });
    setTasks(prev => [...prev, res.data]);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow px-4 py-3 rounded-l-2xl bg-[#ffdde1] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
      />
      <button
        type="submit"
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-r-2xl font-semibold transition duration-300 shadow-md hover:shadow-xl"
      >
        Add
      </button>
    </form>
  );
}
