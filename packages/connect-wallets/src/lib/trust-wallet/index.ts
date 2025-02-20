import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for Trust Wallet

// Define the TrustWallet class, extending BaseDotsamaWallet
export class TrustWallet extends BaseDotsamaWallet {
  extensionName = 'trust' // The identifier for the Trust Wallet extension
  title = 'Trust Wallet' // The title displayed to users
  installUrl = 'https://trustwallet.com/download' // URL for users to download or install Trust Wallet
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Alternative wallet suggestion message
  logo = {
    src: logo, // Path to the logo image for Trust Wallet
    alt: 'Trust Wallet Logo', // Alt text for accessibility, describing the logo
  }
}
