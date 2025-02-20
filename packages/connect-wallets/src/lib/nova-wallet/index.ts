import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for Nova Wallet

// Define the NovaWallet class, extending BaseDotsamaWallet
export class NovaWallet extends BaseDotsamaWallet {
  extensionName = 'polkadot-js' // The identifier for the Nova Wallet extension
  title = 'Nova Wallet' // The title displayed to users
  noExtensionMessage =
    'You can use any Polkadot js compatible option but we recommend using Nova Wallet' // Message displayed if the extension is not found
  installUrl = 'https://novawallet.io' // URL for users to install or access Nova Wallet
  logo = {
    src: logo, // Path to the logo image for Nova Wallet
    alt: 'Nova Wallet Logo', // Alt text for accessibility, describing the logo
  }
}
