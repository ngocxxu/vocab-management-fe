import { ReactNode } from "react";
import ModalLib from "react-modal";

type TModal = {
  isOpen: boolean;
  onClose: () => void;
  contentLabel: string;
  children: ReactNode;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "50vw",
    OverflowY: "auto",
    height: "100%",
    maxHeight: "81vh",
    transition: "max-height 0.5s ease",
  },
};

const Modal = ({
  isOpen,
  onClose,
  contentLabel,
  children,
  ...props
}: TModal) => {
  return (
    <ModalLib
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={contentLabel}
      {...props}
    >
      <h3 className="font-bold text-lg">{contentLabel}</h3>
      {children}
    </ModalLib>
  );
};

export default Modal;
