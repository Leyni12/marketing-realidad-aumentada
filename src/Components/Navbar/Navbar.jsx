import React, { useState, useEffect } from "react";
import './Navbar.css';
import { BiPhoneCall } from "react-icons/bi";

function Navbar() {
    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          const offset = window.scrollY;
          if (offset > 0) {
            setSticky(true);
          } else {
            setSticky(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
      const handleNavClick = (e) => {
          const targetId = e.target.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              e.preventDefault();
              const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - (window.innerHeight / 2 - targetElement.offsetHeight / 2);
  
              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      };
  
      const navLinks = document.querySelectorAll('a[href^="#"]');
      navLinks.forEach(link => {
          link.addEventListener('click', handleNavClick);
      });
  
      return () => {
          navLinks.forEach(link => {
              link.removeEventListener('click', handleNavClick);
          });
      };
  }, []);
  

    const navItems = <>
        <li><a href='#home'>Home</a></li>
        <li><a href='#servicios'>Servicios</a></li>
        <li><a href='#proyectos'>Proyectos</a></li>
        <li><a href='#app'>App</a></li>
    </>

  return (
    <header
      className={`navbar-container transition-all duration-300 ease-in-out`}
    >
        <div className={`navbar-w ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
        >
            <div className="navbar-start">
                <div className="dropdown justify-between-navbar">
                    <div tabIndex={0} role="button" className="btn-navbar btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="Tamaño" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-men">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-titulo-relleno">
                    AUGMENTIFY
                </div>
                
            </div>
            <div className="navbar-center-hidden ">
            <ul className="menu menu-horizontal px-1 navbar-right-list">
                {navItems}
            </ul>
            </div>
            <div className="navbar-end">
                <a href="#contacto" className="btn-navbar gap-2"> <BiPhoneCall />Contacto </a>
            </div>
        </div>
    </header>
  )
}

export default Navbar;
