# Message ID System Guide

## Overview
The chat application now uses **static message IDs** instead of dynamic timestamps, making it easier to reference, update, and manage specific messages throughout the conversation flow.

## Static Message IDs

All message IDs are now defined in `/constants/messageIds.ts`:

### Core Message IDs
- **`USER_INITIAL`** - The first user message when starting a chat
- **`ASSISTANT_INITIAL`** - The AI's first response with document suggestions  
- **`ASSISTANT_ERROR`** - Error messages from the assistant
- **`USER_CONFIGURE`** - User clicks "Configure my document(s)"
- **`ASSISTANT_DOCUMENT_PURPOSE`** - Assistant asks about document purpose
- **`ASSISTANT_DOCUMENT_DETAILS`** - Assistant asks for specific details
- **`ASSISTANT_KEY_CLAUSES`** - Assistant shows key clauses with checkboxes
- **`ASSISTANT_DRAFT_SETTINGS`** - Assistant shows length/favourability sliders

### Dynamic Message ID Prefixes
- **`USER_MESSAGE_PREFIX`** (`user-msg-`) - For sequential user messages
- **`ASSISTANT_MESSAGE_PREFIX`** (`assistant-msg-`) - For sequential assistant responses

## Helper Functions

Three helper functions are available in `pages/index.tsx`:

### 1. `updateMessageById(messageId, newContent)`
Update the content of any message by its ID:
```typescript
updateMessageById(MESSAGE_IDS.ASSISTANT_DOCUMENT_PURPOSE, "Updated question text")
```

### 2. `findMessageById(messageId)`
Find and retrieve a message by its ID:
```typescript
const message = findMessageById(MESSAGE_IDS.ASSISTANT_KEY_CLAUSES)
if (message) {
  console.log(message.content)
}
```

### 3. `addMessage(role, content, customId?)`
Add a new message with an optional custom ID:
```typescript
// With specific ID
addMessage('assistant', 'Content', MESSAGE_IDS.ASSISTANT_ERROR)

// With auto-generated sequential ID
addMessage('user', 'User input') // Creates: user-msg-0, user-msg-1, etc.
```

## Usage Examples

### Update Messages Dynamically
```typescript
// Change the document purpose question based on context
if (documentType === 'employment') {
  updateMessageById(
    MESSAGE_IDS.ASSISTANT_DOCUMENT_PURPOSE,
    "**Employment Contract Details:**\nWhat role and compensation are you offering?"
  )
}
```

### Check Message State
```typescript
// Check if clauses have been shown
const clausesShown = findMessageById(MESSAGE_IDS.ASSISTANT_KEY_CLAUSES) !== undefined

// Conditional logic based on message existence
if (!findMessageById(MESSAGE_IDS.ASSISTANT_DRAFT_SETTINGS)) {
  // Show draft settings for the first time
  addMessage('assistant', 'Configure your draft...', MESSAGE_IDS.ASSISTANT_DRAFT_SETTINGS)
}
```

### Modify Conversation Flow
```typescript
// Replace error message with more specific guidance
updateMessageById(
  MESSAGE_IDS.ASSISTANT_ERROR,
  "Please provide more details about your document type to continue."
)
```

## Benefits

1. **Predictable References** - No more searching for dynamic timestamp-based IDs
2. **Easy Updates** - Change any message content by referencing its static ID
3. **Better Testing** - Consistent IDs make testing conversation flows easier
4. **Clearer Code** - Self-documenting ID names explain message purpose
5. **Flow Control** - Check which messages exist to determine conversation state

## Migration from Dynamic IDs

Old pattern:
```typescript
id: `a-clauses-${Date.now()}`
```

New pattern:
```typescript
id: MESSAGE_IDS.ASSISTANT_KEY_CLAUSES
```

## Extending the System

To add new message types:

1. Add the ID to `/constants/messageIds.ts`:
```typescript
export const MESSAGE_IDS = {
  // ... existing IDs
  YOUR_NEW_MESSAGE: 'your-new-message',
}
```

2. Use it in your component:
```typescript
addMessage('assistant', 'Content', MESSAGE_IDS.YOUR_NEW_MESSAGE)
```

3. Reference it later:
```typescript
updateMessageById(MESSAGE_IDS.YOUR_NEW_MESSAGE, 'Updated content')
```
