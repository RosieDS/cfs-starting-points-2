import { VStack, Text, Button, Center } from '@_common/genie-ui'
import useTranslation from 'next-translate/useTranslation'

export const ErrorMsgWithRetry = ({
  errorMessage,
  retryHandler,
  isCentered = true
}: {
  errorMessage?: string
  retryHandler?: () => void
  isCentered?: boolean
}) => {
  const { t } = useTranslation()
  const children = (
    <VStack spacing={2}>
      <Text>{errorMessage ?? t('editor:error.generic')}</Text>
      {retryHandler ? (
        <Button size="sm" variant="bordered" onPress={retryHandler}>
          {t('editor:error.retry')}
        </Button>
      ) : null}
    </VStack>
  )

  return isCentered ? <Center>{children}</Center> : children
}
