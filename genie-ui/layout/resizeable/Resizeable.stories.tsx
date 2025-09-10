import type { Meta, StoryObj } from '@storybook/react'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from './Resizeable'
import { cn } from '@_common/genie-ui/utils/cn'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Layout/Resizeable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof ResizablePanelGroup>

export const TwoPanels: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[400px] w-[800px] rounded-lg border">
      <ResizablePanel defaultSize={50} className="bg-muted/20 p-4">
        <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
          <h3 className="text-lg font-semibold">Panel One</h3>
          <p className="text-muted-foreground text-sm">
            This panel takes up 50% by default
          </p>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} className="bg-background p-4">
        <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
          <h3 className="text-lg font-semibold">Panel Two</h3>
          <p className="text-muted-foreground text-sm">
            This panel takes up the remaining space
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export const ThreePanels: Story = {
  render: () => (
    <div className="h-[dvh] w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          maxSize={30}
          className="bg-muted/20 h-full p-4">
          <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
            <h3 className="text-lg font-semibold">Panel One</h3>
            <p className="text-muted-foreground text-sm">
              This panel has min/max constraints
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="bg-background p-4">
          <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
            <h3 className="text-lg font-semibold">Panel Two</h3>
            <p className="text-muted-foreground text-sm">
              This panel is the largest
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={50}
          className="!overflow-y-autoxx relative !overflow-visible bg-background p-4">
          <div className="border-muted-foreground/50 h-[3000px] rounded-md border-2 border-dashed p-6">
            <h3 className="text-lg font-semibold">Panel Three</h3>
            <p className="text-muted-foreground text-sm">
              This panel takes up the remaining space
            </p>
            <div
              id="grid-col-left"
              className="absolute left-0 top-0 h-full w-5 bg-red-100">
              <div
                id="slot-left"
                className="absolute left-0 top-[500px] h-6 w-full bg-blue-400">
                <div className="flex flex-row-reverse">
                  <div
                    id="comment"
                    className="h-fit w-[300px] rounded-md border-2 border-blue-200 bg-blue-100 p-2">
                    <p>Comment</p>
                    <p>Comment1</p>
                    <p>Comment2</p>
                    <p>Comment3</p>
                    <p>Comment4</p>
                    <p>Comment5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
export const NotResizeable: Story = {
  render: () => (
    <div className="flex h-dvh w-full">
      <div className="bg-muted/20 h-full p-4">
        <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
          <h3 className="text-lg font-semibold">Panel One</h3>
          <p className="text-muted-foreground text-sm">
            This panel has min/max constraints
          </p>
        </div>
      </div>
      <div className="bg-background p-4">
        <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
          <h3 className="text-lg font-semibold">Panel Two</h3>
          <p className="text-muted-foreground text-sm">
            This panel is the largest
          </p>
        </div>
      </div>
      <div className="relative bg-background p-4">
        <div className="border-muted-foreground/50 h-[3000px] rounded-md border-2 border-dashed p-6">
          <h3 className="text-lg font-semibold">Panel Three</h3>
          <p className="text-muted-foreground text-sm">
            This panel takes up the remaining space
          </p>
          <div
            id="grid-col-left"
            className="absolute left-0 top-0 h-full w-5 overflow-visible bg-red-100">
            <div
              id="slot-left"
              className="absolute left-0 top-[500px] h-6 w-full bg-blue-400">
              <div className="flex flex-row-reverse">
                <div
                  id="comment"
                  className="h-fit w-[300px] rounded-md border-2 border-blue-200 bg-blue-100 p-2">
                  <p>Comment</p>
                  <p>Comment1</p>
                  <p>Comment2</p>
                  <p>Comment3</p>
                  <p>Comment4</p>
                  <p>Comment5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ManualResizeable: Story = {
  render: () => {
    const hide = false
    return (
      <div className="flex h-[dvh] w-full">
        <div className="flex flex-row">
          <div className="fixed h-full w-[50%]">
            <div className="bg-muted/20 h-full p-4">
              <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
                <h3 className="text-lg font-semibold">Panel One</h3>
                <p className="text-muted-foreground text-sm">
                  This panel has min/max constraints
                </p>
              </div>
            </div>
            <div
              className={cn(
                'relative w-0.5 bg-primary-100 transition-colors delay-100 duration-200',
                '[&[data-resize-handle-state=hover]]:bg-primary-200',
                '[&[data-resize-handle-state=drag]]:bg-primary-300',
                { 'bg-transparent': hide }
              )}
            />
            <div className="bg-background p-4">
              <div className="border-muted-foreground/50 h-full rounded-md border-2 border-dashed p-6">
                <h3 className="text-lg font-semibold">Panel Two</h3>
                <p className="text-muted-foreground text-sm">
                  This panel is the largest
                </p>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'relative w-0.5 bg-primary-100 transition-colors delay-100 duration-200',
              '[&[data-resize-handle-state=hover]]:bg-primary-200',
              '[&[data-resize-handle-state=drag]]:bg-primary-300',
              { 'bg-transparent': hide }
            )}
          />
          <div
            id="panel-three"
            className="!overflow-y-autox !overflow-x-visiblex relative bg-background p-4">
            <div className="border-muted-foreground/50 h-[3000px] rounded-md border-2 border-dashed p-6">
              <h3 className="text-lg font-semibold">Panel Three</h3>
              <p className="text-muted-foreground text-sm">
                This panel takes up the remaining space
              </p>
              <div
                id="grid-col-left"
                className="absolute left-0 top-0 h-full w-5 bg-red-100">
                <div
                  id="slot-left"
                  className="absolute left-0 top-[500px] h-6 w-full bg-blue-400">
                  <div className="flex flex-row-reverse">
                    <div
                      id="comment"
                      className="h-fit w-[300px] rounded-md border-2 border-blue-200 bg-blue-100 p-2">
                      <p>Comment</p>
                      <p>Comment1</p>
                      <p>Comment2</p>
                      <p>Comment3</p>
                      <p>Comment4</p>
                      <p>Comment5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
