import { BaseWalletError } from './BaseWalletError' // Importing the base error class for wallet-related errors

// Define the AuthError class, extending BaseWalletError
export class AuthError extends BaseWalletError {
  readonly name = 'AuthError' // Name of the error, indicating it is related to authentication
}
