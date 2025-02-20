import { WithWalletProps } from './types' // Importing types for props, specifically WithWalletProps
import styles from './WalletSelect.module.css' // Importing the CSS module for styling the NoAccounts component

// Define the NoAccounts functional component, which takes props of type WithWalletProps
export function NoAccounts({ wallet: selectedWallet }: WithWalletProps) {
  return (
    <div className={styles['no-extension-message']}>
      {' '}
      {/* Container styled with CSS module for no account message */}
      <div>No accounts found.</div>{' '}
      {/* Message indicating that no accounts are available */}
      <div>Add an account in {selectedWallet?.title} to get started.</div>{' '}
      {/* Prompt to add an account, safely accessing selectedWallet's title */}
    </div>
  )
}
