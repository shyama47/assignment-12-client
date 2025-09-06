

import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const SocialLogin = () => {
const {googleLogin}=UseAuth();
const axiosInstance =useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async(result) => {
        const user =result.user;
        console.log(user);
        toast.success("Google Login successful!");
        const userInfo ={
          email:user.email,
          role:'user',
          created_at:new Date().toISOString(),
          last_log_in:new Date().toISOString()
        }
        const res =await axiosInstance.post('/users',userInfo)
        console.log('user update info',res.data);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
   <div>
     {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
    <button
      onClick={handleGoogleLogin}
      className="w-full py-2 rounded-lg border border-[#4ECDC4] text-[#1A535C] font-semibold flex items-center justify-center gap-2 hover:bg-[#4ECDC4] hover:text-white transition-all duration-300"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
   </div>
  );
};

export default SocialLogin;
