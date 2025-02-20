import { Wallet } from '../../types' // Importing the Wallet type definition

// Define the WalletError interface, extending the built-in Error interface
export interface WalletError extends Error {
  readonly wallet: Wallet // Adding a readonly wallet property
}

// Define the BaseWalletError class, which extends the built-in Error class and implements WalletError
export class BaseWalletError extends Error implements WalletError {
  name = 'WalletError' // Specific name for the wallet error
  readonly wallet: Wallet // Readonly property to hold the wallet reference

  constructor(message: string, wallet: Wallet) {
    super(message) // Call the base Error constructor with the error message

    // Restore the prototype chain to the correct constructor
    Object.setPrototypeOf(this, new.target.prototype)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseWalletError)
    }

    this.wallet = wallet // Assign the wallet object to the instance
  }
}
