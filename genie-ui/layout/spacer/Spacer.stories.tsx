import { Box } from '../box/Box'
import { Flex } from '../flex/Flex'
import { Spacer } from './Spacer'

export default {
  title: 'Layout/Spacer',
  component: Spacer
}

export const Basic = () => (
  <Flex>
    <Box className="h-20 w-20 bg-blue-500" />
    <Spacer />
    <Box className="h-20 w-20 bg-blue-500" />
  </Flex>
)

export const MultipleSpacers = () => (
  <Flex>
    <Box className="h-20 w-20 bg-red-500" />
    <Spacer />
    <Box className="h-20 w-20 bg-red-500" />
    <Spacer />
    <Box className="h-20 w-20 bg-red-500" />
  </Flex>
)

export const VerticalSpacing = () => (
  <Flex direction="column" className="h-[400px]">
    <Box className="h-20 w-20 bg-green-500" />
    <Spacer />
    <Box className="h-20 w-20 bg-green-500" />
  </Flex>
)

export const ResponsiveLayout = () => (
  <Flex className="flex-col md:flex-row">
    <Box className="h-20 w-20 bg-purple-500" />
    <Spacer />
    <Box className="h-20 w-20 bg-purple-500" />
  </Flex>
)

export const WithContent = () => (
  <Flex className="bg-gray-100 p-4">
    <Box className="rounded bg-yellow-500 p-4">Left Content</Box>
    <Spacer />
    <Box className="rounded bg-yellow-500 p-4">Right Content</Box>
  </Flex>
)

export const SpacerWithCustomHeight = () => (
  <Flex direction="column">
    <Box className="h-20 w-20 bg-teal-500" />
    <Spacer className="h-40 bg-gray-100" />
    <Box className="h-20 w-20 bg-teal-500" />
  </Flex>
)
