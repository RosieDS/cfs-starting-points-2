import {
  Popover as HeroUiPopover,
  PopoverTrigger as HeroUiPopoverTrigger,
  PopoverContent as HeroUiPopoverContent
} from '@heroui/popover'
import { extendVariants } from '@heroui/system'
import { ComponentProps } from 'react'

const StyledPopover = extendVariants(HeroUiPopover, {
  variants: {
    radius: {
      lg: { content: 'rounded-[20px]' }
    }
  }
})
export const PopoverTrigger = HeroUiPopoverTrigger
export const PopoverContent = HeroUiPopoverContent

export const Popover = (props: ComponentProps<typeof StyledPopover>) => {
  return <StyledPopover {...props} />
}

Popover.displayName = 'Popover'
