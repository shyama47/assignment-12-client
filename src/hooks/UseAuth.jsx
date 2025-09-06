import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts/AuthContexts';

const UseAuth = () => {
    const authInfo =useContext(AuthContext)
    return authInfo
};

export default UseAuth;