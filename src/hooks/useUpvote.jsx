import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useNavigate } from "react-router";


const useUpvote = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const navigate =useNavigate();

  const upvoteMutation = useMutation({
    mutationFn: async ({ productId }) => {
      if (!user) throw new Error("Login required");
      return await axiosSecure.patch(`/products/upvote/${productId}`, {
        userEmail: user.email,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["product", variables.productId]);
      queryClient.invalidateQueries(["featuredProducts"]);
      // add other queries you want to refresh after upvote
    },
    onError: (err) => {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    },
  });

  const handleUpvote = (product) => {
    if (!user) {
      navigate('/login')
      return;
    }

    if (user.email === product.owner_email) {
      Swal.fire("Error", "You cannot upvote your own product!", "error");
      return;
    }

    if (product.votedUsers?.includes(user.email)) {
      Swal.fire("Info", "You have already upvoted this product!", "info");
      return;
    }

    upvoteMutation.mutate({ productId: product._id });
  };

  return { handleUpvote, isLoading: upvoteMutation.isLoading };
};

export default useUpvote;
