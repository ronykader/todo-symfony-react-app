import axios from "axios";
import React, { useEffect, useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://api.w3zones.com/api/tasks");
    setTasks(response.data);
  };

  const validateForm = () => {
    const errors = {};
    if (!newTask.trim()) {
      errors.newTask = "Task name is required";
    }
    if (!deadline) {
      errors.deadline = "Deadline is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddTask = async () => {
    if (validateForm()) {
      await axios.post("http://api.w3zones.com/api/task/create", {
        name: newTask,
        deadline: deadline,
      });
      setNewTask("");
      setDeadline("");
      fetchTasks();
    }
  };

  const handleDeleteTask = async (task) => {
    await axios.delete(`http://api.w3zones.com/api/tasks/${task}/delete`);
    fetchTasks();
  };

  const handleCheckboxChange = async (task, completed) => {
    await axios.put(`http://api.w3zones.com/api/tasks/${task}/update`, {
      completed: !completed,
    });
    fetchTasks();
  };

  const moveCompletedTaskToBottom = (taskList) => {
    const completedTasks = taskList.filter((task) => task.completed);
    const incompleteTasks = taskList.filter((task) => !task.completed);
    return [...incompleteTasks, ...completedTasks];
  };

  // Date Formation Custom Method
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <section className="py-24 lg:pt-[120px] lg:pb-28">
        <div className="container">
          <div className="mb-16 flex flex-col items-center">
            <h2 className="text-3xl lg:text-[40px] mb-9 font-bold">
              <span className="text-[#00CC8C]">Todo Mastery: </span> Success
              Unbound
            </h2>
            {/* Todo Box */}
            <div className="mx-auto flex items-center justify-between gap-x-6">
              <div className="sm:col-span-3">
                <input
                  type="text"
                  required
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter task..."
                  className="z-20 block w-full bg-white px-4 py-2.5 pr-10 focus:outline-none rounded-[63px] placeholder:text-neutral-400 text-neutral-800"
                />
                {errors.newTask && (
                  <p className="text-red-500 text-xs italic">
                    {errors.newTask}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="z-20 block w-full bg-white px-4 py-2.5 pr-10 focus:outline-none rounded-[63px] placeholder:text-neutral-400 text-neutral-800"
                />
                {errors.deadline && (
                  <p className="text-red-500 text-xs italic">
                    {errors.deadline}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3">
                <button
                  className="px-5 py-2 bg-[#0F6A4E] rounded-[44px]"
                  onClick={handleAddTask}
                >
                  Add Task
                </button>
              </div>
            </div>
            {/* Todo Box Ends */}
          </div>
          <div className="max-w-[648px] mx-auto overflow-auto">
            {moveCompletedTaskToBottom(tasks).map((task) => (
              <div className="flex items-center mb-4" key={task.id}>
                <input
                  id={`default-checkbox-${task.id}`}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id, task.completed)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  htmlFor={`default-checkbox-${task.id}`}
                  className="ms-2 font-medium text-white-900 dark:text-white-500 text-lg"
                >
                  {task.name} (Deadline: {formatDate(task.deadline.date)})
                </label>
                <button
                  className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Todo;
