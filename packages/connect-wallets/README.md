# @polkadot/connect-wallets

The `@polkadot/connect-wallets` package offers a modular solution for constructing wallet connection user interfaces (UIs) within decentralized applications (DApps). It mitigates the limitations observed in the `@polkadot/extension-dapp` package, particularly the proliferation of multiple popup dialogs when interfacing with various wallet extensions.

With the emergence of multiple wallet extensions—such as Talisman and Polkadot.js—users face an unsatisfactory experience when forced to encounter several popups for wallet connections. The `@polkadot/connect-wallets` package enhances user experience by allowing seamless selection and integration of a single wallet at a time.

## Installation

To incorporate the `@polkadot/connect-wallets` package into your project, execute one of the following commands using your preferred package manager:

```bash
# npm
npm install --save @polkadot/connect-wallets

# bun
bun add @polkadot/connect-wallets

# pnpm
pnpm add @polkadot/connect-wallets

# yarn
yarn add @polkadot/connect-wallets
```

## Quick Start Guide

### Implementing a Wallet Selector UI

Here’s an example of a wallet selection UI implementation:

```tsx
import { getWallets } from '@polkadot/connect-wallets'

const DAPP_NAME = 'Your DApp Name' // Replace with the actual name of your DApp

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
                  // Handle retrieved accounts accordingly...
                  // Store the selected wallet information for future use...
                },
              )
            } catch (error) {
              // Handle errors according to your application's needs
              console.error('Error connecting to wallet:', error)
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

The following code snippet demonstrates how to sign a message using the connected wallet:

```tsx
try {
  // Ensure `account` is available, retrieve wallet by its source if necessary
  const signer = account.wallet.signer

  // This invocation will prompt the wallet extension
  const { signature } = await signer.signRaw({
    type: 'payload',
    data: 'Some data to sign...',
    address: account.address,
  })
} catch (error) {
  // Manage any potential errors
  console.error('Error signing message:', error)
}
```

## API Reference

### `getWallets(): Wallet[]`

Returns an array of all supported wallet instances.

### `getWalletBySource(source: string): Wallet`

Retrieves a wallet instance by its extension name (source). This method is particularly useful when the `account: WalletAccount` instance is not readily accessible.

### `wallet.enable(dappName: string): Promise<void>`

Initiates the connection to the wallet extension and must be invoked prior to subscribing to accounts. The first-time execution will trigger a popup prompting the user.

### `wallet.getAccounts(type?: boolean): Promise<WalletAccount[]>`

Asynchronously retrieves the associated accounts from the connected wallet.

### `wallet.subscribeAccounts(callback: (accounts: WalletAccount[]) => void): UnsubscribeFn`

Subscribes to account changes from the wallet extension. It is crucial to call the returned `unsubscribe` function to avoid memory leaks.

### `wallet.extension: WalletExtension`

The primary interface for DApp developers to interact with the wallet. For detailed capabilities, refer to the associated documentation. See `BaseDotsamaWallet.extension()` for a practical example.

### `wallet.signer: Signer`

A convenience interface property derived from `wallet.extension`, utilized for signing operations.

## Type Definitions

For exhaustive type definitions, please consult `packages/connect-wallets/src/types.ts`.

## Contributing New Wallets

To contribute a new wallet implementation, adhere to the following guidelines:

1. Add the new wallet in `packages/connect-wallets/src/lib/` (e.g., `packages/connect-wallets/src/lib/foo-wallet/index.ts`).
2. Create a class implementing the `Wallet` interface (e.g., `export class FooWallet implements Wallet`).
3. Update the `supportedWallets` array in `packages/connect-wallets/src/lib/wallets.ts` to include the new wallet instance.
4. **IMPORTANT**: Ensure that wallet logos do not exceed 10KB, as they will be inlined.

**Note**: If multiple wallets conform to a similar interface, it is advisable to implement a base class to curb code redundancy. Refer to `BaseDotsamaWallet` for a blueprint on constructing a base class and its derivatives.

## License

This project is under the [MIT License](https://opensource.org/licenses/MIT).
