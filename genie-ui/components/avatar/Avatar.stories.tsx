import { Pencil } from 'lucide-react'
import { Avatar } from '.'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md'
    },
    src: {
      control: { type: 'text' }
    },

    isDisabled: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof Avatar>
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    name: 'John Doe',
    size: 'lg',
    isDisabled: false
  },
  argTypes: {
    badgeIcon: {
      control: false
    },
    badgeColorString: {
      control: false
    }
  }
}

export const WithBadge: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    name: 'John Doe',
    size: 'lg',
    badgeIcon: <Pencil />,
    badgeColorString: 'olive',
    isDisabled: false
  },
  argTypes: {
    badgeIcon: {
      control: false
    },
    badgeColorString: {
      control: { type: 'select' },
      options: ['pink', 'olive', 'blue', 'orange']
    }
  }
}
