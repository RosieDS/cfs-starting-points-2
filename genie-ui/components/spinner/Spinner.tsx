import { Spinner as HeroUISpinner } from '@heroui/spinner'
import { extendVariants } from '@heroui/system'
import type { ComponentProps } from 'react'

const BaseSpinner = extendVariants(HeroUISpinner, {
  variants: {
    size: {
      xs: {
        wrapper: 'w-4 h-4',
        circle1: 'border-2',
        circle2: 'border-2',
        dots: 'size-1',
        label: 'text-small'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    variant: 'default'
  }
})

type SpinnerProps = Omit<
  ComponentProps<typeof BaseSpinner>,
  'variant' | 'color'
> & {
  color?: 'primary' | 'white'
}

export const Spinner = (props: SpinnerProps) => {
  return <BaseSpinner {...props} />
}

export type { SpinnerProps }
