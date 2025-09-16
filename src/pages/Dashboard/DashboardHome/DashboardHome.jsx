import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../shared/Loading/Loading';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import ModeratorDashboard from './ModeratorDashboard';
import ForbiddenPage from '../../Forbidden/Forbidden';


const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === 'admin' ) {
    return <AdminDashboard />;
  } else if (role === 'moderator') {
    return <ModeratorDashboard />;
  } else if (role === 'user') {
    return <UserDashboard />;
    
  } else {
    return <ForbiddenPage />;
  }
};

export default DashboardHome;
