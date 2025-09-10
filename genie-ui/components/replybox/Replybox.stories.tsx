import type { Meta, StoryObj } from '@storybook/react'
import { Replybox } from './Replybox'

const meta = {
  title: 'Components/Replybox',
  component: Replybox,
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
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    minRows: { control: 'number' },
    handleSubmit: { action: 'submitted' }
  }
} satisfies Meta<typeof Replybox>

export default meta

type Story = StoryObj<typeof Replybox>

export const Default: Story = {
  args: {
    placeholder: 'Type your message...',
    isDisabled: false,
    isReadOnly: false,
    minRows: 5,
    maxRows: 8,
    handleSubmit: (value: string) => console.log('Submitted:', value)
  }
}
