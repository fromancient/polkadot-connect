import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for Fearless Wallet

// Define the FearlessWallet class, extending BaseDotsamaWallet
export class FearlessWallet extends BaseDotsamaWallet {
  extensionName = 'fearless-wallet' // The identifier for the wallet extension
  title = 'Fearless Wallet' // The title that will be displayed to the user
  installUrl =
    'https://chrome.google.com/webstore/detail/fearless-wallet/nhlnehondigmgckngjomcpcefcdplmgc' // URL for users to install Fearless Wallet
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Message to display if the extension is not found
  logo = {
    src: logo, // Path to the logo image for Fearless Wallet
    alt: 'Fearless Wallet Logo', // Alt text for accessibility, describing the logo
  }
}
