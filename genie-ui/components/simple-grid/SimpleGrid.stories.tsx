import { Box } from '../../layout/box'
import { SimpleGrid } from './SimpleGrid'

export default {
  title: 'Layout/SimpleGrid',
  component: SimpleGrid
}

export const WithColumns = () => (
  <SimpleGrid columns={3} spacing={4}>
    <Box className="h-[200px] bg-red-500" />
    <Box className="h-[200px] bg-red-500" />
    <Box className="h-[200px] bg-red-500" />
    <Box className="h-[200px] bg-red-500" />
    <Box className="h-[200px] bg-red-500" />
  </SimpleGrid>
)

export const WithAutoFit = () => (
  <SimpleGrid
    className="grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
    spacing={4}>
    <Box className="h-[200px] bg-blue-500" />
    <Box className="h-[200px] bg-blue-500" />
    <Box className="h-[200px] bg-blue-500" />
    <Box className="h-[200px] bg-blue-500" />
    <Box className="h-[200px] bg-blue-500" />
  </SimpleGrid>
)

export const WithDifferentSpacing = () => (
  <SimpleGrid columns={2} spacingX={8} spacingY={12}>
    <Box className="h-[200px] bg-green-500" />
    <Box className="h-[200px] bg-green-500" />
    <Box className="h-[200px] bg-green-500" />
    <Box className="h-[200px] bg-green-500" />
  </SimpleGrid>
)

export const ResponsiveGrid = () => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
    {[1, 2, 3, 4, 5, 6, 7, 8].map(id => (
      <Box
        key={id}
        className="flex items-center justify-center rounded bg-purple-500 p-4 text-white"
        style={{ height: '150px' }}>
        Item {id}
      </Box>
    ))}
  </SimpleGrid>
)
