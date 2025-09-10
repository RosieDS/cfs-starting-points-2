import React, { forwardRef } from 'react'
import { Stack, StackProps } from './Stack'

/**
 * VStack arranges items vertically with center alignment by default.
 */
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => (
    <Stack ref={ref} direction="column" align="center" {...props} />
  )
)

VStack.displayName = 'VStack'
