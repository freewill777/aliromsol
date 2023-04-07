import type { ComponentPropsWithoutRef } from 'react'
import { useTheme } from '~/hooks/use-theme'
import { useMemo } from 'react'
type LogoProps = {
  width?: number
  height?: number
} & ComponentPropsWithoutRef<'svg'>

export const Logo = ({ width = 50, height = 50, ...props }: LogoProps) => {
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = useMemo(() => theme === 'dark', [theme])
  const imageSize = 70
  
  return isDarkMode ? (
    <img
      height={imageSize}
      width={imageSize}
      src='../assets/Alirom_Logo_Variations-02.png' />
  ) : (
    <img
      height={imageSize}
      width={imageSize}
      src='../assets/Alirom_Logo_Variations-01.png' />
  )
}
