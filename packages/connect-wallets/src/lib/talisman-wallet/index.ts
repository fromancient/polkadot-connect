import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for Talisman Wallet

// Define the TalismanWallet class, extending BaseDotsamaWallet
export class TalismanWallet extends BaseDotsamaWallet {
  extensionName = 'talisman' // The identifier for the Talisman extension
  title = 'Talisman' // The title displayed to users
  installUrl = 'https://talisman.xyz/download' // URL for users to download or install Talisman
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Alternative wallet suggestion message
  logo = {
    src: logo, // Path to the logo image for Talisman Wallet
    alt: 'Talisman Logo', // Alt text for accessibility, describing the logo
  }
}
