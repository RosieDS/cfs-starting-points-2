import React, { forwardRef } from 'react'
import { Box, BoxProps } from '../box'
import { cn } from '../../utils/cn'

export interface AbsoluteCenterProps extends BoxProps {
  /**
   * The axis to center the element
   * @default "both"
   */
  axis?: 'horizontal' | 'vertical' | 'both'
}

const centerStyles = {
  horizontal: 'left-1/2 -translate-x-1/2',
  vertical: 'top-1/2 -translate-y-1/2',
  both: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
}

/**
 * React component used to horizontally and vertically center an element
 * relative to its parent dimensions using absolute positioning.
 */
export const AbsoluteCenter = forwardRef<HTMLElement, AbsoluteCenterProps>(
  ({ axis = 'both', className, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('absolute', centerStyles[axis], className)}
        {...rest}
      />
    )
  }
)

AbsoluteCenter.displayName = 'AbsoluteCenter'
