import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  LoaderCircle,
} from "lucide-react";

export default function RiskBadge({ risk }) {
  const variants = {
    low: {
      label: "Low Risk",
      icon: ShieldCheck,
      className:
        "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },

    medium: {
      label: "Medium Risk",
      icon: ShieldAlert,
      className:
        "border border-amber-500/20 bg-amber-500/10 text-amber-300",
    },

    high: {
      label: "High Risk",
      icon: ShieldX,
      className:
        "border border-red-500/20 bg-red-500/10 text-red-300",
    },

    pending: {
      label: "Pending",
      icon: LoaderCircle,
      className:
        "border border-zinc-700 bg-zinc-800/60 text-zinc-400",
    },
  };

  const current = variants[risk] || variants.pending;
  const Icon = current.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-xs
        font-medium
        tracking-wide
        ${current.className}
      `}
    >
      {risk === "pending" ? (
        <LoaderCircle size={13} className="animate-spin" />
      ) : (
        <Icon size={13} />
      )}

      {current.label}
    </span>
  );
}