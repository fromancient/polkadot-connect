import { BaseDotsamaWallet } from '../base-dotsama-wallet' // Importing the base wallet class
import logo from './logo.svg' // Importing the wallet logo

// Define the AlephZeroWallet class, extending BaseDotsamaWallet
export class AlephZeroWallet extends BaseDotsamaWallet {
  extensionName = 'aleph-zero' // The name of the wallet extension
  title = 'Aleph Zero Signer' // The title displayed for the wallet
  installUrl = 'https://alephzero.org/signer' // URL for users to install the wallet extension
  noExtensionMessage =
    'You can use any Polkadot compatible wallet but we recommend using Talisman' // Message to display when there is no extension found
  logo = {
    src: logo, // The source of the logo image
    alt: 'Aleph Zero Logo', // Alternative text for the logo
  }
}
