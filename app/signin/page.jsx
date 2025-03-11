"use client";
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock } from "lucide-react";

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const isFormValid = () => {
    return formData.email.trim() !== "" && formData.password.trim() !== "";
  };

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`/api/user/find-admin-byemail/${email}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
      setLoading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const userData = await fetchUserData(formData.email);
      if (!userData) return;

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res.error) {
        toast.error("Invalid Credentials");
        setLoading(false);
        return;
      }

      toast.success("Successfully signed in!");

      const userRoutes = { "2": "/superadmin", "1": "/admin", "0": "/user" };
      router.push(userRoutes[userData.usertype] || "/");
    } catch (error) {
      handleSignInError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInError = (error) => {
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Server error: " + (error.response.data.message || "An error occurred."));
    } else {
      toast.error("Invalid Credentials. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 bg-[#161950]/10">
      <Toaster />
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="w-full order-2 md:order-1  md:w-1/2 p-8">
          <h2 className="text-center text-3xl font-semibold text-gray-700">Sign In</h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative mb-4">
             
              <Input
                id="email"
                type="email"
                placeholder="Email"
                icon={<Mail size={15} />}
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="relative mb-4">
          
              <Input
                id="password"
                type="password"
                icon={<Lock size={15} />}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#161950] text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

       
        <div className="w-full order-1 md:order-2 md:w-1/2 bg-[#161950] text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-semibold">Welcome to Our Platform</h2>
          <p className="mt-4 text-center">Manage your properties and inquiries effortlessly with our intuitive platform.</p>
        </div>
      </div>
    </section>
  );
}
