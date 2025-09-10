import React, { forwardRef } from 'react'
import { Box, BoxProps } from '../../layout/box'
import { cn } from '../../utils/cn'

export interface SimpleGridProps extends Omit<BoxProps, 'columns'> {
  /**
   * The number of columns
   */
  columns?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | {
        base?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
        sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
        md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
        lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
        xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
      }
  /**
   * The gap between grid items
   */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /**
   * The column gap between grid items
   */
  spacingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /**
   * The row gap between grid items
   */
  spacingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /**
   * Whether to use the full width of the container
   */
  fullWidth?: boolean
}

const columnClasses = {
  1: {
    base: 'grid-cols-1',
    sm: 'sm:grid-cols-1',
    md: 'md:grid-cols-1',
    lg: 'lg:grid-cols-1',
    xl: 'xl:grid-cols-1'
  },
  2: {
    base: 'grid-cols-2',
    sm: 'sm:grid-cols-2',
    md: 'md:grid-cols-2',
    lg: 'lg:grid-cols-2',
    xl: 'xl:grid-cols-2'
  },
  3: {
    base: 'grid-cols-3',
    sm: 'sm:grid-cols-3',
    md: 'md:grid-cols-3',
    lg: 'lg:grid-cols-3',
    xl: 'xl:grid-cols-3'
  },
  4: {
    base: 'grid-cols-4',
    sm: 'sm:grid-cols-4',
    md: 'md:grid-cols-4',
    lg: 'lg:grid-cols-4',
    xl: 'xl:grid-cols-4'
  },
  5: {
    base: 'grid-cols-5',
    sm: 'sm:grid-cols-5',
    md: 'md:grid-cols-5',
    lg: 'lg:grid-cols-5',
    xl: 'xl:grid-cols-5'
  },
  6: {
    base: 'grid-cols-6',
    sm: 'sm:grid-cols-6',
    md: 'md:grid-cols-6',
    lg: 'lg:grid-cols-6',
    xl: 'xl:grid-cols-6'
  },
  7: {
    base: 'grid-cols-7',
    sm: 'sm:grid-cols-7',
    md: 'md:grid-cols-7',
    lg: 'lg:grid-cols-7',
    xl: 'xl:grid-cols-7'
  },
  8: {
    base: 'grid-cols-8',
    sm: 'sm:grid-cols-8',
    md: 'md:grid-cols-8',
    lg: 'lg:grid-cols-8',
    xl: 'xl:grid-cols-8'
  },
  9: {
    base: 'grid-cols-9',
    sm: 'sm:grid-cols-9',
    md: 'md:grid-cols-9',
    lg: 'lg:grid-cols-9',
    xl: 'xl:grid-cols-9'
  },
  10: {
    base: 'grid-cols-10',
    sm: 'sm:grid-cols-10',
    md: 'md:grid-cols-10',
    lg: 'lg:grid-cols-10',
    xl: 'xl:grid-cols-10'
  },
  11: {
    base: 'grid-cols-11',
    sm: 'sm:grid-cols-11',
    md: 'md:grid-cols-11',
    lg: 'lg:grid-cols-11',
    xl: 'xl:grid-cols-11'
  },
  12: {
    base: 'grid-cols-12',
    sm: 'sm:grid-cols-12',
    md: 'md:grid-cols-12',
    lg: 'lg:grid-cols-12',
    xl: 'xl:grid-cols-12'
  }
} as const

const gapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16'
} as const

const gapXClasses = {
  0: 'gap-x-0',
  1: 'gap-x-1',
  2: 'gap-x-2',
  3: 'gap-x-3',
  4: 'gap-x-4',
  5: 'gap-x-5',
  6: 'gap-x-6',
  8: 'gap-x-8',
  10: 'gap-x-10',
  12: 'gap-x-12',
  16: 'gap-x-16'
} as const

const gapYClasses = {
  0: 'gap-y-0',
  1: 'gap-y-1',
  2: 'gap-y-2',
  3: 'gap-y-3',
  4: 'gap-y-4',
  5: 'gap-y-5',
  6: 'gap-y-6',
  8: 'gap-y-8',
  10: 'gap-y-10',
  12: 'gap-y-12',
  16: 'gap-y-16'
} as const

/**
 * SimpleGrid component that creates responsive grid layouts with a simpler API
 */
export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  (
    {
      className,
      columns,
      spacing,
      spacingX,
      spacingY,
      fullWidth,
      children,
      ...rest
    },
    ref
  ) => {
    const gridClasses: string[] = []

    if (typeof columns === 'number') {
      gridClasses.push(columnClasses[columns].base)
    } else if (columns) {
      if (columns.base) gridClasses.push(columnClasses[columns.base].base)
      if (columns.sm) gridClasses.push(columnClasses[columns.sm].sm)
      if (columns.md) gridClasses.push(columnClasses[columns.md].md)
      if (columns.lg) gridClasses.push(columnClasses[columns.lg].lg)
      if (columns.xl) gridClasses.push(columnClasses[columns.xl].xl)
    }

    return (
      <Box
        ref={ref}
        className={cn(
          'grid',
          gridClasses,
          spacing && gapClasses[spacing],
          spacingX && gapXClasses[spacingX],
          spacingY && gapYClasses[spacingY],
          fullWidth && 'mx-auto w-full max-w-full',
          className
        )}
        {...rest}>
        {children}
      </Box>
    )
  }
)

SimpleGrid.displayName = 'SimpleGrid'
