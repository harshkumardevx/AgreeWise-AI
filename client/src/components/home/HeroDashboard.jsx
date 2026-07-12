import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  ShieldAlert,
  ShieldCheck,
  Brain,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/common/AnimatedCounter";

// Total time (ms) for one pass through the demo before it loops.
const CYCLE_MS = 9000;

const HeroDashboard = () => {
  const [stage, setStage] = useState(0);
  const [cycle, setCycle] = useState(0);

  // Stage 0: uploading · 1: scanning · 2: summary revealed · 3: risk & safe
  // clause cards revealed. Loops so the hero keeps demonstrating itself to
  // anyone who lingers, rather than freezing after the first pass.
  useEffect(() => {
    const timers = [];

    const run = () => {
      setStage(0);
      timers.push(setTimeout(() => setStage(1), 900));
      timers.push(setTimeout(() => setStage(2), 2400));
      timers.push(setTimeout(() => setStage(3), 4300));
    };

    run();
    const interval = setInterval(() => {
      setCycle((c) => c + 1);
      run();
    }, CYCLE_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1200}
      glareEnable
      glareMaxOpacity={0.15}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        <Card className="rounded-3xl border-white/10 bg-(--brand-surface) backdrop-blur-xl">
          <CardContent className="space-y-6 p-6">
            {/* PDF */}

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
              <div className="rounded-xl bg-(--brand-gold)/15 p-3">
                <FileText className="text-(--brand-gold-soft)" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  Employment_Agreement.pdf
                </h3>

                <p className="text-sm text-white/45">
                  2.4 MB · Uploaded moments ago
                </p>
              </div>

              <AnimatePresence mode="wait">
                {stage < 2 ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoaderCircle className="h-5 w-5 animate-spin text-(--brand-gold-soft)" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status line */}

            <div className="flex items-center gap-2 text-sm text-white/50">
              {stage === 0 && <span>Uploading document…</span>}
              {stage === 1 && <span>AI scanning clauses…</span>}
              {stage >= 2 && (
                <span className="text-emerald-400">Analysis complete</span>
              )}
            </div>

            {/* Summary */}

            <AnimatePresence>
              {stage >= 2 && (
                <motion.div
                  key={`summary-${cycle}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-white/5 p-5"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Brain className="text-(--brand-gold-soft)" />

                    <h3 className="font-semibold text-white">AI Summary</h3>
                  </div>

                  <div className="space-y-3 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      Contract Duration: 24 Months
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      Notice Period: 30 Days
                    </div>

                    <div className="flex items-center gap-2">
                      <ShieldAlert
                        size={16}
                        className="text-(--brand-gold-soft)"
                      />
                      Arbitration Clause Found
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Cards */}

            <AnimatePresence>
              {stage >= 3 && (
                <motion.div
                  key={`scores-${cycle}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <Card className="border-white/10 bg-black/30">
                    <CardContent className="flex flex-col items-center py-6">
                      <ShieldAlert size={34} className="mb-2 text-amber-400" />

                      <p className="font-display text-3xl font-semibold text-white">
                        <AnimatedCounter value={92} duration={1.4} suffix="%" />
                      </p>

                      <span className="text-sm text-white/45">Risk Score</span>
                    </CardContent>
                  </Card>

                  <Card className="border-white/10 bg-black/30">
                    <CardContent className="flex flex-col items-center py-6">
                      <ShieldCheck
                        size={34}
                        className="mb-2 text-emerald-400"
                      />

                      <p className="font-display text-3xl font-semibold text-white">
                        <AnimatedCounter value={18} duration={1.4} />
                      </p>

                      <span className="text-sm text-white/45">
                        Safe Clauses
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </Tilt>
  );
};

export default HeroDashboard;
