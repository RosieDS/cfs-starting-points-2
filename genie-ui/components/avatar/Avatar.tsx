import { extendVariants } from '@heroui/system'
import { Avatar as HerouiAvatar } from '@heroui/avatar'
import { ComponentProps, ReactNode, useMemo } from 'react'
import { cn } from '../../utils/cn'
import {
  BACKGROUND_DEFAULT_COLOR,
  backgroundColorMap,
  badgeColorMap
} from './utils'
import { User } from 'lucide-react'
import { Box } from '../../layout/box'

const StyledAvatar = extendVariants(HerouiAvatar, {
  slots: {
    base: ''
  },
  variants: {
    size: {
      xs: { base: 'size-[18px] text-tiny' },
      sm: { base: 'size-6 text-tiny' },
      md: { base: 'size-8 text-tiny' },
      lg: { base: 'size-[46px] text-tiny' }
    },
    isDisabled: {
      true: {
        base: 'opacity-50'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

/**
 * For logged in users:
 *  - the name props should be the first name if not available the email
 *
 *  * For guest users:
 *  - the name should be an empty string
 **/

export type AvatarProps = Omit<
  ComponentProps<typeof StyledAvatar>,
  'radius' | 'isBordered' | 'name' | 'icon' | 'color' | 'showFallback'
> & {
  name: string
} & (
    | {
        badgeIcon: ReactNode
        badgeColorString: 'pink' | 'olive' | 'blue' | 'orange'
      }
    | {
        badgeIcon?: never
        badgeColorString?: never
      }
  )

export const Avatar = (props: AvatarProps) => {
  const { name, badgeIcon, badgeColorString, ...rest } = props

  const backgroundColor = useMemo(() => {
    if (!name) return BACKGROUND_DEFAULT_COLOR
    const color = backgroundColorMap[name[0].toUpperCase() as keyof typeof backgroundColorMap]
    return color ? color : BACKGROUND_DEFAULT_COLOR
  }, [name])

  const badgeColor = useMemo(() => {
    if (!badgeColorString) return undefined
    const color = badgeColorMap[badgeColorString]
    return color ? color : undefined
  }, [badgeColorString])

  const initial = name?.charAt(0)

  return (
    <div className="relative">
      <StyledAvatar
        role="avatar"
        {...rest}
        showFallback
        name={initial}
        icon={<User className="size-4 text-white" />}
        style={{
          ...rest.style,
          backgroundColor
        }}
        classNames={{
          name: cn('uppercase font-medium text-white')
        }}
      />
      {badgeIcon && (
        <Box
          style={{
            backgroundColor: badgeColor
          }}
          className={cn(
            'absolute bottom-[-4px] right-[-4px] text-white',
            // TODO: waiting for design to confirm the size of the badge
            {
              'size-3': rest.size === 'xs',
              'size-4': rest.size === 'sm',
              'size-5': rest.size === 'md',
              'size-6': rest.size === 'lg'
            },
            'rounded-full border-2 border-white',
            'flex items-center justify-center',
            // TODO: waiting for design to confirm the size of the badge
            {
              '[&>svg]:size-[4.5px]': rest.size === 'xs',
              '[&>svg]:size-2': rest.size === 'sm',
              '[&>svg]:size-[10px]': rest.size === 'md',
              '[&>svg]:size-[12.5px]': rest.size === 'lg'
            }
          )}>
          {badgeIcon}
        </Box>
      )}
    </div>
  )
}
