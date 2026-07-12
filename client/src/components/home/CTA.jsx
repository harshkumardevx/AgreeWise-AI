import { motion } from "framer-motion";
import { ArrowRight, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-36">

      {/* Background */}

      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-(--brand-gold)/10 blur-[130px]" />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          bg-size-[40px_40px]
        "
      />

      <div className="relative mx-auto max-w-6xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: .8,
          }}
          className="
            rounded-[40px]
            border
            border-(--brand-gold)/20
            bg-(--brand-surface)
            backdrop-blur-2xl
            px-10
            py-20
            text-center
            shadow-[0_0_80px_rgba(201,162,75,.08)]
          "
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-3">

            <span className="h-px w-10 bg-(--brand-gold)" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-(--brand-gold-soft)">
              Start Using AgreeWise AI
            </span>

          </div>

          {/* Heading */}

          <h2 className="font-display mx-auto mt-8 max-w-4xl text-5xl font-semibold leading-tight text-white lg:text-6xl">

            Understand Any Legal Agreement

            <span className="block text-(--brand-gold)">

              Before You Sign

            </span>

          </h2>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/50">

            Upload your agreement and receive an AI-powered summary,
            risk analysis, highlighted clauses and actionable
            recommendations in less than a minute.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link to="/login">

              <Button
                size="lg"
                className="
                  h-14
                  rounded-xl
                  bg-(--brand-gold)
                  text-black
                  hover:bg-(--brand-gold-soft)
                  px-8
                  text-base
                "
              >

                <UploadCloud className="mr-2 h-5 w-5" />

                Upload Agreement

              </Button>

            </Link>

            <Link to="/login">

              <Button
                size="lg"
                variant="outline"
                className="
                  h-14
                  rounded-xl
                  border-white/15
                  bg-transparent
                  text-white
                  hover:bg-white/5
                  px-8
                "
              >

                Explore Dashboard

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

            </Link>

          </div>

          {/* Stats */}

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div>

              <h3 className="font-display text-4xl font-semibold text-(--brand-gold)">

                30s

              </h3>

              <p className="mt-2 text-white/45">

                Average Analysis Time

              </p>

            </div>

            <div>

              <h3 className="font-display text-4xl font-semibold text-(--brand-gold)">

                99%

              </h3>

              <p className="mt-2 text-white/45">

                Clause Detection Accuracy

              </p>

            </div>

            <div>

              <h3 className="font-display text-4xl font-semibold text-(--brand-gold)">

                24/7

              </h3>

              <p className="mt-2 text-white/45">

                AI Availability

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}