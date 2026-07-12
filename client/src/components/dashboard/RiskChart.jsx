import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RiskChart({
  stats = null,
  loading = false,
}) {
  const navigate = useNavigate();

  const safe = stats?.lowRiskCount ?? 0;
  const medium = stats?.mediumRiskCount ?? 0;
  const high = stats?.highRiskCount ?? 0;

  const total = safe + medium + high;

  const safePercentage =
    total > 0 ? Math.round((safe / total) * 100) : 0;

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-6">
        <p className="text-sm text-zinc-500">
          Loading risk overview...
        </p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-[#111111]
        p-6
      "
    >
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">
          Risk Overview
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          AI analysis summary of your agreements
        </p>
      </div>

      {/* Empty */}

      {total === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 py-14 text-center">
          <ShieldCheck
            size={42}
            className="mx-auto text-zinc-600"
          />

          <h3 className="mt-5 text-lg font-semibold text-white">
            No analyzed contracts
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Upload and analyze a contract to view
            your risk summary.
          </p>
        </div>
      ) : (
        <>
          {/* Total */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center">
            <p className="text-sm text-zinc-500">
              Total Contracts
            </p>

            <h1 className="mt-2 text-5xl font-bold text-white">
              {total}
            </h1>
          </div>

          {/* Risk List */}

          <div className="mt-6 space-y-4">
            <RiskRow
              icon={ShieldCheck}
              color="emerald"
              label="Safe"
              value={safe}
            />

            <RiskRow
              icon={ShieldAlert}
              color="amber"
              label="Medium Risk"
              value={medium}
            />

            <RiskRow
              icon={ShieldX}
              color="red"
              label="High Risk"
              value={high}
            />
          </div>

          {/* Progress */}

          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-400">
                Portfolio Safety
              </span>

              <span className="font-semibold text-emerald-400">
                {safePercentage}% Safe
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${safePercentage}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
          </div>

          {/* Button */}

          <button
            onClick={() => navigate("/reports")}
            className="
              mt-8
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/40
              py-3
              font-medium
              text-white
              transition
              hover:border-[#C9A227]
              hover:text-[#C9A227]
            "
          >
            View Detailed Reports

            <ArrowRight size={18} />
          </button>
        </>
      )}
    </motion.section>
  );
}

function RiskRow({
  icon: Icon,
  label,
  value,
  color,
}) {
  const styles = {
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
    },

    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
    },

    red: {
      bg: "bg-red-500/10",
      text: "text-red-400",
    },
  };

  const current = styles[color];

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/40
        p-4
      "
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${current.bg}
          `}
        >
          <Icon
            size={20}
            className={current.text}
          />
        </div>

        <span className="font-medium text-white">
          {label}
        </span>
      </div>

      <span className={`text-xl font-bold ${current.text}`}>
        {value}
      </span>
    </motion.div>
  );
}