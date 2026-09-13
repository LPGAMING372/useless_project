export default function Fog() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-void" />
      <div
        className="absolute -top-1/3 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(207,216,206,0.16) 0%, rgba(207,216,206,0.05) 45%, transparent 70%)",
        }}
      />
      <div className="fog-layer animate-drift" />
      <div className="fog-layer animate-drift-slow opacity-70" />
      <div className="grain-overlay" />
    </div>
  );
}
