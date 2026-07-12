import { useEffect, useState } from "react";
import { Menu, Home, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ProfileDropdown from "./ProfileDropdown";

const QUOTES = [
  "Read the fine print before it reads you.",
  "Every clause tells a story. AgreeWise AI reads it first.",
  "Contracts are promises with consequences.",
  "The riskiest clause is the one nobody reads.",
  "AI can't sign for you, but it can warn you.",
  "Clarity today saves disputes tomorrow.",
  "A fair contract protects both sides equally.",
  "Small print, big consequences.",
];

export default function TopNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        sticky
        top-0
        z-40
        border-b
        border-[#222]
        bg-[#0B0B0B]/95
        backdrop-blur-xl
      "
    >
      {/* Glow */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="flex h-20 items-center justify-between px-6">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* Mobile */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-[#262626]
              bg-[#151515]
              text-zinc-400
              transition
              hover:border-[#D4AF37]/40
              hover:text-[#D4AF37]
              lg:hidden
            "
          >
            <Menu size={19} />
          </motion.button>

          {/* Home */}

          <motion.button
            whileHover={{
              scale: 1.05,
              rotate: -5,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            title="Home"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-[#262626]
              bg-[#151515]
              text-zinc-400
              transition
              hover:border-[#D4AF37]/40
              hover:text-[#D4AF37]
            "
          >
            <Home size={19} />
          </motion.button>

          {/* Quote */}

          <div className="hidden md:block">

            <div
              className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-[#242424]
                bg-[#141414]
                px-5
                py-2.5
              "
            >
              <Quote
                size={15}
                className="text-[#D4AF37]"
              />

              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    max-w-lg
                    truncate
                    text-sm
                    italic
                    text-zinc-400
                  "
                >
                  {QUOTES[quoteIndex]}
                </motion.p>
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <ProfileDropdown />

        </div>

      </div>
    </motion.header>
  );
}