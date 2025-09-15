export interface NavigationItem {
  name: string
  href: string
  external?: boolean
}

export interface BaseProps {
  className?: string
  children?: React.ReactNode
}