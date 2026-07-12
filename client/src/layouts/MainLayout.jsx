import { Outlet } from "react-router-dom";

import GlowBackground from "@/components/common/GlowBackground";
import Navbar from "@/components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="dark relative min-h-screen overflow-hidden bg-(--brand-ink) text-white">

      <GlowBackground />

      <Navbar />

      <main className="relative z-10">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;