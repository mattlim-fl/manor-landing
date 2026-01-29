interface SparkleProps {
  /** Size of the sparkle in pixels (default: 16) */
  size?: number
  /** Additional CSS classes */
  className?: string
  /** Animation delay variant: 0, 1, or 2 */
  delay?: 0 | 1 | 2
}

/**
 * Sparkle/star decoration component with animated twinkling effect.
 * Uses CSS animations defined in index.css.
 */
export function Sparkle({ size = 16, className = '', delay = 0 }: SparkleProps) {
  const animationClass =
    delay === 0
      ? 'animate-sparkle'
      : delay === 1
        ? 'animate-sparkle-delayed'
        : 'animate-sparkle-delayed-2'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`fill-manor-gold ${animationClass} ${className}`}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}
