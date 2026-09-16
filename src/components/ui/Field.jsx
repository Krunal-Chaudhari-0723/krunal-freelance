import { AlertCircle } from 'lucide-react'
import { useId } from 'react'

/**
 * Accessible form field wrapper: a real <label>, an optional "(optional)" hint,
 * and an error that is announced and wired up via aria-describedby.
 *
 * Errors are never communicated by colour alone — they always carry an icon
 * and text.
 */
export default function Field({
  label,
  name,
  error,
  required = false,
  hint,
  className = '',
  children,
}) {
  const generatedId = useId()
  const fieldId = `${name}-${generatedId}`
  const errorId = `${fieldId}-error`
  const hintId = `${fieldId}-hint`

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') ||
    undefined

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="mb-2 flex items-baseline justify-between gap-2 text-sm font-medium text-fg"
      >
        <span>
          {label}
          {required && (
            <span className="ml-1 text-accent" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {!required && (
          <span className="text-xs font-normal text-faint">Optional</span>
        )}
      </label>

      {children({
        id: fieldId,
        name,
        required,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': describedBy,
        className: inputClasses(Boolean(error)),
      })}

      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-faint">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-danger"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

/** Shared input styling, so every control in the form matches exactly. */
function inputClasses(hasError = false) {
  return [
    'w-full rounded-xl border bg-surface-2 px-4 py-3 text-sm text-fg',
    'placeholder:text-faint transition-colors duration-200',
    'focus:border-accent/60 focus:bg-elevated focus:outline-none',
    hasError ? 'border-danger/60' : 'border-line-strong hover:border-accent/40',
  ].join(' ')
}
