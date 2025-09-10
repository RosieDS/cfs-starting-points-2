import { Button } from '../button'
import { Meta } from '@storybook/react'

import { SimpleModal as DefaultModal } from './Modal'
import { useState } from 'react'
import { ComponentProps } from 'react'
import { FolderOpen } from 'lucide-react'

const meta = {
  title: 'Components/Modal',
  component: DefaultModal,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    isOpen: {
      control: false
    },
    hideCloseButton: {
      control: 'boolean'
    },
    title: {
      control: 'text'
    },
    closeButtonText: {
      control: 'text'
    },
    actionButtonText: {
      control: 'text'
    },
    placement: {
      options: ['top', 'bottom', 'center', 'auto'],
      control: 'select'
    },
    icon: {
      control: false
    },
    onClose: {
      control: false
    },
    onAction: {
      control: false
    }
  },
  args: {
    title: 'Modal Title',
    closeButtonText: 'Cancel',
    actionButtonText: 'OK',
    hideCloseButton: false,
    placement: 'auto'
  }
} satisfies Meta<typeof DefaultModal>

export default meta

export const SimpleModal = (args: ComponentProps<typeof DefaultModal>) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
      <DefaultModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAction={() => console.log('Action')}>
        <p>This is a default modal with basic content.</p>
      </DefaultModal>
    </>
  )
}

export const SimpleModalWithIcon = (
  args: ComponentProps<typeof DefaultModal>
) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
      <DefaultModal
        {...args}
        icon={<FolderOpen />}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAction={() => setIsOpen(false)}>
        <p>This is a default modal with basic content.</p>
      </DefaultModal>
    </>
  )
}
