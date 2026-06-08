import { API_URL } from './utils';

export const createTask = async (taskobj) => {
    const url = `${API_URL}/tasks`;
    console.log("url", url);
    
    const options = {
        method : 'POST',
        headers : { 
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(taskobj)  
    }
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            const error = await result.json();
            return { success: false, message: error.message || 'Failed to create task' };
        }
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error creating task:', error);
        return { success: false, message: 'Error creating task' }
    }
}

export const GetAlltasks = async () => {
    const url = `${API_URL}/tasks`;
    console.log("url", url);
    
    const options = {
        method : 'GET',
        headers : { 
            'Content-Type' : 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            const error = await result.json();
            return { success: false, message: error.message || 'Failed to fetch tasks', data: [] };
        }
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return { success: false, message: 'Error fetching tasks', data: [] }
    }
}

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    console.log("url", url);
    
    const options = {
        method : 'DELETE',
        headers : { 
            'Content-Type' : 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            const error = await result.json();
            return { success: false, message: error.message || 'Failed to delete task' };
        }
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error deleting task:', error);
        return { success: false, message: 'Error deleting task' }
    }
}

export const UpdateTaskById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    console.log("url", url);
    
    const options = {
        method : 'PUT',
        headers : { 
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            const error = await result.json();
            return { success: false, message: error.message || 'Failed to update task' };
        }
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error updating task:', error);
        return { success: false, message: 'Error updating task' }
    }
}
