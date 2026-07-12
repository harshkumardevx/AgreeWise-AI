import {
  AlertTriangle,
  Trash2,
  X,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteDialog({
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
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 24,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Gold Accent */}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,.08),transparent_45%)]" />

            <div className="relative p-8">

              {/* Close */}

              <button
                onClick={onClose}
                className="
                  absolute
                  right-6
                  top-6
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

              {/* Icon */}

              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">

                <ShieldAlert
                  size={34}
                  className="text-red-400"
                />

              </div>

              {/* Heading */}

              <h2 className="mt-7 text-center font-serif text-3xl font-semibold text-white">
                Delete Contract?
              </h2>

              {/* Description */}

              <p className="mx-auto mt-4 max-w-md text-center leading-7 text-zinc-400">
                This action is permanent. The uploaded contract,
                AI analysis report, and associated history
                will be removed from your workspace.
              </p>

              {/* Warning */}

              <div className="mt-8 rounded-2xl border border-red-500/15 bg-red-500/5 p-5">

                <div className="flex items-start gap-3">

                  <AlertTriangle
                    size={18}
                    className="mt-0.5 text-red-400"
                  />

                  <div>

                    <h4 className="font-medium text-red-300">
                      This action cannot be undone
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                      Once deleted, the original document,
                      generated AI report, and analysis history
                      cannot be recovered.
                    </p>

                  </div>

                </div>

              </div>

              {/* Buttons */}

              <div className="mt-10 flex gap-4">

                <button
                  onClick={onClose}
                  disabled={loading}
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-white/10
                    bg-[#171717]
                    py-3
                    font-medium
                    text-zinc-300
                    transition-all
                    hover:bg-[#1d1d1d]
                    hover:text-white
                  "
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={onConfirm}
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-600
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-red-700
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete Contract
                    </>
                  )}
                </button>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}