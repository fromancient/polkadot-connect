import { shortenAddress } from '@polkadot/connect-ui'
import { WalletAccount } from '@polkadot/connect-wallets'

import styles from './WalletSelect.module.css'

/**
 * The ListSkeleton component is responsible for rendering a list of placeholder
 * wallet accounts to create a loading state for the wallet selection UI.
 */
export function ListSkeleton() {
  // Create an array of 2 dummy wallet account objects
  const listItems = Array.from(
    { length: 2 },
    (_v, i): WalletAccount => ({
      name: 'dummy',
      source: `${i}`,
      address: 'dummy',
    }),
  )

  return (
    // Render the list of placeholder wallet accounts
    <>
      {listItems?.map((account) => {
        return (
          <div
            key={`${account.source}-${account.address}`}
            className={styles['row-button']}
          >
            <span
              style={{
                textAlign: 'left',
                opacity: 0,
              }}
            >
              {/* Display the wallet account name */}
              <div>{account.name}</div>
              {/* Display the shortened wallet address */}
              <div style={{ fontSize: 'small', opacity: 0.5 }}>
                {shortenAddress(account.address)}
              </div>
            </span>
          </div>
        )
      })}
    </>
  )
}
