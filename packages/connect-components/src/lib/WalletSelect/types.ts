import { Wallet } from '@polkadot/connect-wallets'

// Interface defining the properties for a list component with clickable items
export interface ListWithClickProps<T> {
  // Optional array of items of generic type T
  items?: T[]

  // Optional flag to indicate if items can be installed
  makeInstallable?: boolean

  // Callback function to handle click events on an item of type T
  onClick: (item: T) => unknown
}

// Interface defining the properties required for a component that uses a wallet
export interface WithWalletProps {
  // The wallet object that will be used in the component
  wallet: Wallet
}
