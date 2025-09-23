import { useState } from 'react'
import { 
  Box, 
  Flex, 
  VStack, 
  Container, 
  Button, 
  Heading, 
  Text,
  Textarea,
} from '@/genie-ui'
import { Select, SelectItem } from '@/genie-ui/components/select'
import DocDetailSlider, { DocumentType } from '@/genie-ui/components/docDetailSlider'
import {
  Wand2,
  Paperclip,
  ArrowUp,
  FileText,
  Plus,
  X,
} from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState<'landing' | 'chat' | 'document'>('landing')
  const [selectedExistingInputs, setSelectedExistingInputs] = useState<Record<string, string>>({})
  const [documentTitle, setDocumentTitle] = useState('')
  const [workbenchOpen, setWorkbenchOpen] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({})
  const [suggestedDocs, setSuggestedDocs] = useState<string[]>([])
  const [createDocs, setCreateDocs] = useState<string[]>([])
  const [selectedClauses, setSelectedClauses] = useState<Record<string, boolean>>({})
  const [clauseDetailsText, setClauseDetailsText] = useState<Record<string, string>>({})
  const [lengthValue, setLengthValue] = useState(50)
  const [favourabilityValue, setFavourabilityValue] = useState(50)
  const [toneValue, setToneValue] = useState(50)
  const [documentType, setDocumentType] = useState<DocumentType>('template')
  const [governingLaw, setGoverningLaw] = useState('english-law')

  // Generate key clauses for each document type
  const generateKeyClauses = (docType: string): Array<{name: string, explainer: string}> => {
    switch(docType) {
      case 'Employment Agreement':
        return [
          { name: 'Termination and notice periods', explainer: 'Protects both parties with clear exit terms and adequate notice requirements.' },
          { name: 'Intellectual property assignment', explainer: 'Ensures all work-related IP belongs to the company, preventing future disputes.' },
          { name: 'Non-compete and non-solicitation', explainer: 'Prevents employees from competing or poaching clients/staff after leaving.' }
        ]
      case 'Investment Agreement':
        return [
          { name: 'Liquidation preferences', explainer: 'Determines payout order and amounts if the company is sold or liquidated.' },
          { name: 'Anti-dilution protection', explainer: 'Protects investors from share value reduction in future funding rounds.' },
          { name: 'Board representation rights', explainer: 'Gives investors governance control proportional to their investment stake.' }
        ]
      case 'Service Agreement':
        return [
          { name: 'Service level agreements', explainer: 'Defines performance standards and penalties for subpar delivery.' },
          { name: 'Intellectual property ownership', explainer: 'Clarifies who owns work product and any innovations created.' },
          { name: 'Limitation of liability', explainer: 'Caps financial exposure for both parties in case of disputes or damages.' }
        ]
      case 'NDA':
        return [
          { name: 'Definition of confidential information', explainer: 'Clearly defines what information is protected under the agreement.' },
          { name: 'Permitted disclosures and exceptions', explainer: 'Specifies when confidential information can legally be shared.' },
          { name: 'Return of confidential materials', explainer: 'Requires return or destruction of confidential information when relationship ends.' }
        ]
      default:
        return [
          { name: 'Term and termination', explainer: 'Establishes duration and conditions for ending the agreement.' },
          { name: 'Payment and compensation', explainer: 'Defines all financial obligations and payment schedules.' },
          { name: 'Dispute resolution', explainer: 'Sets process for handling disagreements without costly litigation.' }
        ]
    }
  }

  // Generate suggested documents based on user prompt
  const generateSuggestedDocs = (userPrompt: string): string[] => {
    const lowerPrompt = userPrompt.toLowerCase()
    
    if (lowerPrompt.includes('hire') || lowerPrompt.includes('employ') || lowerPrompt.includes('job')) {
      return ['Employment Agreement', 'Offer Letter', 'NDA', 'IP Assignment Agreement']
    }
    if (lowerPrompt.includes('invest') || lowerPrompt.includes('funding') || lowerPrompt.includes('capital')) {
      return ['Investment Agreement', 'Shareholders Agreement', 'Term Sheet', 'NDA']
    }
    if (lowerPrompt.includes('service') || lowerPrompt.includes('contract') || lowerPrompt.includes('client')) {
      return ['Service Agreement', 'Statement of Work', 'NDA', 'Terms & Conditions']
    }
    if (lowerPrompt.includes('partner') || lowerPrompt.includes('joint venture')) {
      return ['Partnership Agreement', 'Joint Venture Agreement', 'NDA', 'Operating Agreement']
    }
    if (lowerPrompt.includes('supplier') || lowerPrompt.includes('vendor') || lowerPrompt.includes('purchase')) {
      return ['Supplier Agreement', 'Purchase Agreement', 'Terms & Conditions', 'NDA']
    }
    
    // Default suggestions
    return ['Employment Agreement', 'Service Agreement', 'NDA', 'Partnership Agreement']
  }

  // Generate specific detail questions based on selected documents
  const generateDetailQuestions = (): string[] => {
    const chosen = Object.keys(selectedDocs).filter(k => selectedDocs[k])
    if (chosen.length === 0) return []
    
    // For employment agreements
    if (chosen.includes('Employment Agreement') || chosen.includes('Offer Letter')) {
      return [
        'What are the specific role responsibilities and reporting structure?',
        'What\'s the compensation package (salary, benefits, equity, bonuses)?',
        'What are the working arrangements (remote, hybrid, location requirements)?',
        'Which risks are most important to protect against?'
      ]
    }
    
    // For investment agreements
    if (chosen.includes('Investment Agreement') || chosen.includes('Term Sheet')) {
      return [
        'What\'s the funding amount and valuation structure?',
        'What are the investor rights and board representation?',
        'What are the liquidation and anti-dilution preferences?',
        'What are the key milestone and reporting requirements?'
      ]
    }
    
    // For service agreements
    if (chosen.includes('Service Agreement') || chosen.includes('Statement of Work')) {
      return [
        'What are the specific services and deliverables?',
        'What\'s the payment structure and schedule?',
        'What are the performance standards and SLAs?',
        'What are the termination and IP ownership terms?'
      ]
    }
    
    // For NDAs
    if (chosen.includes('NDA')) {
      return [
        'What information needs to be protected?',
        'Is this mutual or one-way protection?',
        'What\'s the confidentiality period and scope?',
        'What are the permitted disclosure exceptions?'
      ]
    }
    
    // Default questions for other document types
    return [
      'What are the specific terms and scope of work?',
      'What\'s the payment or compensation structure?',
      'What are the key responsibilities and obligations?',
      'What are the termination and dispute resolution terms?'
    ]
  }

  return (
    <Box className="min-h-screen bg-white">
      <Box className="h-screen">
        {mode === 'landing' && (
            <div className="bg-gradient-to-b from-white to-zinc-50 min-h-screen">
              <Container maxWidth="lg" className="py-12">
                <VStack spacing={12} align="center">
                  <VStack spacing={6} align="center">
                    <div>
                      <Wand2 className="w-12 h-12 text-purple-600" />
                    </div>
                    <VStack spacing={3} align="center">
                      <Heading as="h1" size="2xl" className="text-center font-bold text-gray-900">
                        Say what you need, <br />
                        <span className="text-purple-600">we&apos;ll get it ready</span>
                      </Heading>
                      <Text size="lg" className="text-center text-gray-600 max-w-2xl">
                        Type what you need and we&apos;ll create your legal documents in seconds. 
                        No templates, no setup—just describe what you want.
                      </Text>
                    </VStack>
                  </VStack>

                  <Box className="relative w-full max-w-3xl">
                    <Box className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-purple-200/40 to-purple-300/30 blur-2xl pointer-events-none" />
                    <div>
                      <Box className="relative rounded-[24px] bg-white/80 backdrop-blur border border-purple-100 shadow-lg">
                        <Box className="p-6">
                          <Textarea
                            minRows={5}
                            value={prompt}
                            onValueChange={(val) => setPrompt(val)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                if (prompt.trim()) {
                                  // Generate suggested documents and go directly to form
                                  const suggested = generateSuggestedDocs(prompt)
                                  setSuggestedDocs(suggested)
                                  setMode('chat')
                                  setWorkbenchOpen(true)
                                }
                              }
                            }}
                            placeholder={
                              'E.g.,\n"Hire a Sales person"\n"Apply for investment funding"\n"Review this NDA against my template & playbook"'
                            }
                            classNames={{
                              inputWrapper: 'rounded-2xl',
                              input: 'text-foreground-900',
                            }}
                          />

                          <Flex justify="between" align="center" className="mt-4">
                            <Flex gap={2}>
                              <Button variant="light" size="sm" className="text-gray-500 hover:text-purple-600">
                                <Paperclip className="w-4 h-4 mr-2" />
                                Attach
                              </Button>
                            </Flex>
                            <Button
                              variant="solid"
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                              onPress={() => {
                                if (prompt.trim()) {
                                  // Generate suggested documents and go directly to form
                                  const suggested = generateSuggestedDocs(prompt)
                                  setSuggestedDocs(suggested)
                                  setMode('chat')
                                  setWorkbenchOpen(true)
                                }
                              }}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                          </Flex>
                        </Box>
                      </Box>
                    </div>
                  </Box>
                </VStack>
              </Container>
            </div>
          )}

          {mode === 'chat' && (
            <div
              className="grid h-screen bg-white"
              style={{ 
                gridTemplateColumns: workbenchOpen ? '1fr 3fr 2fr' : '1fr 5fr'
              }}
            >
              {/* Left Sidebar */}
              <Box className="bg-white border-r border-gray-200 flex flex-col h-screen overflow-hidden">
                <Box className="p-4 border-b border-gray-200">
                  <Text size="lg" className="font-semibold text-gray-900">GENIE AI</Text>
                  <Text size="sm" className="text-gray-500">New Project</Text>
                </Box>
                <Box className="flex-1 p-4 overflow-auto">
                  <VStack spacing={2} align="start">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                      <Plus className="w-4 h-4" />
                      <Text size="sm">New Task</Text>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      <Text size="sm">Vaults</Text>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      <Text size="sm">Templates</Text>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      <Text size="sm">Projects</Text>
                    </button>
                  </VStack>
                  
                  <Box className="mt-6">
                    <Text size="sm" className="text-gray-500 mb-2">Recent Projects</Text>
                    <VStack spacing={1} align="start">
                      {['New Project', 'Setting up business', 'Procuring raw materials', 'Renewal of MSA', 'Supplier onboarding', 'Project 5'].map((project, i) => (
                        <button key={i} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">
                          <Text size="sm" className={i === 0 ? "text-blue-600 font-medium" : "text-gray-700"}>{project}</Text>
                        </button>
                      ))}
                    </VStack>
                  </Box>
                </Box>
                <Box className="p-4 border-t border-gray-200">
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
                    <Text size="sm">⚙️ Settings & members</Text>
                  </button>
                  <Text size="xs" className="text-purple-600 mt-2">🔮 2 docs left for this month</Text>
                </Box>
              </Box>

              {/* Form-based interface */}
              <Box className="flex flex-col bg-white h-screen">
                <Box className="h-full flex justify-center">
                  <Box className="w-full max-w-4xl flex flex-col h-full">
                    <div className="flex-1 flex flex-col h-full">
                      <Box className="flex-1 p-6 overflow-y-auto h-0">
                        <VStack spacing={8} align="start" className="w-full">
                          <Box className="w-full">
                            <Flex justify="between" align="center">
                              <Box>
                                <Text size="lg" className="font-semibold text-gray-900 mb-2">Document Creation</Text>
                                <Text size="md" className="text-gray-600">Complete the form below to create your document</Text>
                              </Box>
                              <Button
                                variant="bordered"
                                size="sm"
                                onPress={() => setWorkbenchOpen(!workbenchOpen)}
                                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                              >
                                {workbenchOpen ? 'Hide Panel' : 'Show Panel'}
                              </Button>
                            </Flex>
                          </Box>

                          {/* Doc Detail Slider */}
                          <Box className="w-full">
                            <DocDetailSlider
                              value={documentType}
                              onChange={setDocumentType}
                            />
                          </Box>

                          {/* Document Selection Section */}
                          <Box className="w-full">
                            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              <Box className="lg:col-span-1">
                                <Text size="lg" className="font-medium text-gray-900 mb-2">Select docs to create</Text>
                                <Text size="sm" className="text-gray-600">Choose which documents you need</Text>
                              </Box>
                              
                              <Box className="lg:col-span-2">
                                <VStack spacing={3} align="start">
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
                                        }}
                                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                      <label htmlFor={`doc-${i}`} className="flex-1 cursor-pointer">
                                        <Text size="sm" className="text-gray-900">{i + 1}. {doc}</Text>
                                      </label>
                                    </Box>
                                  ))}
                                </VStack>
                              </Box>
                            </Box>
                          </Box>

                          {/* Governing Law Section - Show for Template and Standard */}
                          {(documentType === 'template' || documentType === 'standard') && (
                            <Box className="w-full">
                              <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Box className="lg:col-span-1">
                                  <Text size="lg" className="font-medium text-gray-900 mb-2">Governing Law</Text>
                                  <Text size="sm" className="text-gray-600">Select the governing law for your documents</Text>
                                </Box>
                                
                                <Box className="lg:col-span-2">
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

                          {/* Document Purpose - Show for Standard and Customised */}
                          {(documentType === 'standard' || documentType === 'customised') && (
                            <Box className="w-full">
                              <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Box className="lg:col-span-3">
                                  <Text size="lg" className="font-medium text-gray-900 mb-2">Document Purpose</Text>
                                  <Text size="sm" className="text-gray-600 mb-4">Why are you doing this work now and what must it achieve for this deal to be a success?</Text>
                                </Box>
                              </Box>
                            
                            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              <Box className="lg:col-span-1">
                                <Text size="sm" className="text-gray-600">List the 2–3 outcomes that matter most.</Text>
                              </Box>
                              
                              <Box className="lg:col-span-2">
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
                          )}

                          {/* Document Details - Show for Standard and Customised */}
                          {(documentType === 'standard' || documentType === 'customised') && (
                            <Box className="w-full">
                              <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Box className="lg:col-span-1">
                                  <Text size="lg" className="font-medium text-gray-900 mb-2">Document Details</Text>
                                  <Text size="sm" className="text-gray-600 mb-4">What specific details do I need to include?</Text>
                                
                                {/* Show numbered questions when documents are selected */}
                                {Object.values(selectedDocs).some(v => v) && (
                                  <Box className="mt-4">
                                    <Text size="sm" className="text-gray-600 mb-3">eg.</Text>
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
                              
                              <Box className="lg:col-span-2">
                                <Textarea
                                  minRows={4}
                                  value={selectedExistingInputs['document-details'] || ''}
                                  onValueChange={(val) => setSelectedExistingInputs(prev => ({...prev, 'document-details': val}))}
                                  placeholder="E.g., salary range £40-50k, hybrid working 2 days/week, reporting to CMO"
                                  className="w-full"
                                  classNames={{
                                    inputWrapper: 'rounded-lg border border-gray-200',
                                    input: 'text-gray-900 placeholder:text-gray-400',
                                  }}
                                />
                                <Button
                                  variant="bordered"
                                  size="sm"
                                  className="mt-3 border-purple-200 text-purple-700 hover:bg-purple-50"
                                >
                                  Upload Documents
                                </Button>
                              </Box>
                            </Box>
                            </Box>
                          )}

                          {/* Key Clauses Section - Show when documents are selected and only for Customised */}
                          {Object.values(selectedDocs).some(v => v) && documentType === 'customised' && (
                            <Box className="w-full">
                              <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Box className="lg:col-span-3">
                                  <Text size="lg" className="font-medium text-gray-900 mb-4">Key clauses:</Text>
                                  <button className="text-purple-600 underline hover:text-purple-800 transition-colors text-sm mb-4 block">
                                    Customise standard clauses
                                  </button>
                                  <Text size="sm" className="text-gray-600 mb-6">
                                    As well as standard clauses, I recommend you include the below key clauses. Untick any of them and click to add more detail.
                                  </Text>
                                  
                                  {/* Each document type */}
                                  <VStack spacing={6} align="start">
                                    {Object.keys(selectedDocs).filter(doc => selectedDocs[doc]).map((docType) => (
                                      <Box key={docType} className="w-full">
                                        <Text size="md" className="font-semibold text-gray-900 mb-4">{docType}</Text>
                                        <VStack spacing={4} align="start">
                                          {generateKeyClauses(docType).map((clause, i) => {
                                            const clauseKey = `${docType}-${i}`
                                            // Show clause unless explicitly hidden
                                            const isVisible = selectedClauses[clauseKey] !== false
                                            if (!isVisible) return null
                                            
                                            return (
                                              <Box key={i} className="w-full">
                                                {/* Each clause row: left clause + right text box */}
                                                <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                  {/* Left: Clause name + explainer */}
                                                  <Box className="lg:col-span-1">
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
                                                  
                                                  {/* Right: Text input aligned with this clause */}
                                                  <Box className="lg:col-span-2">
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
                                        </VStack>
                                      </Box>
                                    ))}
                                  </VStack>
                                </Box>
                              </Box>
                            </Box>
                          )}

                          {/* Draft Customization Sliders - Show when documents are selected OR Template mode */}
                          {(Object.values(selectedDocs).some(v => v) || documentType === 'template') && (
                            <Box className="w-full">
                              <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Box className="lg:col-span-1">
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
                                
                                <Box className="lg:col-span-2">
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
                                    
                                    {/* Favourability Slider - Show for Standard and Customised */}
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

                          <Box className="w-full border-t border-gray-200 pt-6">
                            <Flex justify="end" gap={4}>
                              <Button variant="bordered" size="md">Save Draft</Button>
                              <Button 
                                variant="solid" 
                                size="md"
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                onPress={() => {
                                  setMode('document')
                                  setDocumentTitle(prompt || 'New Document')
                                }}
                              >
                                Create Document
                              </Button>
                            </Flex>
                          </Box>
                        </VStack>
                      </Box>
                    </div>
                  </Box>
                </Box>
              </Box>

              {/* Right workbench panel */}
              {workbenchOpen && (
                <aside className="bg-white border-l border-gray-200 shadow-lg h-screen overflow-hidden">
                  <Box className="h-full flex flex-col">
                    {/* Tab Header */}
                    <Box className="border-b border-gray-100 px-6 pt-6 pb-4">
                      <Flex gap={6}>
                        <button className="pb-3 text-sm font-medium text-gray-900 border-b-2 border-gray-900 relative">
                          Documents
                        </button>
                        <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                          Rules
                        </button>
                      </Flex>
                    </Box>

                    {/* Content */}
                    <Box className="flex-1 p-6 overflow-y-auto h-0">
                      <VStack spacing={4} align="start" className="h-full">
                        {/* Creating Section */}
                        <Box className="w-full">
                          {createDocs.map((doc, i) => (
                            <Box key={`creating-section-${i}`} className={i > 0 ? "mt-6" : ""}>
                              {i > 0 && <Box className="w-full h-px bg-gray-200 my-6" />}
                              <Text size="lg" className="mb-4 text-gray-900 font-semibold">Creating document {i + 1}:</Text>
                              <Box className="border rounded-lg bg-white shadow-sm mb-2">
                                <Flex align="center" justify="between" className="p-3">
                                  <Flex align="center" gap={3}>
                                    <FileText className="w-4 h-4 text-blue-500" />
                                    <Text size="sm" className="text-gray-900">{doc}.docx</Text>
                                  </Flex>
                                  <Text size="xs" className="text-purple-600 bg-purple-100 px-2 py-1 rounded-md animate-pulse">
                                    Genie editing...
                                  </Text>
                                </Flex>
                              </Box>
                              
                              {/* Template Selection Table */}
                              <Box className="mt-3">
                                <Box className="border rounded-lg bg-white shadow-sm overflow-hidden">
                                  <Box className="border-b bg-gray-50 px-3 py-3">
                                    <Flex align="center" justify="between">
                                      <Text size="md" className="text-gray-900 font-bold">Based on previous documents:</Text>
                                      <Flex align="center" className="text-xs text-gray-600" style={{ width: '180px' }}>
                                        <Text className="w-20 text-center">Use as template</Text>
                                        <Text className="w-20 text-center">Use as context</Text>
                                        <Box className="w-16" />
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
                                        <Flex align="center" style={{ width: '180px' }}>
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
                                          <Box className="w-16 flex justify-center">
                                            <Text size="xs" className="text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                                              Signed
                                            </Text>
                                          </Box>
                                        </Flex>
                                      </Flex>
                                    </Box>
                                  ))}
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>

                        {/* Additional Context Section */}
                        <Box className="w-full h-px bg-gray-200 my-6" />
                        <Box className="w-full">
                          <Text size="lg" className="mb-4 text-gray-900 font-semibold">Additional context:</Text>
                          {['Previous_document_1', 'Previous_document_2'].map((doc, i) => (
                            <Flex key={i} align="center" justify="between" className="py-2">
                              <Flex align="center" gap={3}>
                                <FileText className="w-4 h-4 text-blue-500" />
                                <Text size="sm" className="text-gray-900">{doc}.docx</Text>
                              </Flex>
                              <Text size="xs" className="text-green-700 bg-green-100 px-2 py-1 rounded-md">
                                Signed
                              </Text>
                            </Flex>
                          ))}
                          
                          {/* Action Buttons */}
                          <Flex gap={3} className="mt-4">
                            <Button
                              variant="bordered"
                              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                            >
                              Search Vault
                            </Button>
                            <Button
                              variant="bordered"
                              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                            >
                              Upload
                            </Button>
                          </Flex>
                        </Box>
                      </VStack>
                    </Box>
                  </Box>
                </aside>
              )}
            </div>
          )}

          {mode === 'document' && (
            <div>
              <Container maxWidth="2xl" className="py-8">
                <VStack spacing={6} align="start" className="w-full">
                  <Box className="w-full pb-4 border-b border-zinc-200">
                    <VStack spacing={2} align="start">
                      <Text size="sm" className="text-zinc-500">
                        Saved in / {documentTitle} project 🔒 Private and secure
                      </Text>
                      <Heading as="h1" size="xl" className="text-purple-600">
                        {documentTitle} (19 August 2025) v1
                      </Heading>
                    </VStack>
                  </Box>

                  <Box className="w-full bg-white rounded-2xl border border-zinc-200 shadow-sm min-h-[70vh]">
                    <Box className="p-8">
                      <VStack spacing={6} align="start" className="w-full max-w-4xl">
                        <Text size="lg" className="leading-relaxed">
                          This Agreement is made on the <span className="bg-yellow-200 px-2 py-1 rounded">[DATE]</span> day of <span className="bg-yellow-200 px-2 py-1 rounded">[MONTH]</span> <span className="bg-yellow-200 px-2 py-1 rounded">[YEAR]</span>
                        </Text>
                        <Text size="lg" className="leading-relaxed">
                          Document content for: {documentTitle}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                </VStack>
              </Container>
            </div>
          )}
      </Box>
    </Box>
  )
}
