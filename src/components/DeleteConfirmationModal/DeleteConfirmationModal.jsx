// Imports
import "./DeleteConfirmationModal.css";

// Component
function DeleteConfirmationModal({
  card,
  isOpen,
  title,
  onCloseClick,
  onDelete,
}) {

  const handleDelete = () => {
    onDelete(card)
  }
  
  // JSX
  return (
    <div className={`popup popup_type_${title} ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_confirmation">
        <button
          type="button"
          className="popup__close-btn popup__close-btn_dark"
          aria-label="close button"
          onClick={onCloseClick}
        />
        <p className="popup__confirmation-text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="button"
          className="popup__confirmation-button"
          onClick={handleDelete}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="popup__confirmation-cancel"
          onClick={onCloseClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
