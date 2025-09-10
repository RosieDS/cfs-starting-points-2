import { Checkbox as HerouiCheckbox } from '@heroui/checkbox'
import { extendVariants } from '@heroui/system'
import clsx from 'clsx'

export const Checkbox = extendVariants(HerouiCheckbox, {
  slots: {
    wrapper: 'before:border-1'
  },
  variants: {
    color: {
      default: {
        wrapper: 'after:bg-transparent'
      },
      primary: {
        wrapper: clsx(
          'before:border-1 before:border-primary-500',
          'after:bg-transparent after:border-primary-500 after:text-primary-500 after:border-1',
          'text-primary-500 group-data-[hover=true]:before:bg-primary-50'
        )
      }
    },
    size: {
      sm: {
        wrapper: [
          'rounded-[4px]',
          'before:rounded-[4px]',
          'after:rounded-[4px]'
        ]
      },
      md: {
        wrapper: [
          'rounded-[4px]',
          'before:rounded-[4px]',
          'after:rounded-[4px]'
        ]
      },
      lg: {
        wrapper: [
          'rounded-[4px]',
          'before:rounded-[4px]',
          'after:rounded-[4px]'
        ]
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
})
