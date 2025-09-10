import React, { forwardRef } from 'react'
import { Box, BoxProps } from '../box'
import { cn } from '../../utils/cn'

export interface FlexOptions {
  /**
   * Shorthand for `alignItems` style prop
   */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  /**
   * Shorthand for `justifyContent` style prop
   */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  /**
   * Shorthand for `flexWrap` style prop
   */
  wrap?: boolean | 'reverse'
  /**
   * Shorthand for `flexDirection` style prop
   * @default "row"
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  /**
   * Shorthand for `gap` style prop
   */
  gap?: number
}

export interface FlexProps extends BoxProps, FlexOptions {}

const getFlexClasses = ({
  direction,
  align,
  justify,
  wrap,
  gap
}: FlexOptions) => ({
  // Direction
  'flex-row': direction === 'row',
  'flex-col': direction === 'column',
  'flex-row-reverse': direction === 'row-reverse',
  'flex-col-reverse': direction === 'column-reverse',
  // Align
  'items-start': align === 'start',
  'items-end': align === 'end',
  'items-center': align === 'center',
  'items-baseline': align === 'baseline',
  'items-stretch': align === 'stretch',
  // Justify
  'justify-start': justify === 'start',
  'justify-end': justify === 'end',
  'justify-center': justify === 'center',
  'justify-between': justify === 'between',
  'justify-around': justify === 'around',
  'justify-evenly': justify === 'evenly',
  // Wrap
  'flex-wrap': wrap === true,
  'flex-wrap-reverse': wrap === 'reverse',
  // Gap
  'gap-1': gap === 1,
  'gap-2': gap === 2,
  'gap-3': gap === 3,
  'gap-4': gap === 4,
  'gap-5': gap === 5,
  'gap-6': gap === 6,
  'gap-8': gap === 8,
  'gap-10': gap === 10,
  'gap-12': gap === 12
})

/**
 * React component used to create flexbox layouts.
 * It renders a `div` with `display: flex` and comes with helpful style shorthand.
 */
export const Flex = forwardRef<HTMLElement, FlexProps>(
  ({ direction, align, justify, wrap, gap, className, ...rest }, ref) => {
    const flexClasses = cn(
      'flex',
      getFlexClasses({ direction, align, justify, wrap, gap }),
      className
    )
    return <Box ref={ref} className={flexClasses} {...rest} />
  }
)

Flex.displayName = 'Flex'
