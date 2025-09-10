import clsx from 'clsx'
import { Textarea, TextareaProps } from '../textarea'
import { As, forwardRef } from '@heroui/system'
import { IconButton } from '../button'
import { ArrowUp } from 'lucide-react'
import { cn } from '@_common/genie-ui/utils/cn'
import { useState } from 'react'

export type ReplyboxProps = TextareaProps & {
  handleSubmit: (value: string) => void
}

export const Replybox = forwardRef<As, ReplyboxProps>(
  (props: ReplyboxProps, ref) => {
    const [value, setValue] = useState('')

    return (
      <Textarea
        ref={ref}
        color="primary-light"
        className={cn('w-full rounded-xl', props.className)}
        classNames={{
          inputWrapper: clsx(
            'border-2 bg-white',
            'data-[hover=true]:bg-white',
            'group-data-[focus=true]:shadow-none group-data-[focus=true]:border-primary-100'
          )
        }}
        value={value}
        onValueChange={setValue}
        endContent={
          <IconButton
            size="sm"
            className="self-end"
            onPress={() => {
              props.handleSubmit(value)
              setValue('')
            }}
            isDisabled={props.isDisabled}>
            <ArrowUp />
          </IconButton>
        }
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            props.handleSubmit(value)
            setValue('')
          }
        }}
        autoFocus
        {...props}
      />
    )
  }
)
