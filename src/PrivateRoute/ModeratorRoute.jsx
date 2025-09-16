import React from 'react';
import UseAuth from '../hooks/UseAuth';
import Loading from '../pages/shared/Loading/Loading';
import UseUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';


const ModeratorRoute = ({children}) => {
    const {user ,loading} =UseAuth();
    const {role,roleLoading} =UseUserRole();
     
    if(loading || roleLoading){
        return <Loading/>
    }
    if(!user || role !== 'moderator'){
        return <Navigate  state={location?.pathname} to="/forbidden"></Navigate>
    }
    return children;
};

export default ModeratorRoute;