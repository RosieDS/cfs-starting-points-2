/**
 * Example usage of the message ID system
 * This file demonstrates how to work with the static message IDs
 */

import { MESSAGE_IDS } from './messageIds'

/**
 * Example 1: Updating a specific message by ID
 * This allows you to change the content of any message after it's been created
 */
export const updateDocumentPurposeQuestion = (updateFn: (id: string, content: string) => void) => {
  const newContent = `**Document purpose (Updated):**
  
  We've refined our question based on your input. In your own words, why are you creating this document now?`
  
  updateFn(MESSAGE_IDS.ASSISTANT_DOCUMENT_PURPOSE, newContent)
}

/**
 * Example 2: Finding and checking if a specific message exists
 */
export const checkIfClausesMessageExists = (findFn: (id: string) => any) => {
  const clausesMsg = findFn(MESSAGE_IDS.ASSISTANT_KEY_CLAUSES)
  return clausesMsg !== undefined
}

/**
 * Example 3: Updating multiple related messages
 */
export const updateAllAssistantMessages = (updateFn: (id: string, content: string) => void) => {
  // Update initial response
  updateFn(MESSAGE_IDS.ASSISTANT_INITIAL, "Here's an updated list of documents you might need...")
  
  // Update document purpose question
  updateFn(MESSAGE_IDS.ASSISTANT_DOCUMENT_PURPOSE, "Let's refine the purpose of your document...")
  
  // Update document details
  updateFn(MESSAGE_IDS.ASSISTANT_DOCUMENT_DETAILS, "Now for the specific details...")
  
  // Update clauses message
  updateFn(MESSAGE_IDS.ASSISTANT_KEY_CLAUSES, "**Updated key clauses:**\nBased on your responses...")
  
  // Update draft settings
  updateFn(MESSAGE_IDS.ASSISTANT_DRAFT_SETTINGS, "Final step before creating your draft...")
}

/**
 * Example 4: Conditional message updates based on message type
 */
export const updateMessageBasedOnType = (
  messageId: string, 
  updateFn: (id: string, content: string) => void
) => {
  switch(messageId) {
    case MESSAGE_IDS.USER_INITIAL:
      updateFn(messageId, "Modified initial user query")
      break
      
    case MESSAGE_IDS.USER_CONFIGURE:
      updateFn(messageId, "Configure my updated documents")
      break
      
    case MESSAGE_IDS.ASSISTANT_ERROR:
      updateFn(messageId, "A different error message occurred. Please refresh and try again.")
      break
      
    default:
      // Handle dynamic message IDs
      if (messageId.startsWith(MESSAGE_IDS.USER_MESSAGE_PREFIX)) {
        updateFn(messageId, "Updated user message")
      } else if (messageId.startsWith(MESSAGE_IDS.ASSISTANT_MESSAGE_PREFIX)) {
        updateFn(messageId, "Updated assistant response")
      }
  }
}

/**
 * Example 5: Usage in the component
 * 
 * In your React component (pages/index.tsx), you can now:
 * 
 * // Update a specific message
 * updateMessageById(MESSAGE_IDS.ASSISTANT_DOCUMENT_PURPOSE, "New question content")
 * 
 * // Find a message
 * const clausesMessage = findMessageById(MESSAGE_IDS.ASSISTANT_KEY_CLAUSES)
 * 
 * // Check if a message exists before updating
 * if (findMessageById(MESSAGE_IDS.ASSISTANT_INITIAL)) {
 *   updateMessageById(MESSAGE_IDS.ASSISTANT_INITIAL, "Updated content")
 * }
 * 
 * // Add a new message with a specific ID
 * addMessage('assistant', 'Content', MESSAGE_IDS.ASSISTANT_ERROR)
 */
