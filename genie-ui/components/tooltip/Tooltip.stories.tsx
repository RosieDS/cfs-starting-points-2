import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/Button'
import { Tooltip } from './Tooltip'
import { Circle } from 'lucide-react'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered'
  },
  args: {
    content: 'Tooltip',
    size: 'sm',
    placement: 'top',
    delay: 0,
    showArrow: true
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false
    },
    content: {
      control: { type: 'text' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    placement: {
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right'
      ],
      control: { type: 'select' }
    },
    showArrow: {
      control: { type: 'boolean' }
    },
    delay: {
      control: { type: 'number' }
    },
    leftIcon: {
      control: false
    },
    rightIcon: {
      control: false
    }
  }
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: args => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  )
}

export const WithLeftIcon: Story = {
  render: args => (
    <Tooltip {...args} leftIcon={<Circle />}>
      <Button>Hover me</Button>
    </Tooltip>
  )
}

export const WithRightIcon: Story = {
  render: args => (
    <Tooltip {...args} rightIcon={<Circle />}>
      <Button>Hover me</Button>
    </Tooltip>
  )
}
