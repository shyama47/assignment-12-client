
import React from "react";
import AdminHomePage from "./AdminHomePage";
import RecentActivitySection from "./RecentActivitySection";





const AdminDashboard = () => {
//   const {roleLoading } = useUserRole();
//   const axiosSecure = useAxiosSecure();
 


//   // Fetch data
//   const { data: users = [] } = useQuery({
//     queryKey: ["users"],
//     // enabled:!roleLoading && !! user?.email && !!user?.accessToken,
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users")
//       return res.data;
//     }
//   });

//   const { data: products = [] } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products")
//       return res.data;
//     }
//   });

//   const { data: reported = [] } = useQuery({
//     queryKey: ["reportedProducts"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products/reported")
//       return res.data;
//     }
//   });

//   const { data: reviews = [] } = useQuery({
//     queryKey: ["reviews"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/reviews/all")
//       return res.data
//     }
//   });

//   if (roleLoading ) {
//     return <Loading />;
//   }
  return (
    // <div className="p-6 space-y-8">
    //       <Helmet>
    //         <title>Admin || Dashboard</title>
    //       </Helmet>
    //   <h1 className="text-2xl md:text-3xl font-bold text-[#1A535C]">⚙️ Admin Dashboard</h1>

    //   {/* Stats Cards */}
    //   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //     <div className="bg-blue-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
    //       <FaUsers className="text-3xl mb-2" />
    //       <h2 className="text-2xl font-bold">{users.length}</h2>
    //       <p className="truncate px-3">Total Users</p>
    //     </div>

    //     <div className="bg-green-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
    //       <FaBoxOpen className="text-3xl mb-2" />
    //       <h2 className="text-2xl font-bold">{products.length}</h2>
    //       <p className="truncate px-3">Total Products</p>
    //     </div>

    //     <div className="bg-red-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
    //       <FaExclamationTriangle className="text-3xl mb-2" />
    //       <h2 className="text-2xl font-bold">{reported.length}</h2>
    //       <p>Reported</p>
    //     </div>

    //     <div className="bg-yellow-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
    //       <FaStar className="text-3xl mb-2" />
    //       <h2 className="text-2xl font-bold">{reviews.length}</h2>
    //       <p>Reviews</p>
    //     </div>
    //   </div>
    // </div>
  <div className="p-6 space-y-4">
    {/* Title */}
      <h1 className="text-3xl font-bold text-center"> Admin Dashboard Overview</h1>
      <p className="text-gray-500 mb-5 text-center">
        Welcome back, Admin! Here's a quick overview of the platform activity.
      </p>

    <AdminHomePage></AdminHomePage>
    <RecentActivitySection></RecentActivitySection>
  </div>
  );
};

export default AdminDashboard;

