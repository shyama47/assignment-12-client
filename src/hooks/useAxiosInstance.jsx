import React from 'react';
import axios from 'axios';
 const axiosInstance =axios.create({
    baseURL:'https://assignment-12-server-sepia-xi.vercel.app'
})
const useAxiosInstance = () => {
    return axiosInstance;
};

export default useAxiosInstance;