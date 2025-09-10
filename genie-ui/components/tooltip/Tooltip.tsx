import { Tooltip as HeroUITooltip } from '@heroui/tooltip'
import { extendVariants } from '@heroui/system'
import { ComponentProps } from 'react'
import { HStack } from '@_common/genie-ui/layout/stack'

const StylesTooltip = extendVariants(HeroUITooltip, {
  defaultVariants: {
    color: 'primary',
    radius: 'full',
    size: 'sm'
  }
})

type BaseTooltipProps = ComponentProps<typeof StylesTooltip>
export type TooltipProps = Pick<
  BaseTooltipProps,
  Exclude<keyof BaseTooltipProps, 'radius' | 'color' | 'placement'>
> & {
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  placement?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
}

export const Tooltip = (props: TooltipProps) => {
  const { leftIcon, rightIcon, content, showArrow = true, ...rest } = props

  return (
    <StylesTooltip
      {...rest}
      showArrow={showArrow}
      content={
        <HStack spacing={2} className="[&_svg]:size-4">
          {leftIcon && leftIcon}
          {content && <>{content}</>}
          {rightIcon && rightIcon}
        </HStack>
      }
      classNames={{
        ...props.classNames,
        content: `${props.classNames?.content || ''} min-w-0 break-all px-3`
      }}
    />
  )
}
