import { Box } from './Box'
import { Circle } from './Circle'
import { Square } from './Square'
import { Flex } from '../flex'
import { Spacer } from '../spacer'

export default {
  title: 'Layout/Box'
}

export const Basic = () => (
  <Box>
    <Box className="text-red-500 transition-colors hover:bg-red-500 hover:text-white">
      Welcome to Box
    </Box>
    <Box className="relative bg-red-400 before:block before:pb-[40px] before:content-[''] md:before:pb-[100px]" />
  </Box>
)

export const WithSpacer = () => (
  <Flex className="flex-col text-green-400 md:flex-row md:text-red-500">
    <Box className="h-[100px] w-[100px] bg-pink-500">Box 1</Box>
    <Spacer />
    <Box className="h-[100px] w-[100px] bg-green-500">Box 2</Box>
  </Flex>
)

export const SquareBox = () => (
  <Square size={100} className="flex items-center justify-center bg-red-300">
    Square
  </Square>
)

export const CircleBox = () => (
  <Circle size={100} className="flex items-center justify-center bg-blue-300">
    Circle
  </Circle>
)

export const Shapes = () => (
  <Flex gap={4}>
    <Square size={100} className="flex items-center justify-center bg-red-300">
      <Circle
        size={60}
        className="flex items-center justify-center bg-red-500 text-white">
        Bee
      </Circle>
    </Square>
    <Circle size={100} className="flex items-center justify-center bg-blue-300">
      <Square
        size={60}
        className="flex items-center justify-center bg-blue-500 text-white">
        Box
      </Square>
    </Circle>
  </Flex>
)

export const ResponsiveVisibility = () => (
  <Box>
    <Box className="hidden md:block">
      <p>This text should hide below md</p>
    </Box>
    <Box className="md:hidden">
      <p>This text should hide from md</p>
    </Box>
  </Box>
)
