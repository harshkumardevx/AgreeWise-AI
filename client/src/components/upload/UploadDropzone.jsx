import { motion } from "framer-motion";
import { UploadCloud, FileText, ShieldCheck } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function UploadDropzone({
  selectedFile,
  onFileSelect,
  disabled = false,
}) {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25 }}
      {...getRootProps()}
      className={`
      relative
      overflow-hidden
      rounded-3xl
      border
      transition-all
      duration-300
      cursor-pointer

      ${
        isDragActive
          ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_60px_rgba(212,175,55,.15)]"
          : "border-white/10 bg-[#121212]"
      }

      ${disabled && "pointer-events-none opacity-70"}
      `}
    >
      <input {...getInputProps()} />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,.08),transparent_60%)]" />

      {/* Animated Border */}
      <motion.div
        animate={{
          opacity: isDragActive ? 1 : 0,
        }}
        className="absolute inset-0 rounded-3xl border border-[#D4AF37]"
      />

      <div className="relative flex flex-col items-center px-4 py-10 text-center">

        {/* Upload Icon */}
        <motion.div
          animate={{
            y: isDragActive ? -8 : 0,
            scale: isDragActive ? 1.08 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
          }}
          className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/10"
        >
          <UploadCloud className="h-12 w-12 text-[#D4AF37]" />
        </motion.div>

        <h2 className="text-2xl font-semibold text-white">
          {isDragActive
            ? "Drop your contract here"
            : "Drag & Drop your contract"}
        </h2>

        <p className="mt-4 max-w-xl text-zinc-400 leading-7">
          Upload your agreement securely for AI-powered legal analysis.
          We automatically identify risks, explain complex clauses,
          and generate practical recommendations.
        </p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="mt-8 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-sm font-medium text-[#E6C86E] transition hover:bg-[#D4AF37]/20"
        >
          Browse PDF
        </motion.button>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Features */}
        <div className="grid w-full gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <FileText className="mb-3 h-6 w-6 text-[#D4AF37]" />

            <h4 className="font-medium text-white">
              PDF Documents
            </h4>

            <p className="mt-2 text-sm text-zinc-500">
              Employment, Rental, NDA, Vendor,
              Service Agreements
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <ShieldCheck className="mb-3 h-6 w-6 text-[#D4AF37]" />

            <h4 className="font-medium text-white">
              Secure Upload
            </h4>

            <p className="mt-2 text-sm text-zinc-500">
              Documents are securely processed
              before AI analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <UploadCloud className="mb-3 h-6 w-6 text-[#D4AF37]" />

            <h4 className="font-medium text-white">
              Maximum Size
            </h4>

            <p className="mt-2 text-sm text-zinc-500">
              Supports PDF files up to
              <span className="text-white font-medium"> 5 MB</span>
            </p>
          </div>

        </div>

        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4"
          >
            <p className="text-emerald-400 font-medium">
              ✓ {selectedFile.name}
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Ready for AI analysis
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}