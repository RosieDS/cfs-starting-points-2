import {
  Modal as HeroUiModal,
  ModalContent as HeroUiModalContent,
  ModalHeader as HeroUiModalHeader,
  ModalBody as HeroUiModalBody,
  ModalFooter as HeroUiModalFooter,
  ModalProps as HeroUiModalProps
} from '@heroui/modal'
import { extendVariants } from '@heroui/system'
import clsx from 'clsx'
import { Stack } from '../../layout/stack'
import { Button } from '../button'
import useTranslation from 'next-translate/useTranslation'

export const Modal = extendVariants(HeroUiModal, {
  variants: {
    radius: {
      lg: { base: 'rounded-[1.5rem]' }
    }
  },
  defaultVariants: {
    radius: 'lg'
  }
})

export const ModalContent = HeroUiModalContent
export const ModalHeader = HeroUiModalHeader
export const ModalBody = HeroUiModalBody
export const ModalFooter = HeroUiModalFooter

type ModalProps = HeroUiModalProps & {
  icon?: React.ReactNode
  title?: string
  closeButtonText?: string
  actionButtonText?: string
  onClose?: () => void
  onAction?: any
}

export const SimpleModal = ({
  children,
  icon,
  title,
  closeButtonText,
  actionButtonText,
  onClose,
  onAction,
  ref,
  ...rest
}: ModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal
      onClose={onClose}
      {...rest}
      classNames={{
        backdrop: 'z-[1250]',
        base: 'z-[1250]',
        wrapper: 'z-[1250]'
      }}>
      <ModalContent className="gap-4 overflow-visible px-6 pb-4 pt-8">
        {icon && (
          <Stack
            className={clsx(
              'absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2',
              'items-center justify-center rounded-full bg-white',
              '[&>svg]:h-8 [&>svg]:w-8'
            )}>
            {icon}
          </Stack>
        )}
        {title && (
          <ModalHeader className="text-md justify-center p-0 font-medium">
            {title}
          </ModalHeader>
        )}
        <ModalBody className="p-0 pb-4">{children}</ModalBody>
        <ModalFooter className="justify-center p-0">
          {onClose && (
            <Button variant="light" onPress={onClose}>
              {closeButtonText ? closeButtonText : t('common:action.cancel')}
            </Button>
          )}
          {onAction && (
            <Button variant="solid" onPress={onAction}>
              {actionButtonText ? actionButtonText : t('common:action.ok')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
