import {
  Brain,
  ShieldAlert,
  FileSearch,
  Lightbulb,
  Lock,
  Zap,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "AI Summary",
    description:
      "Generate short, easy-to-read summaries of lengthy agreements in just a few seconds.",
    icon: Brain,
  },
  {
    title: "Risk Detection",
    description:
      "Identify risky clauses, hidden obligations, and legal concerns before signing.",
    icon: ShieldAlert,
  },
  {
    title: "Clause Explanation",
    description:
      "Understand every legal clause in simple language without legal expertise.",
    icon: FileSearch,
  },
  {
    title: "Smart Recommendations",
    description:
      "Receive AI-powered suggestions to improve contract safety and reduce risks.",
    icon: Lightbulb,
  },
  {
    title: "Privacy First",
    description:
      "Your uploaded agreements stay secure with privacy-focused processing.",
    icon: Lock,
  },
  {
    title: "Lightning Fast",
    description:
      "Analyze complete agreements in seconds with optimized AI workflows.",
    icon: Zap,
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-(--brand-gold-soft)">
            FEATURES
          </p>

          <h2 className="font-display mb-6 text-4xl font-semibold text-white lg:text-5xl">
            Everything You Need to
            <span className="block text-(--brand-gold)">
              Analyze Agreements
            </span>
          </h2>

          <p className="text-lg leading-8 text-white/50">
            AgreeWise AI combines artificial intelligence and legal document
            analysis to help you understand contracts quickly and confidently.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
              delay={index * 0.1}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;