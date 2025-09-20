
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router";

import UseAuth from "../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
 const {signIn} =UseAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email!");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Invalid password!");
        } else {
          toast.error(error.message);
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4 my-10 ">
      <Helmet>
        <title>SignIn || page</title>
      </Helmet>
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-xl p-6 border border-teal-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A535C]">Login Now!!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
        <label className="block text-[#1A535C] font-bold mb-2">Email</label>

            <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full px-3 py-2 border border-[#4ECDC4] rounded-lg focus:border-[#19c6e0bd] focus:border-2 focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>

          <div>
     <label className="block text-[#1A535C] font-bold mb-2">Password</label>

            <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-[#4ECDC4] focus:border-2 rounded-lg focus:border-[#19c6e0bd] focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#4ECDC4] text-white font-semibold  transition-all duration-300"
          >
            Login
          </button>
        </form>

        <SocialLogin />

        {/* Toggle link */}
        <p className="text-center mt-4 text-sm">
          <span className="font-bold">Don’t have an account?</span>
          <Link to="/signup" className="text-[#4ECDC4] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
