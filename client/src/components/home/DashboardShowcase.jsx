import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import FeaturePoint from "./FeaturePoint";
import DashboardMockup from "./DashboardMockup";

const features = [
  {
    title: "AI Generated Summary",
    description:
      "Understand lengthy legal agreements in seconds instead of hours.",
  },
  {
    title: "Smart Risk Detection",
    description:
      "Automatically identify risky clauses before signing.",
  },
  {
    title: "Clause Explanation",
    description:
      "Complex legal language translated into plain English.",
  },
  {
    title: "Actionable Recommendations",
    description:
      "Receive AI suggestions to negotiate better contract terms.",
  },
  {
    title: "Download Professional Reports",
    description:
      "Export clean reports for personal or business use.",
  },
];

export default function DashboardShowcase() {
  return (
    <section id="analysis" className="relative overflow-hidden py-36">

      {/* Background Blur */}

      <div className="absolute left-0 top-40 h-72 w-72 rounded-full bg-(--brand-gold)/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: .8,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-(--brand-gold)" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-(--brand-gold-soft)">
              Live AI Analysis
            </span>
          </div>

          <h2 className="font-display mt-6 text-5xl font-semibold leading-tight text-white lg:text-6xl">
            See AI Analyze
            <span className="block text-(--brand-gold)">
              Agreements Live
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-white/50">
            Watch how AgreeWise AI scans agreements, highlights risky clauses,
            generates summaries and recommends improvements in real time.
          </p>

          <div className="mt-12 space-y-8">
            {features.map((item, index) => (
              <FeaturePoint
                key={item.title}
                {...item}
                delay={index * 0.15}
              />
            ))}
          </div>

          <div className="mt-12">

            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-white/15 bg-transparent text-white hover:bg-white/5"
            >
              <a href="#faq">Learn More</a>

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* RIGHT */}

        <DashboardMockup />

      </div>
    </section>
  );
}