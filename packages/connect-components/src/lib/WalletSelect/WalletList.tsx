// Import necessary modules and components
import { Wallet } from '@polkadot/connect-wallets'

import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react'
import Download from '../../assets/icons/download.svg?react'
import { ListWithClickProps } from './types'
import styles from './WalletSelect.module.css'

// Define the WalletList component which accepts wallet items and click handler
export function WalletList({
  items,
  makeInstallable,
  onClick,
}: ListWithClickProps<Wallet>) {
  // Return null if there are no items to display
  if (!items) return null

  return (
    <>
      {/* Map over each wallet item and render a WalletItem component */}
      {items.map((wallet, index) => (
        <WalletItem
          key={index} // Use index as the key
          makeInstallable={makeInstallable} // Pass props to WalletItem
          onClick={onClick}
          wallet={wallet}
        />
      ))}
    </>
  )
}

// Define the WalletItem component which represents a single wallet option
export const WalletItem = ({
  makeInstallable,
  onClick,
  wallet,
}: { wallet: Wallet } & Pick<
  ListWithClickProps<Wallet>,
  'makeInstallable' | 'onClick'
>) => {
  // Check if the wallet is available for selection
  const available =
    wallet.installed || wallet.extensionName == 'talisman' || makeInstallable

  // Determine if the wallet can be installed based on its current status
  const canInstallWallet =
    makeInstallable ||
    (wallet.extensionName === 'talisman' && !wallet.installed)

  // Function to handle wallet selection on click
  const selectWallet = () => onClick?.(wallet)

  // Function to handle wallet installation when required
  const installWallet = () =>
    window.open(wallet.installUrl, '_blank', 'noopener,noreferrer')

  // Determine the click handler based on wallet status
  const handleClick = wallet.installed
    ? selectWallet // If installed, select the wallet
    : canInstallWallet // If can be installed, trigger install
      ? installWallet
      : undefined // Otherwise, no action

  return (
    <button
      className={
        available ? styles['row-button'] : styles['row-button-unavailable']
      }
      onClick={handleClick} // Assign the click handler
    >
      <span className={styles['flex']}>
        <img
          src={wallet.logo.src} // Display wallet logo
          alt={wallet.logo.alt}
          width={32}
          height={32}
        />
        {!wallet.installed ? 'Get ' : ''}{' '}
        {/* Conditional text based on installation status */}
        {wallet.title} {/* Display wallet title */}
      </span>

      {/* Display different icons or text based on wallet installation status */}
      {wallet.installed ? (
        <ChevronRightIcon /> // Indicate the wallet is selected
      ) : canInstallWallet ? (
        <Download /> // Display download icon if installable
      ) : (
        'Not Installed' // Show 'Not Installed' text if neither
      )}
    </button>
  )
}
