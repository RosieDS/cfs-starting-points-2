import {
  Select as HerouiSelect,
  SelectItem as HerouiSelectItem
} from '@heroui/select'
import { extendVariants } from '@heroui/system'

export const Select = extendVariants(HerouiSelect, {
  variants: {
    type: {
      filter: {
        trigger:
          'bg-white border border-primary-200 rounded-full h-6 min-h-6 gap-1',
        value: 'text-xs font-normal overflow-visiblex text-ellipsisx',
        selectorIcon: 'static',
        innerWrapper: 'w-fit',
        listboxWrapper: 'w-fit',
        popoverContent: 'w-fit',
        label: 'text-xs pe-1',
        base: 'w-fit'
      }
    }
  },
  defaultVariants: {
    type: 'filter',
    labelPlacement: 'outside-left'
  }
})

export const SelectItem = HerouiSelectItem
