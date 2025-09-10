import { useEffect, useRef, useState } from 'react'
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
// Using custom slider with HTML range input
import {
  Wand2,
  Paperclip,
  Link2,
  Mic,
  ArrowUp,
  FileText,
  Plus,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MESSAGE_IDS, generateSequentialId } from '@/constants/messageIds'

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string; isClausesMessage?: boolean }

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState<'landing' | 'chat' | 'document'>('landing')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [suggestedDocs, setSuggestedDocs] = useState<string[]>([])
  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({})
  const [selectedExisting, setSelectedExisting] = useState<Record<string, boolean>>({})
  const [selectedExistingLabels, setSelectedExistingLabels] = useState<Record<string, string>>({})
  const [selectedExistingInputs, setSelectedExistingInputs] = useState<Record<string, string>>({})
  const [workbenchOpen, setWorkbenchOpen] = useState(false)
  const [createDocs, setCreateDocs] = useState<string[]>([])
  const [basedOnDocs, setBasedOnDocs] = useState<string[]>([])
  const [configureClicked, setConfigureClicked] = useState(false)
  const [showThinking, setShowThinking] = useState(false)
  const [currentThinkingStep, setCurrentThinkingStep] = useState<string | null>(null)
  const [showSliders, setShowSliders] = useState(false)
  const [lengthValue, setLengthValue] = useState(50)
  const [favourabilityValue, setFavourabilityValue] = useState(50)
  const [toneValue, setToneValue] = useState(50)
  const [documentTitle, setDocumentTitle] = useState('')
  const [creatingDocuments, setCreatingDocuments] = useState<string[]>([])
  const [questionStep, setQuestionStep] = useState<'initial' | 'outcomes' | 'details' | 'clauses' | 'complete'>('initial')
  const [selectedClauses, setSelectedClauses] = useState<Record<string, boolean>>({})
  const [selectedClauseDetails, setSelectedClauseDetails] = useState<Record<string, boolean>>({})
  const [clauseDetailsText, setClauseDetailsText] = useState<Record<string, string>>({})
  const chatScrollRef = useRef<HTMLElement | null>(null)
  const [messageCounter, setMessageCounter] = useState(0)

  // Helper functions for message management
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateMessageById = (messageId: string, newContent: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: newContent } : msg
    ))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const findMessageById = (messageId: string): ChatMessage | undefined => {
    return messages.find(msg => msg.id === messageId)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addMessage = (role: 'user' | 'assistant', content: string, customId?: string) => {
    const id = customId || generateSequentialId(
      role === 'user' ? MESSAGE_IDS.USER_MESSAGE_PREFIX : MESSAGE_IDS.ASSISTANT_MESSAGE_PREFIX,
      messageCounter
    )
    setMessages(prev => [...prev, { id, role, content }])
    if (!customId) {
      setMessageCounter(prev => prev + 1)
    }
  }

  // Thinking Steps Animation Component
  const ThinkingStepsAnimation = ({ text }: { text: string }) => (
    <Text 
      size="md" 
      className="animate-color-shift"
    >
      {text}
    </Text>
  )

  // Function to generate contextual examples based on document type
  const generateContextualExamples = (docType: string): string[] => {
    let examples: string[] = []
    
    if (docType.toLowerCase().includes('employment') || docType.toLowerCase().includes('offer')) {
      examples = [
        "What are the specific role responsibilities and reporting structure?",
        "What's the compensation package (salary, benefits, equity, bonuses)?",
        "What are the working arrangements (remote, hybrid, location requirements)?"
      ]
    } else if (docType.toLowerCase().includes('purchase') || docType.toLowerCase().includes('sale')) {
      examples = [
        "What exactly are you buying/selling and what's included?",
        "What's the total purchase price and payment schedule?",
        "What are the key conditions or contingencies for completion?"
      ]
    } else if (docType.toLowerCase().includes('service') || docType.toLowerCase().includes('consulting')) {
      examples = [
        "What specific services are being provided and what's the scope?",
        "How will payments work — upfront, in stages, or based on milestones?",
        "What are the key deliverables and deadlines?"
      ]
    } else if (docType.toLowerCase().includes('nda') || docType.toLowerCase().includes('non-disclosure')) {
      examples = [
        "What type of confidential information will be shared?",
        "Who are the parties and what are their roles in this relationship?",
        "How long should the confidentiality period last?"
      ]
    } else if (docType.toLowerCase().includes('license') || docType.toLowerCase().includes('ip')) {
      examples = [
        "What intellectual property is being licensed and what are the usage rights?",
        "What's the licensing fee structure (upfront, royalties, subscription)?",
        "What restrictions or limitations should apply to the license?"
      ]
    } else {
      // Generic examples for other document types
      examples = [
        "Who are the parties and what are their roles (supplier, client, partners)?",
        "What's the scope of this deal — is it a service, a product, or both?",
        "What's the payment model (fixed fee, milestones, hourly, performance-based)?"
      ]
    }
    
    // Always add the risks question as the fourth item
    examples.push("Which risks are most important to protect against?")
    
    return examples
  }

  // Function to generate key clauses based on document type
  const generateKeyClauses = (docType: string): string[] => {
    if (docType.toLowerCase().includes('employment') || docType.toLowerCase().includes('offer')) {
      return [
        "Termination and notice periods",
        "Intellectual property assignment", 
        "Non-compete and non-solicitation",
        "Confidentiality and data protection",
        "Performance review and disciplinary procedures",
        "Benefits and compensation adjustments"
      ]
    } else if (docType.toLowerCase().includes('purchase') || docType.toLowerCase().includes('sale')) {
      return [
        "Title transfer and ownership",
        "Warranties and representations",
        "Inspection and acceptance criteria", 
        "Risk of loss and insurance",
        "Default and remedies",
        "Dispute resolution and governing law"
      ]
    } else if (docType.toLowerCase().includes('service') || docType.toLowerCase().includes('consulting')) {
      return [
        "Scope of work and deliverables",
        "Payment terms and late fees",
        "Intellectual property ownership",
        "Limitation of liability",
        "Termination for convenience", 
        "Indemnification and insurance"
      ]
    } else if (docType.toLowerCase().includes('nda') || docType.toLowerCase().includes('non-disclosure')) {
      return [
        "Definition of confidential information",
        "Permitted uses and exceptions",
        "Return or destruction of information",
        "Duration of confidentiality obligations",
        "Remedies for breach",
        "Survival after termination"
      ]
    } else if (docType.toLowerCase().includes('license') || docType.toLowerCase().includes('ip')) {
      return [
        "Scope of license and permitted uses",
        "Royalty and payment terms",
        "Quality control and standards",
        "Termination and reversion rights",
        "Warranty and support obligations",
        "Compliance and audit rights"
      ]
    } else {
      // Generic clauses for other document types
      return [
        "Payment terms and conditions",
        "Limitation of liability",
        "Termination and breach",
        "Governing law and jurisdiction",
        "Force majeure and delays",
        "Confidentiality and non-disclosure"
      ]
    }
  }

  // Sequential thinking steps function
  const runThinkingSequence = () => {
    const steps = [
      "Checking market standards..",
      "Scanning template library..",
      "Checking relevant laws, precedents, regulations.."
    ]
    
    let stepIndex = 0
    
    const showNextStep = () => {
      if (stepIndex < steps.length) {
        setCurrentThinkingStep(steps[stepIndex])
        stepIndex++
        setTimeout(() => {
          if (stepIndex < steps.length) {
            showNextStep()
          } else {
            // All thinking steps done, show key clauses section
            setCurrentThinkingStep(null)
            setShowThinking(false)
            
            const firstDoc = createDocs[0] || 'document'
            const keyClauses = generateKeyClauses(firstDoc)
            
            // Pre-tick all clauses
            const preTickedClauses: Record<string, boolean> = {}
            keyClauses.forEach((clause) => {
              preTickedClauses[clause] = true
            })
            setSelectedClauses(preTickedClauses)
            
            const clausesMessage = `**Key clauses:**
As well as standard clauses, I recommend you include the below key clauses. Untick any of them and click to add more detail.

${keyClauses.map((clause, i) => `${i + 1}. ${clause}`).join('\n')}`

            setMessages((prev) => [
              ...prev,
              {
                id: MESSAGE_IDS.ASSISTANT_KEY_CLAUSES,
                role: 'assistant',
                content: clausesMessage,
                isClausesMessage: true, // Flag to prevent document extraction
              },
            ])
            setQuestionStep('clauses')
            
            // Force scroll after a brief delay to ensure DOM is updated
            setTimeout(() => {
              const el = chatScrollRef.current
              if (el) {
                el.scrollTop = el.scrollHeight
              }
            }, 100)
          }
        }, 1500) // 1.5 seconds per step
      }
    }
    
    showNextStep()
  }

  const extractDocsFromText = (content: string): string[] => {
    const lines = content.split('\n')
    // First try numbered lists
    const numberedLines = lines.filter((l) => /^\s*\d+\.\s+/.test(l))
    if (numberedLines.length >= 2) {
      return numberedLines
        .map((l) => l.replace(/^\s*\d+\.\s+/, '').trim())
        .filter(Boolean)
        .slice(0, 5) // limit to 1–5 doc types
    }
    // Then try bullet points
    const bulletLines = lines.filter((l) => /^\s*[-•]\s+/.test(l))
    if (bulletLines.length >= 2) {
      return bulletLines
        .map((l) => l.replace(/^\s*[-•]\s+/, '').trim())
        .filter(Boolean)
        .slice(0, 5) // limit to 1–5 doc types
    }
    const inlineParts = content.split(' - ').map((p) => p.trim())
    if (inlineParts.length >= 3) {
      const [, ...maybeItems] = inlineParts
      return maybeItems.map((s) => s.replace(/(Do you.*)$/i, '').trim()).filter(Boolean)
    }
    return []
  }

  const renderAssistantContent = (content: string, messageId: string, options?: { showExisting?: boolean; showCheckboxes?: boolean }) => {
    // Check if this is a key clauses message first (before numbered list detection)
    if (messageId === MESSAGE_IDS.ASSISTANT_KEY_CLAUSES) {
      const lines = content.split('\n')
      const title = lines[0] // "**Key clauses:**"
      const description = lines[1] // "As well as standard clauses..."
      const clauseLines = lines.slice(3).filter(line => line.trim() && /^\d+\./.test(line.trim()))
      
      console.log('Rendering clauses - messageId:', messageId, 'clauseLines:', clauseLines, 'selectedClauses:', selectedClauses)

      return (
        <div className="space-y-4">
          <div>
            <Text size="md" className="font-bold text-foreground-900">
              {title.replace(/\*\*/g, '')}
            </Text>
            <button 
              onClick={(e) => e.preventDefault()}
              className="text-purple-600 underline text-sm hover:text-purple-800 transition-colors mt-1 block"
            >
              Customise standard clauses
            </button>
          </div>
          
          <Text size="md">{description}</Text>
          
          <div className="space-y-3">
            {clauseLines.map((line, i) => {
              const clauseText = line.replace(/^\d+\.\s*/, '').trim()
              const isChecked = !!selectedClauses[clauseText]
              const showDetails = !!selectedClauseDetails[clauseText]
              
              // Define chips for specific clause positions
              const getChipText = (index: number) => {
                if (index === 0) return "85% of templates use this"
                if (index === 2) return "Rare but advised"
                if (index === 3) return "Market standard"
                return null
              }
              
              const chipText = getChipText(i)
              
              return (
                <div key={i} className="w-full">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      aria-label={`Select ${clauseText}`}
                      className="mt-1 h-4 w-4 rounded border-zinc-300"
                      checked={isChecked}
                      onChange={() => setSelectedClauses((p) => ({ ...p, [clauseText]: !p[clauseText] }))}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedClauseDetails((p) => ({ ...p, [clauseText]: !p[clauseText] }))
                          }}
                          className="text-purple-600 underline hover:text-purple-800 transition-colors text-left"
                        >
                          <Text size="md">{clauseText}</Text>
                        </button>
                        {chipText && (
                          <span className="px-3 py-1 bg-white text-blue-600 text-sm rounded-full border border-gray-200 whitespace-nowrap">
                            {chipText}
                          </span>
                        )}
                      </div>
                      
                      {showDetails && (
                        <div className="mt-3 w-full">
                          <Text size="sm" className="text-zinc-700 mb-2 font-medium">
                            Add more details for this clause:
                          </Text>
                          <Textarea
                            value={clauseDetailsText[clauseText] || ''}
                            onChange={(e) => {
                              setClauseDetailsText((prev) => ({
                                ...prev,
                                [clauseText]: e.target.value
                              }))
                            }}
                            placeholder={
                              clauseText.toLowerCase().includes('termination') ? "eg. Include specific termination conditions or notice requirements" :
                              clauseText.toLowerCase().includes('payment') ? "eg. Specify payment terms, late fees, or milestone conditions" :
                              clauseText.toLowerCase().includes('intellectual property') || clauseText.toLowerCase().includes('ip') ? "eg. Define what IP is included and ownership terms" :
                              clauseText.toLowerCase().includes('confidentiality') || clauseText.toLowerCase().includes('non-disclosure') ? "eg. Specify what information is confidential and exceptions" :
                              clauseText.toLowerCase().includes('liability') ? "eg. Set liability caps or exclusions for specific damages" :
                              "eg. Add specific requirements, conditions, or clarifications for this clause"
                            }
                            className="w-full text-sm"
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    // 1) Detect multi-line numbered lists (lines beginning with '1. ', '2. ', etc.)
    const lines = content.split('\n')
    const numberedLines = lines.filter((l) => /^\s*\d+\.\s+/.test(l))
    if (numberedLines.length >= 2) {
      // Keep any intro text above the first numbered item
      const firstNumberedIndex = lines.findIndex((l) => /^\s*\d+\.\s+/.test(l))
      const intro = lines.slice(0, firstNumberedIndex).join(' ').trim()
      const question = lines
        .slice(firstNumberedIndex + numberedLines.length)
        .join(' ')
        .trim()
      const items = numberedLines.map((l) => l.replace(/^\s*\d+\.\s+/, '').trim()).filter(Boolean)
      
      // Check if content contains the special link text
      const hasAnswerSeparately = content.includes('Answer separately for each doc')
      const questionWithoutLink = hasAnswerSeparately ? question.replace('Answer separately for each doc', '').trim() : question
      
      return (
        <>
          {intro && <Text size="md" className="mb-2">{intro}</Text>}
          <ol className="list-decimal pl-6 space-y-1">
            {items.map((it, i) => (
              <li key={i} className="text-foreground-900 text-size-3 leading-2 tracking-3">
                <div className={`${options?.showCheckboxes !== false ? 'flex items-start gap-2' : ''}`}>
                  {options?.showCheckboxes !== false && (
                    <input
                      type="checkbox"
                      aria-label={`Select ${it}`}
                      className="mt-1 h-4 w-4 rounded border-zinc-300"
                      checked={!!selectedDocs[it]}
                      onChange={() => setSelectedDocs((p) => ({ ...p, [it]: !p[it] }))}
                    />
                  )}
                  <span className={options?.showCheckboxes !== false ? "flex-1" : ""}>{it}</span>
                </div>
                {options?.showExisting && i === 0 && !!selectedDocs[it] ? (
                  <div className="w-full mt-3 pl-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm w-full max-w-2xl">
                      <Text size="sm" className="text-zinc-500 mb-3">Click to reuse & modify existing documents:</Text>
                      <div className="flex flex-col gap-4">
                        {(() => {
                          const makeTemplate = (id: string, label: string) => {
                            const isSelected = !!selectedExisting[id]
                            return (
                              <div key={id} className="w-full">
                                <button
                                  onClick={() => {
                                    setSelectedExisting((p) => ({ ...p, [id]: !p[id] }))
                                    setSelectedExistingLabels((m) => ({ ...m, [id]: label }))
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-purple-500 bg-white text-purple-900 hover:bg-purple-50 transition-colors w-fit"
                                >
                                  <FileText className={`w-4 h-4 ${isSelected ? 'text-green-600' : 'text-purple-600'}`} />
                                  <span className="text-sm font-medium">{label}</span>
                                </button>
                                
                                {isSelected && (
                                  <div className="mt-3 w-full">
                                    <Text size="sm" className="text-zinc-700 mb-2 font-medium">
                                      How should I use this document?
                                    </Text>
                                    <Textarea
                                      value={selectedExistingInputs[id] || ''}
                                      onChange={(e) => {
                                        setSelectedExistingInputs((prev) => ({
                                          ...prev,
                                          [id]: e.target.value
                                        }))
                                      }}
                                      placeholder="eg. Stay as close to it as possible, reuse clause 7"
                                      className="w-full text-sm"
                                      rows={3}
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          }
                          return (
                            <>
                              {makeTemplate('existing-1', 'Document title 1')}
                              {makeTemplate('existing-2', 'Document title 2')}
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          {questionWithoutLink && (() => {
            // Parse inline bullets embedded in trailing text like: "... like: - Item A - Item B When that happens, ..."
            const inlineParts = questionWithoutLink.split(' - ').map((p) => p.trim())
            if (inlineParts.length >= 3) {
              const [intro, ...rest] = inlineParts
              let items = rest
              let trailing = ''
              const last = rest[rest.length - 1]
              const whenMatch = last.match(/(When that happens.*)$/i)
              if (whenMatch) {
                trailing = whenMatch[1]
                items = rest.slice(0, -1).concat([last.replace(whenMatch[1], '').trim()])
              }
              items = items.filter(Boolean).slice(0, 2)
              return (
                <>
                  <Text size="md" className="mt-4">{intro}</Text>
                  <ul className="list-disc pl-6 space-y-1">
                    {items.map((it, i) => (
                      <li key={i} className="text-foreground-900 text-size-3 leading-2 tracking-3">{it}</li>
                    ))}
                  </ul>
                  {trailing && <Text size="md" className="mt-2">{trailing}</Text>}
                </>
              )
            }
            return <Text size="md" className="mt-2 whitespace-pre-line">{questionWithoutLink}</Text>
          })()}
          {hasAnswerSeparately && (
            <Text size="sm" className="text-purple-600 underline cursor-pointer mt-2 block">
              Answer separately for each doc
            </Text>
          )}
        </>
      )
    }

    // 2) Detect multi-line dash bullets (lines beginning with '- ')
    const bulletLines = lines.filter((l) => /^\s*[-•]\s+/.test(l))
    if (bulletLines.length >= 2) {
      // Keep any intro text above the first bullet
      const firstBulletIndex = lines.findIndex((l) => /^\s*[-•]\s+/.test(l))
      const intro = lines.slice(0, firstBulletIndex).join(' ').trim()
      const question = lines
        .slice(firstBulletIndex + bulletLines.length)
        .join(' ')
        .trim()
      let items = bulletLines.map((l) => l.replace(/^\s*[-•]\s+/, '').trim()).filter(Boolean)

      // If this appears to be the "other party" section, cap bullets to 2
      if (/you'll likely have to review documents from the other party like/i.test(intro)) {
        items = items.slice(0, 2)
      }
      
      // Check if content contains the special link text
      const hasAnswerSeparately = content.includes('Answer separately for each doc')
      const questionWithoutLink = hasAnswerSeparately ? question.replace('Answer separately for each doc', '').trim() : question
      
      return (
        <>
          {intro && <Text size="md" className="mb-2">{intro}</Text>}
          <ol className="list-decimal pl-6 space-y-1">
            {items.map((it, i) => (
              <li key={i} className="text-foreground-900 text-size-3 leading-2 tracking-3">
                <div className={`${options?.showCheckboxes !== false ? 'flex items-start gap-2' : ''}`}>
                  {options?.showCheckboxes !== false && (
                    <input
                      type="checkbox"
                      aria-label={`Select ${it}`}
                      className="mt-1 h-4 w-4 rounded border-zinc-300"
                      checked={!!selectedDocs[it]}
                      onChange={() => setSelectedDocs((p) => ({ ...p, [it]: !p[it] }))}
                    />
                  )}
                  <span className={options?.showCheckboxes !== false ? "flex-1" : ""}>{it}</span>
                </div>
                {options?.showExisting && i === 0 && !!selectedDocs[it] ? (
                  <div className="w-full mt-3 pl-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm w-full max-w-2xl">
                      <Text size="sm" className="text-zinc-500 mb-3">Click to reuse & modify existing documents:</Text>
                      <div className="flex flex-col gap-4">
                        {(() => {
                          const makeTemplate = (id: string, label: string) => {
                            const isSelected = !!selectedExisting[id]
                            return (
                              <div key={id} className="w-full">
                                <button
                                  onClick={() => {
                                    setSelectedExisting((p) => ({ ...p, [id]: !p[id] }))
                                    setSelectedExistingLabels((m) => ({ ...m, [id]: label }))
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-purple-500 bg-white text-purple-900 hover:bg-purple-50 transition-colors w-fit"
                                >
                                  <FileText className={`w-4 h-4 ${isSelected ? 'text-green-600' : 'text-purple-600'}`} />
                                  <span className="text-sm font-medium">{label}</span>
                                </button>
                                
                                {isSelected && (
                                  <div className="mt-3 w-full">
                                    <Text size="sm" className="text-zinc-700 mb-2 font-medium">
                                      How should I use this document?
                                    </Text>
                                    <Textarea
                                      value={selectedExistingInputs[id] || ''}
                                      onChange={(e) => {
                                        setSelectedExistingInputs((prev) => ({
                                          ...prev,
                                          [id]: e.target.value
                                        }))
                                      }}
                                      placeholder="eg. Stay as close to it as possible, reuse clause 7"
                                      className="w-full text-sm"
                                      rows={3}
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          }
                          return (
                            <>
                              {makeTemplate('existing-1', 'Document title 1')}
                              {makeTemplate('existing-2', 'Document title 2')}
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          {questionWithoutLink && <Text size="md" className="mt-2 whitespace-pre-line">{questionWithoutLink}</Text>}
          {hasAnswerSeparately && (
            <Text size="sm" className="text-purple-600 underline cursor-pointer mt-2 block">
              Answer separately for each doc
            </Text>
          )}
        </>
      )
    }

    // 2) Detect inline " - Item1 - Item2 - Item3" bullets in a single line
    const inlineParts = content.split(' - ').map((p) => p.trim())
    if (inlineParts.length >= 3) {
      const [intro, ...maybeItems] = inlineParts
      let items = maybeItems
      let trailing = ''
      // If the last part looks like a question, split it away from bullets
      const last = maybeItems[maybeItems.length - 1]
      const qMatch = last.match(/(Do you.*)$/i)
      if (qMatch) {
        trailing = qMatch[1]
        items = maybeItems.slice(0, -1).concat([last.replace(qMatch[1], '').trim()])
      }
      items = items.filter(Boolean)
      
      // Check if content contains the special link text
      const hasAnswerSeparately = content.includes('Answer separately for each doc')
      const trailingWithoutLink = hasAnswerSeparately && trailing ? trailing.replace('Answer separately for each doc', '').trim() : trailing
      
      return (
        <>
          <Text size="md" className="mb-2">{intro}</Text>
          <ol className="list-decimal pl-6 space-y-1">
            {items.map((it, i) => (
              <li key={i} className="text-foreground-900 text-size-3 leading-2 tracking-3">
                <div className={`${options?.showCheckboxes !== false ? 'flex items-start gap-2' : ''}`}>
                  {options?.showCheckboxes !== false && (
                    <input
                      type="checkbox"
                      aria-label={`Select ${it}`}
                      className="mt-1 h-4 w-4 rounded border-zinc-300"
                      checked={!!selectedDocs[it]}
                      onChange={() => setSelectedDocs((p) => ({ ...p, [it]: !p[it] }))}
                    />
                  )}
                  <span className={options?.showCheckboxes !== false ? "flex-1" : ""}>{it}</span>
                </div>
                {options?.showExisting && i === 0 && !!selectedDocs[it] ? (
                  <div className="w-full mt-3 pl-6">
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm w-full max-w-2xl">
                      <Text size="sm" className="text-zinc-500 mb-3">Click to reuse & modify existing documents:</Text>
                      <div className="flex flex-col gap-4">
                        {(() => {
                          const makeTemplate = (id: string, label: string) => {
                            const isSelected = !!selectedExisting[id]
                            return (
                              <div key={id} className="w-full">
                                <button
                                  onClick={() => {
                                    setSelectedExisting((p) => ({ ...p, [id]: !p[id] }))
                                    setSelectedExistingLabels((m) => ({ ...m, [id]: label }))
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-purple-500 bg-white text-purple-900 hover:bg-purple-50 transition-colors w-fit"
                                >
                                  <FileText className={`w-4 h-4 ${isSelected ? 'text-green-600' : 'text-purple-600'}`} />
                                  <span className="text-sm font-medium">{label}</span>
                                </button>
                                
                                {isSelected && (
                                  <div className="mt-3 w-full">
                                    <Text size="sm" className="text-zinc-700 mb-2 font-medium">
                                      How should I use this document?
                                    </Text>
                                    <Textarea
                                      value={selectedExistingInputs[id] || ''}
                                      onChange={(e) => {
                                        setSelectedExistingInputs((prev) => ({
                                          ...prev,
                                          [id]: e.target.value
                                        }))
                                      }}
                                      placeholder="eg. Stay as close to it as possible, reuse clause 7"
                                      className="w-full text-sm"
                                      rows={3}
                                    />
                                  </div>
                                )}
                              </div>
                            )
                          }
                          return (
                            <>
                              {makeTemplate('existing-1', 'Document title 1')}
                              {makeTemplate('existing-2', 'Document title 2')}
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          {trailingWithoutLink && (() => {
            const inlineParts = trailingWithoutLink.split(' - ').map((p) => p.trim())
            if (inlineParts.length >= 3) {
              const [intro, ...rest] = inlineParts
              let items = rest
              let trailing = ''
              const last = rest[rest.length - 1]
              const whenMatch = last.match(/(When that happens.*)$/i)
              if (whenMatch) {
                trailing = whenMatch[1]
                items = rest.slice(0, -1).concat([last.replace(whenMatch[1], '').trim()])
              }
              items = items.filter(Boolean).slice(0, 2)
              return (
                <>
                  <Text size="md" className="mt-4">{intro}</Text>
                  <ul className="list-disc pl-6 space-y-1">
                    {items.map((it, i) => (
                      <li key={i} className="text-foreground-900 text-size-3 leading-2 tracking-3">{it}</li>
                    ))}
                  </ul>
                  {trailing && <Text size="md" className="mt-2">{trailing}</Text>}
                </>
              )
            }
            return <Text size="md" className="mt-2 whitespace-pre-line">{trailingWithoutLink}</Text>
          })()}
          {hasAnswerSeparately && (
            <Text size="sm" className="text-purple-600 underline cursor-pointer mt-2 block">
              Answer separately for each doc
            </Text>
          )}
        </>
      )
    }

    // Fallback: preserve line breaks, but check for special link text
    if (content.includes('Answer separately for each doc')) {
      const parts = content.split('Answer separately for each doc')
      return (
        <div className="whitespace-pre-line">
          <Text size="md">{parts[0]}</Text>
          <Text size="sm" className="text-purple-600 underline cursor-pointer mt-2 block">
            Answer separately for each doc
          </Text>
          <Text size="md">{parts[1]}</Text>
        </div>
      )
    }
    // Check if this is a follow-up message with upload button and skip link
    if (messageId === MESSAGE_IDS.ASSISTANT_DOCUMENT_DETAILS) {
      const lines = content.split('\n')
      const title = lines[0] // "**Document details:**"
      const question = lines[2] // "What specific details..."
      // Extract examples more carefully to ensure we get all of them
      const exampleLines = lines.slice(5, -3) // Skip title, empty line, question, "eg.", empty line at start, and button/skip lines at end
      const examples = exampleLines.filter(line => line.trim())
      
      return (
        <div className="space-y-4">
          <Text size="md" className="font-medium">{title.replace(/\*\*/g, '')}</Text>
          <Text size="md">{question}</Text>
          
          <div>
            <Text size="sm" className="text-zinc-600 mb-2">eg.</Text>
            <ol className="list-decimal pl-6 space-y-2">
              {examples.map((example, i) => (
                <li key={i} className="text-foreground-900 text-size-3 leading-2 tracking-3">
                  <Text size="md">{example}</Text>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button
              variant="gradient"
              size="md"
              className="rounded-full w-fit"
              startContent={<Plus className="w-4 h-4" />}
            >
              Upload documents
            </Button>
            
            <div className="flex gap-4">
              <Text 
                size="sm" 
                className="text-purple-600 underline cursor-pointer hover:text-purple-800 transition-colors w-fit"
              >
                Skip for now
              </Text>
              <Text 
                size="sm" 
                className="text-purple-600 underline cursor-pointer hover:text-purple-800 transition-colors w-fit"
              >
                More example questions
              </Text>
            </div>
          </div>
        </div>
      )
    }

    // Handle markdown bold formatting in content
    const renderContentWithMarkdown = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g)
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2)
          return <strong key={i}>{boldText}</strong>
        }
        return <span key={i}>{part}</span>
      })
    }

    return (
      <Text size="md" className="whitespace-pre-line">
        {renderContentWithMarkdown(content)}
      </Text>
    )
  }

  const startChat = (text: string) => {
    const content = text.trim()
    if (!content) return
    setMode('chat')
    setMessages([{ id: MESSAGE_IDS.USER_INITIAL, role: 'user', content }])
    setPrompt('')
  }

  const handleSubmit = () => startChat(prompt)

  // Demo assistant reply placeholder
  useEffect(() => {
    if (mode !== 'chat') return
    const hasAssistant = messages.some((m) => m.role === 'assistant')
    if (messages.length === 1 && !hasAssistant) {
      // Show thinking steps during API call with a guaranteed minimum display time.
      // We intentionally DO NOT cancel the switch timer so both steps are visible.
      const MIN_THINK_MS = 800
      const FIRST_STEP_MS = 600
      const thinkStartMs = Date.now()
      setShowThinking(true)
      setCurrentThinkingStep("Recommending documents...")
      
      // Switch to second thinking step at the halfway point
      setTimeout(() => {
        setCurrentThinkingStep("Analysing your document library...")
      }, FIRST_STEP_MS)
      
      ;(async () => {
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: messages[0].content }] }),
          })
          const data = await res.json()
          const docs = extractDocsFromText(data.content || '')
          console.log('Extracted docs from AI response:', docs, 'from content:', data.content)
          setSuggestedDocs(docs)
          
          // Ensure the thinking shows for at least MIN_THINK_MS
          const elapsedMs = Date.now() - thinkStartMs
          const remainingMs = Math.max(0, MIN_THINK_MS - elapsedMs)
          setTimeout(() => {
            setShowThinking(false)
            setCurrentThinkingStep(null)
            setMessages((m) => [
              ...m,
              { id: MESSAGE_IDS.ASSISTANT_INITIAL, role: 'assistant', content: data.content || '...' },
            ])
          }, remainingMs)
        } catch {
          setShowThinking(false)
          setCurrentThinkingStep(null)
          setMessages((m) => [
            ...m,
            { id: MESSAGE_IDS.ASSISTANT_ERROR, role: 'assistant', content: 'There was an error. Please try again.' },
          ])
        }
      })()
    }
  }, [mode, messages])

  // Auto-scroll to the latest message in chat mode
  useEffect(() => {
    if (mode !== 'chat') return
    const el = chatScrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, mode, showThinking, currentThinkingStep, showSliders])

  // Update workbench panel in real-time when selections change
  useEffect(() => {
    const chosen = Object.keys(selectedDocs).filter((k) => selectedDocs[k])
    const hasSelections = chosen.length > 0 || Object.values(selectedExisting).some(v => v)
    
    console.log('Workbench update - chosen:', chosen, 'suggestedDocs:', suggestedDocs, 'hasSelections:', hasSelections)
    
    if (hasSelections) {
      setWorkbenchOpen(true)
      setCreateDocs(chosen.length ? chosen : suggestedDocs)
      
      const selectedLabels = Object.entries(selectedExisting)
        .filter(([, v]) => v)
        .map(([id]) => selectedExistingLabels[id])
        .filter(Boolean)
      
      // Always include "Company context" and "Playbook" chips
      const defaultChips = ['Company context', 'Playbook']
      const allBasedOnDocs = [...defaultChips, ...selectedLabels as string[]]
      setBasedOnDocs(allBasedOnDocs)
    } else {
      setWorkbenchOpen(false)
    }
  }, [selectedDocs, selectedExisting, selectedExistingLabels, suggestedDocs])

  return (
    <Box className="min-h-screen bg-white">
      <Box className="h-screen">
        <AnimatePresence initial={false} mode="wait">
          {mode === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-gradient-to-b from-white to-zinc-50 min-h-screen"
            >
              <Container maxWidth="lg" className="py-12">
                <VStack spacing={12} align="center">
                <VStack spacing={4} align="start" className="w-full max-w-3xl">
                  <Wand2 className="w-6 h-6 text-purple-600" />
                  <Heading as="h1" size="xl" className="text-foreground-900 text-left">
                    Good morning! What do you want to do today?
                  </Heading>
                </VStack>

                <Box className="relative w-full max-w-3xl">
                  <Box className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-purple-200/40 to-purple-300/30 blur-2xl pointer-events-none" />
                  <motion.div layoutId="promptCard">
                    <Box className="relative rounded-[24px] bg-white/80 backdrop-blur border border-purple-100 shadow-lg">
                      <Box className="p-6">
                        <Textarea
                          minRows={5}
                          value={prompt}
                          onValueChange={(val) => setPrompt(val)}
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleSubmit()
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

                        <Flex justify="between" align="center" className="mt-3">
                          <Flex align="center" gap={3}>
                            <Button variant="light" size="sm">
                              <Paperclip className="w-5 h-5" />
                            </Button>
                            <Button variant="light" size="sm">
                              <Link2 className="w-5 h-5" />
                            </Button>
                          </Flex>

                          <Flex align="center" gap={2}>
                            <Button variant="light" size="sm">
                              <Mic className="w-5 h-5" />
                            </Button>
                            <Button onPress={handleSubmit} variant="gradient" size="md">
                              <ArrowUp className="w-5 h-5" />
                            </Button>
                          </Flex>
            </Flex>
                      </Box>
                    </Box>
                  </motion.div>
          </Box>

                <Box className="w-full max-w-4xl rounded-[24px] bg-white border border-purple-100 shadow-md mt-4">
                  <Box className="p-6">
                    <Heading as="h2" size="lg" className="mb-4">
                      Recent projects
          </Heading>
                    <Box className="grid grid-cols-12 items-center text-left px-2 pb-2 text-zinc-500">
                      <Text as="p" size="sm" className="col-span-8">Document name</Text>
                      <Text as="p" size="sm" className="col-span-4">Last edited</Text>
                    </Box>

                    {/* Creating documents at the top */}
                    {creatingDocuments.map((docName, idx) => (
                      <Box
                        key={`creating-${idx}`}
                        className="grid grid-cols-12 items-center rounded-xl px-2 py-3 hover:bg-zinc-50"
                      >
                        <Flex align="center" gap={3} className="col-span-8">
                          <Box className="rounded-full bg-purple-100 p-1">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </Box>
                          <Text size="md" className="text-foreground-900 animate-color-shift">
                            {docName}
                          </Text>
                        </Flex>
                        <Text size="sm" className="col-span-4 text-zinc-600">
                          Creating...
                        </Text>
                      </Box>
                    ))}

                    {/* Regular recent projects */}
                    {[
                      { name: 'Software Licence Agreement', date: '21 Feb 2023' },
                      { name: 'Terms of service', date: '1 Feb 2023' },
                      { name: 'Software Licence Agreement', date: '21 Feb 2023' },
                      { name: 'Terms of service', date: '1 Feb 2023' },
                      { name: 'Software Licence Agreement', date: '21 Feb 2023' },
                    ].map((row, idx) => (
                      <Box
                        key={`existing-${idx}`}
                        className="grid grid-cols-12 items-center rounded-xl px-2 py-3 hover:bg-zinc-50"
                      >
                        <Flex align="center" gap={3} className="col-span-8">
                          <Box className="rounded-full bg-purple-100 p-1">
                            <FileText className="w-4 h-4 text-purple-600" />
                          </Box>
                          <Text size="md" className="text-foreground-900">
                            {row.name}
                          </Text>
                        </Flex>
                        <Text size="sm" className="col-span-4 text-zinc-600">
                          {row.date}
                        </Text>
                      </Box>
                    ))}
                </Box>
                </Box>
                </VStack>
              </Container>
            </motion.div>
          )}
          
          {mode === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex h-screen bg-white"
            >
              {/* Left Sidebar */}
              <Box className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <Box className="p-4 border-b border-gray-200">
                  <Text size="lg" className="font-semibold text-gray-900">GENIE AI</Text>
                  <Text size="sm" className="text-gray-500">New Project</Text>
                </Box>
                <Box className="flex-1 p-4">
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

              {/* Chat section */}
              <Box className="flex-1 flex flex-col bg-white" style={{ 
                marginRight: workbenchOpen ? '320px' : '0px' 
              }}>
                <motion.div layoutId="promptCard" className="flex-1 flex flex-col">
                    {/* Chat scroll area */}
                    <Box ref={chatScrollRef} className="flex-1 p-6 overflow-auto">
                      <VStack spacing={6} align="start" className="min-h-full justify-end">
                        {messages.map((m) => (
                          <Flex key={m.id} justify={m.role === 'user' ? 'end' : 'start'} className="w-full">
                            <Box
                              className={
                                m.role === 'user'
                                  ? 'bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 max-w-[70%]'
                                  : 'bg-gray-50 text-gray-900 rounded-2xl px-4 py-3 max-w-[70%]'
                              }
                            >
                                {m.role === 'assistant' ? (
                                  m.id === MESSAGE_IDS.ASSISTANT_DRAFT_SETTINGS ? (
                                    <VStack spacing={4} align="start">
                                      <Text size="md">{m.content}</Text>
                                      <VStack spacing={4} className="w-full">
                                        <Box className="w-full">
                                          <Text size="sm" className="font-medium mb-2">Length</Text>
                                          <Flex justify="between" className="mb-1">
                                            <Text size="sm" className="text-zinc-600">Simple</Text>
                                            <Text size="sm" className="text-zinc-600">Comprehensive</Text>
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
                                        <Box className="w-full">
                                          <Text size="sm" className="font-medium mb-2">Favourability</Text>
                                          <Flex justify="between" className="mb-1">
                                            <Text size="sm" className="text-zinc-600">Favours them</Text>
                                            <Text size="sm" className="text-zinc-600">Favours me</Text>
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
                                        <Box className="w-full">
                                          <Text size="sm" className="font-medium mb-2">Tone</Text>
                                          <Flex justify="between" className="mb-1">
                                            <Text size="sm" className="text-zinc-600">Plain English</Text>
                                            <Text size="sm" className="text-zinc-600">Formal</Text>
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
                                  ) : (
                                    renderAssistantContent(m.content, m.id, { 
                                      showExisting: m.id === MESSAGE_IDS.ASSISTANT_INITIAL,
                                      showCheckboxes: m.id === MESSAGE_IDS.ASSISTANT_INITIAL || m.id !== MESSAGE_IDS.ASSISTANT_DOCUMENT_PURPOSE
                                    })
                                  )
                                ) : (
                                  <Text size="md">{m.content}</Text>
                                )}
            </Box>
          </Flex>
                          ))}
                          
                          {/* Show thinking animation */}
                          {(showThinking || currentThinkingStep) && (
                            <Flex justify="start" className="w-full">
                              <ThinkingStepsAnimation text={currentThinkingStep || "Thinking about requirements..."} />
                            </Flex>
                          )}
                          
                          {/* Show Continue to final details button when clauses message is visible */}
                          {messages.some(m => m.id === MESSAGE_IDS.ASSISTANT_KEY_CLAUSES) && 
                           questionStep === 'clauses' && (
                            <Flex justify="end" className="w-full">
                              <Button
                                variant="gradient"
                                size="md"
                                className="rounded-2xl px-6"
                                onPress={() => {
                                  // Show sliders after clauses selection
                                  const slidersMessage = `Last thing before we get your 1st draft ready.`
                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      id: MESSAGE_IDS.ASSISTANT_DRAFT_SETTINGS,
                                      role: 'assistant',
                                      content: slidersMessage,
                                    },
                                  ])
                                  setQuestionStep('complete')
                                  setShowSliders(true)
                                }}
                              >
                                Continue to final details
                              </Button>
                            </Flex>
                          )}

                          {/* Show Configure button when workbench is open and not yet clicked */}
                          {workbenchOpen && !configureClicked && (
                            <Flex justify="end" className="w-full">
                              <Button
                                variant="gradient"
                                size="md"
                                className="rounded-2xl px-6"
                                onPress={() => {
                                  // Add user message first
                                  const userMessage = createDocs.length === 1 ? 'Configure my document' : 'Configure my documents'
                                  
                                  // Show thinking animation first
                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      id: MESSAGE_IDS.USER_CONFIGURE,
                                      role: 'user',
                                      content: userMessage,
                                    },
                                  ])
                                  
                                  setShowThinking(true)
                                  setConfigureClicked(true)
                                  setQuestionStep('outcomes')
                                  
                                  // Generate conditional question based on number of selected documents
                                  setTimeout(() => {
                                    let questionsMessage = ''
                                    
                                    if (createDocs.length === 1) {
                                      // Single document selected
                                      questionsMessage = "**Document purpose:**\n\nIn your own words, why are you creating this document now, and what must it achieve for this deal to be a success? \n\nList the 2–3 outcomes that matter most.\n\nWe'll get to the details next."
                                    } else {
                                      // Multiple documents selected - focus on first one
                                      const firstDoc = createDocs[0]
                                      questionsMessage = `Great. We'll configure your other documents later but first let's focus on ${firstDoc}.

**Document purpose:**

In your own words, why are you creating this document now, and what must it achieve for this deal to be a success? 

List the 2–3 outcomes that matter most.

We'll get to the details next.`
                                    }

                                    // Hide thinking animation and add questions
                                    setShowThinking(false)
                                    setMessages((prev) => [
                                      ...prev,
                                      {
                                        id: MESSAGE_IDS.ASSISTANT_DOCUMENT_PURPOSE,
                                        role: 'assistant',
                                        content: questionsMessage,
                                      },
                                    ])
                                  }, 2000) // Show thinking for 2 seconds
                                }}
                              >
                                {createDocs.length === 1 ? 'Configure my document' : 'Configure my documents'}
                              </Button>
                </Flex>
                                                    )}

                          {/* Show Run Final Check button when sliders are visible */}
                          {showSliders && !messages.some(m => m.id === MESSAGE_IDS.ASSISTANT_FINAL_CONFIRMATION) && (
                            <Flex justify="end" className="w-full">
                              <Button
                                variant="gradient"
                                size="md"
                                className="rounded-2xl px-6"
                                onPress={() => {
                                  // Start the final check thinking sequence
                                  setShowThinking(true)
                                  setShowSliders(false)
                                  
                                  // Thinking steps sequence
                                  const thinkingSteps = [
                                    "Checking document configuration..",
                                    "Reviewing against key laws and regulations..",
                                    "Making sure nothing is missing.."
                                  ]
                                  
                                  let stepIndex = 0
                                  
                                  const showNextThinkingStep = () => {
                                    if (stepIndex < thinkingSteps.length) {
                                      setCurrentThinkingStep(thinkingSteps[stepIndex])
                                      stepIndex++
                                      setTimeout(() => {
                                        if (stepIndex < thinkingSteps.length) {
                                          showNextThinkingStep()
                                        } else {
                                          // All thinking steps done, show final confirmation
                                          setCurrentThinkingStep(null)
                                          setShowThinking(false)
                                          
                                          const confirmationMessage = "Your document is really comprehensive and ready to create! I'll start the 1st draft now, but you can always edit later."
                                          
                                          setMessages((prev) => [
                                            ...prev,
                                            {
                                              id: MESSAGE_IDS.ASSISTANT_FINAL_CONFIRMATION,
                                              role: 'assistant',
                                              content: confirmationMessage,
                                            },
                                          ])
                                          
                                          // Auto-navigate to document page after a short delay
                                          setTimeout(() => {
                                            if (createDocs.length === 1) {
                                              // Single document - go to document draft screen
                                              const firstDoc = createDocs[0] || 'Document'
                                              setDocumentTitle(firstDoc)
                                              setMode('document')
                                            } else {
                                              // Multiple documents - return to landing page and show creating documents in table
                                              setCreatingDocuments(createDocs)
                                              setMode('landing')
                                              // Reset chat state
                                              setMessages([])
                                              setSelectedDocs({})
                                              setSelectedExisting({})
                                              setSelectedExistingLabels({})
                                              setWorkbenchOpen(false)
                                              setConfigureClicked(false)
                                              setShowThinking(false)
                                              setShowSliders(false)
                                              setPrompt('')
                                            }
                                          }, 6000) // 6 second delay to show the confirmation message
                                        }
                                      }, 1500) // 1.5 seconds per thinking step
                                    }
                                  }
                                  
                                  showNextThinkingStep()
                                }}
                              >
                                Run final check
                              </Button>
                            </Flex>
                          )}
                        </VStack>
              </Box>

                    {/* Composer */}
                    <Box className="border-t border-gray-200 bg-white p-4">
                      <Flex justify="between" align="center" className="gap-3">
                        <Flex align="center" gap={3}>
                          <Button variant="light" size="sm">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button variant="light" size="sm">
                            <Link2 className="w-4 h-4 text-gray-500" />
                          </Button>
                        </Flex>
                        <Box className="flex-1 mx-4">
                          <Textarea
                            minRows={1}
                            value={prompt}
                            onValueChange={(val) => setPrompt(val)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    if (prompt.trim()) {
                                      const text = prompt.trim()
                                      setMessages((prev) => [
                                        ...prev,
                                        { id: generateSequentialId(MESSAGE_IDS.USER_MESSAGE_PREFIX, messageCounter), role: 'user', content: text },
                                      ])
                                      setMessageCounter(prev => prev + 1)
                                      
                                      // Handle different question steps
                                      if (questionStep === 'outcomes') {
                                        // User just responded to outcomes question - show details question
                                        setTimeout(() => {
                                          const firstDoc = createDocs[0] || 'document'
                                          const examples = generateContextualExamples(firstDoc)
                                          
                                          const followUpMessage = `**Document details:**

What specific details do I need to include in this contract?

eg.
${examples.join('\n')}

[Upload documents button will appear here]

Skip for now`

                                          setMessages((prev) => [
                                            ...prev,
                                            {
                                              id: MESSAGE_IDS.ASSISTANT_DOCUMENT_DETAILS,
                                              role: 'assistant',
                                              content: followUpMessage,
                                            },
                                          ])
                                          
                                          setQuestionStep('details')
                                        }, 500)
                                      } else if (questionStep === 'details') {
                                        // User just responded to details question - start thinking sequence
                                        setTimeout(() => {
                                          runThinkingSequence()
                                        }, 500)
                                      } else if (questionStep === 'clauses') {
                                        // User responded to clauses section - continue to sliders
                                        setTimeout(() => {
                                          const slidersMessage = `Last thing before we get your 1st draft ready.`
                                          setMessages((prev) => [
                                            ...prev,
                                            {
                                              id: MESSAGE_IDS.ASSISTANT_DRAFT_SETTINGS,
                                              role: 'assistant',
                                              content: slidersMessage,
                                            },
                                          ])
                                          setQuestionStep('complete')
                                          setShowSliders(true)
                                        }, 500)
                                      } else {
                                        // Only call API if not responding to questions
                                        fetch('/api/chat', {
                                          method: 'POST',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({ messages: [{ role: 'user', content: text }] }),
                                        })
                                          .then((r) => r.json())
                                          .then((d) => {
                                            const msgId = generateSequentialId(MESSAGE_IDS.ASSISTANT_MESSAGE_PREFIX, messageCounter)
                                            setMessages((m) => [
                                              ...m,
                                              {
                                                id: msgId,
                                                role: 'assistant',
                                                content: d.content || '...',
                                              },
                                            ])
                                            setMessageCounter(prev => prev + 1)
                                          })
                                          .catch(() => {
                                            const msgId = generateSequentialId(MESSAGE_IDS.ASSISTANT_MESSAGE_PREFIX, messageCounter)
                                            setMessages((m) => [
                                              ...m,
                                              {
                                                id: msgId,
                                                role: 'assistant',
                                                content: 'There was an error. Please try again.',
                                              },
                                            ])
                                            setMessageCounter(prev => prev + 1)
                                          })
                                      }
                                      setPrompt('')
                                    }
                                  }
                                }}
                            placeholder="Type your message"
                            classNames={{ 
                              inputWrapper: 'border border-gray-300 rounded-full bg-white', 
                              input: 'text-gray-900' 
                            }}
                          />
                        </Box>
                        <Flex align="center" gap={2}>
                          <Button variant="light" size="sm">
                            <Mic className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button
                            variant="solid"
                            size="md"
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                                onPress={() => {
                                  if (prompt.trim()) {
                                    const text = prompt.trim()
                                    setMessages((prev) => [
                                      ...prev,
                                      { id: generateSequentialId(MESSAGE_IDS.USER_MESSAGE_PREFIX, messageCounter), role: 'user', content: text },
                                    ])
                                    setMessageCounter(prev => prev + 1)
                                    
                                    // Handle different question steps
                                    if (questionStep === 'outcomes') {
                                      // User just responded to outcomes question - show details question
                                                                              setTimeout(() => {
                                          const firstDoc = createDocs[0] || 'document'
                                          const examples = generateContextualExamples(firstDoc)
                                          
                                          const followUpMessage = `**Document details:**

What specific details do I need to include in this contract?

eg.
${examples.join('\n')}

[Upload documents button will appear here]

Skip for now`

                                        setMessages((prev) => [
                                          ...prev,
                                          {
                                            id: MESSAGE_IDS.ASSISTANT_DOCUMENT_DETAILS,
                                            role: 'assistant',
                                            content: followUpMessage,
                                          },
                                        ])
                                        
                                        setQuestionStep('details')
                                      }, 500)
                                    } else if (questionStep === 'details') {
                                      // User just responded to details question - start thinking sequence
                                      setTimeout(() => {
                                        runThinkingSequence()
                                      }, 500)
                                    } else if (questionStep === 'clauses') {
                                      // User responded to clauses section - continue to sliders
                                      setTimeout(() => {
                                        const slidersMessage = `Last thing before we get your 1st draft ready.`
                                        setMessages((prev) => [
                                          ...prev,
                                          {
                                            id: MESSAGE_IDS.ASSISTANT_DRAFT_SETTINGS,
                                            role: 'assistant',
                                            content: slidersMessage,
                                          },
                                        ])
                                        setQuestionStep('complete')
                                        setShowSliders(true)
                                      }, 500)
                                    } else {
                                      // Only call API if not responding to questions
                                      fetch('/api/chat', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ messages: [{ role: 'user', content: text }] }),
                                      })
                                        .then((r) => r.json())
                                        .then((d) => {
                                          const msgId = generateSequentialId(MESSAGE_IDS.ASSISTANT_MESSAGE_PREFIX, messageCounter)
                                          setMessages((m) => [
                                            ...m,
                                            {
                                              id: msgId,
                                              role: 'assistant',
                                              content: d.content || '...',
                                            },
                                          ])
                                          setMessageCounter(prev => prev + 1)
                                        })
                                        .catch(() => {
                                          const msgId = generateSequentialId(MESSAGE_IDS.ASSISTANT_MESSAGE_PREFIX, messageCounter)
                                          setMessages((m) => [
                                            ...m,
                                            {
                                              id: msgId,
                                              role: 'assistant',
                                              content: 'There was an error. Please try again.',
                                            },
                                          ])
                                          setMessageCounter(prev => prev + 1)
                                        })
                                    }
                                    setPrompt('')
                                  }
                                }}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                        </Flex>
                      </Flex>
                    </Box>
                  </motion.div>
              </Box>
            </motion.div>
          )}

          {/* Right workbench panel - Fixed position (outside chat mode for all modes) */}
          <AnimatePresence>
            {workbenchOpen && (
              <motion.aside
                initial={{ x: 320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 320, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-0 right-0 w-[320px] h-full bg-white border-l border-gray-200 shadow-lg z-10"
              >
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
                  <Box className="flex-1 p-6 overflow-auto">
                    <VStack spacing={8} align="start" className="h-full">
                      {/* Creating Section */}
                      <Box className="w-full">
                        <Text size="sm" className="mb-4 text-gray-900 font-normal">Creating:</Text>
                        {createDocs.map((doc, i) => (
                          <Flex key={i} align="center" justify="between" className="py-2">
                            <Flex align="center" gap={3}>
                              <Box className="w-4 h-5 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-blue-500" />
                              </Box>
                              <Text size="sm" className="text-gray-900">{doc}.docx</Text>
                            </Flex>
                            <Text size="xs" className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                              Draft
                            </Text>
                          </Flex>
                        ))}
                      </Box>

                      {/* Based on Section */}
                      <Box className="w-full">
                        <Text size="sm" className="mb-4 text-gray-900 font-normal">Based on:</Text>
                        {basedOnDocs.slice(0, 1).map((doc, i) => (
                          <Flex key={i} align="center" gap={3} className="py-2">
                            <Box className="w-4 h-5 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-500" />
                            </Box>
                            <Text size="sm" className="text-gray-900">{doc}.docx</Text>
                          </Flex>
                        ))}
                      </Box>

                      {/* Spacer to push drag area to bottom */}
                      <Box className="flex-1" />

                      {/* Drag Area */}
                      <Box className="w-full border-2 border-dashed border-gray-200 rounded-lg py-12 px-6 text-center bg-gray-50">
                        <Text size="sm" className="text-gray-400 leading-relaxed">
                          Drag documents to import in this project
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </motion.aside>
            )}
          </AnimatePresence>

          {mode === 'document' && (
            <motion.div
              key="document"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Container maxWidth="2xl" className="py-8">
                <VStack spacing={6} align="start" className="w-full">
                  {/* Document header */}
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

                  {/* Document content */}
                  <Box className="w-full bg-white rounded-2xl border border-zinc-200 shadow-sm min-h-[70vh]">
                    <Box className="p-8">
                      <VStack spacing={6} align="start" className="w-full max-w-4xl">
                        <Text size="lg" className="leading-relaxed">
                          This Agreement is made on the <span className="bg-yellow-200 px-2 py-1 rounded">[DATE]</span> day of <span className="bg-yellow-200 px-2 py-1 rounded">[MONTH]</span> <span className="bg-yellow-200 px-2 py-1 rounded">[YEAR]</span>
                        </Text>

                        <Text size="lg" className="leading-relaxed">
                          Between
                        </Text>

                        <Text size="lg" className="leading-relaxed">
                          <span className="bg-yellow-200 px-2 py-1 rounded">[ORGANIZATION NAME]</span>
                        </Text>

                        <Text size="lg" className="leading-relaxed">
                          And:
                        </Text>

                        <Text size="lg" className="leading-relaxed">
                          <span className="bg-yellow-200 px-2 py-1 rounded">[VOLUNTEER NAME]</span>
                        </Text>

                        <Box className="pt-4">
                          <Heading as="h2" size="lg" className="mb-4">
                            Parties
                  </Heading>
                          <Text size="md" className="leading-relaxed mb-4">
                            (1) &nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-yellow-200 px-2 py-1 rounded">[ORGANIZATION NAME]</span>, a <span className="bg-yellow-200 px-2 py-1 rounded">[LEGAL STATUS]</span> registered in England and Wales under registration number <span className="bg-yellow-200 px-2 py-1 rounded">[REGISTRATION NUMBER]</span>, whose registered office is at <span className="bg-yellow-200 px-2 py-1 rounded">[REGISTERED ADDRESS]</span> (the <strong>&ldquo;Organization&rdquo;</strong>).
                          </Text>
                          <Text size="md" className="leading-relaxed">
                            (2) &nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-yellow-200 px-2 py-1 rounded">[VOLUNTEER NAME]</span> of <span className="bg-yellow-200 px-2 py-1 rounded">[VOLUNTEER ADDRESS]</span> (the <strong>&ldquo;Volunteer&rdquo;</strong>).
                          </Text>
                        </Box>

                        {/* Lorem ipsum content to fill the page */}
                        <Box className="pt-6">
                          <Text size="md" className="leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          </Text>
                          <Text size="md" className="leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
                          <Text size="md" className="leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
                          <Text size="md" className="leading-relaxed mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Text>
              </Box>
            </VStack>
                    </Box>
                  </Box>

                  {/* Footer with creation status */}
                  <Box className="w-full flex justify-center pt-6">
                    <Box className="flex items-center gap-3 px-6 py-3 bg-purple-100 rounded-full">
                      <Text size="sm" className="text-purple-800">
                        Genie is creating your {documentTitle}
                      </Text>
                      <Button
                        variant="light"
                        size="sm"
                        className="text-purple-600 hover:text-purple-800"
                      >
                        Stop
                      </Button>
                    </Box>
          </Box>
        </VStack>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  )
}
