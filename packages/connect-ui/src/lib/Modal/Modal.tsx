import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Importing icons for use in the modal
import ChevronLeftIcon from '../../assets/icons/chevron-left.svg?react'
import XIcon from '../../assets/icons/x.svg?react'
import { useOnClickOutside } from '../useOnClickOutside/useOnClickOutside' // Custom hook for handling clicks outside modal
import styles from './Modal.module.css' // CSS styles for the modal

// TODO: Move this to @polkadot/connect-ui
// Interface defining the props that the Modal component can receive
export interface ModalProps {
  title?: ReactNode // Optional title of the modal
  footer?: ReactNode // Optional footer content for the modal
  children: ReactNode // Main content of the modal
  className?: string // Optional additional CSS class names
  isOpen: boolean // Boolean flag to control modal visibility
  appId?: string // Optional app identifier for the modal
  handleClose: () => unknown // Callback function for closing the modal
  handleBack?: () => unknown // Optional callback function for handling "back" action
}

// Function to create a wrapper element and append it to the body or a specified element
function createWrapperAndAppendToBody(wrapperId: string, appendToId?: string) {
  const wrapperElement = document.createElement('div') // Create a new div element for the portal
  wrapperElement.setAttribute('id', wrapperId) // Set the ID of the wrapper element
  const destinationElement = appendToId
    ? document.getElementById(appendToId) // Target specific element if appendToId is provided
    : document.body // Default to appending to body if no ID is provided
  if (destinationElement) {
    destinationElement.appendChild(wrapperElement) // Append wrapper to the destination element
  }
  return wrapperElement // Return the created wrapper element
}

// Interface defining the props for the ReactPortal component
interface ReactPortalProps {
  children: ReactNode // Content to render inside the portal
  wrapperId: string // Unique ID for the portal wrapper
  appId?: string // Optional app identifier for the portal
}

// ReactPortal component to render children into a DOM node outside of parent hierarchy
function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper', // Default value for wrapperId
  appId,
}: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null) // State to hold the wrapper element reference

  useEffect(() => {
    let element = document.getElementById(wrapperId) // Try to find existing wrapper by ID
    let systemCreated = false // Flag to track if the component created the wrapper

    // If the wrapper element is not found, create and append it to the body
    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId, appId)
    }
    setWrapperElement(element) // Set the wrapper element to state

    return () => {
      // Cleanup function to remove the wrapper if it was created by this component
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element) // Remove the wrapper element from the DOM
      }
    }
  }, [appId, wrapperId]) // Depend on appId and wrapperId

  // If the wrapperElement state is not yet set, don't render anything
  if (wrapperElement === null) {
    return null
  }

  // Render the wrapped children using a portal
  return createPortal(children, wrapperElement)
}

// Main Modal component definition
export function Modal(props: ModalProps) {
  const {
    children,
    isOpen,
    handleClose,
    handleBack,
    title,
    className = '',
    footer,
    appId,
  } = props // Destructure props for easier access

  const modalRef = useRef<HTMLDivElement>(null) // Ref for the modal container element
  const modalContentRef = useRef<HTMLDivElement>(null) // Ref for the modal content element

  useOnClickOutside(modalContentRef, handleClose) // Hook to close modal when clicking outside the content

  useEffect(() => {
    // Effect to close modal on pressing the Escape key
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null // Close if 'Escape' key is pressed
    document.body.addEventListener('keydown', closeOnEscapeKey) // Add event listener for keydown
    return () => {
      // Cleanup function to remove the event listener
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose]) // Depend on handleClose

  // If the modal is not open, return null (do not render modal)
  if (!isOpen) return null

  return (
    <ReactPortal wrapperId="react-portal-modal-container" appId={appId}>
      <div ref={modalRef} className={`${styles.modal} ${className}`}>
        {/* The modal container with applied styles */}
        <div ref={modalContentRef} className={styles['modal-content']}>
          {/* The main content of the modal */}
          <header className={styles['modal-header']}>
            {/* Modal header containing title and buttons */}
            <span>
              {handleBack && (
                <button onClick={handleBack} className={styles['icon-button']}>
                  <ChevronLeftIcon /> {/* Back button icon */}
                </button>
              )}
            </span>
            <div>{title}</div> {/* Modal title */}
            <button onClick={handleClose} className={styles['icon-button']}>
              <XIcon width={24} height={24} /> {/* Close button icon */}
            </button>
          </header>
          <main className={styles['modal-content-body']}>{children}</main>{' '}
          {/* Render modal children */}
          {footer && (
            <footer className={styles['modal-content-footer']}>{footer}</footer> // Render footer if provided
          )}
        </div>
      </div>
    </ReactPortal>
  )
}
