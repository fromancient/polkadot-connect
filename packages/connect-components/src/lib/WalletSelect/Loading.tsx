import styles from './Loading.module.css' // Importing the CSS module for styling the loading component

// Define the Loading functional component
export const Loading = () => {
  return (
    <>
      {/* Container for the loading indicator */}
      <div
        style={{
          width: '100%', // Set the width to 100% of the parent element
          display: 'inline-flex', // Use inline-flex to center the loader
          justifyContent: 'center', // Center the loader horizontally
        }}
      >
        {/* Loader animation from the imported styles */}
        <div className={styles['lds-dual-ring']} />
      </div>

      {/* Text below the loader stating what the user should do if it takes too long */}
      <div style={{ textAlign: 'center', margin: '2rem 2rem 0' }}>
        If this is taking a while, please refresh the browser.
      </div>
    </>
  )
}
