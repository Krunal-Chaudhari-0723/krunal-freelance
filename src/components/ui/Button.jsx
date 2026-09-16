import { handleAnchorClick } from '../../lib/scroll'

/**
 * The single button used across the site.
 *
 * Renders an <a> when given `href` and a <button> otherwise, so links stay
 * links (middle-click, open in new tab, right-click copy) and actions stay
 * buttons. In-page hrefs like "#contact" scroll smoothly instead of jumping.
 */

const VARIANTS = {
  primary:
    'bg-accent text-accent-ink hover:bg-accent-hover shadow-accent hover:-translate-y-0.5',
  secondary:
    'bg-elevated/60 text-fg border border-line-strong hover:border-accent/50 hover:bg-elevated hover:-translate-y-0.5',
  outline:
    'border border-line-strong text-fg hover:border-accent/50 hover:bg-surface-2',
  ghost: 'text-muted hover:text-fg hover:bg-surface-2',
  whatsapp:
    'bg-[#25D366] text-[#06281a] hover:bg-[#2ee377] hover:-translate-y-0.5',
}

const SIZES = {
  sm: 'h-9 px-4 text-sm gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-13 px-7 text-base gap-2.5 rounded-xl',
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  animateIcon = true,
  className = '',
  type = 'button',
  external = false,
  ...rest
}) {
  const classes = [
    'group inline-flex items-center justify-center font-semibold whitespace-nowrap',
    'transition-all duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-55',
    SIZES[size],
    VARIANTS[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconMotion =
    animateIcon && iconPosition === 'right'
      ? 'transition-transform duration-200 group-hover:translate-x-0.5'
      : animateIcon
        ? 'transition-transform duration-200 group-hover:-translate-x-0.5'
        : ''

  const iconNode = Icon ? (
    <Icon className={`size-4 shrink-0 ${iconMotion}`} aria-hidden="true" />
  ) : null

  const content = (
    <>
      {iconPosition === 'left' && iconNode}
      {children}
      {iconPosition === 'right' && iconNode}
    </>
  )

  if (href) {
    const isInPageLink = href.startsWith('#')
    return (
      <a
        href={href}
        className={classes}
        onClick={(event) => {
          if (isInPageLink) handleAnchorClick(event, href)
          onClick?.(event)
        }}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : null)}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}
