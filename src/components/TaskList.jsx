import { useState } from "react";
axios.get(`${import.meta.env.VITE_API_URL}/tasks`)
axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {...})
axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {...})
axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
export default function TaskList({ tasks, setTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleTask = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(task => task._id === id ? res.data : task));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const saveEdit = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { title: editText, completed: tasks.find(t => t._id === id).completed });
    setTasks(tasks.map(task => task._id === id ? res.data : task));
    setEditingId(null);
    setEditText("");
  };

  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <li key={task._id} className="flex items-center justify-between bg-gradient-to-r from-[#fef9d7] via-[#fcd3a2] to-[#fef9d7] rounded-2xl p-4 shadow-lg hover:scale-105 transform transition duration-300">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, task.completed)}
              className="w-5 h-5 accent-[#ff6b81] cursor-pointer"
            />
            {editingId === task._id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="bg-[#ffdde1] text-gray-800 px-2 py-1 rounded-md outline-none"
              />
            ) : (
              <span
                onDoubleClick={() => { setEditingId(task._id); setEditText(task.title); }}
                className={`cursor-pointer select-none text-gray-800 text-lg font-medium ${task.completed ? "line-through text-gray-500" : ""}`}
              >
                {task.title}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {editingId === task._id && (
              <button
                onClick={() => saveEdit(task._id)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full transition duration-300"
              >
                Save
              </button>
            )}
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition duration-300"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
