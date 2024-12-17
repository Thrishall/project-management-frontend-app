import axios from "axios";

export const register = async(data)=>{

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/register`, data ,{
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        }
    });
    return res;
}

export const login = async(data)=>{

    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/login`, data ,{
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
        }
    });
    return res;
}

export const addEmail = async(data) =>{

    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/assignTask`, data ,{
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const getAllTask = async(data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/getTask`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const addATask = async(data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/createTask`, data , {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const updateTask = async(data , taskId) => {
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/updateTask/${taskId}`, data , {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const deleteTask = async(taskId) => {
    const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/deleteTask/${taskId}`, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const taskAnalytics = async() => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/analytics`, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};


export const handleLogout = async() => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/logout`, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const getUpdatedUser = async() => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/updatedUser`, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const updateUser = async(data) => {
    const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/update`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

export const getSingleTask = async(taskId) => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getTasks/${taskId}` , {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials:true,
    });
    return res;
};

