import { API_URL } from './utils';

export const createTask = async (taskobj) => {
    const url = `${API_URL}/tasks`;
    console.log("url", url); // Debugging line to check the URL
    
    const options = {
        method : 'POST',
        headers : { 
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(taskobj)  
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return { error : 'Error creating task' }
    }
}

export const GetAlltasks = async () => {
    const url = `${API_URL}/tasks`;
    console.log("url", url); // Debugging line to check the URL
    
    const options = {
        method : 'GET',
        headers : { 
            'Content-Type' : 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return { error : 'Error creating task' }
    }
}

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`;
    console.log("url", url); // Debugging line to check the URL
    
    const options = {
        method : 'DELETE',
        headers : { 
            'Content-Type' : 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return { error : 'Error creating task' }
    }
}

export const UpdateTaskById = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`;
    console.log("url", url); // Debugging line to check the URL
    
    const options = {
        method : 'PUT',
        headers : { 
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (error) {
        return { error : 'Error updating task' }
    }
}
