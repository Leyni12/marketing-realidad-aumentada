/*1.51.33*/
import React, { useEffect, useState } from 'react';
import './Proyecto.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards/Cards';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa6';




function Proyecto() {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        // console.log(specials)
        setRecipes(specials);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="proyecto container-proyecto" id='proyectos'>
            <div className='text-left-proyecto'>
                <p className='subtitle'>ETIQUETAS DE PRODUCTOS</p>
                <h2 className='title-pro md:leading-snug-p'>Escanea, Descubre y Disfruta</h2>
            </div>
            <div className="proyect-left-direcciones">
              <button onClick={() => slider?.current?.slickPrev()}
              className=" boton"
              >
              <FaAngleLeft className=" FaAngleLeft"/>
              </button>
              <button
                className="boton boton-greed"
                onClick={() => slider?.current?.slickNext()}
              >
                <FaAngleRight className=" FaAngleRight"/>
              </button>
            </div>

            <Slider ref={slider} {...settings} className="slider-proyect space-x-5">
              {recipes.map((item, i) => (
                <Cards item={item} key={i}/>
              ))}
            </Slider>
        </div>
  );
}

export default Proyecto