import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { createTask, GetAlltasks, DeleteTaskById, UpdateTaskById } from './api';
import { notify } from './utils';





function TaskManager() {
     const [input , setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);
     
    const handleTask = () => {
        const trimmedInput = input.trim();
        
        if (!trimmedInput) {
            notify('Task cannot be empty', 'error');
            return;
        }

        if(updateTask && trimmedInput) {
            console.log("update api call");
            const obj = {
                taskName: trimmedInput,
                isCompleted: updateTask.isCompleted,
                _id: updateTask._id
            }
            handleUpdateItem();
           
        }else if(updateTask == null && trimmedInput) {
            console.log("create api call");
            HandleAddTask();
        }
        setInput('');
    }

    useEffect(() => {
        if(updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

        const HandleAddTask = async() => {
            const obj = {
                taskName : input.trim(),
                isCompleted : false
            }
        
            try{
                const { success, message } = await createTask(obj);
               if(success) {
                    notify(message, 'success');
                }
                 else {
                    notify(message, 'error');
                }
            
                fetchAllTasks();

            } catch(error){
                console.error('Error adding task:', error);
                notify('Failed to create task', 'error');
            }
        }
          
        const fetchAllTasks = async() => {
           try{
            const { data } = 
        await GetAlltasks();
        setTasks(data || []);
        setCopyTasks(data || []);
        console.log("data", data);
           }catch(error){
            console.error('Error fetching tasks:', error);
            notify('Failed to fetch tasks', 'error');
           }
        }
        useEffect(() => {
           fetchAllTasks()
         } , []) 

         const handleDeleteTask = async (id) => {
            try {
                const { success, message } = await DeleteTaskById(id);
                if (success) {
                    notify(message, 'success');
                    fetchAllTasks(); // Refresh the task list
                } else {
                    notify(message, 'error');
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                notify('Failed to delete task', 'error');
            }
        };

        const handleCheckAndUncheck = async (item) => {
            const { _id, taskName, isCompleted } = item;

            // Optimistically update UI
            setTasks(prev => prev.map(t => t._id === _id ? { ...t, isCompleted: !t.isCompleted } : t));

            const obj = {
                taskName,
                isCompleted: !isCompleted
            };

            try {
                const { success, message } = await UpdateTaskById(_id, obj);
                if (success) {
                    notify(message, 'success');
                } else {
                    notify(message, 'error');
                    // revert UI change on failure
                    setTasks(prev => prev.map(t => t._id === _id ? { ...t, isCompleted } : t));
                }
            } catch (error) {
                console.error('Error updating task:', error);
                notify('Failed to update task', 'error');
                // revert UI change on failure
                setTasks(prev => prev.map(t => t._id === _id ? { ...t, isCompleted } : t));
            }
        }
        const handleUpdateItem = async (item) => {
            // Use passed item or fallback to currently selected updateTask
            const source = item || updateTask;
            if (!source) return;

            const { _id, isCompleted } = source;
            const obj = {
                // Use current input value for updated task name
                taskName: input,
                isCompleted: isCompleted
            };

            try {
                const { success, message } = await UpdateTaskById(_id, obj);
                if (success) {
                    notify(message, 'success');
                    // clear update state after successful update
                    setUpdateTask(null);
                    setInput('');
                } else {
                    notify(message, 'error');
                }
                fetchAllTasks();
            } catch (error) {
                console.error('Error updating task:', error);
                notify('Failed to update task', 'error');
            }
        }

        const handleSearch = (e) => {
            const term = e.target.value.toLowerCase();
            if (!term) {
                setTasks(copyTasks);
                return;
            }
            const results = copyTasks.filter((item) =>
                item.taskName.toLowerCase().includes(term)
            );
            setTasks(results);
        }


   return (

    <div className = 'd-flex flex-column align-items-center w-50 m-auto mt-5'>
        <h1 className = ' mb-4'>Task Manager App</h1>
       <div className = 'd-flex justify-content-between align-items-center w-100 mb-4'>    
         <div className = 'input-group flex-grow-1 me-2'>   
            <input type ='text'
                     value = {input}
                    onChange={(e) => setInput(e.target.value)}
                    
                className='form-control me-1'
                placeholder='Add a new task'
                />
            <button
            onClick= {handleTask}
                className='btn btn-success btn-sm me-2'
           >
            <FaPlus className='me-2'/> 
           </button>
        </div>
                <div className = 'input-group flex-grow-1'>
                    <span
                    className='input-group-text'
                    >
                        <FaSearch />
                    </span>
                    <input 
                    onChange = {handleSearch}
                    className='form-control'
                    type = 'text'
                    placeholder='Search tasks'
                    />
                </div>
       </div>
      
      {/* Task List */ }
        <div className = 'd-flex flex-column w-100'>
            {
                tasks.map((item) => (
                      <div key = {item._id} className = 'd-flex flex-column w-100'> 
            <div className = 'd-flex justify-content-between align-items-center mb-2 p-2 border rounded'>
            <span
                className= { item.isCompleted ? 'text-decoration-line-through' : '' }
            > {item.taskName}
            </span>
            <div className = ''>   
                <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleCheckAndUncheck(item)}
                className="form-check-input me-2"
                />
                <button 
                onClick ={() => setUpdateTask(item)}
                className = 'btn btn-primary btn-sm me-2'
                type = 'button'>
                    <FaPencilAlt />
                </button>
                <button 
                onClick ={() => handleDeleteTask(item._id)}
                className = 'btn btn-danger btn-sm me-2'
                type = 'button'>
                    <FaTrash/>
                </button>
                
            </div>
                </div>
        </div>
                ))
                     
           }
            </div>
         
        
        {/* Toastify */ }
        <ToastContainer
        position = "top-right"
        autoClose = {3000}
        hideProgressBar = {false}
        newestOnTop = {false}
        closeOnClick
         />
    </div>
  )
}

export default TaskManager
