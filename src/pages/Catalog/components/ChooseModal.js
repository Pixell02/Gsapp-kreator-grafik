import React from "react";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import "./ChooseModal.css";

export default function ChooseModal({ poster, open, closeModal }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hostClick = (e) => {
    const key = e.target.getAttribute("btn-id");
   
    navigate(`/creator/${key}`);
  };
  const guestClick = () => {};

  return (
    <div className={"catalog-modal-container"}>
      <div className="catalog-modal-content">
        <div className="modal-border">
          <div className="top-content">
            <div className="left-content">
              <div className="poster-name">{poster.name}</div>
            </div>
          </div>
          <div className="catalog-image-container">
            <img src={poster.src} />
          </div>
          <div className="buttons-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                closeModal();
              }}
            >
              Anuluj
            </button>
            <button
              className="btn btn-primary"
              
              btn-id={poster.id}
              onClick={hostClick}
            >
              Generuj grafikę
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
