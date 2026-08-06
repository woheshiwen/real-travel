import { useCallback } from 'react'
import type { PointerEvent } from 'react'

/**
 * Writes pointer position into CSS custom properties so `.spot` cards can
 * paint a very low-opacity radial tint where the cursor is.
 * Pointer-only decoration: skipped on touch, never the sole hover affordance.
 */
export function useSpotlight() {
  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    target.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }, [])

  return { onPointerMove }
}
