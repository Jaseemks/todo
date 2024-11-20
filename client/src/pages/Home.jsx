// import React, { useEffect, useState } from 'react';
// import { Header } from '../components/Header';
// import carLogo from '../assets/logo.png';
// import { axiosInstance } from '../config/axiosInstance';
// import { toast } from 'react-toastify';
// import checkIcon from '../assets/check-icon.png';
// import './Home.css'

// export const Home = () => {
//     const [Tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedTasks, setSelectedTasks] = useState([]);
//     const [newTaskName, setNewTaskName] = useState("");

//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const tasksResponse = await axiosInstance.get('/tasklist');
//                 const tasksData = tasksResponse.data.data;
//                 console.log(tasksData);

//                 setTasks(tasksData);

//                 if (tasksData.length > 0) {
//                     toast.success('Tasks fetched successfully');
//                 } else {
//                     toast.error('No Tasks found');
//                 }
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTasks();
//     }, []);

//     const handleMarkComplete = async (taskId) => {
//         try {
//             await axiosInstance.put(`/markdone/${taskId}`, { completed: true });
//             const tasksResponse = await axiosInstance.get('/tasklist');
//             const tasksData = tasksResponse.data.data;
//             setTasks(tasksData);
    
//             toast.success('Task marked as complete');
//         } catch (error) {
//             toast.error('Error marking task as complete');
//         }
//     };
    


//     const handleCheckboxChange = (taskId) => {
//         setSelectedTasks((prevSelected) => {
//             if (prevSelected.includes(taskId)) {
//                 return prevSelected.filter((id) => id !== taskId);
//             } else {
//                 return [...prevSelected, taskId];
//             }
//         });
//     };


//     const handleDeleteSelected = async () => {
//         try {
//             for (const taskId of selectedTasks) {
//                 await axiosInstance.delete(`/deletetask/${taskId}`);
//             }
//             setTasks((prevTasks) => prevTasks.filter((task) => !selectedTasks.includes(task._id)));
//             setSelectedTasks([]);
//             toast.success('Selected tasks deleted');
//         } catch (error) {
//             toast.error('Error deleting tasks');
//         }
//     };

//     const handleAddTask = async () => {
//         if (newTaskName.trim() === "") {
//             toast.error('Task name cannot be empty');
//             return;
//         }

//         try {
//             const response = await axiosInstance.post('/newtask',{ name: newTaskName});
//             const newTask = response.data.data;
//             setTasks((prevTasks) => [...prevTasks, newTask]);
//             setNewTaskName("");
//             toast.success('Task added successfully');
//         } catch (error) {
//             toast.error('Error adding task');
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//             <div>
//                 <Header />
//             </div>

//             <div className="container mx-auto my-10 p-6 w-3/4 h-auto object-cover rounded-lg shadow-2xl border border-gray-300">
//                 <img
//                     src={carLogo}
//                     alt="logo"
//                     className="mx-auto h-24 w-auto mb-4 rotate-animation"
//                 />
//                 <h1 className="font-bold text-center text-5xl mb-10">Tasks</h1>

//                 <div className="flex justify-center items-center">
//                     <div
//                         className="artboard artboard-horizontal phone-2 mx-auto p-6 w-2/4 object-cover rounded-lg shadow-2xl border border-gray-300 flex flex-col"
//                         style={{ paddingBottom: '5000px' }}
//                     >
//                         <div className="mx-auto w-full md:w-8/12">
//                             <div className="join">
//                                 <input
//                                     type="text"
//                                     placeholder="Add a new Task"
//                                     value={newTaskName}
//                                     onChange={(e) => setNewTaskName(e.target.value)}
//                                     className="input input-bordered join-item w-80"
//                                 />
//                                 <button className="btn btn-success font-semibold text-orange-50 join-item w-24"
//                                 onClick={handleAddTask}>
//                                     Add
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="flex w-full flex-col items-center mt-2">
//                             {Tasks.map((task, index) => (
//                                 <div key={index} className="flex flex-col items-center space-y-2 w-full mt-1">
//                                     <div className="flex flex-row items-center space-x-2">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedTasks.includes(task._id)}
//                                             onChange={() => handleCheckboxChange(task._id)}
//                                             className="checkbox mt-5"
//                                         />
//                                         <div
//                                             className={`card mt-6 bg-base-300 text-2xl rounded-box grid h-12 place-items-center w-96 ${task.isDone ? 'line-through' : ''}`}
//                                         >
//                                             {task.name}
//                                         </div>
//                                         {!task.isDone && (
//                                             <img
//                                                 src={checkIcon}
//                                                 alt="Mark Complete"
//                                                 className="ml-4 cursor-pointer"
//                                                 onClick={() => handleMarkComplete(task._id)}
//                                                 style={{ width: '24px', height: '24px' }}
//                                             />
//                                         )}
//                                     </div>
//                                     <div className="divider divider-error my-1 w-full"></div>
//                                 </div>
//                             ))}
//                         </div>

