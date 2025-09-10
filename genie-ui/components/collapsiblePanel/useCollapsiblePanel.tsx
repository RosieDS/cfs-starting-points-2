import { useState, useRef } from 'react'

export const useCollapsiblePanel = ({
  isExpanded,
  setIsExpanded
}: {
  isExpanded?: boolean
  setIsExpanded?: (isExpanded: boolean) => void
}) => {
  const [isExpandedInternal, setIsExpandedInternal] = useState(!!isExpanded)
  const ref = useRef<HTMLDivElement>(null)

  const _isExpanded = isExpanded ?? isExpandedInternal
  const height = _isExpanded ? `${ref.current?.scrollHeight}px` : '0px'

  return {
    isExpanded: _isExpanded,
    setIsExpanded: setIsExpanded ?? setIsExpandedInternal,
    height,
    ref
  }
}
