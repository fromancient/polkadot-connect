import { RefObject, useEffect } from 'react'

// Type definition for events that this hook will handle
type AnyEvent = MouseEvent | TouchEvent

/**
 * Custom hook that detects clicks outside of a specified element.
 *
 * @param ref - A React ref pointing to the element to monitor.
 * @param handler - A callback function to be called when a click outside the element occurs.
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>, // Reference to the target element
  handler: (event: AnyEvent) => void, // Handler function to call on outside click
): void {
  useEffect(() => {
    // Listener function to handle the click event
    const listener = (event: AnyEvent) => {
      const el = ref?.current // Get the current element from the ref

      // Do nothing if clicking inside the ref's element or any of its descendant elements
      if (!el || el.contains(event.target as Node)) {
        return // Exit if the click was inside the element
      }

      // Call the provided handler if the click was outside the element
      handler(event)
    }

    // Attach the listener for mouse and touch events
    document.addEventListener(`mousedown`, listener) // For mouse clicks
    document.addEventListener(`touchstart`, listener) // For touch events (e.g., on mobile devices)

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      document.removeEventListener(`mousedown`, listener) // Remove mouse click listener
      document.removeEventListener(`touchstart`, listener) // Remove touch event listener
    }

    // The effect will re-run if the ref or handler passed as dependencies change
  }, [ref, handler])
}
