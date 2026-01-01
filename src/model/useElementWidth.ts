import { useLayoutEffect, useState } from 'react'

export function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState<number>(0)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const measure = () => {
      setWidth(node.getBoundingClientRect().width)
    }

    measure()

    const ro = new ResizeObserver(() => measure())
    ro.observe(node)
    return () => ro.disconnect()
  }, [ref])

  return width
}
