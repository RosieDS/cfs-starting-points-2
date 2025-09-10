import { cn } from '@_common/genie-ui/utils/cn'
import { forwardRef, Fragment } from 'react'

const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl']

const headingSizes: Record<string, Record<string, string>> = {
  base: {
    xs: 'text-size-3 leading-3 tracking-1',
    sm: 'text-size-4 leading-3 tracking-1',
    md: 'text-size-6 leading-4 tracking-1',
    lg: 'text-size-7 leading-5 tracking-2',
    xl: 'text-size-8 leading-6 tracking-5',
    '2xl': 'text-size-9 leading-7 tracking-5',
    '3xl': 'text-size-10 leading-8 tracking-5'
  },
  sm: {
    xs: 'sm:text-size-3 sm:leading-3 sm:tracking-1',
    sm: 'sm:text-size-4 sm:leading-3 sm:tracking-1',
    md: 'sm:text-size-6 sm:leading-4 sm:tracking-1',
    lg: 'sm:text-size-7 sm:leading-5 sm:tracking-2',
    xl: 'sm:text-size-8 sm:leading-6 sm:tracking-5',
    '2xl': 'sm:text-size-9 sm:leading-7 sm:tracking-5',
    '3xl': 'sm:text-size-10 sm:leading-8 sm:tracking-5'
  },
  md: {
    xs: 'md:text-size-3 md:leading-3 md:tracking-1',
    sm: 'md:text-size-4 md:leading-3 md:tracking-1',
    md: 'md:text-size-6 md:leading-4 md:tracking-1',
    lg: 'md:text-size-7 md:leading-5 md:tracking-2',
    xl: 'md:text-size-8 md:leading-6 md:tracking-5',
    '2xl': 'md:text-size-9 md:leading-7 md:tracking-5',
    '3xl': 'md:text-size-10 md:leading-8 md:tracking-5'
  },
  lg: {
    xs: 'lg:text-size-3 lg:leading-3 lg:tracking-1',
    sm: 'lg:text-size-4 lg:leading-3 lg:tracking-1',
    md: 'lg:text-size-6 lg:leading-4 lg:tracking-1',
    lg: 'lg:text-size-7 lg:leading-5 lg:tracking-2',
    xl: 'lg:text-size-8 lg:leading-6 lg:tracking-5',
    '2xl': 'lg:text-size-9 lg:leading-7 lg:tracking-5',
    '3xl': 'lg:text-size-10 lg:leading-8 lg:tracking-5'
  },
  xl: {
    xs: 'xl:text-size-3 xl:leading-3 xl:tracking-1',
    sm: 'xl:text-size-4 xl:leading-3 xl:tracking-1',
    md: 'xl:text-size-6 xl:leading-4 xl:tracking-1',
    lg: 'xl:text-size-7 xl:leading-5 xl:tracking-2',
    xl: 'xl:text-size-8 xl:leading-6 xl:tracking-5',
    '2xl': 'xl:text-size-9 xl:leading-7 xl:tracking-5',
    '3xl': 'xl:text-size-10 xl:leading-8 xl:tracking-5'
  },
  '2xl': {
    xs: '2xl:text-size-3 2xl:leading-3 2xl:tracking-1',
    sm: '2xl:text-size-4 2xl:leading-3 2xl:tracking-1',
    md: '2xl:text-size-6 2xl:leading-4 2xl:tracking-1',
    lg: '2xl:text-size-7 2xl:leading-5 2xl:tracking-2',
    xl: '2xl:text-size-8 2xl:leading-6 2xl:tracking-5',
    '2xl': '2xl:text-size-9 2xl:leading-7 2xl:tracking-5',
    '3xl': '2xl:text-size-10 2xl:leading-8 2xl:tracking-5'
  }
}

const textSizes: Record<string, Record<string, string>> = {
  base: {
    xs: '!text-size-1 leading-1 tracking-1',
    sm: '!text-size-2 leading-1 tracking-4',
    md: '!text-size-3 leading-2 tracking-3',
    lg: '!text-size-4 leading-3 tracking-2'
  },
  sm: {
    xs: 'sm:!text-size-1 sm:leading-1 sm:tracking-1',
    sm: 'sm:!text-size-2 sm:leading-1 sm:tracking-4',
    md: 'sm:!text-size-3 sm:leading-2 sm:tracking-3',
    lg: 'sm:!text-size-4 sm:leading-3 sm:tracking-2'
  },
  md: {
    xs: 'md:!text-size-1 md:leading-1 md:tracking-1',
    sm: 'md:!text-size-2 md:leading-1 md:tracking-4',
    md: 'md:!text-size-3 md:leading-2 md:tracking-3',
    lg: 'md:!text-size-4 md:leading-3 md:tracking-2'
  },
  lg: {
    xs: 'lg:!text-size-1 lg:leading-1 lg:tracking-1',
    sm: 'lg:!text-size-2 lg:leading-1 lg:tracking-4',
    md: 'lg:!text-size-3 lg:leading-2 lg:tracking-3',
    lg: 'lg:!text-size-4 lg:leading-3 lg:tracking-2'
  },
  xl: {
    xs: 'xl:!text-size-1 xl:leading-1 xl:tracking-1',
    sm: 'xl:!text-size-2 xl:leading-1 xl:tracking-4',
    md: 'xl:!text-size-3 xl:leading-2 xl:tracking-3',
    lg: 'xl:!text-size-4 xl:leading-3 xl:tracking-2'
  },
  '2xl': {
    xs: '2xl:!text-size-1 2xl:leading-1 2xl:tracking-1',
    sm: '2xl:!text-size-2 2xl:leading-1 2xl:tracking-4',
    md: '2xl:!text-size-3 2xl:leading-2 2xl:tracking-3',
    lg: '2xl:!text-size-4 2xl:leading-3 2xl:tracking-2'
  }
}

function getResponsiveClasses(
  sizes: string | string[],
  sizeClassMap: Record<string, Record<string, string>>
): string[] {
  if (!Array.isArray(sizes)) {
    return [sizeClassMap.base[sizes] || '']
  }
  return sizes.map((size, i) => {
    const bp = breakpoints[i] || 'base'
    return sizeClassMap[bp][size] || ''
  })
}

type HeadingProps = {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
  className?: string
}
export const Heading = ({
  children,
  as = 'h2',
  size = 'lg',
  className
}: HeadingProps) => {
  const Component = as
  const classes = getResponsiveClasses(size, headingSizes)

  return (
    <Component
      className={cn('font-medium text-foreground', ...classes, className)}>
      {children}
    </Component>
  )
}

type TextProps = {
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  size?: 'xs' | 'sm' | 'md' | 'lg' | Array<'xs' | 'sm' | 'md' | 'lg'>
  className?: string
}

export const Text = forwardRef<any, TextProps>(
  ({ children, as = 'p', size = 'md', className }: TextProps, ref) => {
    const Component = as ?? Fragment
    const classes = getResponsiveClasses(size, textSizes)

    const props: any = {
      className: cn('font-normal text-foreground', ...classes, className),
      children
    }
    if (as) {
      props.ref = ref
    }

    return <Component {...props}>{children}</Component>
  }
)
