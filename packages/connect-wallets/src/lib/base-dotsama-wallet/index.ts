import type { Signer as InjectedSigner } from '@polkadot/api/types'
import {
  InjectedAccount,
  InjectedExtension,
  InjectedWindow,
} from '@polkadot/extension-inject/types'

import { SubscriptionFn, Wallet, WalletAccount } from '../../types'
import { AuthError } from '../errors/AuthError'
import { WalletError } from '../errors/BaseWalletError'
import { NotInstalledError } from '../errors/NotInstalledError'

// TODO: Create a proper BaseWallet class to offload common checks
export class BaseDotsamaWallet implements Wallet {
  // Properties to hold wallet extension details
  extensionName = '' // Name of the wallet extension
  title = '' // Display title for the wallet
  installUrl = '' // URL for installing the wallet extension
  logo = {
    src: '', // Source URL for the wallet logo
    alt: '', // Alternative text for the wallet logo
  }

  // Internal properties to hold extension and signer instance
  _extension: InjectedExtension | undefined
  _signer: InjectedSigner | undefined

  // Getter for accessing the injected extension
  // API docs: https://polkadot.js.org/docs/extension/
  get extension() {
    return this._extension
  }

  // Getter for accessing the signer associated with the injected extension
  // API docs: https://polkadot.js.org/docs/extension/
  get signer() {
    return this._signer
  }

  // Checks if the wallet is installed by verifying the presence of the extension
  get installed() {
    const injectedWindow = window as Window & InjectedWindow
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.extensionName]
    return !!injectedExtension
  }

  // Retrieves the raw injected extension object from the window
  get rawExtension() {
    const injectedWindow = window as Window & InjectedWindow
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.extensionName]
    return injectedExtension
  }

  // Transforms errors into WalletError or AuthError types for better handling
  transformError = (err: Error): WalletError | Error => {
    if (err.message.includes('pending authorization request')) {
      // If the error relates to a pending request, return an AuthError
      return new AuthError(err.message, this)
    }
    // Otherwise, return the original error
    return err
  }

  // Enables the wallet for a specified dapp by its name
  enable = async (dappName: string) => {
    if (!dappName) {
      throw new Error('MissingParamsError: Dapp name is required.')
    }
    if (!this.installed) {
      throw new NotInstalledError(
        `Refresh the browser if ${this.title} is already installed.`,
        this,
      )
    }
    try {
      // Retrieve the raw extension and enable it for the dapp
      const injectedExtension = this.rawExtension
      const rawExtension = await injectedExtension?.enable?.(dappName)
      // Check if the extension is returned after enabling
      if (!rawExtension) {
        throw new NotInstalledError(
          `${this.title} is installed but is not returned by the 'Wallet.enable(dappname)' function`,
          this,
        )
      }

      // Create an injected extension object with necessary details
      const extension: InjectedExtension = {
        ...rawExtension,
        name: this.extensionName, // Assign the extension name
        version: injectedExtension.version ?? '?', // Assign version or default to '?'
      }

      this._extension = extension // Set the extension
      this._signer = extension?.signer // Set the signer
    } catch (err) {
      throw this.transformError(err as WalletError) // Transform and throw error
    }
  }

  // Retrieves accounts associated with the wallet, optionally of any type
  getAccounts = async (anyType?: boolean): Promise<WalletAccount[]> => {
    if (!this._extension) {
      throw new NotInstalledError(
        `The 'Wallet.enable(dappname)' function should be called first.`,
        this,
      )
    }
    const accounts = await this._extension.accounts.get(anyType) // Fetch accounts
    // Map over the accounts to include additional fields for convenience
    const accountsWithWallet = accounts.map((account) => {
      return {
        ...account,
        source: this._extension?.name as string, // Source name of the extension
        wallet: this, // Reference to the wallet instance
        signer: this._extension?.signer, // Reference to the signer
      }
    })

    return accountsWithWallet // Return enhanced accounts
  }

  // Subscribes to account changes and invokes a callback when accounts update
  subscribeAccounts = async (callback: SubscriptionFn) => {
    if (!this._extension) {
      throw new NotInstalledError(
        `The 'Wallet.enable(dappname)' function should be called first.`,
        this,
      )
    }
    // Subscribe to account changes
    const unsubscribe = this._extension.accounts.subscribe(
      (accounts: InjectedAccount[]) => {
        // Map over the accounts to include additional fields for convenience
        const accountsWithWallet = accounts.map((account) => {
          return {
            ...account,
            source: this._extension?.name as string, // Source name of the extension
            wallet: this, // Reference to the wallet instance
            signer: this._extension?.signer, // Reference to the signer
          }
        })
        callback(accountsWithWallet) // Invoke the provided callback with updated accounts
      },
    )

    return unsubscribe // Return unsubscribe function for later cleanup
  }
}
