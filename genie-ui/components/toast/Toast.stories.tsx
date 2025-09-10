import { CheckIcon } from 'lucide-react'
import { VStack } from '../../layout/stack'
import { Box } from '../../layout/box'
import { Button } from '../button'
import { addToast } from './addToast'
import { ToastProvider } from './ToastProvider'
import { Animated } from '../alert/Alert.stories'

export default {
  title: 'Components/Toast',
  component: <></>
}

export const Default = () => {
  return (
    <Box>
      <ToastProvider />
      <VStack align="start" spacing={2}>
        <Button
          onPress={() =>
            addToast({
              title: 'Toast title'
            })
          }>
          Show toast with title only
        </Button>
        <Button
          onPress={() =>
            addToast({
              title: 'Toast title',
              description: 'Toast displayed successfully'
            })
          }>
          Show toast with title and description
        </Button>
        <Button
          onPress={() =>
            addToast({
              title: 'Toast title',
              description: 'Toast displayed successfully',
              icon: (
                <div>
                  <CheckIcon />
                </div>
              )
            })
          }>
          Show toast with customicon
        </Button>
        <Button
          onPress={() =>
            addToast({
              title: 'Toast title',
              description: 'Toast displayed successfully',
              color: 'danger'
            })
          }>
          Show error toast
        </Button>
        <Button
          onPress={() =>
            addToast({
              title: 'Toast title',
              description: 'Toast displayed successfully',
              color: 'success'
            })
          }>
          Show success toast
        </Button>
      </VStack>
    </Box>
  )
}

export const ToastAndAlert = () => {
  return (
    <VStack align="start" spacing={8}>
      <Default />
      <Animated />
    </VStack>
  )
}
