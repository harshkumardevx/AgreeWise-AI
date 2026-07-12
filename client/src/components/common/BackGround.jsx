export default function Background() {
  return (
    <>
      {/* Base */}

      <div className="fixed inset-0 -z-50 bg-black" />

      {/* Grid */}

      <div
        className="
          fixed
          inset-0
          -z-40
          opacity-[0.04]
          [background-image:linear-linear(to_right,#ffffff_1px,transparent_1px),linear-linear(to_bottom,#ffffff_1px,transparent_1px)]
          bg-size-[60px_60px]
        "
      />

      {/* Cyan Glow */}

      <div className="fixed -left-48 top-0 -z-30 h-175 w-175 rounded-full bg-cyan-500/10 blur-[220px]" />

      {/* Purple Glow */}

      <div className="fixed -right-48 bottom-0 -z-30 h-175 w-175 rounded-full bg-violet-500/10 blur-[220px]" />

      {/* Center Glow */}

      <div className="fixed left-1/2 top-1/3 -z-30 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-500/5 blur-[180px]" />
    </>
  );
}