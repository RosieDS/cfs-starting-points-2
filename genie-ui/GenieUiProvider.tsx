import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/toast'
import { NextRouter, useRouter } from 'next/router'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<NextRouter['push']>[1]>
  }
}

export const GenieUiProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  )
}
