import Button from '../../Button/Button'; 
import './Modaladmin.css';

function ModalAdmin({ isOpen, onClose, title, children, onConfirm, confirmText = "Salvar", confirmClass = "btn-success" }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        <div className="modal-footer d-flex gap-1 justify-content-center">
          <Button 
          className="btn btn-danger rounded fs-0.9"
          style={{
						backgroundColor: "#f44336"
          }} 
          onClick={onClose}>
            Cancelar
          </Button>
          {onConfirm && (
            <Button 
            className={confirmClass} 
            onClick={onConfirm}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalAdmin;
