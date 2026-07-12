import {
  AlertTriangle,
  Trash2,
  X,
  ShieldAlert,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

export default function ClearHistoryDialog({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 35,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-50
              w-[94%]
              max-w-md
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#111111]
              shadow-2xl
            "
          >
            {/* Gold Header */}

            <div className="border-b border-white/5 bg-gradient-to-r from-[#D4AF37]/10 to-transparent px-8 py-6">

              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-red-500/20
                  bg-red-500/10
                "
              >
                <ShieldAlert
                  size={30}
                  className="text-red-400"
                />
              </motion.div>

              <h2 className="mt-5 text-center text-2xl font-bold text-white">
                Clear Activity History
              </h2>

              <p className="mt-3 text-center leading-7 text-zinc-500">
                This will permanently remove your entire
                activity timeline. This action cannot be
                undone.
              </p>

            </div>

            {/* Buttons */}

            <div className="flex gap-4 p-8">

              <button
                onClick={onClose}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-white/10
                  bg-[#181818]
                  py-3
                  font-medium
                  text-zinc-300
                  transition-all
                  duration-200
                  hover:border-[#D4AF37]/30
                  hover:text-white
                "
              >
                Cancel
              </button>

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                disabled={loading}
                onClick={onConfirm}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-500
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Trash2 size={18} />

                {loading ? "Clearing..." : "Clear History"}

              </motion.button>

            </div>

            {/* Close */}

            <button
              onClick={onClose}
              className="
                absolute
                right-5
                top-5
                rounded-lg
                p-2
                text-zinc-500
                transition
                hover:bg-white/5
                hover:text-white
              "
            >
              <X size={18} />
            </button>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}