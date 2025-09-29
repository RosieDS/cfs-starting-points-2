import React, { useState, useEffect } from 'react'
import { Box, Flex, VStack, Text, Textarea, Button } from '@/genie-ui'
import { Select, SelectItem } from '@/genie-ui/components/select'
import DocDetailSlider, { DocumentType } from '@/genie-ui/components/docDetailSlider'
import { FileText, Plus, X } from 'lucide-react'

interface DocumentFormProps {
  // Form state props
  prompt: string
  setPrompt: (value: string) => void
  initialUserIntent: string // The original user input from landing page
  workDescription: string // Current value for "Tell us about this work" section
  setWorkDescription: (value: string) => void
  selectedExistingInputs: Record<string, string>
  setSelectedExistingInputs: (value: Record<string, string>) => void
  selectedDocs: Record<string, boolean>
  setSelectedDocs: (value: Record<string, boolean>) => void
  suggestedDocs: string[]
  createDocs: string[]
  setCreateDocs: (value: string[]) => void
  selectedClauses: Record<string, boolean>
  setSelectedClauses: (value: Record<string, boolean>) => void
  clauseDetailsText: Record<string, string>
  setClauseDetailsText: (value: Record<string, string>) => void
  lengthValue: number
  setLengthValue: (value: number) => void
  favourabilityValue: number
  setFavourabilityValue: (value: number) => void
  toneValue: number
  setToneValue: (value: number) => void
  documentType: DocumentType
  setDocumentType: (value: DocumentType) => void
  governingLaw: string
  setGoverningLaw: (value: string) => void
  language: string
  setLanguage: (value: string) => void
  customClauses: Record<string, Array<{name: string, details: string, id: string}>>
  setCustomClauses: (value: Record<string, Array<{name: string, details: string, id: string}>>) => void

  // Callback for when selected docs change
  onSelectedDocsChange?: (count: number) => void

  // Helper functions
  addCustomClause: (docType: string) => void
  updateCustomClauseName: (docType: string, clauseId: string, name: string) => void
  updateCustomClauseDetails: (docType: string, clauseId: string, details: string) => void
  removeCustomClause: (docType: string, clauseId: string) => void
  generateKeyClauses: (docType: string) => Array<{name: string, explainer: string}>
  generateDetailQuestions: () => string[]
  
  // Optional floating button
  floatingButton?: React.ReactNode
}

/**
 * Reusable document customization form component
 * Contains all the form logic from the original implementation
 */
