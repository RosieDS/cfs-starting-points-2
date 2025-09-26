import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Flex,
  VStack,
  Container,
  Button,
  Heading,
  Text,
  Textarea,
  Replybox,
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
import { MESSAGE_IDS } from '@/constants/messageIds'
import { FormArtifactPreview } from '@/components/chat/FormArtifactPreview'
import { FormArtifactPanel } from '@/components/chat/FormArtifactPanel'
import { FormArtifactChip } from '@/components/chat/FormArtifactChip'
import { DocumentForm } from '@/components/DocumentForm'

// Message type definition
type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// Artifact state type
type ArtifactState = 'preview' | 'open' | 'pinned' | 'closed'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState<'landing' | 'chat' | 'document'>('landing')

  // Chat-related state
  const [messages, setMessages] = useState<Message[]>([])
  const [artifactState, setArtifactState] = useState<ArtifactState>('closed')

  // Sequential message counter for dynamic IDs
  const [messageCounter, setMessageCounter] = useState(0)
  const [selectedExistingInputs, setSelectedExistingInputs] = useState<Record<string, string>>({})
  const [workbenchOpen, setWorkbenchOpen] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({})
  const [suggestedDocs, setSuggestedDocs] = useState<string[]>([])
  const [createDocs, setCreateDocs] = useState<string[]>([])
  const [selectedClauses, setSelectedClauses] = useState<Record<string, boolean>>({})
  const [clauseDetailsText, setClauseDetailsText] = useState<Record<string, string>>({})
  const [lengthValue, setLengthValue] = useState(50)
  const [favourabilityValue, setFavourabilityValue] = useState(50)
  const [toneValue, setToneValue] = useState(50)
  const [documentType, setDocumentType] = useState<DocumentType>('standard')
  const [governingLaw, setGoverningLaw] = useState('english-law')
  const [customClauses, setCustomClauses] = useState<Record<string, Array<{name: string, details: string, id: string}>>>({})
  const [activeTab, setActiveTab] = useState<'documents' | 'context' | 'rules'>('documents')
  const [expandedDocs, setExpandedDocs] = useState<Record<string, boolean>>({})

  // Set first document as expanded by default when createDocs changes
  useEffect(() => {
    if (createDocs.length > 0) {
      setExpandedDocs(prev => ({
        ...prev,
        [createDocs[0]]: true
      }))
    }
  }, [createDocs])

  // Message helper functions
  const addMessage = useCallback((role: 'user' | 'assistant', content: string, customId?: string) => {
    const id = customId || `${role === 'user' ? MESSAGE_IDS.USER_MESSAGE_PREFIX : MESSAGE_IDS.ASSISTANT_MESSAGE_PREFIX}${messageCounter}`
    const newMessage: Message = {
      id,
      role,
      content,
      timestamp: Date.now()
    }

    setMessages(prev => {
      // Check if message with this ID already exists
      if (prev.some(msg => msg.id === id)) {
        return prev
      }
      return [...prev, newMessage]
    })

    if (!customId) {
      setMessageCounter(prev => prev + 1)
    }
  }, [messageCounter])

  const findMessageById = useCallback((messageId: string): Message | undefined => {
    return messages.find(msg => msg.id === messageId)
  }, [messages])

  const updateMessageById = useCallback((messageId: string, newContent: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, content: newContent } : msg
      )
    )
  }, [])

  // Calculate selected document count
  const selectedDocCount = Object.values(selectedDocs).filter(Boolean).length

  // Handle artifact state changes
  const openArtifact = () => setArtifactState('open')
  const minimizeArtifact = () => setArtifactState('pinned')
  const closeArtifact = () => setArtifactState('closed')

  // Handle "Create Form" button
  const handleCreateForm = () => {
    // Check if preview message already exists
    if (!findMessageById(MESSAGE_IDS.FORM_ARTIFACT_PREVIEW)) {
      addMessage('assistant', 'Form artifact preview', MESSAGE_IDS.FORM_ARTIFACT_PREVIEW)
    }
    setArtifactState('preview')
  }

  // Handle message sending
  const handleSendMessage = async (messageContent: string, skipUserMessage = false) => {
    if (!messageContent.trim()) return

    // Add user message only if not skipping (to avoid duplicates from landing page)
    if (!skipUserMessage) {
      addMessage('user', messageContent)
    }

    // If artifact is open, minimize it
    if (artifactState === 'open') {
      setArtifactState('pinned')
    }

    // Send to API
    try {
      const currentMessages = skipUserMessage
        ? [...messages, { role: 'user', content: messageContent }]
        : [...messages, { role: 'user', content: messageContent }]

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: currentMessages
        })
      })

      if (response.ok) {
        const data = await response.json()
        addMessage('assistant', data.content)
      } else {
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.')
      }
    } catch (error) {
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.')
    }
  }

  // Generate dummy content for different document types
  const generateDummyContent = (docType: string) => {
    const docTypeLower = docType.toLowerCase()
    
    if (docTypeLower.includes('employment') || docTypeLower.includes('contract')) {
      return `EMPLOYMENT AGREEMENT

This Employment Agreement is entered into between [COMPANY NAME] and [EMPLOYEE NAME].

1. POSITION AND DUTIES
Employee shall serve as [JOB TITLE] and perform duties including:
- [DUTY 1]
- [DUTY 2]
- [DUTY 3]

2. COMPENSATION
Base salary: $[AMOUNT] per year
Benefits: Health insurance, dental, vision
Vacation: [NUMBER] days per year

3. EMPLOYMENT TERMS
Start date: [DATE]
Employment is at-will and may be terminated by either party

4. CONFIDENTIALITY
Employee agrees to maintain confidentiality of company information

5. GOVERNING LAW
This agreement shall be governed by [STATE] law.

[COMPANY NAME]
By: _________________
Name: [NAME]
Title: [TITLE]

EMPLOYEE
By: _________________
Name: [EMPLOYEE NAME]`
    }
    
    if (docTypeLower.includes('offer')) {
      return `OFFER LETTER

Dear [CANDIDATE NAME],

We are pleased to offer you the position of [JOB TITLE] at [COMPANY NAME].

POSITION DETAILS:
- Job Title: [JOB TITLE]
- Start Date: [DATE]
- Salary: $[AMOUNT] per year
- Benefits: Health, dental, vision insurance
- Vacation: [NUMBER] days per year

REPORTING:
You will report to [MANAGER NAME], [MANAGER TITLE].

NEXT STEPS:
Please sign and return this letter by [DATE] to accept this offer.

We look forward to welcoming you to the team!

Sincerely,
[HIRING MANAGER NAME]
[TITLE]
[COMPANY NAME]

ACCEPTANCE:
I accept this offer of employment.

Signature: _________________
Date: _________________`
    }
    
    if (docTypeLower.includes('nda') || docTypeLower.includes('disclosure')) {
      return `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into on [DATE] by and between:

Party 1: [COMPANY NAME]
Address: [COMPANY ADDRESS]

Party 2: [COUNTERPARTY NAME]  
Address: [COUNTERPARTY ADDRESS]

1. Governing Law. This Agreement is governed by the laws of England and Wales.

2. Jurisdiction. The parties submit to the exclusive jurisdiction of the courts of England and Wales.

3. Liability Cap. The total liability shall not exceed 475% of the fees paid in the 12 months preceding the claim.

4. Confidentiality Duration. The confidentiality obligations survive for two (2) years from disclosure.`
    }

    // Default content for any other document type
    return `${docType.toUpperCase()}

This document contains the terms and conditions for [PURPOSE].

1. PARTIES
This agreement is between [PARTY 1] and [PARTY 2].

2. TERMS
The following terms apply:
- [TERM 1]
- [TERM 2]
- [TERM 3]

3. EFFECTIVE DATE
This agreement is effective as of [DATE].

4. SIGNATURES
Both parties agree to the terms set forth above.

[PARTY 1]
By: _________________

[PARTY 2]
By: _________________`
  }

  // Helper function to add a new custom clause
  const addCustomClause = (docType: string) => {
    const newId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setCustomClauses(prev => ({
      ...prev,
      [docType]: [
        ...(prev[docType] || []),
        { name: '', details: '', id: newId }
      ]
    }))
  }

  // Helper function to update custom clause name
  const updateCustomClauseName = (docType: string, clauseId: string, name: string) => {
    setCustomClauses(prev => ({
      ...prev,
      [docType]: (prev[docType] || []).map(clause => 
        clause.id === clauseId ? { ...clause, name } : clause
      )
    }))
  }

  // Helper function to update custom clause details
  const updateCustomClauseDetails = (docType: string, clauseId: string, details: string) => {
    setCustomClauses(prev => ({
      ...prev,
      [docType]: (prev[docType] || []).map(clause => 
        clause.id === clauseId ? { ...clause, details } : clause
      )
    }))
  }

  // Helper function to remove a custom clause
  const removeCustomClause = (docType: string, clauseId: string) => {
    setCustomClauses(prev => ({
      ...prev,
      [docType]: (prev[docType] || []).filter(clause => clause.id !== clauseId)
    }))
  }

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
                        What kind of document do you need?
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
                                  // Add initial user message and get AI response
                                  addMessage('user', prompt)
                                  handleSendMessage(prompt, true) // Skip adding user message again
                                  // Generate suggested documents for the form
                                  const suggested = generateSuggestedDocs(prompt)
                                  setSuggestedDocs(suggested)
                                  setMode('chat')
                                  setWorkbenchOpen(true)
                                  // Clear the prompt since it's now in chat
                                  setPrompt('')
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
                                  // Add initial user message and get AI response
                                  addMessage('user', prompt)
                                  handleSendMessage(prompt, true) // Skip adding user message again
                                  // Generate suggested documents for the form
                                  const suggested = generateSuggestedDocs(prompt)
                                  setSuggestedDocs(suggested)
                                  setMode('chat')
                                  setWorkbenchOpen(true)
                                  // Clear the prompt since it's now in chat
                                  setPrompt('')
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

              {/* Chat interface with artifact integration */}
              <Box className="flex flex-col bg-gray-50 h-screen">
                <Box className="h-full flex justify-center">
                  <Box className="w-full max-w-4xl flex flex-col h-full">
                    {/* Chat header with Create Form button */}
                    <Box className="p-4 bg-white border-b border-gray-200">
                      <Flex align="center" justify="between">
                        <Text size="lg" className="font-semibold text-gray-900">Chat</Text>
                        <Button
                          variant="bordered"
                          size="sm"
                          className="border-purple-200 text-purple-700 hover:bg-purple-50"
                          onPress={handleCreateForm}
                        >
                          Create Form
                        </Button>
                      </Flex>
                    </Box>

                    <div className="flex-1 flex flex-col h-full">
                      {/* Artifact chip when pinned */}
                      {artifactState === 'pinned' && (
                        <FormArtifactChip
                          selectedDocCount={selectedDocCount}
                          onOpen={openArtifact}
                          onClose={closeArtifact}
                        />
                      )}

                      {/* Artifact panel when open - takes most of the space */}
                      {artifactState === 'open' && (
                        <Box className="flex-1 px-4 pt-4 min-h-0">
                          <FormArtifactPanel
                            onMinimize={minimizeArtifact}
                            onSelectedDocsChange={(count) => {
                              // Update preview message content if needed
                              if (findMessageById(MESSAGE_IDS.FORM_ARTIFACT_PREVIEW)) {
                                updateMessageById(
                                  MESSAGE_IDS.FORM_ARTIFACT_PREVIEW,
                                  count > 0 ? `Creating ${count} documents` : 'Form artifact preview'
                                )
                              }
                            }}
                          >
                            <DocumentForm
                              prompt={prompt}
                              setPrompt={setPrompt}
                              selectedExistingInputs={selectedExistingInputs}
                              setSelectedExistingInputs={setSelectedExistingInputs}
                              selectedDocs={selectedDocs}
                              setSelectedDocs={setSelectedDocs}
                              suggestedDocs={suggestedDocs}
                              createDocs={createDocs}
                              setCreateDocs={setCreateDocs}
                              selectedClauses={selectedClauses}
                              setSelectedClauses={setSelectedClauses}
                              clauseDetailsText={clauseDetailsText}
                              setClauseDetailsText={setClauseDetailsText}
                              lengthValue={lengthValue}
                              setLengthValue={setLengthValue}
                              favourabilityValue={favourabilityValue}
                              setFavourabilityValue={setFavourabilityValue}
                              toneValue={toneValue}
                              setToneValue={setToneValue}
                              documentType={documentType}
                              setDocumentType={setDocumentType}
                              governingLaw={governingLaw}
                              setGoverningLaw={setGoverningLaw}
                              customClauses={customClauses}
                              setCustomClauses={setCustomClauses}
                              addCustomClause={addCustomClause}
                              updateCustomClauseName={updateCustomClauseName}
                              updateCustomClauseDetails={updateCustomClauseDetails}
                              removeCustomClause={removeCustomClause}
                              generateKeyClauses={generateKeyClauses}
                              generateDetailQuestions={generateDetailQuestions}
                            />
                          </FormArtifactPanel>
                        </Box>
                      )}

                      {/* Chat messages - smaller when artifact is open */}
                      <Box className={`overflow-y-auto p-4 ${artifactState === 'open' ? 'flex-none h-32' : 'flex-1'}`}>
                        <VStack spacing={6} align="start" className="w-full">
                          {messages.map((message) => (
                            <Box key={message.id} className="w-full">
                              {message.id === MESSAGE_IDS.FORM_ARTIFACT_PREVIEW ? (
                                <FormArtifactPreview
                                  onClick={openArtifact}
                                  selectedDocCount={selectedDocCount}
                                />
                              ) : (
                                <Box className={`w-full flex gap-3 ${message.role === 'user' ? 'flex-row-reverse justify-start' : 'justify-start'}`}>
                                  {/* Avatar/Icon area */}
                                  <Box className="flex-shrink-0">
                                    {message.role === 'user' ? (
                                      <Box className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                        <Text size="sm" className="text-white font-medium">R</Text>
                                      </Box>
                                    ) : (
                                      <Box className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Wand2 className="w-4 h-4 text-purple-600" />
                                      </Box>
                                    )}
                                  </Box>

                                  {/* Message content */}
                                  <Box className="flex-shrink-0 max-w-md">
                                    <Box
                                      className={`p-4 rounded-2xl inline-block ${
                                        message.role === 'user'
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'bg-[#F9F5FE] text-gray-900'
                                      }`}
                                    >
                                      <Text size="sm" className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                                        {message.content}
                                      </Text>
                                    </Box>
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          ))}
                        </VStack>
                      </Box>

                      {/* Chat input - always visible at bottom */}
                      <Box className="p-4 bg-gray-50">
                        <Flex align="end" gap={3}>
                          {/* User avatar */}
                          <Box className="flex-shrink-0 mb-2">
                            <Box className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                              <Text size="sm" className="text-white font-medium">R</Text>
                            </Box>
                          </Box>

                          {/* Input area */}
                          <Box className="flex-1">
                            <Replybox
                              handleSubmit={handleSendMessage}
                              placeholder="Message Genie"
                              className="min-h-[44px]"
                              classNames={{
                                inputWrapper: 'border border-gray-300 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow',
                                input: 'px-4 py-3',
                              }}
                            />
                          </Box>
                        </Flex>
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
                        <button 
                          className={`pb-3 text-sm font-medium transition-colors ${
                            activeTab === 'documents' 
                              ? 'text-gray-900 border-b-2 border-gray-900 relative' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('documents')}
                        >
                          Documents
                        </button>
                        <button 
                          className={`pb-3 text-sm font-medium transition-colors ${
                            activeTab === 'context' 
                              ? 'text-gray-900 border-b-2 border-gray-900 relative' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('context')}
                        >
                          Context
                        </button>
                        <button 
                          className={`pb-3 text-sm font-medium transition-colors ${
                            activeTab === 'rules' 
                              ? 'text-gray-900 border-b-2 border-gray-900 relative' 
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('rules')}
                        >
                          Rules
                        </button>
                      </Flex>
                    </Box>

                    {/* Content */}
                    <Box className="flex-1 p-6 overflow-y-auto h-0">
                      {activeTab === 'documents' && (
                        <VStack spacing={6} align="start" className="w-full">
                          {/* Accordion-style document list where multiple can be expanded */}
                          {createDocs.map((doc, i) => {
                            const isExpanded = expandedDocs[doc]
                            const toggleExpanded = () => {
                              setExpandedDocs(prev => ({
                                ...prev,
                                [doc]: !prev[doc]
                              }))
                            }

                            return (
                              <Box key={`doc-${i}`} className="w-full">
                                <Text size="lg" className="mb-4 text-gray-900 font-semibold">Creating document {i + 1}:</Text>
                                <Box className="border rounded-lg bg-white shadow-sm">
                                  <Flex align="center" justify="between" className="p-3 cursor-pointer" onClick={toggleExpanded}>
                                    <Flex align="center" gap={3}>
                                      <FileText className="w-4 h-4 text-blue-500" />
                                      <Text size="sm" className="text-gray-900">{doc}.docx</Text>
                                    </Flex>
                                    <Flex align="center" gap={3}>
                                      <Text size="xs" className="text-purple-600 bg-purple-100 px-2 py-1 rounded-md animate-pulse">
                                        Genie editing...
                                      </Text>
                                      {/* Expand/Contract Icon */}
                                      <Box className="flex flex-col items-center justify-center w-4 h-4">
                                        {isExpanded ? (
                                          // Contract icon (arrows pointing toward each other)
                                          <>
                                            <svg className="w-3 h-1.5" viewBox="0 0 12 6" fill="none">
                                              <path d="M2 1L6 5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg className="w-3 h-1.5 rotate-180" viewBox="0 0 12 6" fill="none">
                                              <path d="M2 1L6 5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                          </>
                                        ) : (
                                          // Expand icon (arrows pointing away from each other)
                                          <>
                                            <svg className="w-3 h-1.5 rotate-180" viewBox="0 0 12 6" fill="none">
                                              <path d="M2 1L6 5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg className="w-3 h-1.5" viewBox="0 0 12 6" fill="none">
                                              <path d="M2 1L6 5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                          </>
                                        )}
                                      </Box>
                                    </Flex>
                                  </Flex>
                                  
                                  {/* Expanded Content */}
                                  {isExpanded && (
                                    <Box className="border-t p-4">
                                      <Box 
                                        className="bg-gray-50 p-4 rounded text-sm font-mono leading-relaxed overflow-y-auto"
                                        style={{ height: '700px' }}
                                      >
                                        <pre className="whitespace-pre-wrap text-gray-800">
                                          {generateDummyContent(doc)}
                                        </pre>
                                      </Box>
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            )
                          })}
                        </VStack>
                      )}

                      {activeTab === 'context' && (
                        <VStack spacing={4} align="start" className="h-full">
                          {/* Additional Context Section - moved from Documents tab */}
                          <Box className="w-full">
                            <Text size="lg" className="!text-size-4 leading-3 tracking-2 mb-4 text-gray-900 font-semibold">Additional context:</Text>
                            <div className="flex items-center gap-3 py-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4 text-blue-500" aria-hidden="true">
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                <path d="M10 9H8"></path>
                                <path d="M16 13H8"></path>
                                <path d="M16 17H8"></path>
                              </svg>
                              <p className="font-normal !text-size-2 leading-1 tracking-4 text-gray-900">Previous_document_1.docx</p>
                            </div>
                            <div className="flex items-center gap-3 py-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4 text-blue-500" aria-hidden="true">
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                <path d="M10 9H8"></path>
                                <path d="M16 13H8"></path>
                                <path d="M16 17H8"></path>
                              </svg>
                              <p className="font-normal !text-size-2 leading-1 tracking-4 text-gray-900">Previous_document_2.docx</p>
                            </div>
                            <div className="flex gap-3 mt-4">
                              <button type="button" tabIndex={0} data-react-aria-pressable="true" className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small rounded-full [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-white border [&amp;[data-pressed=true]]:shadow-bordered !text-size-3 leading-3 tracking-1 font-weight-500 px-3 h-10 gap-1 [&amp;_svg]:w-5 [&amp;_svg]:h-5 min-w-fit hover:opacity-100 focus:opacity-100 flex-1 border-purple-200 text-purple-700 hover:bg-purple-50">Search Vault</button>
                              <button type="button" tabIndex={0} data-react-aria-pressable="true" className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small rounded-full [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover bg-white border [&amp;[data-pressed=true]]:shadow-bordered !text-size-3 leading-3 tracking-1 font-weight-500 px-3 h-10 gap-1 [&amp;_svg]:w-5 [&amp;_svg]:h-5 min-w-fit hover:opacity-100 focus:opacity-100 flex-1 border-purple-200 text-purple-700 hover:bg-purple-50">Upload</button>
                            </div>
                          </Box>
                        </VStack>
                      )}

                      {activeTab === 'rules' && (
                        <VStack spacing={4} align="start" className="h-full">
                          {/* Rules content placeholder */}
                          <Box className="w-full">
                            <Text size="lg" className="mb-4 text-gray-900 font-semibold">Rules and Guidelines:</Text>
                            <Text size="sm" className="text-gray-600">
                              Configure your document rules and guidelines here.
                            </Text>
                          </Box>
                        </VStack>
                      )}
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
                        Saved in / Legal Documents project 🔒 Private and secure
                      </Text>
                      <Heading as="h1" size="xl" className="text-purple-600">
                        Legal Document (19 August 2025) v1
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
                          Document content for: Legal Document
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
