'use client'

import type React from 'react'

import * as ResizablePrimitive from 'react-resizable-panels'
import { cn } from '../../utils/cn'

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup {...props} />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  hide,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
  hide?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative w-0.5 bg-primary-100 transition-colors delay-100 duration-200',
      '[&[data-resize-handle-state=hover]]:bg-primary-200',
      '[&[data-resize-handle-state=drag]]:bg-primary-300',
      { 'bg-transparent': hide },
      className
    )}
    {...props}></ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
