export const join = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
