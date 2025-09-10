import { As, forwardRef } from '@heroui/system'
import { Button as HeroUIButton } from '@heroui/button'
import { extendVariants } from '@heroui/system'
import clsx from 'clsx'
import { ComponentProps } from 'react'

const iconButtonBaseClasses = {
  md: '[&_svg]:w-7 [&_svg]:h-7 p-2 h-10 w-10 max-h-10 max-w-10 min-h-10 min-w-10',
  sm: '[&_svg]:w-6 [&_svg]:h-6 p-2 h-9 w-9 max-h-9 max-w-9 min-h-9 min-w-9'
}
const iconButtonLightBaseClasses = {
  md: '[&_svg]:w-7 [&_svg]:h-7 h-6 w-6 max-h-6 max-w-6 min-h-6 min-w-6 rounded-none',
  sm: '[&_svg]:w-6 [&_svg]:h-6 h-5 w-5 max-h-5 max-w-5 min-h-5 min-w-5 rounded-none',
  xs: '[&_svg]:w-5 [&_svg]:h-5 h-4 w-4 max-h-4 max-w-4 min-h-4 min-w-4 rounded-none'
}

const StyledButton = extendVariants(HeroUIButton, {
  variants: {
    variant: {
      solid: clsx(
        'bg-primary-500 text-white',
        'hover:bg-primary-900',
        '[&[data-pressed=true]]:shadow-solid'
      ),
      bordered: clsx(
        'bg-white text-zinc-900 border border-primary-200',
        'hover:bg-primary-50',
        '[&[data-pressed=true]]:shadow-bordered'
      ),
      light: clsx(
        'bg-transparent text-zinc-900',
        'hover:hover:bg-primary-50',
        '[&[data-pressed=true]]:shadow-bordered'
      ),
      gradient: clsx(
        'relative bg-gradient-to-r from-[#6400f0] to-[#FB4EFF] p-0',
        'text-zinc-900 relative z-10 !transition-[transform,box-shadow]',
        'before:absolute before:inset-0.5 before:rounded-[inherit] before:bg-white before:content-[""] before:z-[-1]',
        'hover:before:bg-transparent hover:text-white',
        '[&[data-pressed=true]]:shadow-solid'
      ),
      gradientSolid: clsx(
        'relative bg-gradient-to-r from-[#6400f0] to-[#FB4EFF] p-0',
        'text-white relative z-10 !transition-[transform,box-shadow]',
        'before:absolute before:inset-0.5 before:rounded-[inherit] before:bg-transparent before:content-[""] before:z-[-1]',
        'hover:before:bg-white hover:text-zinc-900',
        '[&[data-pressed=true]]:shadow-solid'
      )
    },
    isDisabled: {
      true: ''
    },
    size: {
      xs: '', // This is only supported for IconButton
      sm: clsx(
        // Prevent the text-sm class from HeroUIButton from taking precedence over text-size-3
        '!text-size-3 leading-3 tracking-1 font-weight-500 px-3 h-9 gap-1',
        '[&_svg]:w-5 [&_svg]:h-5'
      ),
      md: clsx(
        // Prevent the text-md class from HeroUIButton from taking precedence over text-size-3
        '!text-size-3 leading-3 tracking-1 font-weight-500 px-3 h-10 gap-1',
        '[&_svg]:w-5 [&_svg]:h-5'
      )
    },
    minWidth: {
      auto: 'min-w-fit',
      md: 'min-w-[128px]',
      lg: 'min-w-[212px]',
      full: 'min-w-full'
    },
    alignment: {
      left: 'justify-start',
      right: 'justify-end'
    },
    isIconOnly: {
      true: ''
    },
    color: {
      primary: '',
      secondary: 'bg-primary-100 hover:bg-primary-50'
    }
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    minWidth: 'auto',
    radius: 'full',
    disableRipple: 'true'
  },
  compoundVariants: [
    {
      // Default styles
      class: 'hover:opacity-100 focus:opacity-100'
    },
    {
      variant: 'solid',
      isDisabled: true,
      class: clsx(
        'bg-zinc-300 text-white',
        'hover:bg-zinc-300',
        'focus:bg-zinc-300'
      )
    },
    {
      variant: 'bordered',
      isDisabled: true,
      class: clsx(
        'bg-zinc-100 text-zinc-400 border-zinc-300',
        'hover:bg-zinc-100',
        'focus:bg-zinc-100'
      )
    },
    {
      variant: 'light',
      isDisabled: true,
      class: clsx(
        'bg-zinc-100 text-zinc-400',
        'hover:bg-zinc-100',
        'focus:bg-zinc-100'
      )
    },
    {
      variant: 'gradient',
      isDisabled: true,
      class: clsx(
        'bg-zinc-100 text-zinc-400 border border-zinc-300 from-zinc-100 to-zinc-100',
        'before:inset-[1px] before:bg-zinc-100',
        'hover:bg-zinc-100 hover:before:bg-zinc-100',
        'focus:bg-zinc-100'
      )
    },
    {
      variant: 'gradientSolid',
      isDisabled: true,
      class: clsx(
        'bg-zinc-100 text-zinc-400 border border-zinc-300 from-zinc-100 to-zinc-100',
        'before:inset-[1px] before:bg-zinc-100',
        'hover:bg-zinc-100 hover:before:bg-zinc-100',
        'focus:bg-zinc-100'
      )
    },
    {
      isIconOnly: true,
      size: 'md',
      color: 'primary',
      class: iconButtonBaseClasses['md']
    },
    {
      isIconOnly: true,
      size: 'md',
      color: 'secondary',
      class: clsx(
        iconButtonBaseClasses['md'],
        'bg-primary-100 text-primary-500',
        '[&[data-pressed=true]]:shadow-bordered'
      )
    },
    {
      isIconOnly: true,
      size: 'sm',
      color: 'primary',
      class: iconButtonBaseClasses['sm']
    },
    {
      isIconOnly: true,
      size: 'sm',
      color: 'secondary',
      class: clsx(
        iconButtonBaseClasses['sm'],
        'bg-primary-100 text-primary-500',
        '[&[data-pressed=true]]:shadow-bordered'
      )
    },
    {
      isIconOnly: true,
      size: 'md',
      color: 'secondary',
      isDisabled: true,
      class: clsx(
        iconButtonBaseClasses['md'],
        'bg-zinc-300 text-white',
        'hover:bg-zinc-300',
        'focus:bg-zinc-300'
      )
    },
    {
      isIconOnly: true,
      size: 'sm',
      color: 'secondary',
      isDisabled: true,
      class: clsx(
        iconButtonBaseClasses['sm'],
        'bg-zinc-300 text-white',
        'hover:bg-zinc-300',
        'focus:bg-zinc-300'
      )
    },
    {
      isIconOnly: true,
      size: 'xs',
      variant: 'light',
      class: clsx(
        iconButtonLightBaseClasses['xs'],
        'p-0',
        'hover:hover:bg-transparent [&[data-hover=true]]:bg-transparent hover:text-primary-500',
        '[&[data-pressed=true]]:shadow-none'
      )
    },
    {
      isIconOnly: true,
      size: 'sm',
      variant: 'light',
      class: clsx(
        iconButtonLightBaseClasses['sm'],
        'p-0',
        'hover:hover:bg-transparent [&[data-hover=true]]:bg-transparent hover:text-primary-500',
        '[&[data-pressed=true]]:shadow-none'
      )
    },
    {
      isIconOnly: true,
      size: 'md',
      variant: 'light',
      class: clsx(
        iconButtonLightBaseClasses['md'],
        'p-0',
        'hover:hover:bg-transparent [&[data-hover=true]]:bg-transparent hover:text-primary-500',
        '[&[data-pressed=true]]:shadow-none'
      )
    },
    {
      isIconOnly: true,
      variant: 'light',
      isDisabled: true,
      class: clsx('p-0', 'bg-transparent text-zinc-400')
    }
  ]
})

