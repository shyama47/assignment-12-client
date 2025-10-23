import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../shared/Loading/Loading';
import UserDashboard from './UserDashboard';
import ModeratorDashboard from './ModeratorDashboard';
import ForbiddenPage from '../../Forbidden/Forbidden';

import UseAuth from '../../../hooks/UseAuth';
import AdminDashboard from './AdminDashboard';


const DashboardHome = () => {
  const { loading } = UseAuth();
  const { role, roleLoading, } = useUserRole();
  // console.log({ role, roleLoading });
  if (roleLoading || loading) {
    return <Loading />;
  }

  if (role === 'admin') {
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
