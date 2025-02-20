import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for Polkadot.js Wallet

// Define the PolkadotjsWallet class, extending BaseDotsamaWallet
export class PolkadotjsWallet extends BaseDotsamaWallet {
  extensionName = 'polkadot-js' // Identifier for the Polkadot.js wallet extension
  title = 'Polkadot.js' // Title displayed to users
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Message shown if the extension is not found
  installUrl = 'https://polkadot.js.org/extension/' // URL for users to install Polkadot.js wallet
  logo = {
    src: logo, // Path to the logo image for Polkadot.js Wallet
    alt: 'Polkadotjs Logo', // Alt text for accessibility, describing the logo
  }
}
