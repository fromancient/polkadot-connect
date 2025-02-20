import { Wallet } from '@polkadot/connect-wallets'

// Function to save the selected wallet and dispatch a selection event
export function saveAndDispatchWalletSelect(wallet: Wallet) {
  // Save the wallet's extension name to local storage
  localStorage.setItem(
    '@polkadot-connect/selected-wallet-name',
    wallet.extensionName,
  )

  // Create a custom event to signal that a wallet has been selected
  const walletSelectedEvent = new CustomEvent(
    '@polkadot-connect/wallet-selected',
    {
      detail: wallet, // Attach the wallet object as event detail
    },
  )

  // Dispatch the custom event to notify other parts of the application
  document.dispatchEvent(walletSelectedEvent)

  // Log the event and the selected wallet to the console for debugging
  console.info(`Event: @polkadot-connect/wallet-selected`, wallet)
}
