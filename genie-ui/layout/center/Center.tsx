import React, { forwardRef } from 'react'
import { Box, BoxProps } from '../box'
import { cn } from '../../utils/cn'

export interface CenterProps extends BoxProps {
  /**
   * If true, the content will be centered inline (horizontally only)
   */
  inline?: boolean
}

/**
 * Center is a layout component that centers its child within itself.
 */
export const Center = forwardRef<HTMLElement, CenterProps>(
  ({ inline = false, className, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(
          inline
            ? 'text-center'
            : 'flex h-full w-full items-center justify-center',
          className
        )}
        {...rest}
      />
    )
  }
)

Center.displayName = 'Center'
