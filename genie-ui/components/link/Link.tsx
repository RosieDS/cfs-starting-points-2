import { Link as HeroUiLink } from '@heroui/link'
import { extendVariants } from '@heroui/system'
import { ComponentProps } from 'react'

const StyledLink = extendVariants(HeroUiLink, {
  variants: {
    size: {
      sm: 'text-xs'
    }
  }
})

export const Link = (props: ComponentProps<typeof StyledLink>) => {
  return <StyledLink {...props} />
}

Link.displayName = 'Link'
