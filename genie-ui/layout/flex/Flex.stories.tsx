import { Box } from '../box'
import { Flex } from './Flex'

export default {
  title: 'Layout/Flex'
}

export const Vertical = () => (
  <Flex gap={4} direction="column">
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Flex>
)

export const Horizontal = () => (
  <Flex gap={4}>
    <span>ooooooo</span>
    <span>ahhhhh</span>
    <span>Woah!</span>
  </Flex>
)

export const VerticalWithMargin = () => (
  <Flex gap={4} direction="column">
    <Box className="h-10 w-10 rounded-full bg-red-500" />
    <Box className="h-10 w-10 rounded-full bg-red-500" />
    <Box className="mt-4 h-10 w-10 rounded-full bg-red-500" />
  </Flex>
)
