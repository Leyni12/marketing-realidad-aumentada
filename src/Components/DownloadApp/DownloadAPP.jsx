import React from "react";
import App from '../../assets/img/DownloadAPP/App.png';
import './DownloadAPP.css';

const DownloadAPP = () => {
  return (
    <div className="fondo">
      <div className="DownloadAPP container-DownloadAPP">
        <div className="contenedor-App" id="app">
          <div className="left-App">
            <img src={App} alt="App" />
          </div>
          <div className="right-App">
            <div className="text-left-container">
              <p className="subtitle">Descarga la Aplicación</p>
              <h2 className="titleApp md:leading-snug-app">Características Principales de la Aplicación</h2>
              <blockquote className="blockquote-text">
                <ul>
                  <li><span role="img" aria-label="Checkmark">&#10004;</span> Realidad Aumentada y Videos Interactivos: Escanea la etiqueta del producto para ver videos y avatares animados que cuentan historias fascinantes sobre el producto.</li>
                  <li><span role="img" aria-label="Checkmark">&#10004;</span> Historias Continuas y Enriquecedoras: Sigue la narrativa que se desarrolla con cada producto escaneado, creando una experiencia envolvente y educativa.</li>
                </ul>
              </blockquote>
              <div className="Avatar-contenedor">
                <div className="cursor-pointer">
                  <a href="https://www.instagram.com/erickaanchundia_/">
                    <button className="boton-descarga">Download</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAPP;
