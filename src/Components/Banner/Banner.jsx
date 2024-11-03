import React from "react";
import bannerImg from "../../assets/img/Banner/gatito-sin.png";
import './Banner.css';

const Banner = () => {
  return (
    <div className="Banner container-Banner" id="home">
      <div className="Banner-container">

        {/* img  right */}
        <div className="right-banner">
          <img className='img-banner' src={bannerImg} alt="" />
        </div>

        {/* texts  Left */}
        <div className="left-container space-y-7">
          <h2 className="left-text left-text-banner  ">
            Transforma tus productos con <span className="food">Realidad Aumentada</span>
          </h2>
          <p className="description-text-banner">
            Descubre cómo la realidad aumentada puede llevar tus productos al siguiente nivel y cautivar a tus 
            clientes de una manera totalmente nueva
          </p>
          <button className="boton-banner">
            Comienza ya 
            
          </button>
        </div>

      </div>
    </div>
  );
};

export default Banner;