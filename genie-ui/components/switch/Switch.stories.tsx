import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import { Bell, BellOff } from 'lucide-react'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof Switch>

export const Basic: Story = {
  args: {
    children: 'Switch'
  }
}

export const WithLabel: Story = {
  args: {
    children: 'Enable notifications'
  }
}

export const WithIcons: Story = {
  args: {
    children: 'With Icons',
    startContent: <Bell />,
    endContent: <BellOff />
  }
}

export const WithThumbIcons: Story = {
  args: {
    children: 'With Thumb Icons',
    size: 'lg',
    thumbIcon: ({ isSelected, className }) =>
      isSelected ? (
        <Bell className={`${className} p-1`} />
      ) : (
        <BellOff className={`${className} p-1`} />
      )
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    isDisabled: true
  }
}

export const Sizes: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Switch {...args} size="sm">
        Small
      </Switch>
      <Switch {...args} size="md">
        Medium
      </Switch>
      <Switch {...args} size="lg">
        Large
      </Switch>
    </div>
  )
}

export const Controlled: Story = {
  render: function ControlledSwitchStory(args) {
    const [checked, setChecked] = useState(false)
    return (
      <Switch {...args} isSelected={checked} onValueChange={setChecked}>
        Controlled
      </Switch>
    )
  }
}
