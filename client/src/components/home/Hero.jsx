import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight } from "lucide-react";
import HeroDashboard from "./HeroDashboard";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32">

      {/* LEFT */}

      <div className="flex-1">

        {/* Eyebrow */}

        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-(--brand-gold)" />
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-(--brand-gold-soft)">
            AI Agreement Intelligence
          </span>
        </div>

        {/* Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .8,
          }}
          className="font-display text-6xl font-semibold leading-[1.05] text-white"
        >
          Understand

          <br />

          Every Agreement

          <br />

          <span className="text-(--brand-gold)">
            Before You Sign
          </span>

        </motion.h1>

        {/* Typing */}

        <div className="mt-8 text-2xl font-semibold text-(--brand-gold-soft)">

          <TypeAnimation
            sequence={[
              "AI Summary",
              1500,
              "Risk Detection",
              1500,
              "Clause Explanation",
              1500,
              "Recommendations",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
          />

        </div>

        {/* Description */}

        <p className="mt-8 max-w-xl text-lg leading-8 text-white/50">

          Upload legal agreements and receive AI-powered
          summaries, risk analysis, clause explanations,
          and actionable recommendations in seconds.

        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap gap-4">

          <Button
  size="lg"
  onClick={handleGetStarted}
  className="rounded-xl bg-(--brand-gold) text-black hover:bg-(--brand-gold-soft)"
>
  Get Started

  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-white/15 bg-transparent text-white hover:bg-white/5"
          >
            <a href="#analysis">Live Demo</a>
          </Button>

        </div>

        {/* Stats */}

        <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-8">

          <div>

            <h2 className="font-display text-3xl font-semibold text-white">

              <AnimatedCounter value={50} duration={2} delay={0.4} suffix="K+" />

            </h2>

            <p className="text-sm text-white/45">

              Agreements

            </p>

          </div>

          <div>

            <h2 className="font-display text-3xl font-semibold text-white">

              <AnimatedCounter value={98} duration={2} delay={0.5} suffix="%" />

            </h2>

            <p className="text-sm text-white/45">

              Accuracy

            </p>

          </div>

          <div>

            <h2 className="font-display text-3xl font-semibold text-white">

              24/7

            </h2>

            <p className="text-sm text-white/45">

              AI Analysis

            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="hidden flex-1 lg:block">

      <div className="hidden flex-1 items-center justify-center lg:flex">
  <HeroDashboard />
</div>

      </div>

    </section>
  );
};

export default Hero;