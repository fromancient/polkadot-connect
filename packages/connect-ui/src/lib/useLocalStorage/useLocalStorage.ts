import { useEffect, useState } from 'react' // Import necessary hooks from React

// Custom hook to manage local storage with a key-value pair
export function useLocalStorage(
  key: string, // The key under which the value is stored in local storage
  initialValue = '', // Initial value to use if there's no value in local storage
): [string, (v: string) => void] {
  // Return type: a tuple with the stored value and a function to set the value
  const [storedValue, setStoredValue] = useState(initialValue) // State variable to hold the stored value

  // Load initial value from local storage when the component mounts or key changes
  useEffect(() => {
    // Check if the window object is available (for server-side rendering)
    if (typeof window === 'undefined') return

    // Retrieve the item from local storage using the specified key
    const item = window.localStorage.getItem(key)
    if (!item) return // If no item is found, do nothing

    try {
      // Parse the item as JSON and set the stored value
      setStoredValue(JSON.parse(item))
    } catch (err) {
      // If parsing fails, set the stored value to the raw string
      setStoredValue(item)
    }
  }, [key, setStoredValue]) // Dependency array to re-run effect if key or setStoredValue changes

  // Function to set a new value in local storage
  const setValue = (value: string) => {
    setStoredValue(value) // Update the state with the new value
    window.localStorage.setItem(key, JSON.stringify(value)) // Store the new value in local storage
  }

  // Return the stored value and the function to set a new value
  return [storedValue, setValue]
}
