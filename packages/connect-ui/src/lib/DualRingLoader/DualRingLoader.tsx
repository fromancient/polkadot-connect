import { HTMLAttributes } from 'react' // Import HTMLAttributes for typing props

import styles from './DualRingLoader.module.css' // Import CSS styles for the loader

// Define the DualRingLoader functional component
export const DualRingLoader = ({
  className = '', // Default className to an empty string if not provided
  style, // Optional style to apply to the loader
}: HTMLAttributes<HTMLDivElement>) => (
  // Return a div element with the loader's CSS class and any additional classes/styles
  <div className={`${styles['lds-dual-ring']} ${className}`} style={style} />
)
