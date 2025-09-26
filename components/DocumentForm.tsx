import React from 'react'
import { Box, Flex, VStack, Text, Textarea, Button } from '@/genie-ui'
import { Select, SelectItem } from '@/genie-ui/components/select'
import DocDetailSlider, { DocumentType } from '@/genie-ui/components/docDetailSlider'
import { FileText, Plus, X } from 'lucide-react'

interface DocumentFormProps {
  // Form state props
  prompt: string
  setPrompt: (value: string) => void
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
}

/**
 * Reusable document customization form component
 * Contains all the form logic from the original implementation
 */
export const DocumentForm: React.FC<DocumentFormProps> = ({
  prompt,
  setPrompt,
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
  customClauses,
  setCustomClauses,
  onSelectedDocsChange,
  addCustomClause,
  updateCustomClauseName,
  updateCustomClauseDetails,
  removeCustomClause,
  generateKeyClauses,
  generateDetailQuestions
}) => {

  return (
    <Box className="p-6 overflow-y-auto">
      <VStack spacing={8} align="start" className="w-full">
        {/* Doc Detail Slider */}
        <Box className="w-full">
          <DocDetailSlider
            value={documentType}
            onChange={setDocumentType}
          />
        </Box>

        {/* Document Selection Section */}
        <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Box>
              <Text size="lg" className="font-medium text-gray-900 mb-2">Select docs to create</Text>
              <Text size="sm" className="text-gray-600">Choose which documents you need</Text>
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

              {/* Show customise link when more than one document is selected */}
              {Object.values(selectedDocs).filter(Boolean).length > 1 && (
                <Box className="w-full flex justify-start mt-4">
                  <button className="text-xs text-purple-600 hover:text-purple-800 underline">
                    Customise documents separately.
                  </button>
                </Box>
              )}
            </Box>
          </Box>

          {/* Based on previous documents sections */}
          {Object.values(selectedDocs).some(v => v) && (
            <Box className="mt-6 pt-6 border-t border-gray-200">
              {(() => {
                const selectedDocsList = Object.keys(selectedDocs).filter(k => selectedDocs[k])
                const numSelected = selectedDocsList.length

                // Layout logic based on number of selected documents
                if (numSelected === 1) {
                  return (
                    <Box className="flex justify-center">
                      <Box className="w-full max-w-md">
                        {selectedDocsList.map((doc) => (
                          <Box key={doc} className="border rounded-lg bg-white shadow-sm overflow-hidden">
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
                        ))}
                      </Box>
                    </Box>
                  )
                } else {
                  return (
                    <Box className="grid grid-cols-2 gap-4">
                      {selectedDocsList.map((doc, index) => {
                        let gridClass = ''
                        if (numSelected === 3 && index === 2) {
                          gridClass = 'col-start-1'
                        } else if (numSelected === 4 && index === 3) {
                          gridClass = 'col-start-2'
                        }

                        return (
                          <Box key={doc} className={`border rounded-lg bg-white shadow-sm overflow-hidden ${gridClass}`}>
                            <Box className="border-b bg-gray-50 px-3 py-3">
                              <Flex align="center" justify="between">
                                <Text size="sm" className="text-gray-900 font-bold truncate">Re-use previous {doc}</Text>
                                <Flex align="center" className="text-xs text-gray-600" style={{ width: '128px' }}>
                                  <Text className="w-16 text-center">Template</Text>
                                  <Text className="w-16 text-center">Context</Text>
                                </Flex>
                              </Flex>
                            </Box>

                            {[`${doc}_type_1`, `${doc}_type_2`].map((docName, rowIndex) => (
                              <Box key={rowIndex} className={`px-3 py-2 ${rowIndex > 0 ? 'border-t' : ''}`}>
                                <Flex align="center" justify="between">
                                  <Flex align="center" gap={2} className="flex-1 min-w-0">
                                    <FileText className="w-3 h-3 text-blue-500" />
                                    <Text size="xs" className="text-gray-900 truncate">{docName}.docx</Text>
                                  </Flex>
                                  <Flex align="center" style={{ width: '128px' }}>
                                    <Box className="w-16 flex justify-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={rowIndex === 0}
                                        className="w-3 h-3 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                    </Box>
                                    <Box className="w-16 flex justify-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked
                                        className="w-3 h-3 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Box>
                            ))}
                          </Box>
                        )
                      })}
                    </Box>
                  )
                }
              })()}
            </Box>
          )}
        </Box>

        {/* Governing Law Section */}
        {(documentType === 'template' || documentType === 'standard' || documentType === 'customised') && (
          <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Box>
                <Text size="lg" className="font-medium text-gray-900 mb-2">Governing Law</Text>
                <Text size="sm" className="text-gray-600">Select the governing law for your documents</Text>
              </Box>

              <Box>
                <Select
                  selectedKeys={[governingLaw]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string
                    setGoverningLaw(selected)
                  }}
                  placeholder="Select governing law"
                  className="w-1/2"
                  classNames={{
                    trigger: "h-[40px] min-h-[40px]",
                    selectorIcon: "right-3 absolute"
                  }}
                  size="md"
                >
                  <SelectItem key="english-law">English Law</SelectItem>
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
            </Box>
          </Box>
        )}

        {/* Document Purpose & Details */}
        {(documentType === 'standard' || documentType === 'customised') && (
          <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <VStack spacing={6} align="start">
              <Box className="w-full">
                <Text size="lg" className="font-medium text-gray-900 mb-4">Document Purpose</Text>

                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Box>
                    <Text size="sm" className="text-gray-600 mb-4">Why are you doing this work now and what must it achieve for this deal to be a success?</Text>
                    <Text size="sm" className="text-gray-600">List the 2–3 outcomes that matter most.</Text>
                  </Box>

                  <Box>
                    <Textarea
                      minRows={3}
                      value={prompt}
                      onValueChange={(val) => setPrompt(val)}
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

              <Box className="w-full">
                <Text size="lg" className="font-medium text-gray-900 mb-4">Document Details</Text>

                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Box>
                    <Text size="sm" className="text-gray-600 mb-4">What specific details do I need to include? eg.</Text>
                    {Object.values(selectedDocs).some(v => v) && (
                      <Box className="mt-4">
                        <VStack spacing={3} align="start">
                          {generateDetailQuestions().map((question, i) => (
                            <Text key={i} size="sm" className="text-gray-600">
                              {i + 1}. {question}
                            </Text>
                          ))}
                        </VStack>
                      </Box>
                    )}
                  </Box>

                  <Box>
                    <Textarea
                      minRows={4}
                      value={selectedExistingInputs['document-details'] || ''}
                      onValueChange={(val) => setSelectedExistingInputs(prev => ({...prev, 'document-details': val}))}
                      placeholder="E.g., salary range £40-50k, hybrid working 2 days/week, reporting to CMO"
                      className="w-full mb-4"
                      classNames={{
                        inputWrapper: 'rounded-lg border border-gray-200',
                        input: 'text-gray-900 placeholder:text-gray-400',
                      }}
                    />
                    <Flex align="center" gap={3}>
                      <Text size="sm" className="text-gray-600">Any supporting documents?</Text>
                      <Button
                        variant="bordered"
                        size="sm"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        Upload Documents
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </VStack>
          </Box>
        )}

        {/* Key Clauses Section */}
        {documentType === 'customised' && (
          <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <Box className="w-full">
                <Text size="lg" className="font-medium text-gray-900 mb-4">Key clauses:</Text>

                {!Object.values(selectedDocs).some(v => v) ? (
                  <Box className="text-center py-12">
                    <Text size="md" className="text-gray-500">
                      Select a document to customise your clauses.
                    </Text>
                  </Box>
                ) : (
                  <>
                    <button className="text-purple-600 underline hover:text-purple-800 transition-colors text-sm mb-4 block">
                      Customise standard clauses
                    </button>
                    <Text size="sm" className="text-gray-600 mb-6">
                      Add detail below to customise the most important clauses in this document.
                    </Text>

                    <VStack spacing={6} align="start">
                      {Object.keys(selectedDocs).filter(doc => selectedDocs[doc]).map((docType) => (
                        <Box key={docType} className="w-full">
                          <Text size="md" className="font-semibold text-gray-900 mb-4">{docType}</Text>
                          <VStack spacing={4} align="start">
                            {generateKeyClauses(docType).map((clause, i) => {
                              const clauseKey = `${docType}-${i}`
                              const isVisible = selectedClauses[clauseKey] !== false
                              if (!isVisible) return null

                              return (
                                <Box key={i} className="w-full">
                                  <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <Box>
                                      <Flex align="center" gap={2} className="mb-1">
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
                                      <Text size="xs" className="text-gray-600">{clause.explainer}</Text>
                                    </Box>

                                    <Box>
                                      <Textarea
                                        minRows={2}
                                        value={clauseDetailsText[clauseKey] || ''}
                                        onValueChange={(val) => setClauseDetailsText(prev => ({
                                          ...prev,
                                          [clauseKey]: val
                                        }))}
                                        placeholder={`Add specific requirements for ${clause.name.toLowerCase()}...`}
                                        className="w-full"
                                        classNames={{
                                          inputWrapper: 'rounded-lg border border-gray-200',
                                          input: 'text-gray-900 placeholder:text-gray-400 text-sm',
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </Box>
                              )
                            })}

                            {/* Custom Clauses */}
                            {(customClauses[docType] || []).map((customClause) => (
                              <Box key={customClause.id} className="w-full">
                                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <Box>
                                    <Flex align="center" gap={2} className="mb-1">
                                      <Box className="flex-1">
                                        <Textarea
                                          minRows={1}
                                          value={customClause.name}
                                          onValueChange={(val) => updateCustomClauseName(docType, customClause.id, val)}
                                          placeholder="What clause would you like to add?"
                                          className="w-full"
                                          classNames={{
                                            inputWrapper: 'rounded-lg border border-gray-200',
                                            input: 'text-gray-900 placeholder:text-gray-400 text-sm font-medium',
                                          }}
                                        />
                                      </Box>
                                      <button
                                        onClick={() => removeCustomClause(docType, customClause.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </Flex>
                                  </Box>

                                  <Box>
                                    <Textarea
                                      minRows={2}
                                      value={customClause.details}
                                      onValueChange={(val) => updateCustomClauseDetails(docType, customClause.id, val)}
                                      placeholder="Add specific requirements for this clause..."
                                      className="w-full"
                                      classNames={{
                                        inputWrapper: 'rounded-lg border border-gray-200',
                                        input: 'text-gray-900 placeholder:text-gray-400 text-sm',
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            ))}

                            <Box className="w-full flex justify-end">
                              <Button
                                size="sm"
                                variant="bordered"
                                onClick={() => addCustomClause(docType)}
                                className="text-purple-600 border-purple-600 hover:bg-purple-50"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add another clause
                              </Button>
                            </Box>
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  </>
                )}
            </Box>
          </Box>
        )}

        {/* Draft Customization Sliders */}
        {(documentType === 'template' || documentType === 'standard' || documentType === 'customised') && (
          <Box className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Box>
                <Text size="lg" className="font-medium text-gray-900 mb-2">
                  Customise your {documentType === 'template' && Object.values(selectedDocs).filter(v => v).length === 0
                    ? 'template'
                    : Object.values(selectedDocs).filter(v => v).length === 1 ? 'draft' : 'drafts'}
                </Text>
                <Text size="sm" className="text-gray-600">
                  Adjust your {documentType === 'template' && Object.values(selectedDocs).filter(v => v).length === 0
                    ? 'template'
                    : Object.values(selectedDocs).filter(v => v).length === 1 ? 'document' : 'documents'} along key dimensions
                </Text>
              </Box>

              <Box>
                <VStack spacing={4} className="w-full">
                  {/* Length Slider */}
                  <Box className="w-full">
                    <Text size="sm" className="font-medium mb-2">Length</Text>
                    <Flex justify="between" className="mb-1">
                      <Text size="sm" className="text-gray-600">Simple</Text>
                      <Text size="sm" className="text-gray-600">Comprehensive</Text>
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
                  {(documentType === 'standard' || documentType === 'customised') && (
                    <Box className="w-full">
                      <Text size="sm" className="font-medium mb-2">Favourability</Text>
                      <Flex justify="between" className="mb-1">
                        <Text size="sm" className="text-gray-600">Favours them</Text>
                        <Text size="sm" className="text-gray-600">Favours me</Text>
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
                  )}

                  {/* Tone Slider */}
                  <Box className="w-full">
                    <Text size="sm" className="font-medium mb-2">Tone</Text>
                    <Flex justify="between" className="mb-1">
                      <Text size="sm" className="text-gray-600">Plain English</Text>
                      <Text size="sm" className="text-gray-600">Formal</Text>
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
          </Box>
        )}

      </VStack>
    </Box>
  )
}