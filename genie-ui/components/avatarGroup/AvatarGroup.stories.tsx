import { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../avatar'
import { AvatarGroup } from './AvatarGroup'
import { faker } from '@faker-js/faker'

const users = [
  {
    hash: faker.person.fullName(),
    name: faker.person.fullName(),
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    hash: 'jane.doe@example.com',
    name: 'Jane Doe'
  },
  {
    hash: faker.person.fullName(),
    name: faker.person.fullName()
  },
  {
    hash: faker.person.fullName(),
    name: faker.person.fullName()
  },
  {
    hash: faker.person.fullName(),
    name: faker.person.fullName()
  },
  {
    hash: faker.person.fullName(),
    name: faker.person.fullName()
  }
]

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: { type: 'number' }
    },
    isDisabled: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof AvatarGroup>
export default meta

type Story = StoryObj<typeof AvatarGroup>

export const Default: Story = {
  args: {
    max: 5,
    total: 1,
    isGrid: false,
    isDisabled: false
  },
  render: args => (
    <AvatarGroup {...args}>
      {users.map((user, index) => (
        <Avatar key={index} src={user.src} name={user.name} />
      ))}
    </AvatarGroup>
  )
}
