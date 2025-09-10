import React from 'react'
import { Box, BoxProps } from '../../layout/box'
import { cn } from '../../utils/cn'

export interface DividerProps extends BoxProps {
  /**
   * The orientation of the divider
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The padding of the divider
   * @default 0
   */
  padding?: number
}

/**
 * Divider is used to visually separate content in a list or group
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', padding = 0, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'border-gray-200',
          orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
          paddingClasses[padding as keyof typeof paddingClasses],
          className
        )}
        {...rest}
      />
    )
  }
)

Divider.displayName = 'Divider'

const paddingClasses = {
  0: 'p-0',
  1: 'p-1',
  2: 'p-2',
  3: 'p-3',
  4: 'p-4'
}
