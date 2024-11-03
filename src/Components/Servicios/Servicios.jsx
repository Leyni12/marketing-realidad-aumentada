import React from "react";
import './Servicios.css';
import icon1 from '../../assets/img/Servicios/icon1.png';
import icon2 from '../../assets/img/Servicios/icon2.png';
import icon3 from '../../assets/img/Servicios/icon3.png';
import icon4 from '../../assets/img/Servicios/icon4.png';


const serviceLists = [
    {id:1, title: "Experiencia Inmersiva", des: "Mejora la interacción del cliente con productos mediante AR.", img: icon1},
    {id:2, title: "Prueba Virtual", des: "Ayuda a tomar decisiones informadas antes de comprar.", img: icon2},
    {id:3, title: "Enganche y Retención", des: "Aumenta la retención y fortalece la conexión con la marca.", img: icon3},
    {id:4, title: "Diferenciación Competitiva", des: "Destaca en un mercado saturado con AR.", img: icon4},
]

const Servicios = () => {
  return (
    <div className="servicio container-servicio " id="servicios">
        <div className="contenedor-servicio">
            <div className="left-servicio">
                <div className="text-left-servicio">
                    <p className="subtitle">SERVICIOS</p>
                    <h2 className="title md\:leading-snug ">Transformando experiencias con Realidad Aumentada(AR)</h2>
                    
                </div>
            </div>
            <div className="right-servicio">
                <div className="right-contenedor-sevicio">
                    {
                        serviceLists.map((service) => (
                            <div key={service.id} className="service-id space-y-2  hover:border hover:border-indigo-600 transition-all duration-200">
                                <img src={service.img} alt="" className=" mx-auto"/>
                                <h5 className="pt-3 font-semibold"> {service.title}</h5>
                                <p className="text-[#90BD95]">{service.des}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

export default Servicios;
