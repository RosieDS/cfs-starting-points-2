import React, { forwardRef } from 'react'
import { Square, SquareProps } from './Square'
import { cn } from '../../utils/cn'

export interface CircleProps extends SquareProps {}

/**
 * Circle is a Square with fully rounded corners
 */
export const Circle = forwardRef<HTMLElement, CircleProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Square
        ref={ref}
        className={cn('shrink-0 rounded-full', className)}
        {...rest}
      />
    )
  }
)

Circle.displayName = 'Circle'
