import { Textarea as HerouiTextarea } from '@heroui/input'
import { As, extendVariants, forwardRef } from '@heroui/system'
import { ComponentProps } from 'react'
import clsx from 'clsx'

const StyledTextarea = extendVariants(HerouiTextarea, {
  variants: {
    variant: {
      bordered: {
        inputWrapper: 'border-1 p-2.5',
        input: 'caret-primary-500'
      }
    },
    color: {
      primary: {
        label: 'text-foreground-900',
        inputWrapper: clsx(
          'border-primary-500',
          'data-[hover=true]:border-primary-500 data-[hover=true]:bg-primary-50',
          'group-data-[focus=true]:shadow-[2px_2px_10px_0px_#D3B4F7]'
        ),
        input: 'caret-primary-500'
      },
      'primary-light': {
        label: 'text-foreground-900',
        inputWrapper: clsx(
          'border-primary-100',
          'data-[hover=true]:border-primary-100 data-[hover=true]:bg-primary-50',
          'group-data-[focus=true]:shadow-[2px_2px_10px_0px_#D3B4F7]'
        ),
        input: 'caret-primary-500'
      }
    },
    isInvalid: {
      true: {
        label: '!text-foreground-900',
        inputWrapper: clsx(
          '!border-red-700',
          'data-[hover=true]:bg-red-50',
          'group-data-[focus=true]:!border-red-700 group-data-[focus=true]:shadow-[2px_2px_10px_0px_var(--colours-common-red-50)]'
        ),
        input: '!text-red-700 caret-red-700',
        errorMessage: 'text-red-700'
      }
    }
  },
  defaultVariants: {
    labelPlacement: 'outside',
    variant: 'bordered',
    size: 'md',
    color: 'primary',
    placeholder: ' ',
    type: 'default'
  }
})

export type TextareaProps = Omit<
  ComponentProps<typeof StyledTextarea>,
  'radius' | 'color' | 'variant' | 'labelPlacement'
> & {
  variant?: never
  radius?: never
  color?: 'primary' | 'primary-light'
  labelPlacement?: never
}

export const Textarea = forwardRef<As, TextareaProps>(
  (props: TextareaProps, ref) => {
    return <StyledTextarea ref={ref} {...props} />
  }
)
