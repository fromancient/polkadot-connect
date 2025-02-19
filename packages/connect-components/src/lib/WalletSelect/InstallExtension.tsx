import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react' // Import the chevron-right icon as a React component
import { WithWalletProps } from './types' // Import type definitions for wallet props
import styles from './WalletSelect.module.css' // Import the CSS module for styling

// The InstallExtension component is responsible for rendering the UI
// when the user needs to install a wallet extension
export function InstallExtension({ wallet: selectedWallet }: WithWalletProps) {
  // If the selectedWallet has a noExtensionMessage, display it
  return (
    <>
      <div className={styles['no-extension-message']}>
        {selectedWallet?.noExtensionMessage}{' '}
        {/* Display any message indicating the absence of an extension */}
      </div>
      {/* Render a button that links to the wallet's installation URL */}
      <a
        className={styles['row-button']} // Assign CSS class for styling the button
        href={selectedWallet?.installUrl} // Set the hyperlink reference to the wallet's installation URL
        target="_blank" // Open the link in a new tab
        rel="noreferrer noopener" // Security attributes to prevent vulnerabilities
      >
        <button className={styles['row-button']}>
          {' '}
          {/* Render a button within the link */}
          <span className={styles['flex']}>
            {' '}
            {/* Use flexbox for layout */}
            {/* Display the wallet's logo */}
            <img
              src={selectedWallet?.logo.src} // Source of the logo image
              alt={selectedWallet?.logo.alt} // Alternative text for the logo
              width={32} // Set the width of the logo
              height={32} // Set the height of the logo
            />
            {/* Display the wallet's title with installation instruction */}
            Install {selectedWallet?.title}
          </span>
          {/* Display a chevron-right icon to indicate more actions */}
          <ChevronRightIcon />
        </button>
      </a>
    </>
  )
}
