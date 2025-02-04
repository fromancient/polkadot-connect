import { isWalletInstalled } from '@polkadot/connect-wallets'

export function removeIfUninstalled() {
  // Check saved `@polkadot-connect/selected-wallet-name`
  // to see if the it is still installed or not.
  const selectedName = localStorage.getItem(
    '@polkadot-connect/selected-wallet-name',
  )
  if (!isWalletInstalled(selectedName)) {
    localStorage.removeItem('@polkadot-connect/selected-wallet-name')
  }
}
