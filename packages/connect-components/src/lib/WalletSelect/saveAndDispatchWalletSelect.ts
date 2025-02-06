import { Wallet } from '@polkadot/connect-wallets'

export function saveAndDispatchWalletSelect(wallet: Wallet) {
  localStorage.setItem(
    '@polkadot-connect/selected-wallet-name',
    wallet.extensionName,
  )

  const walletSelectedEvent = new CustomEvent(
    '@polkadot-connect/wallet-selected',
    {
      detail: wallet,
    },
  )

  document.dispatchEvent(walletSelectedEvent)
  console.info(`Event: @polkadot-connect/wallet-selected`, wallet)
}
