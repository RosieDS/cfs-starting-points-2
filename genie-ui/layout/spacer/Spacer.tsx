import { HTMLAttributes } from 'react'

export type SpacerProps = HTMLAttributes<HTMLDivElement>

/**
 * A flexible flex spacer that expands along the major axis of its containing flex layout.
 * It renders a `div` that takes up any available space.
 */
export const Spacer = (props: SpacerProps) => {
  const { className, ...rest } = props

  return (
    <div
      className={`flex-1 self-stretch justify-self-stretch ${className || ''}`}
      {...rest}
    />
  )
}

Spacer.displayName = 'Spacer'
