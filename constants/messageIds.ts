/**
 * Static message IDs for the chat system
 * These IDs are used to uniquely identify and reference specific messages
 */

export const MESSAGE_IDS = {
  // Initial user message when starting chat
  USER_INITIAL: 'user-initial',
  
  // First assistant response with document suggestions
  ASSISTANT_INITIAL: 'assistant-initial',
  
  // Error message from assistant
  ASSISTANT_ERROR: 'assistant-error',
  
  // User message when clicking "Configure my document(s)"
  USER_CONFIGURE: 'user-configure',
  
  // Assistant message with document purpose questions
  ASSISTANT_DOCUMENT_PURPOSE: 'assistant-document-purpose',
  
  // Assistant message with document details follow-up
  ASSISTANT_DOCUMENT_DETAILS: 'assistant-document-details',
  
  // Assistant message showing key clauses with checkboxes
  ASSISTANT_KEY_CLAUSES: 'assistant-key-clauses',
  
  // Assistant message showing the sliders for settings
  ASSISTANT_DRAFT_SETTINGS: 'assistant-draft-settings',
  
  // Assistant message showing final confirmation before creating document
  ASSISTANT_FINAL_CONFIRMATION: 'assistant-final-confirmation',
  
  // Dynamic user messages during conversation (with suffix)
  USER_MESSAGE_PREFIX: 'user-msg-',
  
  // Dynamic assistant responses during conversation (with suffix)
  ASSISTANT_MESSAGE_PREFIX: 'assistant-msg-',
} as const

export type MessageId = typeof MESSAGE_IDS[keyof typeof MESSAGE_IDS]

/**
 * Helper function to generate sequential message IDs
 */
export const generateSequentialId = (prefix: string, index: number): string => {
  return `${prefix}${index}`
}

/**
 * Helper function to check if a message ID matches a pattern
 */
export const isMessageType = (messageId: string, pattern: string): boolean => {
  return messageId.startsWith(pattern)
}
