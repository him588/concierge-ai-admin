"use client";

import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  modalBoxClassName?: string;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  modalBoxClassName,
}: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen && !modal.open) {
      modal.showModal();
    }

    if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);

  return (
    <dialog onClick={onClose} ref={modalRef} className="modal">
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          "modal-box bg-white  h-fit  max-h-[90%]  relative",
          modalBoxClassName
        )}
      >
        {title && <h3 className="font-bold text-lg">{title}</h3>}

        <div className="py-4">{children}</div>
      </div>
    </dialog>
  );
}

export default Modal;
