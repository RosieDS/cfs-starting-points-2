import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
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
    isReadOnly: { control: 'boolean' }
  }
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text here',
    value: '',
    isInvalid: false,
    errorMessage: '',
    isDisabled: false,
    isReadOnly: false
  }
}
