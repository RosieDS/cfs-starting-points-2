export type Layer =
  | 'subBase'
  | 'base'
  | 'elevated'
  | 'navbar'
  | 'banner'
  | 'drawer'
  | 'modal'
  | 'toast'
  | 'popover'

/**
 * Layer as a Tailwind classname
 */
export const zIndex: Record<Layer, string> = {
  subBase: 'z-[-1]',
  base: 'z-0',
  elevated: 'z-10',
  navbar: 'z-40',
  banner: 'z-45',
  drawer: 'z-50',
  modal: 'z-50',
  toast: 'z-[100]',
  popover: 'z-[100000]' // Placing popovers at this layer supports popovers inside modals, but this does assume we always close a base layer popover when opening a modal
}

/**
 * Layer as a number
 * For backwards compatibility with Material UI
 */
export const mapLayerToNumber: Record<Layer, number> = {
  subBase: -1,
  base: 0,
  elevated: 10,
  navbar: 40,
  banner: 45,
  drawer: 50,
  modal: 50,
  toast: 100,
  popover: 100000
}
