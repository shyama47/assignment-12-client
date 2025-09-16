import axios from 'axios';
import React from 'react';

import { useNavigate } from 'react-router';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-sepia-xi.vercel.app'
});
const useAxiosSecure = () => {
    const { user, logOut } = UseAuth();
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
         const status = error.response?.status; 
        // console.log('inside res interceptor', status);
        if (status === 403) {
            navigate('/forbidden')
        }
        else if(status === 401){
             logOut()
                .then(() =>{
            navigate('/login')
                })
             .catch(() =>{
                
             })
            
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;