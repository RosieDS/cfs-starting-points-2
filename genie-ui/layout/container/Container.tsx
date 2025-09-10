import React, { forwardRef } from 'react'
import { Box, BoxProps } from '../box'
import { cn } from '../../utils/cn'

export interface ContainerProps extends Omit<BoxProps, 'maxWidth'> {
  /**
   * If `true`, container will center its children
   * regardless of their width.
   * @default false
   */
  centerContent?: boolean
  /**
   * The max-width of the container
   * @default "container"
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'container'
}

/**
 * Layout component used to wrap app or website content
 * It sets margin-left and margin-right to auto to keep its content centered.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      centerContent = false,
      maxWidth = 'container',
      children,
      ...rest
    },
    ref
  ) => {
    const maxWidthClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
      container: 'max-w-[60ch]'
    }

    return (
      <Box
        ref={ref}
        className={cn(
          'mx-auto w-full px-4',
          maxWidthClasses[maxWidth],
          centerContent && 'flex flex-col items-center',
          className
        )}
        {...rest}>
        {children}
      </Box>
    )
  }
)

Container.displayName = 'Container'