export type ButtonProps = Omit<
  ComponentProps<typeof StyledButton>,
  | 'radius'
  | 'color'
  | 'variant'
  | 'size'
  | 'isIconOnly'
  | 'disableRipple'
  | 'alignment'
> & {
  variant?: 'solid' | 'bordered' | 'light' | 'gradient' | 'gradientSolid'
} & {
  size?: 'sm' | 'md'
} & {
  alignment?: 'left' | 'right'
} & {
  radius?: never
  color?: never
  disableRipple?: never
  isIconOnly?: never
}

export const Button = forwardRef<As, ButtonProps>((props: ButtonProps, ref) => {
  return (
    <StyledButton
      ref={ref}
      {...props}
      startContent={props.isLoading ? null : props.startContent}
    />
  )
})

export type IconButtonProps = Omit<
  ComponentProps<typeof StyledButton>,
  | 'radius'
  | 'color'
  | 'variant'
  | 'size'
  | 'isIconOnly'
  | 'disableRipple'
  | 'alignment'
  | 'startContent'
  | 'endContent'
  | 'minWidth'
> & {
  variant?: 'solid' | 'light'
} & {
  size?: 'xs' | 'sm' | 'md'
} & {
  color?: 'primary' | 'secondary'
} & {
  radius?: never
  isIconOnly?: never
  disableRipple?: never
  alignment?: never
  startContent?: never
  endContent?: never
  minWidth?: never
}

export const IconButton = forwardRef<As, IconButtonProps>(
  (props: IconButtonProps, ref) => {
    const { color = 'primary', variant = 'solid', ...rest } = props

    return (
      <StyledButton
        ref={ref}
        {...rest}
        isIconOnly
        color={color}
        variant={variant}
      />
    )
  }
)
