import { useEffect, useState } from "react"

export const useBreakpoint = (breakpoint: string) => {
  const [matches, setMatches] = useState<boolean>(true)

  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(breakpoint)
      .trim()
    const mediaQuery = window.matchMedia(`(min-width: ${value})`)

    const handleMediaQueryChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      setMatches(e.matches ? false : true)
    }

    handleMediaQueryChange(mediaQuery)

    mediaQuery.addEventListener("change", handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [breakpoint])

  return matches
}
