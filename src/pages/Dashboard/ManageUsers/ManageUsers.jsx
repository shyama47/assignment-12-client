
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // mutation for role update
  const { mutate: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
     Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: "User role has been updated successfully.",
        confirmButtonColor: "#3085d6",
      });
    },
    onError: () => {
         Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update user role.",
        confirmButtonColor: "#d33",
      });
    },
  });

  const handleUpdateRole = (user, role) => {
    // Already same role → do nothing
    if (user.role === role) return;

    // Admin downgrade not allowed
    if (user.role === "admin" && role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Action Not Allowed",
        text: "Admin cannot be downgraded!",
        confirmButtonColor: "#d33",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make ${role}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${role}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRole({ id: user._id, role });
      }
    });
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-300">
            <tr>
              <th>Email</th>
              <th>Current Role</th>
              <th>Make Admin</th>
              <th>Make Moderator</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td className="">
                  <span className="capitalize">
                    {user.role}
                  </span>
                </td>

                {/* Make Admin button */}
                <td>
                  <button
                    className={`btn btn-sm btn-primary whitespace-nowrap  ${
                      user.role === "admin" ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() => handleUpdateRole(user, "admin")}
                  >
                    Make Admin
                  </button>
                </td>

                {/* Make Moderator button */}
                <td>
                  <button
                    className={`btn btn-sm btn-secondary whitespace-nowrap ${
                      user.role === "moderator" || user.role === "admin"
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={() => handleUpdateRole(user, "moderator")}
                  >
                    Make Moderator
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;