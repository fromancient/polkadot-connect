# @polkadot/connect-wallets

This package provides essential building blocks for wallet connection user interfaces (UIs) in decentralized applications (DApps). It addresses the shortcomings of the existing `@polkadot/extension-dapp` package, particularly the issue of multiple popup dialogues from different wallet extensions.

With the introduction of multiple wallet extensions like Talisman alongside the Polkadot.js extension, having several popups for wallet connections is not ideal. Most use cases would benefit from allowing users to select and enable only one wallet at a time. The `@polkadot/connect-wallets` package aims to streamline this process.

## Setup

You can install the `@polkadot/connect-wallets` package using your preferred package manager:

```bash
# Using npm
npm install --save @polkadot/connect-wallets

# Using bun
bun add @polkadot/connect-wallets

# Using pnpm
pnpm add @polkadot/connect-wallets

# Using yarn
yarn add @polkadot/connect-wallets
```

## Quick Start

### Wallet Selector UI

Below is a sample implementation of a wallet selector UI:

```tsx
import { getWallets } from '@polkadot/connect-wallets'

const DAPP_NAME = 'Your DApp Name' // Replace with your actual DApp name

const MyWalletSelector = () => {
  const supportedWallets: Wallet[] = getWallets()
  return (
    <div>
      {supportedWallets.map((wallet: Wallet) => (
        <button
          key={wallet.extensionName}
          onClick={async () => {
            try {
              await wallet.enable(DAPP_NAME)
              const unsubscribe = await wallet.subscribeAccounts(
                (accounts: WalletAccount[]) => {
                  // Handle the accounts...
                  // Save the selected wallet name for future reference...
                },
              )
            } catch (err) {
              // Handle error (Refer to `packages/connect-wallets/src/lib/errors`)
              console.error('Error connecting to wallet:', err)
            }
          }}
        >
          Connect to {wallet.title}
        </button>
      ))}
    </div>
  )
}
```

### Example: Signing a Message

Here's an example of how to sign a message using the connected wallet:

```tsx
try {
  // If `account` object is not available, retrieve the wallet by its source
  const signer = account.wallet.signer

  // This line will trigger the wallet extension popup
  const { signature } = await signer.signRaw({
    type: 'payload',
    data: 'Some data to sign...',
    address: account.address,
  })
} catch (err) {
  // Handle error...
  console.error('Error signing message:', err)
}
```

## Functions

### `getWallets(): Wallet[]`

Retrieves all the supported wallets.

### `getWalletBySource(source: string): Wallet`

Retrieves a wallet by its extension name (source). This is useful if the `account: WalletAccount` object is not readily available.

### `wallet.enable(dappName)`

Must be called to connect to the wallet extension before subscribing to accounts. This will trigger a popup if it is the first time being enabled.

### `wallet.getAccounts(anyType?: boolean): Promise<WalletAccount[]>`

Fetches the accounts from the connected wallet.

### `wallet.subscribeAccounts(callback): UnsubscribeFn`

Subscribes to account changes from the wallet extension. Remember to call the returned `unsubscribe` function to clean up.

### `wallet.extension`

This is the main interface for DApp developers to interact with the wallet. Refer to the related documentation for its capabilities. See `BaseDotsamaWallet.extension()` for an example.

### `wallet.signer`

A convenience property derived from `wallet.extension`, used for signing operations.

## Interfaces

For detailed type definitions, please refer to `packages/connect-wallets/src/types.ts`.

## Contributing New Wallets

If you'd like to contribute new wallet implementations, follow these steps:

1. Add the new wallet under `packages/connect-wallets/src/lib/` (e.g., `packages/connect-wallets/src/lib/foo-wallet/index.ts`).
2. Create a class that implements the `Wallet` interface (e.g., `export class FooWallet implements Wallet`).
3. Include the wallet instance in the `supportedWallets` array in `packages/connect-wallets/src/lib/wallets.ts`.
4. **IMPORTANT**: Ensure that the wallet logo does not exceed 10KB, as it will be inlined.

Note: If multiple wallets share a similar interface, it's recommended to create a base class to avoid code duplication. See the `BaseDotsamaWallet` for an example of a base class and its derived classes.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
