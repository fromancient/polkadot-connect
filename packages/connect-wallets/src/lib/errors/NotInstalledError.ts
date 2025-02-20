import { BaseWalletError } from './BaseWalletError' // Importing the base wallet error class

// Define the NotInstalledError class, extending BaseWalletError
export class NotInstalledError extends BaseWalletError {
  readonly name = 'NotInstalledError' // Setting the name property to identify the error type
}
