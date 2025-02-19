import { getWallets, Wallet } from '@polkadot/connect-wallets' // Importing functions and types from the Polkadot wallet library
import { cloneElement, ReactElement, ReactNode } from 'react' // Importing React utilities for cloning elements and type definitions

import styles from './WalletConnectButton.module.css' // Importing CSS module for styling the button

// Interface defining the props for the WalletConnectButton component
export interface WalletConnectButtonProps {
  onClick?: (wallets: Wallet[]) => unknown // Optional callback function triggered on button click, receives an array of wallets
  children: ReactNode // Content to be displayed inside the button
  Component?: ReactElement // Optional custom component to be used instead of the default button
  className?: string // Optional additional CSS class name(s) for styling the button
}

// WalletConnectButton functional component definition
export const WalletConnectButton = ({
  onClick, // Extract the onClick function from props
  children, // Extract the children content from props
  Component, // Extract the optional custom component from props
  className = '', // Extract the className and set a default empty string if not provided
}: WalletConnectButtonProps) =>
  // Clone the specified Component or default to a <button> element,
  // passing in additional props including custom styles, children, and onClick handler
  cloneElement(Component || <button />, {
    className: `${styles['wallet-connect-button']} ${className}`, // Combine styles from the CSS module with any additional class names
    children, // Inject the children content
    onClick: () => onClick?.(getWallets()), // Define the onClick handler to call the passed onClick function with the wallets obtained from getWallets()
  })
