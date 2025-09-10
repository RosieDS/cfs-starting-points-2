import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        iframeHeight: '100px'
      }
    }
  },
  decorators: [
    Story => (
      <div style={{ minWidth: '250px' }}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    isInvalid: { control: 'boolean' },
    errorMessage: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    minRows: { control: 'number' },
    type: {
      control: 'select',
      options: ['default', 'reply']
    }
  }
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text here',
    value: '',
    isInvalid: false,
    errorMessage: '',
    isDisabled: false,
    isReadOnly: false,
    minRows: 3,
    type: 'default'
  }
}
