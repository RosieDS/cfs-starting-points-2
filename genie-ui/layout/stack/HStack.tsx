import React, { forwardRef } from 'react'
import { Stack, StackProps } from './Stack'

/**
 * HStack arranges items horizontally with center alignment by default.
 */
export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" align="center" {...props} />
)

HStack.displayName = 'HStack'
