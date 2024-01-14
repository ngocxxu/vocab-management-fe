import { ReactNode } from "react";

type TModal = {
  idModal: string;
  children: ReactNode;
};

const Modal = ({ idModal, children }: TModal) => {
  return (
    <>
      <input type="checkbox" id={idModal} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-4xl">{children}</div>
        <label className="modal-backdrop" htmlFor={idModal}>
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;
