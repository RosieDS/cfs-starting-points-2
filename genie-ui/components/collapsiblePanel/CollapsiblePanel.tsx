import { Box, cn, Heading, HStack } from '@_common/genie-ui'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { useCollapsiblePanel } from './useCollapsiblePanel'

export const CollapsiblePanel = ({
  title,
  children,
  onClick,
  classNames,
  isExpanded: isExpandedProp,
  setIsExpanded: setIsExpandedProp,
  ...triggerProps
}: {
  title?: string
  classNames?: {
    trigger?: string
    title?: string
    content?: string
  }
  isExpanded?: boolean
  setIsExpanded?: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
} & HTMLAttributes<HTMLElement>) => {
  const { height, ref, isExpanded, setIsExpanded } = useCollapsiblePanel({
    isExpanded: isExpandedProp,
    setIsExpanded: setIsExpandedProp
  })

  return (
    <>
      <HStack
        spacing={1}
        as="button"
        className={cn(
          'w-full cursor-pointer overflow-hidden text-nowrap bg-white px-2 py-4',
          classNames?.trigger
        )}
        onClick={e => {
          setIsExpanded(!isExpanded)
          onClick?.(e)
        }}
        {...triggerProps}>
        <ChevronDown
          className={clsx('h-4 w-4 shrink-0 transition-transform', {
            'rotate-0': !isExpanded,
            'rotate-180': isExpanded
          })}
        />
        <Heading
          className={cn('overflow-hidden text-ellipsis', classNames?.title)}
          size="xs">
          {title}
        </Heading>
      </HStack>

      <Box
        ref={ref}
        className={cn(
          'overflow-hidden px-2 transition-[max-height]',
          classNames?.content
        )}
        style={{ maxHeight: height }}>
        {children}
      </Box>
    </>
  )
}
