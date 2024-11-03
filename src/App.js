import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Banner from './Components/Banner/Banner';
import Proyecto from './Components/Proyecto/Proyecto';
import { Routes, Route } from 'react-router-dom';
import DownloadAPP from './Components/DownloadApp/DownloadAPP';
import Servicios from './Components/Servicios/Servicios';
import Contacto from './Components/Contacto/Contacto';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<>
          <Banner />
          <Servicios/>
          <Proyecto />
          <DownloadAPP/>
          <Contacto/>
          <Footer/>
        </>} />
        
      </Routes>
    </div>
  );
}

export default App;
