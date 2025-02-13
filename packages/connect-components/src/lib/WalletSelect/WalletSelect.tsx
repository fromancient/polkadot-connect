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
  const onModalOpen = useCallback(() => {
    const wallets = getWallets()
    const installedWallets = wallets.filter((wallet) => wallet.installed)

    // Commit: Ensure Talisman wallet is included in the installed wallets
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
    if (onWalletConnectOpen) {
      onWalletConnectOpen(wallets)
    }

    return wallets
  }, [onWalletConnectOpen])

  // Commit: Close modal and reset state when dialog is closed
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
  useEffect(() => {
    if (open) {
      onModalOpen()
    }
  }, [onModalOpen, open])

  // Commit: Clear error if no wallet is selected
  useEffect(() => {
    if (!selectedWallet) {
      setError(undefined)
    }
  }, [selectedWallet])

  // Commit: Propagate error to consumers
  useEffect(() => {
    if (onError) {
      onError(error || undefined)
    }
  }, [error, onError])

  // Commit: Handle wallet selection and account loading
  const onWalletListSelected = useCallback(
    async (wallet: Wallet) => {
      setError(undefined)
      setSelectedWallet(wallet)

      try {
        setLoadingAccounts(true)
        await wallet.enable(dappName)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsub: any = await wallet.subscribeAccounts((accounts) => {
          setLoadingAccounts(false)
          setAccounts(accounts)
          if (onUpdatedAccounts) {
            // Commit: Notify about updated accounts
            onUpdatedAccounts(accounts)
          }
        })

        setUnsubscribe({
          [wallet.extensionName]: unsub,
        })

        if (wallet.installed) {
          // Commit: Save wallet selection
          saveAndDispatchWalletSelect(wallet)
        }

        // Commit: Close modal if accounts list is not shown
        if (!showAccountsList && wallet.installed) {
          onModalClose()
        }
      } catch (err) {
        setError(err as Error) // Commit: Capture any error during wallet processing
        setLoadingAccounts(false)
        onError?.(err) // Commit: Notify error to consumers if applicable
      }

      // Commit: Notify about wallet selection
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
    ? `${selectedWallet?.title} error`
    : `Select ${selectedWallet?.title} account`

  const uninstalledTitle = loadingAccounts
    ? `Loading...`
    : `Haven't got a wallet yet?`

  const accountsSelectionTitle = selectedWallet?.installed
    ? installedTitle
    : uninstalledTitle

  const defaultTitle = header || 'Connect wallet'
  const modalTitle = !selectedWallet ? defaultTitle : accountsSelectionTitle

  const selectedWalletAccounts = accounts?.filter(
    (account) => account.source === selectedWallet?.extensionName,
  )

  const hasLoaded = loadingAccounts === false
  const hasAccounts =
    hasLoaded &&
    selectedWallet?.installed &&
    selectedWalletAccounts &&
    selectedWalletAccounts?.length > 0

  return (
    <>
      {triggerComponent &&
        // Commit: Enhance trigger component behavior
        cloneElement(triggerComponent, {
          onClick: (e: Event) => {
            e.stopPropagation()
            const wallets = onModalOpen()
            triggerComponent.props.onClick?.(wallets) // Commit: Pass opened wallets to trigger component
          },
        })}
      <Modal
        className={styles['modal-overrides']}
        title={modalTitle}
        footer={footer}
        handleClose={onModalClose}
        handleBack={
          selectedWallet ? () => setSelectedWallet(undefined) : undefined // Commit: Navigate back if wallet is selected
        }
        isOpen={isOpen}
      >
        {!selectedWallet && (
          // Commit: Display wallet list when no wallet is selected
          <WalletList
            items={supportedWallets}
            onClick={onWalletListSelected}
            makeInstallable={makeInstallable}
          />
        )}
        {selectedWallet && loadingAccounts && <Loading />}{' '}
        {/* Commit: Show loading indicator */}
        {selectedWallet &&
          !selectedWallet?.installed &&
          loadingAccounts === false && (
            // Commit: Prompt user to install wallet if not installed
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
                <AccountList
                  items={selectedWalletAccounts}
                  onClick={(account) => {
                    if (onAccountSelected) {
                      onAccountSelected(account)
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
