import { ToastProvider as HeroToastProvider } from '@heroui/toast'
import { X } from 'lucide-react'

export const ToastProvider = () => (
  <HeroToastProvider
    toastProps={{
      radius: 'lg',
      color: 'primary',
      variant: 'solid',
      timeout: 60000,
      closeIcon: <X />,
      classNames: {
        base: 'rounded-[var(--layout-radius-rounded-large)]',
        progressTrack: 'rounded-[var(--layout-radius-rounded-large)]',
        progressIndicator: 'opacity-100',
        closeButton: 'static text-white hover:text-white'
      }
    }}
  />
)
