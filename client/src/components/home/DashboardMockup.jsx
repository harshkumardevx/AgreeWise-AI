import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  FileText,
  Brain,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  LoaderCircle,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import AnimatedCounter from "@/components/common/AnimatedCounter";

const DashboardMockup = () => {
  const [stage, setStage] = useState(0);

  // Tilt effect — replaces react-parallax-tilt. Tracks mouse position over
  // the card and converts it into a rotateX/rotateY spring.
  const cardRef = useRef(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 12); // left/right tilt, max ~6deg either way
    rotateX.set((0.5 - py) * 12); // up/down tilt
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2500),
      setTimeout(() => setStage(3), 4200),
      setTimeout(() => setStage(4), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: 1500 }}
    >
      {/* Background Glow */}
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-(--brand-gold)/10 blur-[100px]" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Card className="relative overflow-hidden rounded-3xl border-white/10 bg-(--brand-surface) backdrop-blur-2xl">
          {/* Glare — subtle light patch that follows the cursor */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12), transparent 60%)`
              ),
            }}
          />

          {/* Header */}
          <div className="border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-(--brand-gold)/15 p-3">
                <FileText className="text-(--brand-gold-soft)" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  Employment_Agreement.pdf
                </h3>
                <p className="text-sm text-white/45">2.8 MB • Uploaded</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="border-b border-white/10 p-5">
            {stage === 0 && (
              <div className="flex items-center gap-3">
                <LoaderCircle className="animate-spin text-(--brand-gold-soft)" />
                <span className="text-white/60">Uploading document...</span>
              </div>
            )}

            {stage === 1 && (
              <div className="flex items-center gap-3">
                <LoaderCircle className="animate-spin text-(--brand-gold-soft)" />
                <span className="text-white/60">AI scanning clauses...</span>
              </div>
            )}

            {stage >= 2 && (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400" />
                <span className="text-emerald-400">Analysis Completed</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-white/10 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Brain className="text-(--brand-gold-soft)" />
                <h4 className="font-semibold text-white">AI Summary</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/45">Duration</span>
                  <span className="text-white">24 Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/45">Notice Period</span>
                  <span className="text-white">30 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/45">Confidentiality</span>
                  <span className="text-emerald-400">Present</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Risk */}
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b border-white/10 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="text-amber-400" />
                  <span className="font-semibold text-white">Risk Score</span>
                </div>
                <div className="font-display text-3xl font-semibold text-amber-400">
                  <AnimatedCounter value={82} duration={2} suffix="%" />
                </div>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 2 }}
                  className="h-full rounded-full bg-linear-to-r from-amber-500 to-red-500"
                />
              </div>
            </motion.div>
          )}

          {/* Clauses */}
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="text-(--brand-gold-soft)" />
                <h4 className="font-semibold text-white">AI Recommendations</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <ShieldAlert size={16} className="text-amber-400" />
                  Review Arbitration Clause
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <ShieldAlert size={16} className="text-amber-400" />
                  Reduce Notice Period
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 size={16} />
                  Salary Clause Looks Safe
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardMockup;