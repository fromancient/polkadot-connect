import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base wallet class for inheritance
import logo from './logo.svg' // Importing the wallet's logo image

// Define the EnkryptWallet class, extending BaseDotsamaWallet
export class EnkryptWallet extends BaseDotsamaWallet {
  extensionName = 'enkrypt' // The name of the wallet extension
  title = 'Enkrypt' // Title displayed for the wallet
  installUrl = 'https://www.enkrypt.com/#overview' // URL for users to install or learn more about Enkrypt
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Suggested message when no extension is found
  logo = {
    src: logo, // Path to the logo image file
    alt: 'Enkrypt Logo', // Alternative text for the logo, for accessibility
  }
}
