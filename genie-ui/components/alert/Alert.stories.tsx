import { VStack } from '../../layout/stack'
import { Button } from '../button'
import { useState } from 'react'
import { Alert, AnimatedAlert } from './Alert'

export default {
  title: 'Components/Alert',
  component: Alert
}

export const Default = () => {
  return <Alert title="Alert title" description="Alert description" />
}

export const Animated = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <VStack align="start" spacing={2}>
        <Button onPress={() => setIsVisible(true)}>Show alert</Button>
        <AnimatedAlert
          title="Alert title"
          description="Alert description"
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </VStack>
    </>
  )
}
