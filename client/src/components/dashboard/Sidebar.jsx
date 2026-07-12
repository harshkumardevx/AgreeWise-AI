import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import sidebarLinks, {
  bottomLinks,
} from "@/constants/sidebarLinks";

import { useAuth } from "@/context/AuthContext";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ mobile = false }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action === "logout") {
      logout();
      navigate("/login");
    }
  };

  return (
    <aside
      className={`
        ${
          mobile
            ? "flex h-full w-full"
            : "fixed hidden h-screen w-72 lg:flex"
        }

        flex-col
        justify-between
        border-r
        border-zinc-900
        bg-[#09090B]
        px-6
        py-7
      `}
    >
      {/* ======================= */}
      {/* Logo */}
      {/* ======================= */}

      <div>
        <Link
          to="/dashboard"
          className="block"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="
              rounded-2xl
              border
              border-zinc-800
              bg-[#111111]
              p-5
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#C9A227]/10
                "
              >
                <ShieldCheck
                  size={28}
                  className="text-[#C9A227]"
                />
              </div>

              <div>
                <h1 className="text-lg font-bold text-white">
                  AgreeWise AI
                </h1>

                <p className="mt-1 text-xs text-zinc-500">
                  Contract Intelligence
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Divider */}

        <div className="my-8 border-b border-zinc-800" />

        {/* Navigation */}

        <div>
          <p
            className="
              mb-3
              px-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-zinc-600
            "
          >
            Main
          </p>

          <div className="space-y-2">
            {sidebarLinks.map((item) => (
              <SidebarItem
                key={item.title}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ======================= */}
      {/* Bottom */}
      {/* ======================= */}

      <div>

        {/* Divider */}

        <div className="mb-5 border-t border-zinc-800 pt-5">

          <p
            className="
              mb-3
              px-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-zinc-600
            "
          >
            Account
          </p>

          <div className="space-y-2">
            {bottomLinks.map((item) => (
              <SidebarItem
                key={item.title}
                item={item}
                onAction={handleAction}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}