import React, { forwardRef } from 'react'
import { Box, BoxProps } from './Box'

export interface SquareProps extends BoxProps {
  /**
   * Size of the square (width and height)
   */
  size?: string | number
}

/**
 * Square is a Box with equal width and height
 */
export const Square = forwardRef<HTMLElement, SquareProps>(
  ({ size, className, ...rest }, ref) => {
    // Convert size to Tailwind class or arbitrary value
    const style =
      typeof size === 'number'
        ? { width: `${size}px`, height: `${size}px` }
        : size
          ? { width: size, height: size }
          : { width: '100%', height: '100%' }

    return <Box ref={ref} className={className} {...rest} style={style} />
  }
)

Square.displayName = 'Square'
