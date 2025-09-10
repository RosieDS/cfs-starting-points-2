import { extendVariants } from '@heroui/system'
import { Tabs as HerouiTabs, Tab as HerouiTab } from '@heroui/tabs'

export const Tabs = extendVariants(HerouiTabs, {
  variants: {
    variant: {
      underlined: {
        cursor: 'bg-primary-500',
        tabList: 'gap-0'
      }
    }
  }
})
export const Tab = HerouiTab
