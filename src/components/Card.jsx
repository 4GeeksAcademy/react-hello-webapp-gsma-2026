import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";
import { useNavigate } from "react-router-dom";

export const Card = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="d-flex align-items-center border-bottom py-3">

        {/* FOTO */}
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          className="rounded-circle me-4"
          style={{ width: "80px", height: "80px" }}
        />

        {/* INFO */}
        <div className="flex-grow-1">
          <h5>{contact.name}</h5>

          <p className="mb-1 text-muted">
            <i className="fas fa-map-marker-alt me-2"></i>
            {contact.address}
          </p>

          <p className="mb-1 text-muted">
            <i className="fas fa-phone me-2"></i>
            {contact.phone}
          </p>

          <p className="mb-0 text-muted">
            <i className="fas fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>

        {/* ICONOS */}
        <div className="d-flex gap-3">
          <i
            className="fas fa-pencil-alt"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/demo/${contact.id}`)}
          ></i>

          <i
            className="fas fa-trash text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          ></i>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  If you delete this contact the entire universe will go down!
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Oh no!
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    actions.deleteContact(dispatch, contact.id);
                    setShowModal(false);
                  }}
                >
                  Yes baby!
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};