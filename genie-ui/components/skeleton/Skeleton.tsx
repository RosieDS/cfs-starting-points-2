import { Skeleton as HeroUISkeleton } from '@heroui/skeleton'
import { extendVariants } from '@heroui/system'

export const Skeleton = extendVariants(HeroUISkeleton, {
  variants: {
    color: {
      default: {
        base: 'bg-default-100 before:opacity-40',
        before: 'opacity-60',
        after: 'bg-default-100'
      }
    }
  },
  defaultVariants: {
    color: 'default'
  }
})
