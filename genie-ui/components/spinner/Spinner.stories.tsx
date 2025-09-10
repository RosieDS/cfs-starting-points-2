import { Box } from '../../layout/box'
import { Center } from '../../layout/center'
import { Spinner } from './Spinner'

export default {
  title: 'Components/Spinner',
  component: Spinner
}

export const Basic = () => <Spinner />

export const Sizes = () => (
  <Box className="flex items-center gap-4">
    <Spinner size="xs" />
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </Box>
)

export const WithLabel = () => (
  <Box className="flex flex-col items-center gap-2">
    <Spinner />
    <span className="text-sm text-gray-600">Loading...</span>
  </Box>
)

export const CenteredInContainer = () => (
  <Center className="h-[200px] w-full bg-gray-100">
    <Spinner size="lg" />
  </Center>
)

export const WithinButton = () => (
  <button
    className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-70"
    disabled>
    <Spinner size="xs" />
    <span>Submitting...</span>
  </button>
)

export const LoadingCard = () => (
  <Box className="w-[300px] rounded-lg border p-6">
    <Box className="flex h-[200px] items-center justify-center">
      <Spinner size="lg" />
    </Box>
    <Box className="mt-4 space-y-2">
      <div className="h-4 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
    </Box>
  </Box>
)

export const LoadingOverlay = () => (
  <Box className="relative">
    <Box className="pointer-events-none opacity-50">
      <p className="mb-4">This content is loading...</p>
      <p>It will be interactive once loaded.</p>
    </Box>
    <Center className="absolute inset-0 bg-white/50">
      <Spinner size="lg" />
    </Center>
  </Box>
)
