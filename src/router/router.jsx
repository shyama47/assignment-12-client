import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayouts from '../layouts/RootLayouts';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import AddProduct from '../pages/Dashboard/AddProduct/AddProduct';
import MyProfile from '../pages/Dashboard/MyProfile/MyProfile';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import MyProduct from '../pages/Dashboard/MyProduct/MyProduct';
import UpdateProduct from '../pages/Dashboard/UpdateProduct/UpdateProduct';
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
    },
    {
        path:'dashboard',
        element:<PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children:[
            {
                path:'add-product',
                Component:AddProduct
            },
            {
                path:'my-profile',
                Component:MyProfile
            },
            {
                path:'my-products',
                Component:MyProduct
            },
            {
                path:'update-product/:id',
                Component:UpdateProduct
            },
            {
                path:'manage-users',
                Component:ManageUsers
            }
        ]
    }
])