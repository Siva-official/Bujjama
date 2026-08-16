import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface AnimatedCakeProps {
  isWishMade: boolean;
}

export const AnimatedCake: React.FC<AnimatedCakeProps> = ({ isWishMade }) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-2 sm:py-4 my-2 select-none w-full max-w-full overflow-visible">
      {/* Dynamic Ambient Glow Behind Cake */}
      <motion.div
        animate={{
          scale: isWishMade ? [1, 1.2, 1.1] : [1, 1.08, 1],
          opacity: isWishMade ? [0.4, 0.8, 0.55] : [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: isWishMade ? 2.5 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-56 sm:w-80 md:w-96 h-56 sm:h-80 md:h-96 rounded-full bg-gradient-to-tr from-pink-600/35 via-rose-500/30 to-amber-500/25 blur-[50px] sm:blur-[70px] pointer-events-none -z-10"
      />

      {/* Floating Sparkle Elements around the Cake */}
      <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
        {[
          { top: '8%', left: '15%', delay: 0.2, duration: 3.5 },
          { top: '20%', right: '12%', delay: 0.8, duration: 3.2 },
          { top: '60%', left: '10%', delay: 1.4, duration: 4.0 },
          { top: '70%', right: '15%', delay: 1.0, duration: 3.6 },
        ].map((sp, idx) => (
          <motion.div
            key={idx}
            style={{ top: sp.top, left: sp.left, right: sp.right }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.75, 0.2],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: sp.duration,
              repeat: Infinity,
              delay: sp.delay,
              ease: 'easeInOut',
            }}
            className="absolute text-pink-300/60"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-200/80" />
          </motion.div>
        ))}
      </div>

      {/* Responsive Tiered Cake with Native SVG Flames */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 25 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-60 xs:w-72 sm:w-80 md:w-96 max-w-full h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
      >
        <svg
          viewBox="0 0 320 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            {/* Cake Plate Gradient */}
            <linearGradient id="plateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e1028" />
              <stop offset="30%" stopColor="#4a254b" />
              <stop offset="50%" stopColor="#fb7185" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#4a254b" />
              <stop offset="100%" stopColor="#1e1028" />
            </linearGradient>

            {/* Base Tier Gradient (Velvet Ruby/Rose) */}
            <linearGradient id="tier1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#581c38" />
              <stop offset="40%" stopColor="#3b0f24" />
              <stop offset="100%" stopColor="#1f0713" />
            </linearGradient>

            {/* Middle Tier Gradient (Soft Rose Quartz) */}
            <linearGradient id="tier2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="40%" stopColor="#500724" />
              <stop offset="100%" stopColor="#2b0413" />
            </linearGradient>

            {/* Top Tier Gradient (Golden Cream Blush) */}
            <linearGradient id="tier3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9d174d" />
              <stop offset="40%" stopColor="#700936" />
              <stop offset="100%" stopColor="#3d051c" />
            </linearGradient>

            {/* Premium Gold Accent Gradient */}
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Frosting Dripping Gradient */}
            <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff1f2" />
              <stop offset="70%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>

            {/* Candle Body Gradient */}
            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="40%" stopColor="#fff" />
              <stop offset="70%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>

            {/* Candle Flame Radial Glow */}
            <radialGradient id="flameGrad" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </radialGradient>

            {/* Outer Flame Glow */}
            <filter id="flameBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>

          {/* Pedestal / Platter Base */}
          <ellipse cx="160" cy="256" rx="140" ry="16" fill="url(#plateGrad)" />
          <ellipse cx="160" cy="253" rx="136" ry="13" fill="#0d0411" stroke="url(#goldAccent)" strokeWidth="1.5" />

          {/* === TIER 1: Bottom Tier (Widest) === */}
          <g>
            <path d="M 45 195 C 45 195 45 235 45 238 C 45 252 275 252 275 238 C 275 235 275 195 275 195 Z" fill="url(#tier1Grad)" />
            <ellipse cx="160" cy="195" rx="115" ry="20" fill="#701a40" stroke="url(#goldAccent)" strokeWidth="1" />
            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={`b-pearl-${i}`}
                cx={55 + i * 15}
                cy={240 + Math.sin((i / 14) * Math.PI) * 8}
                r="3"
                fill="url(#goldAccent)"
                opacity="0.85"
              />
            ))}
            <path
              d="M 50 198 Q 75 215 100 198 Q 125 215 150 198 Q 175 215 200 198 Q 225 215 250 198 Q 265 210 270 198"
              fill="none"
              stroke="url(#frostingGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* === TIER 2: Middle Tier === */}
          <g>
            <path d="M 80 142 C 80 142 80 185 80 188 C 80 200 240 200 240 188 C 240 185 240 142 240 142 Z" fill="url(#tier2Grad)" />
            <ellipse cx="160" cy="142" rx="80" ry="16" fill="#881337" stroke="url(#goldAccent)" strokeWidth="1" />
            <path
              d="M 85 145 Q 110 162 135 145 Q 160 162 185 145 Q 210 162 235 145"
              fill="none"
              stroke="url(#frostingGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="120" cy="168" r="2.5" fill="url(#goldAccent)" />
            <circle cx="160" cy="172" r="3" fill="url(#goldAccent)" />
            <circle cx="200" cy="168" r="2.5" fill="url(#goldAccent)" />
          </g>

          {/* === TIER 3: Top Tier === */}
          <g>
            <path d="M 115 95 C 115 95 115 132 115 135 C 115 145 205 145 205 135 C 205 132 205 95 205 95 Z" fill="url(#tier3Grad)" />
            <ellipse cx="160" cy="95" rx="45" ry="11" fill="#9f1239" stroke="url(#goldAccent)" strokeWidth="1.2" />
            <path
              d="M 116 97 C 122 112 128 112 134 97 C 140 118 148 118 154 97 C 160 114 168 114 174 97 C 182 120 190 120 196 97 C 200 106 203 106 204 97"
              fill="url(#frostingGrad)"
              opacity="0.9"
            />
          </g>

          {/* === CANDLES === */}
          {[
            { x: 135, y: 72, h: 26 },
            { x: 160, y: 64, h: 32 }, // Center main candle
            { x: 185, y: 72, h: 26 },
          ].map((candle, idx) => (
            <g key={`candle-${idx}`}>
              <rect
                x={candle.x - 3}
                y={candle.y}
                width="6"
                height={candle.h}
                rx="2"
                fill="url(#candleGrad)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.5"
              />
              <path
                d={`M ${candle.x - 3} ${candle.y + 6} L ${candle.x + 3} ${candle.y + 10} M ${candle.x - 3} ${candle.y + 14} L ${candle.x + 3} ${candle.y + 18}`}
                stroke="url(#goldAccent)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <line
                x1={candle.x}
                y1={candle.y}
                x2={candle.x}
                y2={candle.y - 6}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* === NATIVE SVG CANDLE FLAMES (Pixel-locked & Responsive) === */}
          {[
            { cx: 135, topY: 48, baseW: 6, h: 18, delay: 0.1 },
            { cx: 160, topY: 38, baseW: 8, h: 22, delay: 0 }, // Center
            { cx: 185, topY: 48, baseW: 6, h: 18, delay: 0.2 },
          ].map((flame, idx) => (
            <g key={`flame-group-${idx}`}>
              {!isWishMade ? (
                <g className="transition-opacity duration-700">
                  {/* Outer Golden Glow Halo */}
                  <circle
                    cx={flame.cx}
                    cy={flame.topY + flame.h * 0.55}
                    r={flame.h * 0.7}
                    fill="#f59e0b"
                    opacity="0.35"
                    filter="url(#flameBlur)"
                  />
                  {/* Outer Flame Teardrop */}
                  <path
                    d={`M ${flame.cx} ${flame.topY} C ${flame.cx - flame.baseW} ${flame.topY + flame.h * 0.6} ${flame.cx - flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx} ${flame.topY + flame.h} C ${flame.cx + flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx + flame.baseW} ${flame.topY + flame.h * 0.6} ${flame.cx} ${flame.topY} Z`}
                    fill="url(#flameGrad)"
                  >
                    <animate
                      attributeName="d"
                      dur={`${0.8 + flame.delay}s`}
                      repeatCount="indefinite"
                      values={`
                        M ${flame.cx} ${flame.topY} C ${flame.cx - flame.baseW} ${flame.topY + flame.h * 0.6} ${flame.cx - flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx} ${flame.topY + flame.h} C ${flame.cx + flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx + flame.baseW} ${flame.topY + flame.h * 0.6} ${flame.cx} ${flame.topY} Z;
                        M ${flame.cx + 1.5} ${flame.topY - 1} C ${flame.cx - flame.baseW * 0.8} ${flame.topY + flame.h * 0.5} ${flame.cx - flame.baseW * 0.9} ${flame.topY + flame.h} ${flame.cx} ${flame.topY + flame.h} C ${flame.cx + flame.baseW * 0.9} ${flame.topY + flame.h} ${flame.cx + flame.baseW * 0.8} ${flame.topY + flame.h * 0.5} ${flame.cx + 1.5} ${flame.topY - 1} Z;
                        M ${flame.cx - 1.5} ${flame.topY} C ${flame.cx - flame.baseW * 0.9} ${flame.topY + flame.h * 0.6} ${flame.cx - flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx} ${flame.topY + flame.h} C ${flame.cx + flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx + flame.baseW * 0.9} ${flame.topY + flame.h * 0.6} ${flame.cx - 1.5} ${flame.topY} Z;
                        M ${flame.cx} ${flame.topY} C ${flame.cx - flame.baseW} ${flame.topY + flame.h * 0.6} ${flame.cx - flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx} ${flame.topY + flame.h} C ${flame.cx + flame.baseW * 0.8} ${flame.topY + flame.h} ${flame.cx + flame.baseW} ${flame.topY + flame.h * 0.6} ${flame.cx} ${flame.topY} Z
                      `}
                    />
                  </path>
                  {/* Inner Blue/White Core */}
                  <ellipse
                    cx={flame.cx}
                    cy={flame.topY + flame.h * 0.8}
                    rx={flame.baseW * 0.35}
                    ry={flame.h * 0.2}
                    fill="#67e8f9"
                    opacity="0.85"
                  />
                </g>
              ) : (
                /* Stardust Smoke on Extinguish */
                <g opacity="0.6">
                  <circle cx={flame.cx} cy={flame.topY + 6} r="2" fill="#fda4af">
                    <animate attributeName="cy" from={`${flame.topY + 6}`} to={`${flame.topY - 20}`} dur="1.5s" fill="freeze" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="1.5s" fill="freeze" />
                    <animate attributeName="r" from="2" to="6" dur="1.5s" fill="freeze" />
                  </circle>
                  <circle cx={flame.cx + 2} cy={flame.topY + 2} r="1.5" fill="#fbcfe8">
                    <animate attributeName="cy" from={`${flame.topY + 2}`} to={`${flame.topY - 26}`} dur="1.8s" fill="freeze" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="1.8s" fill="freeze" />
                  </circle>
                </g>
              )}
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

