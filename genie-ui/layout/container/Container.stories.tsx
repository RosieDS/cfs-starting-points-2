import { Box } from '../box'
import { Container } from './Container'

export default {
  title: 'Layout/Container',
  component: Container
}

export const Basic = () => (
  <Container className="bg-gray-100">
    <Box className="p-4">
      This is a basic container with default max-width (60ch)
    </Box>
  </Container>
)

export const WithDifferentMaxWidths = () => (
  <div className="space-y-4">
    <Container maxWidth="sm" className="bg-red-100 p-4">
      Small Container
    </Container>
    <Container maxWidth="md" className="bg-blue-100 p-4">
      Medium Container
    </Container>
    <Container maxWidth="lg" className="bg-green-100 p-4">
      Large Container
    </Container>
    <Container maxWidth="xl" className="bg-yellow-100 p-4">
      Extra Large Container
    </Container>
    <Container maxWidth="2xl" className="bg-purple-100 p-4">
      2XL Container
    </Container>
  </div>
)

export const CenteredContent = () => (
  <Container centerContent className="bg-gray-100 p-4">
    <Box className="rounded bg-blue-500 p-4 text-white">
      This content is centered
    </Box>
  </Container>
)

export const WithResponsivePadding = () => (
  <Container className="bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-12">
    <Box className="p-4">
      This container has responsive padding that increases on larger screens
    </Box>
  </Container>
)

export const NestedContainers = () => (
  <Container maxWidth="2xl" className="bg-gray-100 p-8">
    <h2 className="mb-4 text-2xl">Outer Container</h2>
    <Container maxWidth="md" className="bg-white p-8">
      <h3 className="mb-4 text-xl">Inner Container</h3>
      <p>Content inside nested containers</p>
    </Container>
  </Container>
)
