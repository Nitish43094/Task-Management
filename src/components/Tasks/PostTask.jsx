import React, { useState, useEffect } from "react";
import {
  createTask,
  getAllTaskbyUser,
  updateTask,
  deleteTask,
} from "../../services/operations/taskApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedFeeds = await dispatch(getAllTaskbyUser(token));
        console.log("Fetched tasks:", fetchedFeeds?.data);
        setTasks(fetchedFeeds?.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };
    fetchTask();
  }, [dispatch, token]);

  // Handle adding a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createTask(task, description, token, navigate));
      setTask("");
      setDescription("");
      const updatedTasks = await dispatch(getAllTaskbyUser(token));
      setTasks(updatedTasks?.data || []);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      try {
        const updatedTask = { ...taskToUpdate, status: newStatus };
        await dispatch(updateTask(updatedTask, token, navigate));
        const updatedTasks = await dispatch(getAllTaskbyUser(token));
        setTasks(updatedTasks?.data || []);
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  // Handle deleting a task
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTask(id, token, dispatch));
      const updatedTasks = await dispatch(getAllTaskbyUser(token));
      setTasks(updatedTasks?.data || []);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Task</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter task description"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <ul className="space-y-4">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className="bg-white p-4 rounded-lg shadow-md border"
              >
                <h3 className="text-lg font-medium">{task.task}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`status-${task._id}`}
                      value="completed"
                      checked={task.status === "completed"}
                      onChange={() => handleStatusChange(task.id, "completed")}
                      className="mr-2"
                    />
                    Completed
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`status-${task.id}`}
                      value="pending"
                      checked={task.status === "pending"}
                      onChange={() => handleStatusChange(task._id, "pending")}
                      className="mr-2"
                    />
                    Pending
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`status-${task._id}`}
                      value="done"
                      checked={task.status === "done"}
                      onChange={() => handleStatusChange(task._id, "done")}
                      className="mr-2"
                    />
                    Done
                  </label>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Status: {task.status}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No tasks available. Add a new task!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Task;
