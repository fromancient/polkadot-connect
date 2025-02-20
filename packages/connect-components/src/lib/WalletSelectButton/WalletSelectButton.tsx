import {
  NotInstalledError, // Import error for when the wallet extension is not installed
  Wallet, // Import Wallet type definition
  WalletAccount, // Import WalletAccount type definition
} from '@polkadot/connect-wallets'
// Import components from the Polkadot wallets package

import {
  cloneElement, // Import cloneElement to modify React elements
  ReactElement, // Import ReactElement type for typed children
  ReactNode, // Import ReactNode type for flexible child types
  useEffect, // Import useEffect hook for side effects
  useState, // Import useState hook for managing state
} from 'react'

import styles from './WalletSelectButton.module.css' // Import CSS module for styling

// Define the props expected by the WalletSelectButton component
export interface WalletSelectButtonProps {
  dappName: string // The name of the decentralized application
  wallet: Wallet // The wallet object to be used with this button
  onClick?: (accounts: WalletAccount[] | undefined) => unknown // Optional callback when accounts are selected
  onError?: (error?: unknown) => unknown // Optional callback when an error occurs
  children: ReactNode // Child nodes to be rendered within the button
  className?: string // Additional CSS class names to apply to the button
  Component?: ReactElement // Optional custom component to render instead of the default button
}

type GenericFn = () => unknown // Type definition for generic functions

// Define the WalletSelectButton functional component
export function WalletSelectButton({
  wallet, // Destructure the wallet from props
  onClick, // Destructure the onClick callback from props
  onError, // Destructure the onError callback from props
  children, // Destructure the children from props
  Component, // Destructure the Component prop for rendering a custom element
  className = '', // Default to an empty string for additional class names
  dappName, // Destructure the dappName from props
}: WalletSelectButtonProps) {
  // State to hold the unsubscribe function for accounts subscription
  const [unsubscribe, setUnsubscribe] = useState<GenericFn | undefined>()

  // useEffect to unsubscribe from the wallet accounts when the component unmounts
  useEffect(() => {
    return () => void unsubscribe?.() // Unsubscribe if a function is set
  }, [unsubscribe]) // Effect depends on unsubscribe state

  // Function to handle button click
  const handleClick = async () => {
    // Check if the wallet is not installed and invoke the error callback
    if (!wallet.installed)
      return void onError?.(
        new NotInstalledError(`${wallet.extensionName} not installed`, wallet), // Create a NotInstalledError instance
      )

    // Prevent multiple subscriptions if already subscribed
    if (unsubscribe) return

    try {
      // Enable the wallet for the specified dapp
      await wallet.enable(dappName)

      // Subscribe to account changes from the wallet
      const unsub = await wallet.subscribeAccounts(
        (accounts: WalletAccount[] | undefined) => {
          onClick?.(accounts) // Call onClick with the updated accounts
          if (!accounts) onError?.() // Call onError if no accounts are found
        },
      )
      setUnsubscribe(unsub as GenericFn) // Store the unsubscribe function in state
    } catch (err) {
      console.log(`>>> err:WalletSelectButton`, err) // Log any errors that occur
      onError?.(err) // Call onError with the caught error
    }
  }

  // Clone the provided Component or render a default button with modified props
  return cloneElement(Component || <button />, {
    className: `${styles['wallet-select-button']} wallet-select-button ${className}`, // Combine class names for styling
    children, // Render children inside the button
    onClick: handleClick, // Set the onClick handler for the button
  })
}
