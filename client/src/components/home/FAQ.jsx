import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is my agreement secure?",
    answer:
      "Yes. All uploaded agreements are encrypted during transmission and securely processed. We never share your documents with third parties.",
  },
  {
    question: "Which file formats are supported?",
    answer:
      "Currently AgreeWise AI supports PDF agreements. DOCX and image-based documents will be available in future updates.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer:
      "Our AI identifies clauses, summarizes contracts, and highlights risks with high accuracy. However, it should assist—not replace—a qualified legal professional.",
  },
  {
    question: "Can I download my report?",
    answer:
      "Yes. After analysis, you can download a professional PDF report containing summaries, risk scores, and recommendations.",
  },
  {
    question: "Does AgreeWise AI replace a lawyer?",
    answer:
      "No. AgreeWise AI helps you understand legal agreements faster, but it is designed to assist users rather than replace legal advice.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The free plan allows limited document analyses each month. Premium plans with advanced AI features will be introduced soon.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-black py-36">
      {/* Background Glow */}

      <div className="absolute -left-30 top-20 h-112.5 w-112.5 rounded-full bg-[var(--brand-gold)]/8 blur-[180px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--brand-gold)]" />
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--brand-gold-soft)]">
              FAQ
            </span>
          </div>

          <h2 className="font-display mt-8 text-4xl font-semibold leading-tight text-white md:text-6xl">
            Frequently Asked
            <span className="block text-[var(--brand-gold)]">
              Questions
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-white/50">
            Everything you need to know before uploading your legal agreement to
            AgreeWise AI.
          </p>
        </motion.div>

        {/* Accordion */}

        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="
group
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/[0.03]
backdrop-blur-xl
px-8
transition-all
duration-300
hover:border-[var(--brand-gold)]/40
hover:bg-white/5
hover:shadow-[0_20px_60px_rgba(201,162,75,.12)]
"
              >
                <AccordionTrigger
                  className="
py-5
text-left
text-xl
font-semibold
text-white
transition-colors
hover:text-[var(--brand-gold-soft)]
hover:no-underline
"
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent
                  className="
pb-5
pr-8
text-[16px]
leading-8
text-white/50
"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
