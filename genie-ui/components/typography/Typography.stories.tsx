import { Heading, Text } from './Typography'
import { VStack } from '@_common/genie-ui/layout/stack'

export default {
  title: 'Components/Typography',
  component: Heading
}

const text =
  'AI legal assistant: Draft, edit and review any agreement in minutes'
export const DefaultHeading = () => <Heading>Hello World</Heading>

export const HeadingSizes = () => (
  <VStack>
    <Heading size="xs">{text}</Heading>
    <Heading size="sm">{text}</Heading>
    <Heading size="md">{text}</Heading>
    <Heading size="lg">{text}</Heading>
    <Heading size="xl">{text}</Heading>
    <Heading size="2xl">{text}</Heading>
    <Heading size="3xl">{text}</Heading>
  </VStack>
)

export const HeadingAs = () => (
  <VStack>
    <Heading size="md">
      These are all styled the same, but are rendered as different tags
    </Heading>
    <Heading as="h1">This is an H1 tag</Heading>
    <Heading as="span">This is a span tag</Heading>
  </VStack>
)

export const DefaultText = () => <Text>{text}</Text>

export const TextSizes = () => (
  <VStack>
    <Text size="xs">{text}</Text>
    <Text size="sm">{text}</Text>
    <Text size="md">{text}</Text>
    <Text size="lg">{text}</Text>
  </VStack>
)

export const TextAs = () => (
  <VStack>
    <Heading size="md">
      These are all styled the same, but are rendered as different tags
    </Heading>
    <Text as="p">This is a p tag</Text>
    <Text as="span">This is a span tag</Text>
    <Text as="div">This is a div tag</Text>
  </VStack>
)
