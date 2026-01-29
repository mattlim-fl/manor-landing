interface RotatingBadgeProps {
  className?: string
}

/**
 * Rotating "Give Me The Night" circular text badge.
 * Uses SVG textPath for the circular text effect.
 */
export function RotatingBadge({ className = '' }: RotatingBadgeProps) {
  return (
    <div className={className}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <path
            id="circlePath"
            d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          />
        </defs>
        <text
          className="fill-manor-gold"
          fontSize="11"
          fontFamily="FF Blur, Inter, sans-serif"
          fontWeight="bold"
          letterSpacing="2"
        >
          <textPath href="#circlePath" startOffset="0%">
            GIVE ME THE NIGHT · GIVE ME THE NIGHT ·{' '}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
