// @ts-nocheck
import React from 'react';
import { Icon } from './Icon';

function Modal({
  title,
  onClose,
  children,
  wide = false
}) {
  const rRef = React.useRef(null);
  React.useEffect(() => {
    const rRef_current = rRef.current;
    const document_activeElement = document.activeElement;
    rRef_current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      rRef_current?.close();
      document.body.style.overflow = overflow;
      document_activeElement?.focus();
    };
  }, []);
  return <dialog ref={rRef} className={`modal ${wide ? "modal-wide" : ""}`} aria-label={title} onCancel={o => {
    o.preventDefault();
    onClose();
  }} onClick={o => {
    if (o.target === rRef.current) {
      onClose();
    }
  }}><div className="modal-head"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Закрыть окно"><Icon name="x" /></button></div>{children}</dialog>;
}

export { Modal };
