import { useEffect, useState } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

// Small self-contained counter — animates a framer-motion value from 0 to
// `value` and rounds it for display. Used anywhere a stat should count up
// into view instead of appearing as static text.
const AnimatedCounter = ({
  value,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration, delay, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, duration, delay]);

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
};

export default AnimatedCounter;