import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayouts from '../layouts/RootLayouts';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import ErrorPage from '../pages/ErrorPage';
export const router=createBrowserRouter([
    {
        path:'/',
        Component:RootLayouts,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'signup',
                Component:SignUp
            },
            {
                path:'login',
                Component:SignIn
            }
        ]
    }
])