import { getWalletBySource } from '@polkadot/connect-wallets'

// Function to retrieve the wallet extension from the selected wallet source
export function web3FromSource() {
  // Retrieve the name of the selected wallet from local storage
  const selectedItem = localStorage.getItem(
    '@polkadot-connect/selected-wallet-name',
  )

  // Check if a selected wallet name was retrieved
  // If selectedItem is null, it means no wallet has been selected
  // The function could handle this case if needed

  // Get the wallet object using the selected wallet name
  const wallet = getWalletBySource(selectedItem as string)

  // Extract the wallet extension from the wallet object
  // wallet?.extension uses optional chaining to avoid errors if wallet is undefined
  const extension = wallet?.extension

  // Return the wallet extension, which can be used for further interactions
  // This extension may include methods for connecting to the blockchain, signing transactions, etc.
  return extension
}
