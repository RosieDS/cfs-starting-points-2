import { Input as HerouiInput } from '@heroui/input'
import { As, extendVariants, forwardRef } from '@heroui/system'
import { ComponentProps } from 'react'
import clsx from 'clsx'

const StyledInput = extendVariants(HerouiInput, {
  variants: {
    variant: {
      bordered: {
        label: 'text-foreground-900',
        inputWrapper: clsx(
          'border-primary-500 border-1',
          'data-[hover=true]:border-primary-500 data-[hover=true]:bg-primary-50',
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
    radius: 'full',
    color: 'primary',
    placeholder: ' '
  }
})

export type InputProps = Omit<
  ComponentProps<typeof StyledInput>,
  'color' | 'variant' | 'labelPlacement'
> & {
  labelPlacement?: never
}

export const Input = forwardRef<As, InputProps>((props: InputProps, ref) => {
  return (
    <StyledInput
      ref={ref}
      {...props}
      // Hero UI places label inside the input if there is no placeholder, but we only ever want the label to be outside.
      placeholder={props.placeholder || ' '}
    />
  )
})
