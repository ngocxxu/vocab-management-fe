import { ReactNode } from "react";
import ModalLib from "react-modal";

type TModal = {
  isOpen: boolean;
  onClose: () => void;
  contentLabel?: string;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom?: any;
};

const Modal = ({
  isOpen,
  onClose,
  contentLabel,
  children,
  custom,
  ...props
}: TModal) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      OverflowY: "auto",
      transition: "max-height 0.5s ease",
      ...custom,
    },
  };

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
