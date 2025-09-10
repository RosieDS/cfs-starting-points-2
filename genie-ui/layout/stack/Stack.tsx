import React, { forwardRef } from 'react'
import { Box, BoxProps } from '../box'
import { cn } from '../../utils/cn'

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'

export interface StackProps extends Omit<BoxProps, 'direction'> {
  /**
   * The direction to stack the items
   * @default "column"
   */
  direction?:
    | StackDirection
    | {
        base?: StackDirection
        sm?: StackDirection
        md?: StackDirection
        lg?: StackDirection
        xl?: StackDirection
      }
  /**
   * The space between each stack item
   */
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /**
   * If true, each stack item will show a divider
   */
  divider?: React.ReactElement
  /**
   * Shorthand for alignItems style prop
   */
  align?:
    | 'start'
    | 'end'
    | 'center'
    | 'baseline'
    | 'stretch'
    | {
        base?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
        sm?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
        md?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
        lg?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
        xl?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
      }
  /**
   * Shorthand for justifyContent style prop
   */
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | {
        base?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
        sm?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
        md?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
        lg?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
        xl?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
      }
  /**
   * Shorthand for flexWrap style prop
   */
  wrap?:
    | 'nowrap'
    | 'wrap'
    | 'wrap-reverse'
    | {
        base?: 'nowrap' | 'wrap' | 'wrap-reverse'
        sm?: 'nowrap' | 'wrap' | 'wrap-reverse'
        md?: 'nowrap' | 'wrap' | 'wrap-reverse'
        lg?: 'nowrap' | 'wrap' | 'wrap-reverse'
        xl?: 'nowrap' | 'wrap' | 'wrap-reverse'
      }
}

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
  16: 'gap-16',
  'sm:0': 'sm:gap-0',
  'sm:1': 'sm:gap-1',
  'sm:2': 'sm:gap-2',
  'sm:3': 'sm:gap-3',
  'sm:4': 'sm:gap-4',
  'sm:5': 'sm:gap-5',
  'sm:6': 'sm:gap-6',
  'sm:8': 'sm:gap-8',
  'sm:10': 'sm:gap-10',
  'sm:12': 'sm:gap-12',
  'sm:16': 'sm:gap-16',
  'md:0': 'md:gap-0',
  'md:1': 'md:gap-1',
  'md:2': 'md:gap-2',
  'md:3': 'md:gap-3',
  'md:4': 'md:gap-4',
  'md:5': 'md:gap-5',
  'md:6': 'md:gap-6',
  'md:8': 'md:gap-8',
  'md:10': 'md:gap-10',
  'md:12': 'md:gap-12',
  'md:16': 'md:gap-16',
  'lg:0': 'lg:gap-0',
  'lg:1': 'lg:gap-1',
  'lg:2': 'lg:gap-2',
  'lg:3': 'lg:gap-3',
  'lg:4': 'lg:gap-4',
  'lg:5': 'lg:gap-5',
  'lg:6': 'lg:gap-6',
  'lg:8': 'lg:gap-8',
  'lg:10': 'lg:gap-10',
  'lg:12': 'lg:gap-12',
  'lg:16': 'lg:gap-16',
  'xl:0': 'xl:gap-0',
  'xl:1': 'xl:gap-1',
  'xl:2': 'xl:gap-2',
  'xl:3': 'xl:gap-3',
  'xl:4': 'xl:gap-4',
  'xl:5': 'xl:gap-5',
  'xl:6': 'xl:gap-6',
  'xl:8': 'xl:gap-8',
  'xl:10': 'xl:gap-10',
  'xl:12': 'xl:gap-12',
  'xl:16': 'xl:gap-16'
} as const

const directionClasses = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
  'sm:row': 'sm:flex-row',
  'sm:column': 'sm:flex-col',
  'sm:row-reverse': 'sm:flex-row-reverse',
  'sm:column-reverse': 'sm:flex-col-reverse',
  'md:row': 'md:flex-row',
  'md:column': 'md:flex-col',
  'md:row-reverse': 'md:flex-row-reverse',
  'md:column-reverse': 'md:flex-col-reverse',
  'lg:row': 'lg:flex-row',
  'lg:column': 'lg:flex-col',
  'lg:row-reverse': 'lg:flex-row-reverse',
  'lg:column-reverse': 'lg:flex-col-reverse',
  'xl:row': 'xl:flex-row',
  'xl:column': 'xl:flex-col',
  'xl:row-reverse': 'xl:flex-row-reverse',
  'xl:column-reverse': 'xl:flex-col-reverse'
} as const

