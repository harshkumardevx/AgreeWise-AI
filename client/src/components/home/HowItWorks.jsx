import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  FileCheck2,
} from "lucide-react";

import StepCard from "./StepCard";

const steps = [
  {
    step: "§01",
    title: "Upload Agreement",
    description:
      "Securely upload your agreement in PDF format.",
    icon: Upload,
  },
  {
    step: "§02",
    title: "AI Analysis",
    description:
      "AgreeWise AI scans clauses, risks and legal terms.",
    icon: Brain,
  },
  {
    step: "§03",
    title: "Smart Report",
    description:
      "Receive summaries, risks and recommendations.",
    icon: FileCheck2,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
  once: false,
  amount: 0.3,
}}
          transition={{ duration: .7 }}
          className="mx-auto mb-28 max-w-3xl text-center"
        >
          <p className="font-semibold uppercase tracking-[0.35em] text-(--brand-gold-soft)">
            PROCESS
          </p>

          <h2 className="font-display mt-5 text-5xl font-semibold text-white lg:text-6xl">
            How AgreeWise Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/50">
            Analyze agreements in three simple steps.
          </p>
        </motion.div>

        {/* ================= TIMELINE ================= */}

        <div className="relative hidden lg:block">

          {/* Base Line */}

          <div className="absolute left-0 right-0 top-6 h-0.75 rounded-full bg-white/10" />

          {/* Animated Line */}

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "100%",
            }}
            viewport={{
  once: false,
  amount: 0.3,
}}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-0
              top-6
              h-0.75
              rounded-full
              bg-(--brand-gold)
            "
          />

          {/* Moving Dot */}

          <motion.div
            initial={{
              left: "0%",
              opacity: 0,
            }}
            whileInView={{
              left: "100%",
              opacity: 1,
            }}
            viewport={{
  once: false,
  amount: 0.3,
}}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
            className="
              absolute
              top-3.25
              h-5
              w-5
              rounded-full
              bg-(--brand-gold)
              shadow-[0_0_30px_var(--brand-gold)]
            "
          />

          {/* Timeline Steps */}

          <div className="relative flex justify-between">

            {steps.map((item, index) => (

              <motion.div
                key={item.step}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{
  once: false,
  amount: 0.3,
}}
                transition={{
                  delay: 1.7 + index * .3,
                  type: "spring",
                }}
                className="relative flex flex-col items-center"
              >

                {/* Circle */}

                <div
                  className="
                    z-20
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-background
                    bg-(--brand-gold)
                    font-display
                    font-semibold
                    text-black
                    shadow-[0_0_25px_rgba(201,162,75,.35)]
                  "
                >
                  {item.step}
                </div>

                {/* Vertical Line */}

                <motion.div
                  initial={{
                    height: 0,
                  }}
                  whileInView={{
                    height: 65,
                  }}
                  viewport={{
  once: false,
  amount: 0.3,
}}
                  transition={{
                    delay: 2 + index * .3,
                    duration: .5,
                  }}
                  className="
                    mt-1
                    w-0.75
                    rounded-full
                    bg-linear-to-b
                    from-(--brand-gold)
                    to-transparent
                  "
                />

              </motion.div>

            ))}

          </div>

        </div>

        {/* ================= CARDS ================= */}

        <div className="mt-20 grid gap-10 lg:grid-cols-3">

          {steps.map((item, index) => (

            <StepCard
              key={item.step}
              {...item}
              delay={2.4 + index * .25}
            />

          ))}

        </div>

      </div>
    </section>
  );
}