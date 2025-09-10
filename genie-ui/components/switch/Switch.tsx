import { ComponentProps } from 'react'
import clsx from 'clsx'
import { Switch as HerouiSwitch } from '@heroui/switch'
import { extendVariants } from '@heroui/system'

const BaseSwitch = extendVariants(HerouiSwitch, {
  variants: {
    variant: {
      default: {},
      dualIcon: {
        base: 'flex-col max-w-min ',
        wrapper: clsx(
          'h-9 w-18 p-0 bg-primary-200',
          'group-data-[selected=true]:bg-primary-200',
          'group-data-[hover=true]:!bg-primary-300'
        ),
        thumb: clsx(
          'h-9 w-9 bg-primary group-data-[selected=true]:ms-9 group-data-[pressed=true]:w-9',
          'group-data-[selected=true]:group-data-[pressed=true]:!ms-9'
        ),
        startContent: 'w-5 h-5 text-white ',
        endContent: 'w-5 h-5 text-white',
        thumbIcon: 'w-5 h-5 text-white',
        label:
          'text-2xs uppercase text-center ms-0 min-h-4 font-medium tracking-[1.5px]'
      }
    }
    // @TODO: split dualIcon sizes (h-9 etc) and colours and calc for sm, md, lg, xl, and add compoundVariants for each size and colour
  },
  defaultVariants: {
    color: 'primary'
  }
})

type SwitchProps = ComponentProps<typeof BaseSwitch> & {
  variant?: 'default' | 'dualIcon'
}

export const Switch = (props: SwitchProps) => {
  return <BaseSwitch {...props} />
}
