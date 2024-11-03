import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Cards.css';

function Cards({item}) {

  return (
    <div to={`/menu/${item._id}`} className="card-proyect card-r ">
      
      <Link to={`/menu/${item._id}`}>
        <figure className='centrar'>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72 " />
        </figure>
      </Link>
      <div className="card-body-proy centrar">
       <Link to={`/menu/${item._id}`} className="link-linea" ><h2 className="card-title">{item.name}</h2></Link>
      </div>
    </div>
  );
}

export default Cards