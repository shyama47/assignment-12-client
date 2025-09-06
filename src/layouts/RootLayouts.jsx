import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';

const RootLayouts = () => {
    return (
        <div>
            <div className='sticky top-0 min-h-fit z-50'>
                <Navbar></Navbar>
            </div>
            <div className='min-h-[calc(100vh-343px)]'>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayouts;