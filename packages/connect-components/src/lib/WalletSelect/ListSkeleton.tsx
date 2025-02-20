// Import the function to shorten wallet addresses
import { shortenAddress } from '@polkadot/connect-ui'
// Import the WalletAccount type for typing purposes
import { WalletAccount } from '@polkadot/connect-wallets'

// Import CSS styles specific to the WalletSelect component
import styles from './WalletSelect.module.css'

/**
 * The ListSkeleton component is responsible for rendering a list of placeholder
 * wallet accounts to create a loading state for the wallet selection UI.
 */
export function ListSkeleton() {
  // Create an array of 2 dummy wallet account objects
  const listItems = Array.from(
    { length: 2 }, // Specifies that we want 2 items in the array
    (_v, i): WalletAccount => ({
      name: 'dummy', // Placeholder name for the wallet account
      source: `${i}`, // Unique source identifier based on the index
      address: 'dummy', // Placeholder address for the wallet account
    }),
  )

  return (
    // Render the list of placeholder wallet accounts
    <>
      {listItems?.map((account) => {
        // Map over the array of dummy accounts
        return (
          <div
            key={`${account.source}-${account.address}`} // Unique key for each item using source and address
            className={styles['row-button']} // Apply CSS class for styling
          >
            <span
              style={{
                textAlign: 'left', // Align text to the left
                opacity: 0, // Set opacity to 0 to keep it hidden (for loading state)
              }}
            >
              {/* Display the wallet account name */}
              <div>{account.name}</div>
              {/* Display the shortened wallet address */}
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {' '}
                {/* Slightly less opaque to indicate it is secondary information */}
                {shortenAddress(account.address)} // Shorten and display the
                wallet address
              </div>
            </span>
          </div>
        )
      })}
    </>
  )
}
