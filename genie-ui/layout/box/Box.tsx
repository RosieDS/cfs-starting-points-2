import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML tag or React component to render
   * @default 'div'
   */
  as?: React.ElementType
  /**
   * Additional CSS classes to apply
   */
  className?: string
  /**
   * Children elements
   */
  children?: React.ReactNode
}

/**
 * Box is the most abstract component on top of which all other Genie UI components are built.
 * By default, it renders a `div` element and can be extended using Tailwind classes.
 */
export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={cn(className)} {...props}>
        {children}
      </Component>
    )
  }
)

Box.displayName = 'Box'
