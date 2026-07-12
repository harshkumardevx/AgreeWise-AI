import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const FeaturePoint = ({ title, description, delay }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
      }}
      className="flex gap-4"
    >
      <div className="mt-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--brand-gold)/25 bg-(--brand-gold)/10">
          <CheckCircle2 className="h-5 w-5 text-(--brand-gold-soft)" />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-white">
          {title}
        </h4>

        <p className="mt-1 leading-7 text-white/50">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default FeaturePoint;
