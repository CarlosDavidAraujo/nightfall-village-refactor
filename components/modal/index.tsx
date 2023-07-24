import Modal from "react-native-modal"

interface CustomModalProps {
  children?: JSX.Element
  isVisible: boolean
  onClose?: () => void
  onSwipeComplete?: () => void
}

export function CustomModal({
  children,
  onClose,
  onSwipeComplete,
  isVisible,
}: CustomModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onModalHide={onClose}
      swipeDirection="down"
      onSwipeComplete={onSwipeComplete}
      coverScreen
      useNativeDriver
    >
      {children}
    </Modal>
  )
}
