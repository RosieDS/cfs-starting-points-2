import React from 'react'
import { Box, Flex, Text, VStack } from '@/genie-ui'
import { FileText, Settings, Sliders } from 'lucide-react'

interface FormArtifactPreviewProps {
  onClick: () => void
  selectedDocCount?: number
}

/**
 * Preview card component that appears as a chat message
 * Shows a glimpse of the document customization form
 * Clicking anywhere opens the full form artifact
 */
export const FormArtifactPreview: React.FC<FormArtifactPreviewProps> = ({
  onClick,
  selectedDocCount = 0
}) => {
  return (
    <Box
      className="border border-purple-200 rounded-lg bg-gradient-to-br from-purple-50 to-white shadow-sm hover:shadow-md transition-shadow cursor-pointer max-w-md"
      onClick={onClick}
    >
      <Box className="p-4">
        <VStack spacing={3} align="start">
          {/* Header with icon and title */}
          <Flex align="center" gap={3}>
            <Box className="p-2 bg-purple-100 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600" />
            </Box>
            <Box>
              <Text size="md" className="font-semibold text-gray-900">
                Customise your document
              </Text>
              <Text size="sm" className="text-gray-600">
                {selectedDocCount > 0
                  ? `Creating ${selectedDocCount} document${selectedDocCount > 1 ? 's' : ''}`
                  : 'Configure document type and details'
                }
              </Text>
            </Box>
          </Flex>

          {/* Form preview glimpse - static preview of form options */}
          <Box className="w-full bg-gray-50 rounded p-3">
            <VStack spacing={2} align="start">
              <Flex align="center" gap={2} className="opacity-60">
                <Settings className="w-3 h-3 text-gray-500" />
                <Text size="xs" className="text-gray-600">Document type selection</Text>
              </Flex>
              <Flex align="center" gap={2} className="opacity-60">
                <Sliders className="w-3 h-3 text-gray-500" />
                <Text size="xs" className="text-gray-600">Length, tone & favourability</Text>
              </Flex>
              <Text size="xs" className="text-gray-500 opacity-60">
                Key clauses customization...
              </Text>
            </VStack>
          </Box>

          {/* Click to open hint */}
          <Text size="xs" className="text-purple-600 opacity-80">
            Click to configure →
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}