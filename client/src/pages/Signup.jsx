import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, User, Mail, Lock } from "lucide-react";
import { toast } from "react-hot-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signup as signupAPI } from "@/services/authApi";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await signupAPI(formData);

      login(data.user, data.token);

      toast.success("Account created successfully.");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#090909]
        px-5
      "
    >
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-[150px]" />
    </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .45,
        }}
        className="relative z-10 w-full max-w-md"
      >
        <Card
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[#D4AF37]/15
            bg-[#111111]
            shadow-[0_20px_60px_rgba(0,0,0,.45)]
          "
        >
          <CardContent className="p-8">

            {/* Logo */}

            <div className="mb-8 text-center">

              <div
                className="
                  mx-auto
                  mb-5
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#D4AF37]
                  shadow-[0_0_30px_rgba(212,175,55,.25)]
                "
              >
                <ShieldCheck
                  size={30}
                  className="text-black"
                />
              </div>

              <h1 className="text-3xl font-bold text-white">
                Create Account
              </h1>

              <p className="mt-3 text-zinc-500">
                Join AgreeWise AI and analyze
                agreements smarter with AI.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}

<div>
  <label className="mb-2 block text-sm font-medium text-zinc-300">
    Full Name
  </label>

  <div className="relative">
    <User
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
    />

    <Input
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      className="
        h-12
        rounded-xl
        border-zinc-800
        bg-[#181818]
        pl-11
        text-white
        placeholder:text-zinc-500
        focus:border-[#D4AF37]
        focus:ring-[#D4AF37]/20
      "
    />
  </div>
</div>

{/* Email */}

<div>
  <label className="mb-2 block text-sm font-medium text-zinc-300">
    Email Address
  </label>

  <div className="relative">
    <Mail
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
    />

    <Input
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email"
      className="
        h-12
        rounded-xl
        border-zinc-800
        bg-[#181818]
        pl-11
        text-white
        placeholder:text-zinc-500
        focus:border-[#D4AF37]
        focus:ring-[#D4AF37]/20
      "
    />
  </div>
</div>

{/* Password */}

<div>
  <label className="mb-2 block text-sm font-medium text-zinc-300">
    Password
  </label>

  <div className="relative">
    <Lock
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
    />

    <Input
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Create a password"
      className="
        h-12
        rounded-xl
        border-zinc-800
        bg-[#181818]
        pl-11
        text-white
        placeholder:text-zinc-500
        focus:border-[#D4AF37]
        focus:ring-[#D4AF37]/20
      "
    />
  </div>
</div>

<Button
  type="submit"
  disabled={loading}
  className="
    h-12
    w-full
    rounded-xl
    bg-[#D4AF37]
    font-semibold
    text-black
    transition-all
    duration-300
    hover:bg-[#E6C65B]
  "
>
  {loading ? "Creating Account..." : "Create Account"}
</Button>
</form>

<div className="mt-8 border-t border-zinc-800 pt-6 text-center">
  <p className="text-sm text-zinc-500">
    Already have an account?{" "}
    <Link
      to="/login"
      className="
        font-semibold
        text-[#D4AF37]
        transition
        hover:text-[#E6C65B]
      "
    >
      Sign In
    </Link>
  </p>
</div>

</CardContent>
</Card>
</motion.div>
</div>
);
}