# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start Development:**
```bash
npm run dev          # Development server at http://localhost:3000
npm run dev:https    # Development server with HTTPS (for secure context features)
```

**Production Build:**
```bash
npm run build        # Create optimized production build
npm run start        # Start production server
```

**Code Quality:**
```bash
npm run lint         # Run Next.js ESLint checks
```

## Architecture Overview

This is a **Next.js 14 TypeScript application** using the **Pages Router** that provides a legal document generation interface. The application is built around the custom **Genie UI component library** and features a complex document configuration workflow.

### Key Technologies
- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Custom Genie UI components (built on HeroUI foundation)
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React useState with complex form state patterns

### Application Flow
The main interface (`pages/index.tsx`) implements a sophisticated document creation workflow:
1. **Landing Mode**: User describes document needs via text prompt
2. **Chat Mode**: Document selection and configuration interface with:
   - Document type selection (Employment, Investment, Service agreements, etc.)
   - Three configuration levels: Template → Standard → Customised
   - Key clauses customization with dynamic clause generation
   - Draft settings (length, favorability, tone sliders)
3. **Workbench Panel**: Live document preview with tabbed interface (Documents/Context/Rules)

## Project Structure

### Core Application
- `pages/index.tsx` - Main document creation interface (1200+ lines of complex state management)
- `pages/_app.tsx` - Next.js app wrapper with Genie UI provider
- `config/conversation.ts` - AI assistant system prompt and model configuration

### UI Component Library (`genie-ui/`)
Complete component library with 30+ components:
- **Layout**: Box, Flex, Stack, Grid, Container, Center, Spacer
- **Forms**: Input, Select, Textarea, Button, Checkbox, Switch
- **Display**: Typography, Avatar, Alert, Toast, Tooltip, Modal
- **Navigation**: Tabs, Dropdown, Link

### Message Management System
- `constants/messageIds.ts` - Static message IDs for conversation flow
- **Key Pattern**: Uses static IDs (not timestamps) for predictable message referencing
- **Helper Functions**: `updateMessageById()`, `findMessageById()`, `addMessage()`
- See `MESSAGE_ID_GUIDE.md` for detailed usage patterns

### Styling System
- `genie-ui/globals.css` - Global styles and component base classes
- `genie-ui/tokens.css` - Custom design tokens (9000+ lines)
- `tailwind.config.js` - Tailwind configuration with custom container queries

## Development Patterns

### Message ID Management
Always use static message IDs from `constants/messageIds.ts` instead of dynamic timestamps:
```typescript
// Correct
addMessage('assistant', 'Content', MESSAGE_IDS.ASSISTANT_ERROR)

// Avoid
addMessage('assistant', 'Content', `error-${Date.now()}`)
```

### Component Architecture
Components are re-exported through `genie-ui/index.ts` for clean imports:
```typescript
import { Box, Flex, VStack, Button } from '@/genie-ui'
```

### State Management Patterns
The main interface uses complex useState patterns for:
- Document selection tracking (`selectedDocs`)
- Dynamic clause management (`selectedClauses`, `clauseDetailsText`)
- Multi-level form state (`selectedExistingInputs`)
- UI state (`workbenchOpen`, `expandedDocs`, `activeTab`)

### Document Type Logic
Document suggestions and clause generation are dynamically determined based on user prompt analysis:
- Employment-related prompts → Employment Agreement, Offer Letter, NDA
- Investment prompts → Investment Agreement, Shareholders Agreement, Term Sheet
- Service prompts → Service Agreement, Statement of Work, Terms & Conditions

## Path Aliases
- `@/*` - Root directory
- `@_genieui` - Genie UI library index
- `@_common/*` - Common utilities

## Deployment

### Firebase Studio
1. Create ZIP excluding: `.git`, `.next`, `certificates`, `node_modules`
2. Upload to Firebase Studio → Import Repo
3. Run `npm i` in terminal
4. Initialize Firebase Hosting
5. Deploy to production

### Vercel
Requires personal GitHub account with synced repository for automatic deployments.

## Important Notes

- **No Testing Framework**: Project currently has no test configuration
- **No Storybook Config**: Stories exist but no Storybook setup detected
- **Complex State**: Main component has 40+ state variables - consider refactoring for maintainability
- **Static Content**: Document generation uses placeholder/dummy content functions
- **Message System**: Critical for conversation flow - always reference the MESSAGE_ID_GUIDE.md when working with chat functionality