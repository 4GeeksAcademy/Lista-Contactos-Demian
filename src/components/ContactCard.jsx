import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

const ContactCard = ({ contact, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(contact.id);
    setShowModal(false);
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text mb-1"><strong>Email:</strong> {contact.email}</p>
            <p className="card-text mb-1"><strong>Teléfono:</strong> {contact.phone}</p>
            <p className="card-text mb-0"><strong>Dirección:</strong> {contact.address}</p>
          </div>

          <div className="d-flex flex-column align-items-end gap-2">
            <Link to={`/edit-contact/${contact.id}`} className="btn btn-warning btn-sm">
              Actualizar
            </Link>
            <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <ConfirmDelete
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        contactName={contact.name}
      />
    </>
  );
};

export default ContactCard;