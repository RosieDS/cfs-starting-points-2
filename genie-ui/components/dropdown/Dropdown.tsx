import {
  Dropdown as HerouiDropdown,
  DropdownTrigger as HerouiDropdownTrigger,
  DropdownMenu as HerouiDropdownMenu,
  DropdownSection as HerouiDropdownSection,
  DropdownItem as HerouiDropdownItem
} from '@heroui/dropdown'

import { ComponentProps } from 'react'
import { Button } from '../button'

export const Dropdown = HerouiDropdown
export const DropdownTrigger = HerouiDropdownTrigger
export const DropdownMenu = HerouiDropdownMenu
export const DropdownSection = HerouiDropdownSection
export const DropdownItem = HerouiDropdownItem

export type DropdownButtonProps = Omit<
  ComponentProps<typeof Button>,
  'variant' | 'size' | 'alignment'
> & {
  radius?: never
  color?: never
  disableRipple?: never
  isIconOnly?: never
  variant?: never
  size?: never
  alignment?: never
}
