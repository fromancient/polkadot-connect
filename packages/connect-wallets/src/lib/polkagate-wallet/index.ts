import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base class for Dotsama wallets
import logo from './logo.svg' // Importing the logo image for PolkaGate

// Define the PolkaGate class, extending BaseDotsamaWallet
export class PolkaGate extends BaseDotsamaWallet {
  extensionName = 'polkagate' // The identifier for the PolkaGate extension
  title = 'PolkaGate' // The title displayed to users
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Suggestion for alternative wallets if PolkaGate is not installed
  installUrl =
    'https://chrome.google.com/webstore/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp' // URL for users to install PolkaGate
  logo = {
    src: logo, // Path to the logo image for PolkaGate
    alt: 'PolkaGate Logo', // Alt text for accessibility, describing the logo
  }
}
