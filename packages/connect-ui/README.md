# @polkadot/connect-ui

`@polkadot/connect-ui` is a library designed for seamless integration with Polkadot's ecosystem, providing customizable UI components and helpful hooks for building decentralized applications.

## Installation

To install the library, use npm:

```bash
npm install --save @polkadot/connect-ui
```

## Components

### Modal

The `Modal` component is a versatile dialog box for displaying information and user interactions.

#### Example

```tsx
import { Modal } from '@polkadot/connect-ui'

;<Modal
  className="your-custom-class" // Optional: Custom styles
  title="Your Modal Title" // Required: The Modal title
  isOpen={true} // Required: Boolean indicating if the modal is open
  appId="unique-modal-app-id" // Optional: The identifier for appending the modal
  handleClose={() => {
    /* your close logic */
  }} // Required: Callback for closing the modal
  handleBack={() => {
    /* your back button logic */
  }} // Optional: Callback for back button handling
>
  <div>The modal body content goes here.</div>
</Modal>
```

## Hooks

### `useLocalStorage`

Easily manage localStorage values with this custom hook.

#### Example

```tsx
import { useLocalStorage } from '@polkadot/connect-ui'

const DummyComponent = () => {
  const [value, setValue] = useLocalStorage('dummy-key')

  return (
    <button onClick={() => setValue('Dummy')}>{value || 'Click Me'}</button>
  )
}
```

### `useOnClickOutside`

Detects clicks outside a specified `ref` element and executes a callback function.

#### Example

```tsx
import { useOnClickOutside } from '@polkadot/connect-ui'
import { useRef } from 'react'

const PopupComponent = ({ handleClose }) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, handleClose)

  return <div ref={ref}>/* Content goes here */</div>
}
```

## Utilities

### `shortenAddress`

Use this utility function to truncate cryptocurrency addresses, preserving the start and end segments.

#### Example

```tsx
import { shortenAddress } from '@polkadot/connect-ui'

const shortenedAddress = shortenAddress(
  '5FNfznCsgDKywfDXsYTf7YydpnMHUr8fjabK48rS2oFUugdc',
) // Returns: 5FNf…ugdc
```

## Contributing

We welcome contributions to `@polkadot/connect-ui`. Please feel free to open issues or submit pull requests to enhance the library.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
