/**
 * Consistent section shell: one vertical rhythm and one horizontal gutter for
 * the whole page. Every section is a landmark labelled by its own heading.
 */
export default function Section({
  id,
  children,
  className = '',
  containerClassName = '',
  labelledBy,
  as: Tag = 'section',
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-20 sm:py-24 lg:py-28 focus:outline-none ${className}`}
    >
      <div className={`container-page ${containerClassName}`}>{children}</div>
    </Tag>
  )
}
