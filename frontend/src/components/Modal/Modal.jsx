const Modal = ({ title, children, confirmText = 'Confirm', onConfirm, onClose }) => (
  <div className="modal" role="presentation" onMouseDown={onClose}>
    <div
      className="modal__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="modal__header">
        <h2 className="modal__title" id="modal-title">
          {title}
        </h2>
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close modal">
          x
        </button>
      </div>
      <div className="modal__body">{children}</div>
      <div className="modal__actions">
        <button className="button button--secondary" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="button button--danger" type="button" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
