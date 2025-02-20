import { BaseWalletError } from './BaseWalletError' // Importing the base wallet error class

// Define the SetupNotDoneError class, extending BaseWalletError
export class SetupNotDoneError extends BaseWalletError {
  readonly name = 'SetupNotDoneError' // Setting the name property to identify the specific error type
}
