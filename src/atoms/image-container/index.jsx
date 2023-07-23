import React from "react";
import './style.css';

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

const ImageContainer = ({ movies }) => {
  return (
    <div>
      {movies &&
        movies.length > 0 &&
        movies.map((item) => (  // 'item' is defined in this map function
          <div key={item.id}>
            <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
          </div>
        ))}
    </div>
  );
};

export default ImageContainer;