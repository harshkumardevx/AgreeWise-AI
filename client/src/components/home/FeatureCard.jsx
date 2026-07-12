import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index = 0,
  delay = 0,
}) => {
  const clauseNumber = String(index + 1).padStart(2, "0");

  return (
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
        duration: 0.6,
        delay,
      }}
      whileHover={{
        y: -6,
      }}
    >
      <Card
        className="
        h-full
        border-white/10
        bg-(--brand-surface)
        transition-all
        duration-300
        hover:border-(--brand-gold)/40
      "
      >
        <CardContent className="p-8">

          <div className="mb-6 flex items-center justify-between">

            <div
              className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-xl
              border
              border-(--brand-gold)/25
              bg-(--brand-gold)/10
            "
            >
              <Icon className="h-6 w-6 text-(--brand-gold-soft)" />
            </div>

            <span className="font-display text-sm text-white/25">
              §{clauseNumber}
            </span>

          </div>

          <h3 className="mb-3 text-xl font-bold text-white">
            {title}
          </h3>

          <p className="leading-7 text-white/50">
            {description}
          </p>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
