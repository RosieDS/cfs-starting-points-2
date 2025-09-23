import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Flex, VStack, Text } from '@/genie-ui'

export type DocumentType = 'template' | 'standard' | 'customised'

export interface DocumentTypeOption {
  id: DocumentType
  title: string
  description: string
}

interface DocDetailSliderProps {
  value?: DocumentType
  onChange?: (value: DocumentType) => void
  className?: string
}

const documentTypeOptions: DocumentTypeOption[] = [
  {
    id: 'template',
    title: 'Template',
    description: 'A quick document, not customised to you'
  },
  {
    id: 'standard',
    title: 'Standard',
    description: 'A lightweight doc, customised to you'
  },
  {
    id: 'customised',
    title: 'Customised',
    description: 'Control every detail of your document'
  }
]

export default function DocDetailSlider({ 
  value = 'customised', 
  onChange,
  className = '' 
}: DocDetailSliderProps) {
  const [selectedType, setSelectedType] = useState<DocumentType>(value)

  const handleTypeChange = (newType: DocumentType) => {
    setSelectedType(newType)
    onChange?.(newType)
  }

  const getCirclePosition = () => {
    switch (selectedType) {
      case 'template':
        return '16.67%' // Center of first card (1/6 of total width)
      case 'standard':
        return '50%'    // Center of middle card  
      case 'customised':
        return '83.33%' // Center of last card (5/6 of total width)
      default:
        return '83.33%'
    }
  }

  return (
    <Box className={`w-full ${className}`}>
      <VStack spacing={6} align="center">
        {/* Question */}
        <Text size="lg" className="font-semibold text-gray-900 text-center">
          What kind of document do you need?
        </Text>

        {/* Slider Track and Cards Container */}
        <Box className="relative w-full max-w-2xl">
          {/* Slider Track */}
          <Box className="relative mb-8">
            {/* Full Purple Track */}
            <Box className="w-full h-2 bg-purple-600 rounded-full" />
            
            {/* White Circle Indicator */}
            <motion.div
              className="absolute top-1/2 w-6 h-6 bg-white rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md border-2 border-purple-100"
              initial={false}
              animate={{
                left: getCirclePosition()
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
            />
          </Box>

          {/* Cards */}
          <Flex justify="between" className="w-full gap-4">
            {documentTypeOptions.map((option, index) => (
              <motion.div
                key={option.id}
                className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  selectedType === option.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => handleTypeChange(option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <VStack spacing={2} align="center">
                  <Text 
                    size="md" 
                    className={`font-semibold ${
                      selectedType === option.id ? 'text-purple-900' : 'text-gray-900'
                    }`}
                  >
                    {option.title}
                  </Text>
                  <Text 
                    size="sm" 
                    className={`text-center leading-relaxed ${
                      selectedType === option.id ? 'text-purple-700' : 'text-gray-600'
                    }`}
                  >
                    {option.description}
                  </Text>
                </VStack>
              </motion.div>
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>
  )
}
