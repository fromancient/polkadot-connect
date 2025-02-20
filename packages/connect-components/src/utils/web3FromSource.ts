import { getWalletBySource } from '@polkadot/connect-wallets'

// Function to retrieve the wallet extension from the selected wallet source
export function web3FromSource() {
  // Retrieve the name of the selected wallet from local storage
  const selectedItem = localStorage.getItem(
    '@polkadot-connect/selected-wallet-name',
  )

  // Get the wallet object using the selected wallet name
  const wallet = getWalletBySource(selectedItem as string)

  // Extract the wallet extension from the wallet object
  const extension = wallet?.extension

  // Return the wallet extension, which can be used for further interactions
  return extension
}
