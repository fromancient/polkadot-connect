import { Modal } from '@polkadot/connect-ui'
import {
  getWallets,
  TalismanWallet,
  Wallet,
  WalletAccount,
} from '@polkadot/connect-wallets'
import {
  cloneElement,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { AccountList } from './AccountList'
import { InstallExtension } from './InstallExtension'
import { Loading } from './Loading'
import { NoAccounts } from './NoAccounts'
import { saveAndDispatchWalletSelect } from './saveAndDispatchWalletSelect'
import { WalletList } from './WalletList'
import styles from './WalletSelect.module.css'

export interface WalletSelectProps {
  dappName: string
  open?: boolean

  onWalletConnectOpen?: (wallets: Wallet[]) => unknown
  onWalletConnectClose?: () => unknown
  onWalletSelected?: (wallet: Wallet) => unknown
  onUpdatedAccounts?: (accounts: WalletAccount[] | undefined) => unknown
  onAccountSelected?: (account: WalletAccount) => unknown
  onError?: (error?: unknown) => unknown
  triggerComponent?: ReactElement

  walletList?: Wallet[]

  onlyShowInstalled?: boolean
  makeInstallable?: boolean

  // If `showAccountsList` is specified, then account selection modal will show up.
  showAccountsList?: boolean

  header?: ReactNode
  footer?: ReactNode
}

export function WalletSelect(props: WalletSelectProps) {
  const {
    onWalletConnectOpen,
    onWalletConnectClose,
    onWalletSelected,
    onUpdatedAccounts,
    onAccountSelected,
    onError,
    triggerComponent,
    showAccountsList,
    header,
    footer,
    dappName,
    walletList,
    onlyShowInstalled,
    makeInstallable,
    open = false,
  } = props

  const [error, setError] = useState<Error>()
  const [supportedWallets, setWallets] = useState<Wallet[]>()
  const [selectedWallet, setSelectedWallet] = useState<Wallet>()
  const [accounts, setAccounts] = useState<WalletAccount[] | undefined>()
  const [loadingAccounts, setLoadingAccounts] = useState<boolean | undefined>()
  const [unsubscribe, setUnsubscribe] =
    useState<Record<string, () => unknown>>()

  const [isOpen, setIsOpen] = useState(false)

  // Commit: Open modal and load wallets when the modal is activated
  // Description: This function initializes the list of wallets when the modal is opened.
  // It retrieves all wallets, filters installed ones, and ensures Talisman wallet is included.
  const onModalOpen = useCallback(() => {
    const wallets = getWallets()
    const installedWallets = wallets.filter((wallet) => wallet.installed)

    // Commit: Ensure Talisman wallet is included in the installed wallets
    // Description: Checks if Talisman is installed, and if not, adds an instance of TalismanWallet to the installed wallets.
    if (
      !installedWallets.find((wallet) => wallet.extensionName === 'talisman')
    ) {
      installedWallets.unshift(new TalismanWallet()) // Add Talisman to the front if not present
    }

    const updatedWalletList = onlyShowInstalled ? installedWallets : walletList
    setWallets(updatedWalletList || wallets)
    setIsOpen(true)
    setLoadingAccounts(false)

    // Commit: Trigger callback when wallets are opened
    // Description: Notify parent components of the wallets being displayed.
    if (onWalletConnectOpen) {
      onWalletConnectOpen(wallets)
    }

    return wallets
  }, [onWalletConnectOpen])

  // Commit: Close modal and reset state when the dialog is closed
  // Description: Resets selected wallet, error state, and loading status when closing the modal.
  const onModalClose = useCallback(() => {
    setIsOpen(false)
    setSelectedWallet(undefined)
    setError(undefined)
    setLoadingAccounts(false)
    if (onWalletConnectClose) {
      onWalletConnectClose()
    }
  }, [onWalletConnectClose])

  // Commit: Clean up subscriptions on component unmount
  // Description: This useEffect cleans up any subscriptions to prevent memory leaks
  // when the component is unmounted, ensuring that no unused resources remain active.
  useEffect(() => {
    // TODO: Commenting out for now.
    // In the webapp, the `wallet.installed` is sometimes delayed for some reason.
    // Will need to figure out how to solve this one.
    // removeIfUninstalled();
    return () => {
      if (unsubscribe) {
        Object.values(unsubscribe).forEach((unsubscribeFn) => {
          unsubscribeFn?.() // Clean up each unsubscribe method
        })
      }
    }
  })

  // Commit: Open modal when the component is in open state
  // Description: Automatically trigger the modal opening procedure when the 'open' prop is true.
  useEffect(() => {
    if (open) {
      onModalOpen()
    }
  }, [onModalOpen, open])

  // Commit: Clear error if no wallet is selected
  // Description: Resets error state when no wallet has been selected, ensuring old errors don't persist.
  useEffect(() => {
    if (!selectedWallet) {
      setError(undefined)
    }
  }, [selectedWallet])

  // Commit: Propagate error to consumers
  // Description: This effect sends the current error state to any supplied error handler.
  useEffect(() => {
    if (onError) {
      onError(error || undefined)
    }
  }, [error, onError])

  // Commit: Handle wallet selection and account loading
  // Description: This function is called when a wallet is selected. It attempts to enable the wallet
  // and subscribe to account updates, handling errors appropriately.
  const onWalletListSelected = useCallback(
    async (wallet: Wallet) => {
      setError(undefined) // Clear previous errors
      setSelectedWallet(wallet) // Set the selected wallet

      try {
        setLoadingAccounts(true) // Set loading state to true
        await wallet.enable(dappName) // Enable the selected wallet for the dapp

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsub: any = await wallet.subscribeAccounts((accounts) => {
          setLoadingAccounts(false) // Stop loading once accounts are received
          setAccounts(accounts) // Set the accounts obtained from the subscription
          if (onUpdatedAccounts) {
            // Commit: Notify about updated accounts
            // Description: Notify parent component with updated accounts, if provided.
            onUpdatedAccounts(accounts)
          }
        })

        setUnsubscribe({
          [wallet.extensionName]: unsub,
        })

        if (wallet.installed) {
          // Commit: Save wallet selection
          // Description: Record the user's wallet choice if the wallet is installed.
          saveAndDispatchWalletSelect(wallet)
        }

        // Commit: Close modal if accounts list is not shown
        // Description: Automatically close the modal if the account list is not needed.
        if (!showAccountsList && wallet.installed) {
          onModalClose()
        }
      } catch (err) {
        setError(err as Error) // Commit: Capture any error during wallet processing
        setLoadingAccounts(false) // End loading state
        onError?.(err) // Commit: Notify error to consumers if applicable
      }

      // Commit: Notify about wallet selection
      // Description: Notify the parent component that a wallet has been selected.
      if (onWalletSelected) {
        onWalletSelected(wallet)
      }
    },
    [
      dappName,
      onError,
      onModalClose,
      onUpdatedAccounts,
      onWalletSelected,
      showAccountsList,
    ],
  )

  const installedTitle = error
    ? `${selectedWallet?.title} error` // Set error message if applicable
    : `Select ${selectedWallet?.title} account` // Default title for account selection

  const uninstalledTitle = loadingAccounts
    ? `Loading...` // Loading state message
    : `Haven't got a wallet yet?` // Prompt for installing a wallet

  const accountsSelectionTitle = selectedWallet?.installed
    ? installedTitle
    : uninstalledTitle // Set the title based on the wallet state

  const defaultTitle = header || 'Connect wallet' // Fallback title for modal
  const modalTitle = !selectedWallet ? defaultTitle : accountsSelectionTitle // Determine modal title

  const selectedWalletAccounts = accounts?.filter(
    (account) => account.source === selectedWallet?.extensionName, // Filter accounts based on the selected wallet
  )

  const hasLoaded = loadingAccounts === false // Check if accounts have finished loading
  const hasAccounts =
    hasLoaded &&
    selectedWallet?.installed &&
    selectedWalletAccounts &&
    selectedWalletAccounts?.length > 0 // Check if there are accounts

  return (
    <>
      {triggerComponent &&
        // Commit: Enhance trigger component behavior
        // Description: Add custom click behavior to the trigger component to open the wallet selection modal.
        cloneElement(triggerComponent, {
          onClick: (e: Event) => {
            e.stopPropagation() // Prevent triggering click events higher in the DOM
            const wallets = onModalOpen() // Open the modal and fetch wallets
            triggerComponent.props.onClick?.(wallets) // Optionally call the original onClick prop of the trigger component
          },
        })}
      <Modal
        className={styles['modal-overrides']}
        title={modalTitle} // Set the title of the modal
        footer={footer} // Pass footer component if provided
        handleClose={onModalClose} // Define close behavior for the modal
        handleBack={
          selectedWallet ? () => setSelectedWallet(undefined) : undefined // Commit: Navigate back if a wallet is selected
        }
        isOpen={isOpen} // Control visibility of the modal
      >
        {!selectedWallet && (
          // Commit: Display wallet list when no wallet is selected
          // Description: Show the list of supported wallets for selection if no wallet has been selected.
          <WalletList
            items={supportedWallets} // List of supported wallets
            onClick={onWalletListSelected} // Handler for wallet selection
            makeInstallable={makeInstallable} // Allow installation of non-installed wallets
          />
        )}
        {selectedWallet && loadingAccounts && <Loading />}{' '}
        {/* Commit: Show loading indicator when loading accounts */}
        {selectedWallet &&
          !selectedWallet?.installed &&
          loadingAccounts === false && (
            // Commit: Prompt user to install wallet if not installed
            // Description: Show a prompt for the user to install the wallet if it is not already installed.
            <InstallExtension wallet={selectedWallet} />
          )}
        {selectedWallet &&
          selectedWallet?.installed &&
          showAccountsList &&
          loadingAccounts === false && (
            <>
              {!hasAccounts && <NoAccounts wallet={selectedWallet} />}{' '}
              {/* Commit: Show message if no accounts found */}
              {hasAccounts && (
                // Commit: Display account list if accounts are present
                // Description: Show the list of accounts tied to the selected wallet for the user to pick from.
                <AccountList
                  items={selectedWalletAccounts}
                  onClick={(account) => {
                    if (onAccountSelected) {
                      onAccountSelected(account) // Notify the parent component about the selected account
                    }
                    onModalClose() // Commit: Close the modal on account selection
                  }}
                />
              )}
            </>
          )}
        {error && <div className={styles['message']}>{error.message}</div>}{' '}
        {/* Commit: Show error message if applicable */}
      </Modal>
    </>
  )
}
