import { motion } from "framer-motion";
import ReportCard from "./ReportCard";

export default function ReportsGrid({
  reports,
  onViewReport,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="
        grid
        gap-6
        md:grid-cols-2
        2xl:grid-cols-3
      "
    >
      {reports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
            delay: index * 0.05,
          }}
        >
          <ReportCard
            report={report}
            onViewReport={onViewReport}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}