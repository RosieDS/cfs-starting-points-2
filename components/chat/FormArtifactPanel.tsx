import React from 'react'
import { Box, Flex, Text, Button } from '@/genie-ui'
import { Minimize2, ChevronLeft, ChevronRight } from 'lucide-react'

interface FormArtifactPanelProps {
  onMinimize: () => void
  onSelectedDocsChange: (count: number) => void
  children: React.ReactNode
  currentDocIndex?: number
  setCurrentDocIndex?: (index: number) => void
  selectedDocs?: Record<string, boolean>
}

/**
 * Panel that contains the form artifact when it's in the open state
 * Shows above chat messages and includes minimize functionality
 * Contains the entire existing form component
 */
export const FormArtifactPanel: React.FC<FormArtifactPanelProps> = ({
  onMinimize,
  children,
  currentDocIndex = 0,
  setCurrentDocIndex,
  selectedDocs = {}
}) => {
  const selectedDocsCount = Object.keys(selectedDocs).filter(doc => selectedDocs[doc]).length
  const showNavigation = selectedDocsCount > 1

  return (
    <Box className="bg-white h-full flex flex-col">
      {/* Sticky header with title, navigation, and minimize button */}
      <Box className="sticky top-0 bg-white border-b border-gray-100 z-20 flex-shrink-0">
        <Flex align="center" justify="between" className="px-4 py-3">
          <Text size="lg" className="font-semibold text-gray-900">
            Customise your document
          </Text>
          
          {/* Centered document navigation */}
          {showNavigation && (
            <Box className="absolute left-1/2 transform -translate-x-1/2">
              <Box className="bg-purple-50 rounded-full px-4 py-2 inline-flex items-center gap-3">
                <Flex align="center" gap={3}>
                  {currentDocIndex > 0 && (
                    <button
                      onClick={() => setCurrentDocIndex?.(currentDocIndex - 1)}
                      className="w-10 h-10 rounded-full border-2 border-purple-300 bg-white hover:bg-purple-50 transition-colors flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                  )}
                  <Text size="md" className="font-semibold text-gray-900">
                    Document {currentDocIndex + 1}/{selectedDocsCount}
                  </Text>
                  {currentDocIndex < selectedDocsCount - 1 && (
                    <button
                      onClick={() => setCurrentDocIndex?.(currentDocIndex + 1)}
                      className="w-10 h-10 rounded-full border-2 border-purple-300 bg-white hover:bg-purple-50 transition-colors flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  )}
                </Flex>
              </Box>
            </Box>
          )}

          <Button
            variant="light"
            size="sm"
            onPress={onMinimize}
            className="text-gray-500 hover:text-gray-700"
          >
            <Minimize2 className="w-4 h-4" />
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