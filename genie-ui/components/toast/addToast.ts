import { addToast as addHeroToast } from '@heroui/toast'

export const addToast = (
  props: Omit<Parameters<typeof addHeroToast>[0], 'color'> & {
    color?: 'primary' | 'danger' | 'success'
  }
) => {
  addHeroToast(props)
}