//                         <button
//                             onClick={handleDeleteSelected}
//                             className="btn btn-error text-2xl mt-4"
//                             disabled={selectedTasks.length === 0}
//                         >
//                             Delete Selected
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };




import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import carLogo from '../assets/logo.png';
import { axiosInstance } from '../config/axiosInstance';
import { toast } from 'react-toastify';
import checkIcon from '../assets/check-icon.png';
import './Home.css';

export const Home = () => {
    const [Tasks, setTasks] = useState([]);  // Always initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksResponse = await axiosInstance.get('/tasklist');
                const tasksData = tasksResponse.data.data || []; // Fallback to an empty array if undefined

                console.log(tasksData);

                setTasks(tasksData);

                if (tasksData.length > 0) {
                    toast.success('Tasks fetched successfully');
                } else {
                    toast.error('No Tasks found');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                toast.error('Error fetching tasks');
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
            const tasksData = tasksResponse.data.data || []; // Ensure fallback to an empty array
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

    const handleAddTask = async () => {
        if (newTaskName.trim() === "") {
            toast.error('Task name cannot be empty');
            return;
        }

        try {
            const response = await axiosInstance.post('/newtask', { name: newTaskName });
            const newTask = response.data.data;
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskName("");
            toast.success('Task added successfully');
        } catch (error) {
            toast.error('Error adding task');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Header />
            </div>

            <div className="container mx-auto my-10 p-6 w-3/4 h-auto object-cover rounded-lg shadow-2xl border border-gray-300">
                <img
                    src={carLogo}
                    alt="logo"
                    className="mx-auto h-24 w-auto mb-4 rotate-animation"
                />
                <h1 className="font-bold text-center text-5xl mb-10">Tasks</h1>

                <div className="flex justify-center items-center">
                    <div
                        className="artboard artboard-horizontal phone-2 mx-auto p-6 w-2/4 object-cover rounded-lg shadow-2xl border border-gray-300 flex flex-col"
                        style={{ paddingBottom: '5000px' }}
                    >
                        <div className="mx-auto w-full md:w-8/12">
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="Add a new Task"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                    className="input input-bordered join-item w-80"
                                />
                                <button className="btn btn-success font-semibold text-orange-50 join-item w-24"
                                    onClick={handleAddTask}>
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-center mt-2">
                            {Tasks && Tasks.length > 0 ? (
                                Tasks.map((task) => (
                                    <div key={task._id} className="flex flex-col items-center space-y-2 w-full mt-1">
                                        <div className="flex flex-row items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedTasks.includes(task._id)}
                                                onChange={() => handleCheckboxChange(task._id)}
                                                className="checkbox mt-5"
                                            />
                                            <div
                                                className={`card mt-6 bg-base-300 text-2xl rounded-box grid h-12 place-items-center w-96 ${task.isDone ? 'line-through' : ''}`}
                                            >
                                                {task.name}
                                            </div>
                                            {!task.isDone && (
                                                <img
                                                    src={checkIcon}
                                                    alt="Mark Complete"
                                                    className="ml-4 cursor-pointer"
                                                    onClick={() => handleMarkComplete(task._id)}
                                                    style={{ width: '24px', height: '24px' }}
                                                />
                                            )}
                                        </div>
                                        <div className="divider divider-error my-1 w-full"></div>
                                    </div>
                                ))
                            ) : (
                                <div>No tasks available</div> // Fallback message if no tasks are present
                            )}
                        </div>

                        <button
                            onClick={handleDeleteSelected}
                            className="btn btn-error text-2xl mt-4"
                            disabled={selectedTasks.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
