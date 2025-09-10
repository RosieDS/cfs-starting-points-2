// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react'
import { Plus } from 'lucide-react'
import { Button, IconButton } from './Button'

// Meta for Button component
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button
}

export default meta
type Story = StoryObj<typeof Button>

const buttonText = 'Button label'

export const DefaultButton: Story = {
  args: {
    children: buttonText
  }
}

export const DisabledButton: Story = {
  args: {
    ...DefaultButton.args,
    isDisabled: true
  }
}

export const SmallButton: Story = {
  args: {
    ...DefaultButton.args,
    size: 'sm'
  }
}

export const MediumButton: Story = {
  args: {
    ...DefaultButton.args,
    size: 'md'
  }
}

export const ButtonWithLoading: Story = {
  args: {
    ...DefaultButton.args,
    isLoading: true
  }
}

export const ButtonWithStartIcon: Story = {
  args: {
    ...DefaultButton.args,
    startContent: <Plus />
  }
}

export const ButtonWithEndIcon: Story = {
  args: {
    ...DefaultButton.args,
    endContent: <Plus />
  }
}

export const BorderedButton: Story = {
  args: {
    ...DefaultButton.args,
    variant: 'bordered'
  }
}

export const LightButton: Story = {
  args: {
    ...DefaultButton.args,
    variant: 'light'
  }
}

export const GradientButton: Story = {
  args: {
    ...DefaultButton.args,
    variant: 'gradient',
    startContent: <Plus />
  }
}

export const GradientSolidButton: Story = {
  args: {
    ...DefaultButton.args,
    variant: 'gradientSolid',
    startContent: <Plus />
  }
}

// Create a separate type for IconButton stories
type IconButtonStory = StoryObj<typeof IconButton>

export const IconOnlyButton: IconButtonStory = {
  render: () => (
    <IconButton>
      <Plus />
    </IconButton>
  )
}
