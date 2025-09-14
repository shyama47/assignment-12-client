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
import ProductReviewQueue from '../pages/Dashboard/ProductReviewQueue/ProductReviewQueue';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import ReportedContents from '../pages/Dashboard/ReportedContents/ReportedContents';
import ProductsPage from '../pages/ProductsPage/ProductsPage ';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
import Contact from '../pages/Contact/Contact';
import Forbidden from '../pages/Forbidden/Forbidden';
import ModeratorRoute from '../PrivateRoute/ModeratorRoute';
import AdminRoute from '../PrivateRoute/AdminRoute';
import Statistics from '../pages/Dashboard/Statistics/Statistics';
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
import ManageCoupons from '../pages/Dashboard/ManageCoupons/ManageCoupons';
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
                path:'products',
                Component:ProductsPage
            },
            {
                path:'singleproduct/:id',
                element:<PrivateRoute>
                <ProductDetails></ProductDetails>
                </PrivateRoute>
               
            },
            {
                path:'signup',
                Component:SignUp
            },
            {
                path:'login',
                Component:SignIn
            },
            {
                path:'privacy',
                Component:PrivacyPolicy
            },
            {
                path:'terms',
                Component:TermsAndConditions
            },
            {
                path:'contact',
                Component:Contact
            },
            {
                path:'forbidden',
                Component:Forbidden
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
                index:true,
                Component:DashboardHome
            },
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
            // moderator route
            {
                path:'review-queue',
                element:<ModeratorRoute>
                    <ProductReviewQueue/>
                </ModeratorRoute>
            },
            {
             path:'reported-contents',
             element:<ModeratorRoute>
                <ReportedContents/>
             </ModeratorRoute>
            },
            {
                path:'manage-users',
                element:<AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
               
            },
            {
                path:'statistics',
                element:<AdminRoute>
                    <Statistics></Statistics>
                </AdminRoute>
            },
            {
                path:'manage-coupons',
                element:<AdminRoute>
                    <ManageCoupons></ManageCoupons>
                </AdminRoute>
            }
        ]
    }
])