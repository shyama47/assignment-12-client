import React from 'react';
import { Navigate } from 'react-router';
import UseAuth from '../hooks/UseAuth';
import Loading from '../pages/shared/Loading/Loading';
import useUserRole from '../hooks/useUserRole';





const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const { role, roleLoading } = useUserRole();
    // console.log({role,roleLoading});
    if (loading || roleLoading) {
        return <Loading/>
    }
     if(!user || role !== 'admin'){
         return <Navigate  state={location?.pathname} to="/forbidden"></Navigate>
     }
    return children;
};

export default AdminRoute;