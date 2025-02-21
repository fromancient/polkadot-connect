# polkadot-connect

**polkadot-connect** is a robust library designed to facilitate seamless connections between your decentralized applications (DApps) and Polkadot wallets. It provides an intuitive interface for integrating wallet functionalities, ensuring a smooth and user-friendly experience.

## Features

- **Easy Integration**: Rapidly connect your DApp to various Polkadot wallets with minimal setup.
- **User-Friendly API**: Leverage simple methods for managing wallet connections and transactions.
- **Supports Multiple Wallets**: Fully compatible with popular Polkadot wallets, including [Polkadot.js](https://polkadot.js.org/) and others.
- **Event Management**: Listen to wallet events such as connection, disconnection, and account changes.
- **Enhanced Security**: Built with best practices to ensure secure wallet interactions.

## Installation

To install `polkadot-connect`, you can use npm or yarn:

Using npm:

```bash
npm install @joinerdavid0213/polkadot-connect
```

Using Yarn:

```bash
yarn add @joinerdavid0213/polkadot-connect
```

## Usage

Here’s a quick example of how to use `polkadot-connect` in your DApp:

```javascript
import { connectWallet } from 'polkadot-connect'

async function init() {
  try {
    const wallet = await connectWallet()
    console.log('Connected to wallet:', wallet)
  } catch (error) {
    console.error('Failed to connect to wallet:', error)
  }
}

init()
```

### Listening for Events

You can also listen for events like connection status changes:

```javascript
import {
  connectWallet,
  onWalletConnect,
  onWalletDisconnect,
} from 'polkadot-connect'

onWalletConnect((wallet) => {
  console.log('Wallet connected:', wallet)
})

onWalletDisconnect(() => {
  console.log('Wallet disconnected')
})

async function init() {
  // Your wallet connection logic here
}

init()
```

## Documentation

For more detailed information on how to utilize the library’s features, please refer to the [documentation](https://github.com/joinerdavid0213/polkadot-connect/docs) (link will be added once the docs are available).

## Contributing

We welcome contributions! If you'd like to contribute to **polkadot-connect**, please fork the repository and submit a pull request. Make sure to follow the [contributing guidelines](https://github.com/joinerdavid0213/polkadot-connect/CONTRIBUTING.md) (link will be added once the guidelines are available).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For questions, support, or feedback, please open an issue on GitHub or contact us via email at joinercantillo0813@gmail.com.
