import { Box } from '../box'
import { Center } from '../center'
import { AbsoluteCenter } from './AbsoluteCenter'
import { Phone } from 'lucide-react'

export default {
  title: 'Layout/Center'
}

export const Basic = () => (
  <Center className="h-[200px] bg-gray-100">
    <Box className="h-[100px] w-[100px] bg-blue-500" />
  </Center>
)

export const WithText = () => (
  <Center className="h-[200px] bg-gray-100">
    <p>This text is centered</p>
  </Center>
)

export const InlineCenter = () => (
  <Center inline className="h-[200px] bg-gray-100">
    <p>This text is centered horizontally only</p>
  </Center>
)

export const WithResponsiveHeight = () => (
  <Center className="h-[100px] bg-gray-100 md:h-[200px] lg:h-[300px]">
    <Box className="h-[100px] w-[100px] bg-green-500" />
  </Center>
)

export const WithMultipleChildren = () => (
  <Center className="h-[300px] gap-4 bg-gray-100">
    <Box className="h-[100px] w-[100px] bg-red-500" />
    <Box className="h-[100px] w-[100px] bg-blue-500" />
    <Box className="h-[100px] w-[100px] bg-green-500" />
  </Center>
)

export const IconWithFrame = () => (
  <Center className="h-10 w-10 rounded-full bg-green-500 text-white">
    <Phone size={20} />
  </Center>
)

export const AbsoluteCenterBasic = () => (
  <Box className="relative h-[400px] bg-gray-100">
    <AbsoluteCenter>
      <Box className="h-[100px] w-[100px] bg-blue-500" />
    </AbsoluteCenter>
  </Box>
)

export const AbsoluteCenterHorizontal = () => (
  <Box className="relative h-[400px] bg-gray-100">
    <AbsoluteCenter axis="horizontal">
      <Box className="h-[100px] w-[100px] bg-red-500" />
    </AbsoluteCenter>
  </Box>
)

export const AbsoluteCenterVertical = () => (
  <Box className="relative h-[400px] bg-gray-100">
    <AbsoluteCenter axis="vertical">
      <Box className="h-[100px] w-[100px] bg-green-500" />
    </AbsoluteCenter>
  </Box>
)

export const AbsoluteCenterWithText = () => (
  <Box className="relative h-[400px] bg-gray-100">
    <AbsoluteCenter>
      <p className="text-xl font-bold">Centered Text</p>
    </AbsoluteCenter>
  </Box>
)
