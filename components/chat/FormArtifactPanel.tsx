import React from 'react'
import { Box, Flex, Text, Button } from '@/genie-ui'
import { Minimize2 } from 'lucide-react'

interface FormArtifactPanelProps {
  onMinimize: () => void
  onSelectedDocsChange: (count: number) => void
  children: React.ReactNode
}

/**
 * Panel that contains the form artifact when it's in the open state
 * Shows above chat messages and includes minimize functionality
 * Contains the entire existing form component
 */
export const FormArtifactPanel: React.FC<FormArtifactPanelProps> = ({
  onMinimize,
  children
}) => {
  return (
    <Box className="bg-white h-full flex flex-col">
      {/* Sticky header with title and minimize button */}
      <Box className="sticky top-0 bg-white border-b border-gray-100 z-20 flex-shrink-0">
        <Flex align="center" justify="between" className="px-4 py-3">
          <Text size="lg" className="font-semibold text-gray-900">
            Customise your document
          </Text>
          <Button
            variant="light"
            size="sm"
            onPress={onMinimize}
            className="text-gray-500 hover:text-gray-700"
          >
            <Minimize2 className="w-4 h-4 mr-2" />
            Minimize
          </Button>
        </Flex>
      </Box>

      {/* Form content - scrollable within the panel */}
      <Box className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
        {children}
      </Box>
    </Box>
  )
}