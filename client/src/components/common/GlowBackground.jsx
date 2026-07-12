import { motion } from "framer-motion";

const GlowBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Single restrained gold glow, upper right */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 right-0 h-125 w-125 rounded-full bg-[var(--brand-gold)]/10 blur-[150px]"
      />

      {/* Faint counter-glow, lower left, for depth */}

      <div className="absolute bottom-0 -left-40 h-100 w-100 rounded-full bg-[var(--brand-gold)]/5 blur-[160px]" />

      {/* Ledger grid — faint, evokes a document / spreadsheet surface */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.035]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        [bg-size:64px_64px]"
      />

      {/* Gradient Overlay */}

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background" />
    </div>
  );
};

export default GlowBackground;
