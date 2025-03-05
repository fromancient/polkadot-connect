import { isWalletInstalled } from '@polkadot/connect-wallets'

// Function to remove the selected wallet from local storage if it's not installed
export function removeIfUninstalled() {
  // Retrieve the name of the selected wallet from local storage
  const selectedName = localStorage.getItem(
    '@polkadot-connect/selected-wallet-name',
  )

  // Check if the wallet corresponding to selectedName is installed
  if (!isWalletInstalled(selectedName)) {
    // If the wallet is not installed, remove it from local storage
    localStorage.removeItem('@polkadot-connect/selected-wallet-name')
  }
}
