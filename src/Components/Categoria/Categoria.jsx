import React from 'react';
import './Categoria.css';
import image1 from '../../assets/img/guia/img1.png';
import image2 from '../../assets/img/guia/img2.png';
import image3 from '../../assets/img/guia/img3.png';
import image4 from '../../assets/img/guia/img4.png';

const categoryItems = [
    {id: 1, title: "Main Dish", despriction: "(86 dishes)", image: image1},
    {id: 2, title: "Break Fast", despriction: "(12 break fast)", image: image2},
    {id: 3, title: "Dessert", despriction: "(48 dessert)", image: image3},
    {id: 4, title: "Browse All", despriction: "(255 Items)", image: image4}
]

const Categoria = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 relleno-categoria'>
        <div className='text-center-categoria'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title md\:leading-snug'>Popular Catagories</h2>
        </div>

        {/* category cards */}
        <div className='categoria-cards '>
            {
                categoryItems.map((item, i) => (
                    <div key={i} className='shadow-lg-categoria '>
                        <div className='w-full-categoria'><img src={item.image} alt="" className='imagen-categoria' /></div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-h font-semibold'>{item.title}</h5>
                            <p className='text-secondary text-sm'>{item.despriction}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categoria