export const DocumentForm: React.FC<DocumentFormProps> = ({
  prompt,
  setPrompt,
  initialUserIntent,
  workDescription,
  setWorkDescription,
  selectedExistingInputs,
  setSelectedExistingInputs,
  selectedDocs,
  setSelectedDocs,
  suggestedDocs,
  createDocs,
  setCreateDocs,
  selectedClauses,
  setSelectedClauses,
  clauseDetailsText,
  setClauseDetailsText,
  lengthValue,
  setLengthValue,
  favourabilityValue,
  setFavourabilityValue,
  toneValue,
  setToneValue,
  documentType,
  setDocumentType,
  governingLaw,
  setGoverningLaw,
  language,
  setLanguage,
  customClauses,
  setCustomClauses,
  onSelectedDocsChange,
  addCustomClause,
  updateCustomClauseName,
  updateCustomClauseDetails,
  removeCustomClause,
  generateKeyClauses,
  generateDetailQuestions,
  floatingButton
}) => {

  const getBackgroundColor = () => {
    switch (documentType) {
      case 'customised':
        return 'bg-[#F2E7FE]'
      case 'standard':
        return 'bg-[#EDEFFF]'
      default:
        return 'bg-gray-50'
    }
  }

  // Loading state for document library search - track which documents are loading
  const [loadingDocuments, setLoadingDocuments] = useState<Record<string, boolean>>({})
  const [previousSelectedDocs, setPreviousSelectedDocs] = useState<Record<string, boolean>>({})

  // Effect to trigger loading when documents are selected/deselected
  useEffect(() => {
    const currentSelected = Object.keys(selectedDocs).filter(doc => selectedDocs[doc])
    const previousSelected = Object.keys(previousSelectedDocs).filter(doc => previousSelectedDocs[doc])
    
    // Find newly selected documents
    const newlySelected = currentSelected.filter(doc => !previousSelected.includes(doc))
    
    if (newlySelected.length > 0) {
      // Set loading state for newly selected documents
      const newLoadingState = { ...loadingDocuments }
      newlySelected.forEach(doc => {
        newLoadingState[doc] = true
      })
      setLoadingDocuments(newLoadingState)

      // Set timers for each newly selected document
      newlySelected.forEach(doc => {
        setTimeout(() => {
          setLoadingDocuments(prev => ({
            ...prev,
            [doc]: false
          }))
        }, 2000)
      })
    }

    // Remove loading state for deselected documents
    const deselected = previousSelected.filter(doc => !currentSelected.includes(doc))
    if (deselected.length > 0) {
      setLoadingDocuments(prev => {
        const newState = { ...prev }
        deselected.forEach(doc => {
          delete newState[doc]
        })
        return newState
      })
    }

    // Update previous selected docs for next comparison
    setPreviousSelectedDocs(selectedDocs)
  }, [selectedDocs])

  // Loading component for document library search
  const DocumentLibraryLoading = () => (
    <Box className="w-full">
      <Box className="border rounded-lg bg-white shadow-sm overflow-hidden p-6">
        <Flex align="center" justify="center" className="min-h-[100px]">
          <VStack spacing={3} align="center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <Text size="sm" className="text-gray-600">Searching your document library.</Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  )

  return (
    <Box className={`p-6 overflow-y-auto ${getBackgroundColor()}`}>
      <VStack spacing={8} align="start" className="w-full">
        {/* Doc Detail Slider */}
        <Box className="w-full">
          <DocDetailSlider
            value={documentType}
            onChange={setDocumentType}
          />
        </Box>

        {/* Tell us about this work section */}
        {(documentType === 'standard' || documentType === 'customised') && (
          <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Box>
                <Text size="lg" className="font-medium text-gray-900 mb-4">Tell us about this work</Text>
                <Text size="sm" className="text-gray-600 mb-4">Why are you doing this work now and what must it achieve for this deal to be a success?</Text>
                <Text size="sm" className="text-gray-600">List the 2–3 outcomes that matter most.</Text>
              </Box>

              <Box>
                <Textarea
                  minRows={3}
                  value={workDescription}
                  onValueChange={(val) => setWorkDescription(val)}
                  placeholder="E.g., 'Hire a Sales person', 'Apply for investment funding'"
                  className="w-full"
                  classNames={{
                    inputWrapper: 'rounded-lg border border-gray-200',
                    input: 'text-gray-900 placeholder:text-gray-400',
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* Document Selection Section */}
        <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Box>
              <Text size="lg" className="font-medium text-gray-900 mb-2">Select docs to create</Text>
              <Text size="sm" className="text-gray-600 mb-4">Choose which documents you need</Text>
              
              {/* Governing Law Dropdown */}
              <Box className="w-full mb-4">
                <Text size="sm" className="font-medium text-gray-900 mb-2">Governing law:</Text>
                <Select
                  selectedKeys={[governingLaw]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string
                    setGoverningLaw(selected)
                  }}
                  placeholder="Select governing law"
                  className="w-full"
                  classNames={{
                    trigger: "h-[40px] min-h-[40px]",
                    selectorIcon: "right-3 absolute"
                  }}
                  size="md"
                >
                  <SelectItem key="english-law">England and Wales</SelectItem>
                  <SelectItem key="scottish-law">Scottish Law</SelectItem>
                  <SelectItem key="northern-ireland-law">Northern Ireland Law</SelectItem>
                  <SelectItem key="us-federal">US Federal Law</SelectItem>
                  <SelectItem key="california-law">California State Law</SelectItem>
                  <SelectItem key="new-york-law">New York State Law</SelectItem>
                  <SelectItem key="delaware-law">Delaware State Law</SelectItem>
                  <SelectItem key="australian-law">Australian Law</SelectItem>
                  <SelectItem key="canadian-law">Canadian Law</SelectItem>
                  <SelectItem key="eu-law">European Union Law</SelectItem>
                  <SelectItem key="german-law">German Law</SelectItem>
                  <SelectItem key="french-law">French Law</SelectItem>
                  <SelectItem key="singapore-law">Singapore Law</SelectItem>
                  <SelectItem key="hong-kong-law">Hong Kong Law</SelectItem>
                </Select>
              </Box>

              {/* Language Dropdown */}
              <Box className="w-full mb-4">
                <Text size="sm" className="font-medium text-gray-900 mb-2">Language:</Text>
                <Select
                  selectedKeys={[language]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string
                    setLanguage(selected)
                  }}
                  placeholder="Select language"
                  className="w-full"
                  classNames={{
                    trigger: "h-[40px] min-h-[40px]",
                    selectorIcon: "right-3 absolute"
                  }}
                  size="md"
                >
                  <SelectItem key="english">English</SelectItem>
                  <SelectItem key="spanish">Spanish</SelectItem>
                  <SelectItem key="french">French</SelectItem>
                  <SelectItem key="german">German</SelectItem>
                  <SelectItem key="italian">Italian</SelectItem>
                  <SelectItem key="portuguese">Portuguese</SelectItem>
                </Select>
              </Box>

              {/* Show customise link when more than one document is selected */}
              {Object.values(selectedDocs).filter(Boolean).length > 1 && (
                <Box className="w-full flex justify-start">
                  <button className="text-xs text-purple-600 hover:text-purple-800 underline">
                    Customise documents separately.
                  </button>
                </Box>
              )}
            </Box>

            <Box>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedDocs.map((doc, i) => (
                  <Box key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 w-full">
                    <input
                      type="checkbox"
                      id={`doc-${i}`}
                      checked={selectedDocs[doc] || false}
                      onChange={(e) => {
                        const newSelected = {
                          ...selectedDocs,
                          [doc]: e.target.checked
                        }
                        setSelectedDocs(newSelected)
                        // Update createDocs immediately
                        const chosen = Object.keys(newSelected).filter(k => newSelected[k])
                        setCreateDocs(chosen)
                        // Notify parent of count change
                        if (onSelectedDocsChange) {
                          onSelectedDocsChange(chosen.length)
                        }
                      }}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor={`doc-${i}`} className="flex-1 cursor-pointer min-w-0">
                      <Text
                        size="sm"
                        className="text-gray-900 truncate"
                      >
                        {i + 1}. {doc}
                      </Text>
                    </label>
                  </Box>
                ))}
              </div>
            </Box>
          </Box>

        </Box>

        {/* New Layout for Standard, Customised, and Template Document Types */}
        {(documentType === 'standard' || documentType === 'customised' || documentType === 'template') && (
          <Box className="w-full">
            <VStack spacing={6} align="start" className="w-full">
              {/* Individual Document Sections - One per selected document */}
              {Object.keys(selectedDocs).filter(doc => selectedDocs[doc]).map((doc) => (
                <Box key={doc} className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <Text size="xl" className="font-semibold text-gray-900 mb-6">{doc}</Text>
                  
                  {/* Template mode shows template selection with controls */}
                  {documentType === 'template' ? (
                    <VStack spacing={6} align="start" className="w-full">
                      {/* Re-use previous document - Full Width */}
                      {loadingDocuments[doc] ? (
                        <DocumentLibraryLoading />
                      ) : (
                        <Box className="w-full">
                          <Box className="border rounded-lg bg-white shadow-sm overflow-hidden">
                            <Box className="border-b bg-gray-50 px-3 py-3">
                              <Flex align="center" justify="between">
                                <Text size="md" className="text-gray-900 font-bold truncate">Re-use previous {doc}</Text>
                                <Flex align="center" className="text-xs text-gray-600" style={{ width: '140px' }}>
                                  <Text className="w-20 text-center">Use as template</Text>
                                  <Text className="w-20 text-center">Use as context</Text>
                                </Flex>
                              </Flex>
                            </Box>

                            {[`${doc}_document_type_1`, `${doc}_document_type_2`].map((docName, rowIndex) => (
                              <Box key={rowIndex} className={`px-3 py-2 ${rowIndex > 0 ? 'border-t' : ''}`}>
                                <Flex align="center" justify="between">
                                  <Flex align="center" gap={3} className="flex-1 min-w-0">
                                    <FileText className="w-4 h-4 text-blue-500" />
                                    <Text size="sm" className="text-gray-900 truncate">{docName}.docx</Text>
                                  </Flex>
                                  <Flex align="center" style={{ width: '140px' }}>
                                    <Box className="w-20 flex justify-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={rowIndex === 0}
                                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                    </Box>
                                    <Box className="w-20 flex justify-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked
                                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Bottom Row - 50/50 Split */}
                      <Box className="w-full grid grid-cols-2 gap-6">
                        {/* Left Half - Dropdowns */}
                        <Box className="flex-1">
                          <VStack spacing={6} align="start">
                            </VStack>
                        </Box>

                        {/* Right Half - Sliders */}
                        <Box className="flex-1">
                          <VStack spacing={4} className={`w-full ${documentType === 'standard' ? 'mt-6' : ''}`}>
                            {/* Length Slider */}
                            <Box className="w-full">
                              <Text size="sm" className="font-medium mb-2">Length</Text>
                              <Flex justify="between" className="mb-1">
                                <Text size="xs" className="text-gray-600">Simple</Text>
                                <Text size="xs" className="text-gray-600">Comprehensive</Text>
                              </Flex>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={lengthValue}
                                onChange={(e) => setLengthValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                              />
                            </Box>

                            {/* Favourability Slider */}
                            <Box className="w-full">
                              <Text size="sm" className="font-medium mb-2">Favourability</Text>
                              <Flex justify="between" className="mb-1">
                                <Text size="xs" className="text-gray-600">Favours them</Text>
                                <Text size="xs" className="text-gray-600">Favours me</Text>
                              </Flex>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={favourabilityValue}
                                onChange={(e) => setFavourabilityValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                              />
                            </Box>

                            {/* Tone Slider */}
                            <Box className="w-full">
                              <Text size="sm" className="font-medium mb-2">Tone</Text>
                              <Flex justify="between" className="mb-1">
                                <Text size="xs" className="text-gray-600">Plain English</Text>
                                <Text size="xs" className="text-gray-600">Formal</Text>
                              </Flex>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={toneValue}
                                onChange={(e) => setToneValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                              />
                            </Box>
                          </VStack>
                        </Box>
                      </Box>
                    </VStack>
                  ) : (
                    /* Standard and Customised modes show the full layout */
                    <Box className="flex gap-6">
                      {/* Left Column - 30% width */}
                      <Box className="w-[30%] flex-shrink-0">
                        <VStack spacing={6} align="start">

                            {/* Sliders */}
                            <VStack spacing={4} className={`w-full ${documentType === 'standard' || documentType === 'customised' ? 'mt-6' : ''}`}>
                              {/* Length Slider */}
                              <Box className="w-full">
                                <Text size="sm" className="font-medium mb-2">Length</Text>
                                <Flex justify="between" className="mb-1">
                                  <Text size="xs" className="text-gray-600">Simple</Text>
                                  <Text size="xs" className="text-gray-600">Comprehensive</Text>
                                </Flex>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={lengthValue}
                                  onChange={(e) => setLengthValue(Number(e.target.value))}
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                                />
                              </Box>

                              {/* Favourability Slider */}
                              <Box className="w-full">
                                <Text size="sm" className="font-medium mb-2">Favourability</Text>
                                <Flex justify="between" className="mb-1">
                                  <Text size="xs" className="text-gray-600">Favours them</Text>
                                  <Text size="xs" className="text-gray-600">Favours me</Text>
                                </Flex>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={favourabilityValue}
                                  onChange={(e) => setFavourabilityValue(Number(e.target.value))}
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                                />
                              </Box>

                              {/* Tone Slider */}
                              <Box className="w-full">
                                <Text size="sm" className="font-medium mb-2">Tone</Text>
                                <Flex justify="between" className="mb-1">
                                  <Text size="xs" className="text-gray-600">Plain English</Text>
                                  <Text size="xs" className="text-gray-600">Formal</Text>
                                </Flex>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={toneValue}
                                  onChange={(e) => setToneValue(Number(e.target.value))}
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                                />
                            </Box>
                            </VStack>
                          </VStack>
                      </Box>

                      {/* Right Column - 70% width */}
                      <Box className="flex-1">
                      <VStack spacing={6} align="start" className="w-full">
                        {/* Re-use previous document for this specific document */}
                        {loadingDocuments[doc] ? (
                          <DocumentLibraryLoading />
                        ) : (
                          <Box className="w-full">
                            <Box className="border rounded-lg bg-white shadow-sm overflow-hidden">
                              <Box className="border-b bg-gray-50 px-3 py-3">
                                <Flex align="center" justify="between">
                                  <Text size="md" className="text-gray-900 font-bold truncate">Re-use previous {doc}</Text>
                                  <Flex align="center" className="text-xs text-gray-600" style={{ width: '140px' }}>
                                    <Text className="w-20 text-center">Use as template</Text>
                                    <Text className="w-20 text-center">Use as context</Text>
                                  </Flex>
                                </Flex>
                              </Box>

                              {[`${doc}_document_type_1`, `${doc}_document_type_2`].map((docName, rowIndex) => (
                                <Box key={rowIndex} className={`px-3 py-2 ${rowIndex > 0 ? 'border-t' : ''}`}>
                                  <Flex align="center" justify="between">
                                    <Flex align="center" gap={3} className="flex-1 min-w-0">
                                      <FileText className="w-4 h-4 text-blue-500" />
                                      <Text size="sm" className="text-gray-900 truncate">{docName}.docx</Text>
                                    </Flex>
                                    <Flex align="center" style={{ width: '140px' }}>
                                      <Box className="w-20 flex justify-center">
                                        <input
                                          type="checkbox"
                                          defaultChecked={rowIndex === 0}
                                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                        />
                                      </Box>
                                      <Box className="w-20 flex justify-center">
                                        <input
                                          type="checkbox"
                                          defaultChecked
                                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                        />
                                      </Box>
                                    </Flex>
                                  </Flex>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}

                        {/* Any other details to include for this specific document */}
                        <Box className="w-full">
                          <Text size="lg" className="font-medium text-gray-900 mb-4">Any other details to include:</Text>
                          <Textarea
                            minRows={4}
                            value={selectedExistingInputs[`document-details-${doc}`] || ''}
                            onValueChange={(val) => setSelectedExistingInputs(prev => ({...prev, [`document-details-${doc}`]: val}))}
                            placeholder="E.g., salary range £40-50k, hybrid working 2 days/week, reporting to CMO"
                            className="w-full mb-4"
                            style={{ width: '100%' }}
                            classNames={{
                              inputWrapper: 'rounded-lg border border-gray-200',
                              input: 'text-gray-900 placeholder:text-gray-400',
                            }}
                          />
                          <Box className="flex justify-end">
                            <Button
                              variant="bordered"
                              size="sm"
                              className="border-purple-200 text-purple-700 hover:bg-purple-50"
                            >
                              Upload documents
                            </Button>
                          </Box>
                        </Box>

                        {/* Key clauses for this specific document (only for customised type) */}
                        {documentType === 'customised' && (
                          <Box className="w-full">
                            <Text size="lg" className="font-medium text-gray-900 mb-4">Key clauses</Text>
                            <VStack spacing={4} align="start">
                              {generateKeyClauses(doc).map((clause, i) => {
                                const clauseKey = `${doc}-${i}`
                                const isVisible = selectedClauses[clauseKey] !== false
                                if (!isVisible) return null

                                return (
                                  <Box key={i} className="w-full bg-gray-50 rounded-lg p-4">
                                    <Flex align="center" gap={2} className="mb-2">
                                      <Text size="sm" className="font-medium text-gray-900">{clause.name}</Text>
                                      <button
                                        onClick={() => {
                                          setSelectedClauses(prev => ({
                                            ...prev,
                                            [clauseKey]: false
                                          }))
                                        }}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </Flex>
                                    <Textarea
                                      minRows={2}
                                      value={clauseDetailsText[clauseKey] || ''}
                                      onValueChange={(val) => setClauseDetailsText(prev => ({
                                        ...prev,
                                        [clauseKey]: val
                                      }))}
                                      placeholder="Add specific requirements..."
                                      className="w-full"
                                      classNames={{
                                        inputWrapper: 'rounded-lg border border-gray-200 bg-white',
                                        input: 'text-gray-900 placeholder:text-gray-400 text-sm',
                                      }}
                                    />
                                  </Box>
                                )
                              })}

                              {/* Custom Clauses for this document */}
                              {(customClauses[doc] || []).map((customClause) => (
                                <Box key={customClause.id} className="w-full bg-gray-50 rounded-lg p-4">
                                  <Flex align="center" gap={2} className="mb-2">
                                    <Box className="flex-1">
                                      <Textarea
                                        minRows={1}
                                        value={customClause.name}
                                        onValueChange={(val) => updateCustomClauseName(doc, customClause.id, val)}
                                        placeholder="What clause would you like to add?"
                                        className="w-full"
                                        classNames={{
                                          inputWrapper: 'rounded-lg border border-gray-200 bg-white',
                                          input: 'text-gray-900 placeholder:text-gray-400 text-sm font-medium',
                                        }}
                                      />
                                    </Box>
                                    <button
                                      onClick={() => removeCustomClause(doc, customClause.id)}
                                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </Flex>
                                  <Textarea
                                    minRows={2}
                                    value={customClause.details}
                                    onValueChange={(val) => updateCustomClauseDetails(doc, customClause.id, val)}
                                    placeholder="Add specific requirements for this clause..."
                                    className="w-full"
                                    classNames={{
                                      inputWrapper: 'rounded-lg border border-gray-200 bg-white',
                                      input: 'text-gray-900 placeholder:text-gray-400 text-sm',
                                    }}
                                  />
                                </Box>
                              ))}

                              <Box className="w-full flex justify-center">
                                <Button
                                  size="sm"
                                  variant="bordered"
                                  onClick={() => addCustomClause(doc)}
                                  className="text-purple-600 border-purple-600 hover:bg-purple-50"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add another clause
                                </Button>
                              </Box>
                            </VStack>
                          </Box>
                        )}
                        </VStack>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}

              {/* Show message if no documents selected */}
              {!Object.values(selectedDocs).some(v => v) && (
                <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                  <Text size="md" className="text-gray-500">
                    Select documents above to configure them here.
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        )}

      </VStack>
    </Box>
  )
}