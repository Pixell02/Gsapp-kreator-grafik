import { useState } from "react";
import ChooseModal from "./ChooseModal";
import "../../../components/main-content-elements/ItemBlock.css";

export default function CategoryBlock({ poster, showCategory, category }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elementId, setElementId] = useState();

  const element = (poster) => {
    setElementId(poster);
  };

  return (
    <>
      <div className="catalog-container">
        {poster.map(
          (poster) =>
            poster.category == showCategory && (
              <div
                key={poster.id}
                id-data={poster}
                className="item-window"
                onClick={() => {
                  setIsModalOpen(true);
                  element(poster);
                }}
              >
                <div className="name-content">{poster.name}</div>
                <div className="image-content">
                  <img src={poster.src} />
                </div>
              </div>
            )
        )}
      </div>
      {isModalOpen && (
        <ChooseModal
          poster={elementId}
          open={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
