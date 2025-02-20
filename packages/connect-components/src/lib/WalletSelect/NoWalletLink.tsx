// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Define the NoWalletLink functional component, accepting props of any type
export function NoWalletLink(props: any) {
  return (
    <div
      style={{
        textAlign: 'center', // Center the text horizontally within the div
        textDecoration: 'underline', // Underline the text for emphasis
        width: '100%', // Make the div take the full width of its container
        fontSize: 'small', // Set the font size to small
        opacity: 0.5, // Set the opacity to 50% to indicate it's less prominent
        cursor: 'pointer', // Change the cursor to a pointer to indicate clickable text
      }}
      onClick={props.onClick} // Handle click events by calling the onClick function passed in props
    >
      I don't have a wallet {/* Display the link text */}
    </div>
  )
}
