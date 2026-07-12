import { CheckCircle2, Clock3, Upload, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const variants = {
    uploaded: {
      label: "Uploaded",
      icon: Upload,
      className:
        "border border-sky-500/20 bg-sky-500/10 text-sky-300",
    },

    processing: {
      label: "Processing",
      icon: Clock3,
      className:
        "border border-amber-500/20 bg-amber-500/10 text-amber-300",
    },

    completed: {
      label: "Completed",
      icon: CheckCircle2,
      className:
        "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },

    failed: {
      label: "Failed",
      icon: XCircle,
      className:
        "border border-red-500/20 bg-red-500/10 text-red-300",
    },
  };

  const current = variants[status] || variants.uploaded;
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
      {status === "processing" ? (
        <Clock3 size={13} className="animate-pulse" />
      ) : (
        <Icon size={13} />
      )}

      {current.label}
    </span>
  );
}