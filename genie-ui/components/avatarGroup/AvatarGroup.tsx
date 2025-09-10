import { AvatarGroup as HerouiAvatarGroup } from '@heroui/avatar'
import { ComponentProps } from 'react'
import { Stack } from '../../layout/stack'
import { Text } from '../typography'
import { extendVariants } from '@heroui/system'

const StyledAvatarGroup = extendVariants(HerouiAvatarGroup, {
  variants: {
    isBordered: {
      true: {
        base: [
          '[&_[role="avatar"]]:ring-[1px] [&_[role="avatar"]]:ring-offset-[0px] ',
          '[&_[role="avatar"]]:ring-white'
        ]
      }
    },
    isGrid: {
      false: {
        base: [
          '[&_[role="avatar"]]:-ms-1',
          '[&_[role="avatar"]]:hover:!transform-none [&_[role="avatar"]]:hover:!transition-none'
        ]
      }
    },
    isDisabled: {
      true: {
        base: 'opacity-50'
      }
    }
  }
})

export type AvatarGroupProps = Omit<
  ComponentProps<typeof StyledAvatarGroup>,
  'renderCount' | 'isBordered' | 'color' | 'radius' | 'size'
>

export const AvatarGroup = (props: AvatarGroupProps) => {
  const { ...rest } = props

  return (
    <StyledAvatarGroup
      {...rest}
      isBordered
      renderCount={count => (
        <Stack className="ml-2" align="center" justify="center">
          <Text className="text-xs">+{count}</Text>
        </Stack>
      )}
    />
  )
}
