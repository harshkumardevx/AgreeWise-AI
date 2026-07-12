import { motion } from "framer-motion";
import {
  ShieldCheck,
  Upload,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function WelcomeCard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-[#262626]
        bg-[#0B0B0B]
      "
    >
      {/* Background */}

      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />

      <div className="relative p-8 lg:p-10">

        {/* Badge */}

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#D4AF37]/20
            bg-[#D4AF37]/10
            px-4
            py-2
            text-sm
            font-medium
            text-[#D4AF37]
          "
        >
          <ShieldCheck size={16} />

          Secure Workspace
        </motion.div>

        {/* Heading */}

        <div className="mt-8">

          <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
            {greeting}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white lg:text-5xl">
            {user?.name || "User"}
          </h1>

        </div>

        {/* Description */}

        <p className="mt-6 max-w-3xl text-[16px] leading-8 text-zinc-400">
          Welcome back to AgreeWise AI. Manage your agreements,
          review AI-generated insights, and monitor contract risks
          from one secure workspace.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap gap-4">

          <Button
            onClick={() => navigate("/upload-contract")}
            className="
              h-12
              rounded-xl
              bg-[#D4AF37]
              px-6
              text-black
              transition-all
              hover:bg-[#E6C65C]
            "
          >
            <Upload className="mr-2 h-4 w-4" />

            Upload Contract
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/reports")}
            className="
              h-12
              rounded-xl
              border-[#303030]
              bg-[#151515]
              px-6
              text-zinc-300
              transition-all
              hover:border-[#D4AF37]/40
              hover:bg-[#1B1B1B]
              hover:text-white
            "
          >
            View Reports

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

        </div>

      </div>
    </motion.section>
  );
}