import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      {/* Trigger */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-white/10
          bg-[#111111]
          px-3
          py-2
          transition-all
          duration-300
          hover:border-[#D4AF37]/40
          hover:bg-[#171717]
        "
      >
        {/* Avatar */}

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            font-semibold
            bg-[#D4AF37]/10
text-[#D4AF37]
          "
        >
          {(user?.name?.charAt(0) || "U").toUpperCase()}
        </div>

        {/* User */}

        <div className="hidden text-left md:block">
          <h4 className="text-sm font-semibold text-white">
            {user?.name || "User"}
          </h4>

          <p className="text-xs text-zinc-500">
            {user?.email || "user@example.com"}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`transition-all duration-300 ${
            open
  ? "rotate-180 text-[#D4AF37]"
              : "text-zinc-500"
          }`}
        />
      </button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.97,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              right-0
              mt-3
              w-72
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#111111]/95
              backdrop-blur-xl
              shadow-[0_20px_50px_rgba(0,0,0,0.45)]
            "
          >
            {/* Header */}

            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    
                    font-semibold
                    bg-[#D4AF37]/10
text-[#D4AF37]
                  "
                >
                  {(user?.name?.charAt(0) || "U").toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {user?.name || "User"}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}

            <div className="p-2">
              <MenuItem
                icon={User}
                title="My Profile"
              />

              <MenuItem
                icon={Settings}
                title="Settings"
              />

              <div className="mt-2 border-t border-white/10 pt-2">
                <motion.button
                  whileHover={{
                    x: 3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-red-400
                    transition-all
                    duration-200
                    hover:bg-red-500/10
                  "
                >
                  <LogOut size={18} />

                  Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  title,
}) {
  return (
    <motion.button
      whileHover={{
        x: 3,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-zinc-300
        transition-all
        duration-200
        hover:bg-white/5
        hover:text-[#D4AF37]
      "
    >
      <Icon size={18} />

      {title}
    </motion.button>
  );
}