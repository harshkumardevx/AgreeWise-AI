import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="
                fixed
                left-0
                top-0
                z-50
                flex
                h-screen
                w-72
                flex-col
                border-r
                border-zinc-800
                bg-[#09090B]
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 p-5">
                <h2 className="text-lg font-semibold">
                  AgreeWise AI
                </h2>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="
                    rounded-lg
                    p-2
                    text-zinc-400
                    transition
                    hover:bg-zinc-800
                    hover:text-white
                  "
                >
                  <X size={20} />
                </button>
              </div>

              {/* Sidebar */}
              <div className="flex-1 overflow-y-auto">
                <Sidebar mobile />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="lg:ml-72">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="min-h-[calc(100vh-80px)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}