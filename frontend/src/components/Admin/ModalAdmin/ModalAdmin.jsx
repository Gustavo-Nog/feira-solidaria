import Button from '../../Button/Button'; // ajuste o caminho conforme sua pasta

function GenericModal({ isOpen, onClose, title, children, onConfirm, confirmText = "Salvar", confirmClass = "btn-success" }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Cabeçalho */}
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        {/* Corpo */}
        <div className="modal-body">
          {children}
        </div>

        {/* Rodapé */}
        <div className="modal-footer d-flex gap-2">
          <Button className="btn-secondary" onClick={onClose}>
            Cancelar
          </Button>
          {onConfirm && (
            <Button className={confirmClass} onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenericModal;
