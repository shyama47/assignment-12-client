import React from 'react';
import UseUserRole from '../../../hooks/UseUserRole';
import Loading from '../../shared/Loading/Loading';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import ModeratorDashboard from './ModeratorDashboard';


const DashboardHome = () => {
  const { role, roleLoading } = UseUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === 'user') {
    return <UserDashboard />;
  } else if (role === 'moderator') {
    return <ModeratorDashboard />;
  } else if (role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
