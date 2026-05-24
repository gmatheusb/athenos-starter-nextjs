export function AuthOrbs() {
  return (
    <>
      <div
        className="pointer-events-none fixed"
        style={{
          top: '5%', left: '10%',
          width: 560, height: 560,
          background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'orb-float-1 14s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed"
        style={{
          bottom: '5%', right: '8%',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(255,61,187,0.14) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'orb-float-2 18s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed"
        style={{
          top: '50%', left: '50%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 60%)',
          filter: 'blur(72px)',
          transform: 'translate(-50%, -50%)',
          animation: 'orb-float-3 22s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
    </>
  )
}