const justifyClasses = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  'sm:start': 'sm:justify-start',
  'sm:end': 'sm:justify-end',
  'sm:center': 'sm:justify-center',
  'sm:between': 'sm:justify-between',
  'sm:around': 'sm:justify-around',
  'sm:evenly': 'sm:justify-evenly',
  'md:start': 'md:justify-start',
  'md:end': 'md:justify-end',
  'md:center': 'md:justify-center',
  'md:between': 'md:justify-between',
  'md:around': 'md:justify-around',
  'md:evenly': 'md:justify-evenly',
  'lg:start': 'lg:justify-start',
  'lg:end': 'lg:justify-end',
  'lg:center': 'lg:justify-center',
  'lg:between': 'lg:justify-between',
  'lg:around': 'lg:justify-around',
  'lg:evenly': 'lg:justify-evenly',
  'xl:start': 'xl:justify-start',
  'xl:end': 'xl:justify-end',
  'xl:center': 'xl:justify-center',
  'xl:between': 'xl:justify-between',
  'xl:around': 'xl:justify-around',
  'xl:evenly': 'xl:justify-evenly'
} as const

const wrapClasses = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
  'sm:nowrap': 'sm:flex-nowrap',
  'sm:wrap': 'sm:flex-wrap',
  'sm:wrap-reverse': 'sm:flex-wrap-reverse',
  'md:nowrap': 'md:flex-nowrap',
  'md:wrap': 'md:flex-wrap',
  'md:wrap-reverse': 'md:flex-wrap-reverse',
  'lg:nowrap': 'lg:flex-nowrap',
  'lg:wrap': 'lg:flex-wrap',
  'lg:wrap-reverse': 'lg:flex-wrap-reverse',
  'xl:nowrap': 'xl:flex-nowrap',
  'xl:wrap': 'xl:flex-wrap',
  'xl:wrap-reverse': 'xl:flex-wrap-reverse'
} as const

const alignClasses = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
  'sm:flex-start': 'sm:items-start',
  'sm:flex-end': 'sm:items-end',
  'sm:center': 'sm:items-center',
  'sm:baseline': 'sm:items-baseline',
  'sm:stretch': 'sm:items-stretch',
  'md:flex-start': 'md:items-start',
  'md:flex-end': 'md:items-end',
  'md:center': 'md:items-center',
  'md:baseline': 'md:items-baseline',
  'md:stretch': 'md:items-stretch',
  'lg:flex-start': 'lg:items-start',
  'lg:flex-end': 'lg:items-end',
  'lg:center': 'lg:items-center',
  'lg:baseline': 'lg:items-baseline',
  'lg:stretch': 'lg:items-stretch',
  'xl:flex-start': 'xl:items-start',
  'xl:flex-end': 'xl:items-end',
  'xl:center': 'xl:items-center',
  'xl:baseline': 'xl:items-baseline',
  'xl:stretch': 'xl:items-stretch'
} as const

type ResponsiveValue<T> = {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

const getResponsiveClasses = <T extends string>(
  value: T | ResponsiveValue<T> | undefined,
  classMap: Record<string, string>
): string | undefined => {
  if (!value) return undefined
  if (typeof value === 'string') return classMap[value]

  return cn(
    value.base && classMap[value.base],
    value.sm && classMap[`sm:${value.sm}`],
    value.md && classMap[`md:${value.md}`],
    value.lg && classMap[`lg:${value.lg}`],
    value.xl && classMap[`xl:${value.xl}`]
  )
}

/**
 * Stack is a layout component that makes it easy to stack elements together and apply a space between them.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      direction = 'column',
      align,
      justify,
      spacing = 0,
      wrap,
      divider,
      className,
      ...rest
    },
    ref
  ) => {
    const validChildren = React.Children.toArray(children).filter(
      React.isValidElement
    )

    const clones = React.useMemo(() => {
      return validChildren.map((child, index) => {
        const isLast = index + 1 === validChildren.length
        const key = child.key || index

        if (!divider) return child

        return (
          <React.Fragment key={key}>
            {child}
            {isLast ? null : divider}
          </React.Fragment>
        )
      })
    }, [validChildren, divider])

    const directionClass = getResponsiveClasses(direction, directionClasses)
    const alignClass = getResponsiveClasses(align, alignClasses)
    const justifyClass = getResponsiveClasses(justify, justifyClasses)
    const wrapClass = getResponsiveClasses(wrap, wrapClasses)

    return (
      <Box
        ref={ref}
        className={cn(
          'flex',
          directionClass,
          alignClass,
          justifyClass,
          wrapClass,
          spacing && gapClasses[spacing],
          className
        )}
        {...rest}>
        {clones}
      </Box>
    )
  }
)

Stack.displayName = 'Stack'
