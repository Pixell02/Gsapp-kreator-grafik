export type poster = {
  id?: string;
  uid: string;
  name: string;
  src: string;
  coords?: string;
  uuid: string;
};

type props = {
  poster: poster;
  setSelectedPoster: (poster: poster) => void;
};

const PosterBlock = ({ poster, setSelectedPoster }: props) => {
  const handleSetPosterInfo = (poster: poster) => {
    setSelectedPoster(poster);
  };

  return (
    <div className="item-category-window" onClick={() => handleSetPosterInfo(poster)}>
      <div className="name-content">
        <span className="name-content">{poster.name}</span>
      </div>
      <div className="image-category-content">{poster.src && <img src={poster.src} alt={poster.name} />}</div>
    </div>
  );
};

export default PosterBlock;
