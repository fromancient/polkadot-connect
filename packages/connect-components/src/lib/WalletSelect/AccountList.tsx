// Import necessary modules and components from external libraries
import { shortenAddress } from '@polkadot/connect-ui' // Function to shorten a cryptocurrency address
import { WalletAccount } from '@polkadot/connect-wallets' // Type definition for wallet accounts

// Importing an icon component to indicate interaction
import ChevronRightIcon from '../../assets/icons/chevron-right.svg?react'
// Importing type definitions for component props
import { ListWithClickProps } from './types'
// Importing CSS module for styling
import styles from './WalletSelect.module.css'

// Define the functional component named AccountList
export function AccountList(props: ListWithClickProps<WalletAccount>) {
  const { items, onClick } = props // Destructure props to extract items and onClick function

  // If there are no items, return null to render nothing
  if (!items) {
    return null
  }

  return (
    // Using a React fragment to group children without adding extra nodes to the DOM
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {items?.map((account) => {
        // Map over each account item to create a button for each account
        return (
          <button
            key={`${account.source}-${account.address}`} // Unique key for each button based on account source and address
            className={styles['row-button']} // Apply CSS styling from the imported module
            onClick={() => onClick?.(account)} // Handle click event, calling onClick function with the account as an argument
          >
            <span style={{ textAlign: 'left' }}>
              {' '}
              {/* Use a span to align account details to the left */}
              <div>{account.name}</div> {/* Display the account name */}
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {' '}
                {/* Display the shortened address with smaller and faded style */}
                {shortenAddress(account.address)}
              </div>
            </span>
            <ChevronRightIcon />{' '}
            {/* Render the icon indicating the action of clicking */}
          </button>
        )
      })}
    </>
  )
}
