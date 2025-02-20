// Function to shorten a wallet address while keeping a specified number of characters at both ends
export const shortenAddress = (address: string, keepStart = 4, keepEnd = 4) =>
  // Concatenate the beginning of the address, an ellipsis, and the end of the address
  `${address.substring(0, keepStart)}…${address.substring(address.length - keepEnd)}`

// @deprecated -> rename to use `shortenAddress` instead
// The `truncateMiddle` function is deprecated and should now refer to `shortenAddress`
export const truncateMiddle = shortenAddress
