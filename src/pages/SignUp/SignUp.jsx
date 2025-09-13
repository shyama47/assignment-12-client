
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import { useState } from "react";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const SignUp = () => {
    const { createUser,updateUserProfile } = UseAuth();
    const axiosInstance =useAxiosInstance();
    const [profilePic,setProfilePic] =useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; 

    const onSubmit = (data) => {
        const { email, password,name } = data;

        createUser(email, password)
            .then(async() => {
                 toast.success("Account created successfully!");
                //  update userInfo in the database
                const userInfo ={
                    email:email,
                    role:'user',
                    created_at:new Date().toISOString(),
                    last_log_in:new Date().toISOString()
                }
                const userRes =await axiosInstance.post('/users',userInfo)
                console.log(userRes.data);
                //  update user profile in firebase
                const userProfile ={
                    displayName:name,
                   photoURL:profilePic
                }
                updateUserProfile(userProfile)
                .then(()=>{
                    console.log('profile name and picture updateed');
                })
                .catch(error =>{
                    console.log(error);
                })
               
                // 🔹 Redirect user to previous page or home
               navigate(from, { replace: true });

            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    toast.error("This email is already registered!");
                } else {
                    toast.error(error.message);
                }
            });
    };

    const handleImageUpload =async(e) =>{
        const image =e.target.files[0];
        console.log(image);
        const fromData =new FormData();
        fromData.append('image',image)
        const imageUploadUrl =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res =await axios.post(imageUploadUrl,fromData)
        setProfilePic(res.data.data.url);
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4 my-16" >
            <div className="w-full max-w-sm  mx-auto bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#1A535C]">Create Account Now</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* name field */}
                    <div>
                        <label className="block text-[#1A535C] font-bold mb-2">User Name</label>
                        <input
                            {...register("name", { required: true })}
                            placeholder="User Name"
                            className="w-full px-3 py-2 border border-[#4ECDC4] rounded-lg focus:border-[#1A535C] focus:border-2 focus:outline-none"
                        />
                        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                    </div>

                    {/* email field */}
                    <div>
                        <label className="block text-[#1A535C] font-bold mb-2">Email</label>
                        <input
                            {...register("email", { required: true })}
                            placeholder="Enter Your Email"
                            className="w-full px-3 py-2 border border-[#4ECDC4] rounded-lg focus:border-[#1A535C] focus:border-2 focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                    </div>

                    {/* password field */}
                    <div>
                        <label className="block text-[#1A535C] font-bold mb-2">Password</label>
                        <input
            {...register("password", {
              required: "Password is required",
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                minLength: (value) =>
                  value.length >= 6 || "Must be at least 6 characters long",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-[#4ECDC4] rounded-lg focus:border-[#1A535C] focus:ring-2 focus:ring-[#4ECDC4] transition-all duration-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
                    </div>

                    {/* image field */}
                    <div>
                        <label className="block text-[#1A535C] font-bold mb-2">Photo</label>

                        <input
                            type="file"
                            placeholder="Photo URL"
                            onChange={handleImageUpload}
                            className="w-full px-3 py-2 border border-[#4ECDC4] rounded-lg focus:border-[#1A535C] focus:border-2 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!profilePic}
                        className="w-full py-2 rounded-lg bg-[#4ECDC4] text-white font-semibold  transition-all duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Toggle link */}
                <p className="text-center mt-4 text-sm">
                    <span className="font-bold">Already have an account?</span>
                    <Link to="/login" className="text-[#4ECDC4] font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
