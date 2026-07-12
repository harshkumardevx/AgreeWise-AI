import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const StepCard = ({
  icon: Icon,
  step,
  title,
  description,
  delay,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
      }}
    >
      <Card
        className="
        group
        relative
        h-full
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-(--brand-surface)
        transition-all
        duration-500
        hover:border-(--brand-gold)/40
      "
      >
        <CardContent className="relative z-10 p-8">

          {/* Clause number + icon */}

          <div className="mb-8 flex items-center justify-between">

            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-(--brand-gold)/25
              bg-(--brand-gold)/10
              "
            >
              <Icon className="h-7 w-7 text-(--brand-gold-soft)" />
            </div>

            <span className="font-display text-2xl text-white/20">
              {step}
            </span>

          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-4 leading-8 text-white/50">
            {description}
          </p>

        </CardContent>

        {/* Bottom hairline that lights up on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 transition-colors duration-500 group-hover:bg-(--brand-gold)/50" />
      </Card>
    </motion.div>
  );
};

export default StepCard;
