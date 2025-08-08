function BackgroundTexture() {
  return (
    <>
      {/* Warm beige gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-amber-50 to-yellow-50/60" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-orange-50/40 to-amber-100/30" />
      
      {/* Subtle cross bottom-left and crescent top-right using actual PNG assets */}
      <div className="absolute inset-0">
        {/* Cross - bottom left */}
        <img 
          src="/red-cross.png" 
          alt=""
          className="absolute w-[400px] h-[400px] opacity-[0.02]" 
          style={{ left: '5%', bottom: '10%' }}
        />
        {/* Crescent - top right */}
        <img 
          src="/red-crescent.png" 
          alt=""
          className="absolute w-[350px] h-[350px] opacity-[0.02]" 
          style={{ right: '8%', top: '10%' }}
        />
      </div>
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
      }} />
    </>
  )
}

export default BackgroundTexture