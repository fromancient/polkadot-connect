import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for Manta Wallet

// Define the MantaWallet class, extending BaseDotsamaWallet
export class MantaWallet extends BaseDotsamaWallet {
  extensionName = 'manta-wallet-js' // The identifier for the Manta Wallet extension
  title = 'Manta Wallet' // The title that will be displayed to users
  installUrl =
    'https://chrome.google.com/webstore/detail/manta-wallet/enabgbdfcbaehmbigakijjabdpdnimlg' // URL for users to install Manta Wallet
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Message shown if the extension is not found
  logo = {
    src: logo, // Path to the logo image for Manta Wallet
    alt: 'Manta Logo', // Alt text for accessibility, describing the logo
  }
}
