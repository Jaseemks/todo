import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import Logo from '../assets/logo.png';
import { axiosInstance } from '../config/axiosInstance';
import { toast } from 'react-toastify';
import checkIcon from '../assets/check-icon.png';
import './Home.css';
import { Skeleton } from '../components/Skeleton';

export const Home = () => {
    const [Tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksResponse = await axiosInstance.get('/tasklist');
                const tasksData = tasksResponse.data.data || [];
                setTasks(tasksData);
                if (tasksData.length > 0) {
                    toast.success('Tasks fetched successfully');
                } else {
                    toast.error('No Tasks found');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                toast.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleMarkComplete = async (taskId) => {
        try {
            await axiosInstance.put(`/markdone/${taskId}`, { completed: true });
            const tasksResponse = await axiosInstance.get('/tasklist');
            const tasksData = tasksResponse.data.data || [];
            setTasks(tasksData);
            toast.success('Task marked as complete');
        } catch (error) {
            toast.error('Error marking task as complete');
        }
    };

    const handleCheckboxChange = (taskId) => {
        setSelectedTasks((prevSelected) => {
            if (prevSelected.includes(taskId)) {
                return prevSelected.filter((id) => id !== taskId);
            } else {
                return [...prevSelected, taskId];
            }
        });
    };

    const handleDeleteSelected = async () => {
        try {
            for (const taskId of selectedTasks) {
                await axiosInstance.delete(`/deletetask/${taskId}`);
            }
            setTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task._id)));
            setSelectedTasks([]);
            toast.success('Selected tasks deleted');
        } catch (error) {
            toast.error('Error deleting tasks');
        }
    };

    const handleAddOrUpdateTask = async () => {
        if (newTaskName.trim() === "") {
            toast.error('Task name cannot be empty');
            return;
        }

        try {
            if (editingTaskId) {
                await axiosInstance.put(`/edit/${editingTaskId}`, { name: newTaskName });
                toast.success('Task updated successfully');
            } else {
                const response = await axiosInstance.post('/newtask', { name: newTaskName });
                const newTask = response.data.data;
                setTasks((prevTasks) => [...prevTasks, newTask]);
                toast.success('Task added successfully');
            }
            setNewTaskName("");
            setEditingTaskId(null);
            const tasksResponse = await axiosInstance.get('/tasklist');
            setTasks(tasksResponse.data.data || []);
        } catch (error) {
            toast.error(error);
        }
    };

    if (loading) {
        return <div><Skeleton /></div>;
    }

    const activeTasks = Tasks.filter(task => !task.isDone);
    const completedTasks = Tasks.filter(task => task.isDone);

    return (
        <>
            <div>
                <Header />
            </div>

            <div className="container mx-auto my-10 p-6 w-3/4 min-w-[480px] h-auto object-cover rounded-lg shadow-2xl border border-gray-300">
                <img
                    src={Logo}
                    alt="logo"
                    className="mx-auto h-24 w-auto mb-4 rotate-animation"
                />
                <h1 className="font-bold text-center text-5xl mb-10 text-emerald-500">Tasks</h1>
                <div className="flex justify-center items-center">
                  
                    <div className="container mx-auto my-10 p-6 w-2/4 min-w-[450px] h-auto object-cover rounded-lg shadow-2xl border border-gray-300">
                    <p className="font-bold text-center mb-10 text-orange-500">*To edit an active task click on task name</p>
                        <div className="mx-auto w-full items-center md:w-8/12">
                            <div className="join flex justify-center items-center">
                                <input
                                    type="text"
                                    placeholder="Add a new Task"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                    className="input input-bordered join-item w-80"
                                />
                                <button
                                    className={`btn ${editingTaskId ? "btn-warning" : "btn-success"} font-semibold text-orange-50 text-2xl join-item w-24`}
                                    onClick={handleAddOrUpdateTask}
                                >
                                    {editingTaskId ? "Edit" : "Add"}
                                </button>

                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-red-500">Active Tasks</h2>
                        <div className="flex w-full flex-col mt-2">

                            {activeTasks.length > 0 ? (
                                activeTasks.map((task) => (
                                    <div key={task._id} className="flex flex-col items-center space-y-2 w-full mt-1">
                                        <div className="flex flex-row items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedTasks.includes(task._id)}
                                                onChange={() => handleCheckboxChange(task._id)}
                                                className="checkbox mt-5"
                                            />
                                            <div
                                                className={`card mt-6 ${task.isDone ? 'bg-green-500 line-through' : 'bg-red-500'} text-2xl text-white rounded-box grid h-12 place-items-center w-96 cursor-pointer`}
                                                onClick={() => {
                                                    setEditingTaskId(task._id);
                                                    setNewTaskName(task.name);
                                                }}
                                            >
                                                {task.name}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src={checkIcon}
                                                alt="Mark Complete"
                                                className="cursor-pointer"
                                                onClick={() => handleMarkComplete(task._id)}
                                                style={{ width: '24px', height: '24px' }}
                                            />
                                            <span className="ml-2 cursor-pointer" onClick={() => handleMarkComplete(task._id)}>
                                                Mark as Completed
                                            </span>
                                        </div>
                                        <div className="divider divider-error my-1 w-full"></div>
                                    </div>
                                ))
                            ) : (
                                <div>No active tasks available</div>
                            )}
                        </div>

                        <div className="mt-10">
                            <h2 className="text-3xl font-bold text-emerald-500">Completed Tasks</h2>
                            {completedTasks.length > 0 ? (
                                completedTasks.map((task) => (
                                    <div key={task._id} className="flex flex-col items-center space-y-2 w-full mt-1">
                                        <div className="flex flex-row items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedTasks.includes(task._id)}
                                                onChange={() => handleCheckboxChange(task._id)}
                                                className="checkbox mt-5"
                                            />
                                            <div className={`card mt-6 bg-green-500 text-2xl text-white rounded-box grid h-12 place-items-center w-96 line-through`}>
                                                {task.name}
                                            </div>
                                        </div>
                                        <div className="divider divider-success my-1 w-full"></div>
                                    </div>
                                ))
                            ) : (
                                <div>No completed tasks available</div>
                            )}
                        </div>

                        {selectedTasks.length > 0 && (
                            <button
                                onClick={handleDeleteSelected}
                                className="btn btn-error text-2xl mt-4 w-full"
                            >
                                Delete Selected
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
