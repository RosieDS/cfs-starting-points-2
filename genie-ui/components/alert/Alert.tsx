import { Alert as HerouiAlert } from '@heroui/alert'
import { extendVariants } from '@heroui/system'
import { zIndex } from '../../utils/zIndex'
import clsx from 'clsx'
import { ComponentProps } from 'react'

export const Alert = extendVariants(HerouiAlert, {
  slots: {
    iconWrapper: 'self-center',
    base: ''
  },
  variants: {
    variant: {
      bordered: {
        base: 'bg-white'
      }
    },
    radius: {
      lg: {
        base: 'rounded-[var(--layout-radius-rounded-large)]'
      }
    }
  },
  defaultVariants: {
    color: 'primary',
    radius: 'lg',
    variant: 'bordered'
  }
})

export type AlertProps = ComponentProps<typeof Alert>

export const AnimatedAlert = (props: AlertProps) => {
  return (
    <Alert
      {...props}
      isVisible={true}
      onClose={props.onClose}
      classNames={{
        base: clsx(
          'fixed top-4 right-0 w-fit transition-transform duration-300',
          zIndex.toast,
          {
            'translate-x-[-16px]': props.isVisible,
            'translate-x-full': !props.isVisible
          }
        )
      }}
    />
  )
}
