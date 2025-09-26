import React from 'react'
import { Box, Flex, Text } from '@/genie-ui'
import { FileText, X } from 'lucide-react'

interface FormArtifactChipProps {
  selectedDocCount: number
  onOpen: () => void
  onClose: () => void
}

/**
 * Sticky chip shown at top of chat when form artifact is pinned
 * Entire chip is clickable to reopen form
 * Separate X button to close the artifact
 */
export const FormArtifactChip: React.FC<FormArtifactChipProps> = ({
  selectedDocCount,
  onOpen,
  onClose
}) => {
  return (
    <Box className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
      <Box className="px-4 py-2">
        <Flex align="center" justify="between">
          {/* Main chip area - clickable to open */}
          <button
            onClick={onOpen}
            className="flex-1 flex items-center gap-3 py-2 px-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4 text-purple-600" />
            <Text size="sm" className="font-medium text-purple-700">
              Creating {selectedDocCount} document{selectedDocCount !== 1 ? 's' : ''}
            </Text>
            <Text size="xs" className="text-purple-600 opacity-75">
              Click to configure
            </Text>
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="ml-2 p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </Flex>
      </Box>
    </Box>
  )
}