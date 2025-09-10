import { Box } from '../box'
import { Stack } from './Stack'
import { HStack } from './HStack'
import { VStack } from './VStack'
import { Divider } from '../../components/divider'
export default {
  title: 'Layout/Stack',
  component: Stack
}

export const Basic = () => (
  <Stack spacing={4}>
    <Box className="h-[50px] rounded bg-blue-500" />
    <Box className="h-[50px] rounded bg-blue-500" />
    <Box className="h-[50px] rounded bg-blue-500" />
  </Stack>
)

export const Horizontal = () => (
  <HStack spacing={4}>
    <Box className="h-[100px] w-[100px] rounded bg-purple-500" />
    <Box className="h-[100px] w-[100px] rounded bg-purple-500" />
    <Box className="h-[100px] w-[100px] rounded bg-purple-500" />
  </HStack>
)

export const Vertical = () => (
  <VStack spacing={4} align="stretch">
    <Box className="h-[50px] rounded bg-green-500" />
    <Box className="h-[50px] rounded bg-green-500" />
    <Box className="h-[50px] rounded bg-green-500" />
  </VStack>
)

export const WithDivider = () => (
  <VStack
    spacing={4}
    align="stretch"
    divider={<Divider className="border-default-200" />}>
    <Box className="h-[50px] rounded bg-red-500" />
    <Box className="h-[50px] rounded bg-red-500" />
    <Box className="h-[50px] rounded bg-red-500" />
  </VStack>
)

export const ResponsiveDirection = () => (
  <Stack
    spacing={4}
    direction={{ base: 'column', md: 'row' }}
    align={{ base: 'stretch', md: 'center' }}>
    <Box className="h-[100px] w-full rounded bg-yellow-500 md:w-[100px]" />
    <Box className="h-[100px] w-full rounded bg-yellow-500 md:w-[100px]" />
    <Box className="h-[100px] w-full rounded bg-yellow-500 md:w-[100px]" />
  </Stack>
)

export const WithAlignment = () => (
  <HStack spacing={4} align="center" justify="between">
    <Box className="h-[50px] w-[100px] rounded bg-teal-500" />
    <Box className="h-[75px] w-[100px] rounded bg-teal-500" />
    <Box className="h-[100px] w-[100px] rounded bg-teal-500" />
  </HStack>
)

export const Wrapped = () => (
  <Stack direction="row" spacing={4} wrap="wrap">
    {Array.from({ length: 12 }).map((_, i) => (
      <Box key={i} className="h-[100px] w-[100px] rounded bg-pink-500" />
    ))}
  </Stack>
)
