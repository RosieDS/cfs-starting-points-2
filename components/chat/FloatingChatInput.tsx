import React, { useState } from 'react'
import { Box } from '@/genie-ui'
import { MessageCircle } from 'lucide-react'

interface FloatingChatInputProps {
  onShowChatPreview: () => void
  onHideChatPreview: () => void
  onCommitToChat: () => void
}

/**
 * Floating chat button that shows chat preview on hover
 * Anchored to bottom-right of the container
 */
export const FloatingChatInput: React.FC<FloatingChatInputProps> = ({
  onShowChatPreview,
  onHideChatPreview,
  onCommitToChat
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onShowChatPreview()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Small delay to allow for moving to chat area
    setTimeout(() => {
      // Only hide if not hovering over any chat elements
      const hoveredElement = document.querySelector(':hover')
      const isHoveringChat = hoveredElement?.closest('[data-chat-preview-area]')
      if (!isHoveringChat) {
        onHideChatPreview()
      }
    }, 150)
  }

  const handleClick = () => {
    onCommitToChat()
  }

  return (
    <div
      className="absolute bottom-4 right-4 z-50"
      data-floating-chat-button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Preview chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        
        {/* Tooltip hint */}
        <div
          className={`
            absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs 
            rounded-lg whitespace-nowrap transition-all duration-200
            ${isHovered
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-1 pointer-events-none'
            }
          `}
        >
          Preview chat
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>

        {/* Animated pulse effect when hovering */}
        <div
          className={`
            absolute inset-0 w-14 h-14 bg-purple-400 rounded-full -z-10
            transition-all duration-300
            ${isHovered
              ? 'scale-125 opacity-20 animate-pulse' 
              : 'scale-100 opacity-0'
            }
          `}
        />
      </div>
    </div>
  )
}
