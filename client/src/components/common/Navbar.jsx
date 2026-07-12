import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "How It Works",
    href: "#how-it-works",
  },
  {
    name: "AI Analysis",
    href: "#analysis",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-5 max-w-7xl px-5">

        <motion.div
          initial={{
            y: -30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            flex
            h-[74px]
            items-center
            justify-between
            rounded-3xl
            border
            border-[#D4AF37]/10
            bg-[#090909]/85
            px-6
            backdrop-blur-2xl
            shadow-[0_20px_60px_rgba(0,0,0,.45)]
          "
        >

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-4"
          >
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              transition={{
                duration: .25,
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-[#D4AF37]
                shadow-[0_0_25px_rgba(212,175,55,.25)]
              "
            >
              <ShieldCheck
                className="text-black"
                size={22}
              />
            </motion.div>

            <div>
              <h1 className="text-lg font-bold text-white">
                AgreeWise AI
              </h1>

              <p className="text-xs text-zinc-500">
                AI Contract Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          {isHome && (
            <nav className="hidden items-center gap-8 lg:flex">

              {navLinks.map((item) => (

                <a
                  key={item.name}
                  href={item.href}
                  className="
                    relative
                    text-sm
                    font-medium
                    text-zinc-400
                    transition-all
                    duration-300
                    hover:text-[#D4AF37]
                    after:absolute
                    after:-bottom-2
                    after:left-0
                    after:h-px
                    after:w-0
                    after:bg-[#D4AF37]
                    after:transition-all
                    after:duration-300
                    hover:after:w-full
                  "
                >
                  {item.name}
                </a>

              ))}

            </nav>
          )}

          {/* Right */}

          <div className="hidden items-center gap-3 lg:flex">

            {user ? (
              <>

                <span className="text-sm text-zinc-400">
                  Hi, {user.name}
                </span>

                <Button
                  asChild
                  variant="outline"
                  className="
                    border-[#D4AF37]/20
                    bg-[#D4AF37]/5
                    text-[#D4AF37]
                    hover:bg-[#D4AF37]/10
                  "
                >
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={logout}
                  className="
                    border-red-500/20
                    text-red-400
                    hover:border-red-500/40
                    hover:bg-red-500/10
                  "
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>

              </>
            ) : (
              <>

                <Button
                  asChild
                  variant="ghost"
                  className="
                    rounded-xl
                    text-zinc-300
                    hover:bg-white/5
                    hover:text-[#D4AF37]
                  "
                >
                  <Link to="/login">
                    Login
                  </Link>
                </Button>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: .97,
                  }}
                >
                  <Button
                    asChild
                    className="
                      rounded-xl
                      bg-[#D4AF37]
                      font-semibold
                      text-black
                      hover:bg-[#E7C65B]
                      shadow-[0_0_30px_rgba(212,175,55,.25)]
                    "
                  >
                    <Link to="/signup">
                      Get Started
                    </Link>
                  </Button>
                </motion.div>

              </>
            )}

          </div>

          {/* Mobile Toggle */}

          <button
            onClick={() => setOpen(!open)}
            className="
              rounded-xl
              border
              border-zinc-800
              p-2
              text-zinc-300
              transition
              hover:border-[#D4AF37]/30
              hover:text-[#D4AF37]
              lg:hidden
            "
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

        </motion.div>
                {/* Mobile Menu */}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                mt-3
                overflow-hidden
                rounded-3xl
                border
                border-[#D4AF37]/10
                bg-[#090909]/95
                p-6
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,.45)]
                lg:hidden
              "
            >
              {/* Navigation */}

              {isHome && (
                <div className="space-y-1">

                  {navLinks.map((item) => (

                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        block
                        rounded-xl
                        px-4
                        py-3
                        text-zinc-400
                        transition-all
                        duration-300
                        hover:bg-[#D4AF37]/10
                        hover:text-[#D4AF37]
                      "
                    >
                      {item.name}
                    </a>

                  ))}

                </div>
              )}

              <div className="my-6 border-t border-zinc-800" />

              {/* User */}

              {user ? (
                <div className="space-y-3">

                  <Button
                    asChild
                    className="
                      w-full
                      bg-[#D4AF37]
                      font-semibold
                      text-black
                      hover:bg-[#E7C65B]
                    "
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="
                      w-full
                      border-red-500/20
                      text-red-400
                      hover:border-red-500/40
                      hover:bg-red-500/10
                    "
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>

                </div>
              ) : (
                <div className="space-y-3">

                  <Button
                    asChild
                    variant="outline"
                    className="
                      w-full
                      border-zinc-700
                      bg-zinc-900
                      text-white
                      hover:border-[#D4AF37]/30
                      hover:text-[#D4AF37]
                    "
                  >
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="
                      w-full
                      bg-[#D4AF37]
                      font-semibold
                      text-black
                      hover:bg-[#E7C65B]
                    "
                  >
                    <Link
                      to="/signup"
                      onClick={() => setOpen(false)}
                    >
                      Get Started
                    </Link>
                  </Button>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}