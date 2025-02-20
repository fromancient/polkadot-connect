import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for SubWallet

// Define the SubWallet class, extending BaseDotsamaWallet
export class SubWallet extends BaseDotsamaWallet {
  extensionName = 'subwallet-js' // The identifier for the SubWallet extension
  title = 'SubWallet' // The title displayed to users
  installUrl =
    'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn?hl=en&authuser=0' // URL for users to install SubWallet
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Suggestion for alternative wallet if SubWallet is not installed
  logo = {
    src: logo, // Path to the logo image for SubWallet
    alt: 'Subwallet Logo', // Alt text for accessibility, describing the logo
  }
}
