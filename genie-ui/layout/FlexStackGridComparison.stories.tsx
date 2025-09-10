import { Box } from './box'
import { Flex } from './flex'
import { Spacer } from './spacer'
import { Stack, HStack } from './stack'
import { SimpleGrid } from '../components/simple-grid'

export default {
  title: 'Layout/FlexStackGridComparison',
  component: Box
}

export const FlexStackGridComparison = () => (
  <Stack spacing={8}>
    <Box>
      <Box className="mb-4 text-lg font-medium">
        Flex and Spacer: Full width, equal Spacing
      </Box>
      <Flex>
        <Box className="h-10 w-[70px] bg-red-500" />
        <Spacer />
        <Box className="h-10 w-[170px] bg-red-500" />
        <Spacer />
        <Box className="h-10 w-[180px] bg-red-500" />
      </Flex>
    </Box>

    <Box>
      <Box className="mb-4 text-lg font-medium">
        Grid: The children start at the beginning, the 1/3 mark and 2/3 mark
      </Box>
      <SimpleGrid columns={3} spacing={6}>
        <Box className="h-10 w-[70px] bg-blue-500" />
        <Box className="h-10 w-[170px] bg-blue-500" />
        <Box className="h-10 w-[180px] bg-blue-500" />
      </SimpleGrid>
    </Box>

    <Box>
      <Box className="mb-4 text-lg font-medium">
        HStack: The children have equal spacing but don&apos;t span the whole
        container
      </Box>
      <HStack spacing={6}>
        <Box className="h-10 w-[70px] bg-teal-500" />
        <Box className="h-10 w-[170px] bg-teal-500" />
        <Box className="h-10 w-[180px] bg-teal-500" />
      </HStack>
    </Box>
  </Stack>
)
