import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react'
import { WithWalletProps } from './types'
import styles from './WalletSelect.module.css'

// The InstallExtension component is responsible for rendering the UI
// when the user needs to install a wallet extension
export function InstallExtension({ wallet: selectedWallet }: WithWalletProps) {
  // If the selectedWallet has a noExtensionMessage, display it
  return (
    <>
      <div className={styles['no-extension-message']}>
        {selectedWallet?.noExtensionMessage}
      </div>
      {/* Render a button that links to the wallet's installation URL */}
      <a
        className={styles['row-button']}
        href={selectedWallet?.installUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <button className={styles['row-button']}>
          <span className={styles['flex']}>
            {/* Display the wallet's logo */}
            <img
              src={selectedWallet?.logo.src}
              alt={selectedWallet?.logo.alt}
              width={32}
              height={32}
            />
            {/* Display the wallet's title */}
            Install {selectedWallet?.title}
          </span>
          {/* Display a chevron-right icon */}
          <ChevronRightIcon />
        </button>
      </a>
    </>
  )
}
