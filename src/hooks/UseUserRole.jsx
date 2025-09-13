import React from 'react';

import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';

const UseUserRole = () => {
    const {user ,loading :authLoading} =UseAuth();
    const axiosSecure =useAxiosSecure();
    const {data :role ='user',isLoading :roleLoading,refetch} =useQuery({
        queryKey : ['userRole' ,user?.email],
        enabled:!authLoading && !!user?.email, // authloading na thaklr r user er modde email thaklei ei api ta colbe
        queryFn:async ()=>{
    const res =await axiosSecure.get(`/users/${user.email}/role`);
    return res.data.role;
        }
       
    })
    return {role, roleLoading:authLoading || roleLoading,refetch};
};

export default UseUserRole;