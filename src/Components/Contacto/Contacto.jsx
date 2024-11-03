import React, { useState, useEffect } from 'react';
import axios from 'axios';
import App from '../../assets/img/DownloadAPP/telefono-app.png'; // Imagen por defecto
import './Contacto.css';

// Iconos de éxito y error
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const Contacto = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [option, setOption] = useState('');
  const [description, setDescription] = useState('');
  const [leftText, setLeftText] = useState('');
  const [leftTitle, setLeftTitle] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [message, setMessage] = useState(null); // Estado para mensajes

  useEffect(() => {
    switch (option) {
      case 'multimedia':
        setLeftTitle('Contenido Multimedia');
        setLeftText(
          <>
            <p>¿Quieres que tu etiqueta de producto active un video cuando se escanee? Sube la imagen de tu etiqueta y el video que deseas que aparezca.</p>
            <div>
              <h3>Instrucciones:</h3>
              <ol>
                <li>
                  <strong>Imagen de la etiqueta del producto:</strong> Asegúrate de que la imagen sea clara y esté bien iluminada para una detección precisa. El formato de la imagen debe ser JPEG, PNG y BMP
                </li>
                <li>
                  <strong>Video:</strong> Debe estar en formato compatible con la plataforma (MP4 recomendado), con una duración máxima de 15 minutos y resolución de al menos 720p.
                </li>
              </ol>
            </div>
          </>
        );
        break;

      case '3d':
        setLeftTitle('Modelado en 3D');
        setLeftText(
          <>
            <p>¿Prefieres un modelo 3D interactivo cuando se escanee la etiqueta de tu producto? Sube la imagen de tu etiqueta y describe tu idea para hacerla realidad.</p>
            <div className="instruction-list">
              <h3>Instrucciones:</h3>
              <ol>
                <li><strong>Imagen de la etiqueta del producto:</strong> Asegúrate de que la imagen sea clara y esté bien iluminada para una detección precisa. El formato de la imagen debe ser JPEG, PNG y BMP.</li>
                <li><strong>Descripción del modelado en 3D:</strong> Proporciona una descripción detallada de lo que te gustaría ver en la realidad aumentada. Por ejemplo: posición, accesorios, entorno, estilo artístico (realista, caricaturesco, etc.). Puedes incluir detalles como colores, texturas y poses específicas.</li>
                <li><strong>Costo:</strong> El modelado en 3D es un servicio pagado. Una vez que envíes tu solicitud, nos pondremos en contacto contigo para discutir los detalles y proporcionarte un presupuesto basado en tu descripción.</li>
              </ol>
            </div>
          </>
        );
        break;

      default:
        setLeftTitle('Contacto');
        setLeftText(
          <>
              <h3>Completa el formulario para personalizar tus etiquetas</h3>
              <p>Aquí puedes elegir entre dos opciones para configurar cómo se comportará tu producto cuando se escanee su etiqueta:</p>
              <ul>
                <li><strong>Contenido Multimedia:</strong> Permite activar un video cuando se escanee la etiqueta.</li>
                <li><strong>Modelado en 3D:</strong> Permite crear un modelo 3D interactivo para la realidad aumentada.</li>
              </ul>
              <p>Selecciona una de las opciones para recibir más instrucciones.</p>
          </>
        );
        break;
    }
  }, [option]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !option || !image) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('option', option);
    formData.append('image', image);

    if (option === 'multimedia') {
      if (!video) {
        alert('Por favor sube un video.');
        return;
      }
      formData.append('video', video);
    } else if (option === '3d') {
      if (!description) {
        alert('Por favor proporciona una descripción.');
        return;
      }
      formData.append('description', description);
    }

    setLoading(true); // Iniciar el estado de carga

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: 'Datos enviados con éxito' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al enviar los datos' });
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  const handleCloseMessage = () => {
    setMessage(null);
    setImage(null);
    setVideo(null);
    setName('');
    setEmail('');
    setPhone('');
    setOption('');
    setDescription('');
  };

  const handleRetry = () => {
    setMessage(null);
  };

  return (
    <div className="fondo-contact" id="contacto">
      {loading && (
        <div className="loading-overlay">
          <FaSpinner className="spinner" />
        </div>
      )}

      {message && (
        <div className="loading-overlay">
            <div className={`message-box ${message.type}`}>
              {message.type === 'success' ? (
                <>
                  <FaCheckCircle className="message-icon" />
                  <p>{message.text}</p>
                  <button onClick={handleCloseMessage}>Continuar</button>
                </>
              ) : (
                <>
                  <FaTimesCircle className="message-icon" />
                  <p>{message.text}</p>
                  <button onClick={handleRetry}>Intentelo de nuevo</button>
                </>
              )}
            </div>
        </div>
      )}

      <div className="Contacto container-Contacto">
        <div className="contenedor-contacto">
          <div className="right-contact">
            <div className="text-left-container-contact">
              <h2 className="titleCont">{leftTitle}</h2>
              <blockquote className="blockquote-text">
                <p>{leftText}</p>
              </blockquote>
            </div>
          </div>

          <div className="right-contact">
            <div className="text-left-container-contact">
              <blockquote className="blockquote-text">
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ingresa tu nombre"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Correo Electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingresa tu correo electronico"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ingresa tu nùmero de telefono"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Opción</label>
                    <select value={option} onChange={handleOptionChange} required>
                      <option value="">Seleccione una opción</option>
                      <option value="multimedia">Contenido Multimedia</option>
                      <option value="3d">Modelado en 3D</option>
                    </select>
                  </div>
                  {option === 'multimedia' && (
                    <>
                      <div className="input-group">
                        <label>Adjunta la imagen de producto</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} required />
                      </div>
                      <div className="input-group">
                        <label>Adjunta el video</label>
                        <input type="file" accept="video/*" onChange={handleVideoChange} required />
                      </div>
                    </>
                  )}
                  {option === '3d' && (
                    <>
                      <div className="input-group">
                        <label>Adjunta la imagen de producto</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} required />
                      </div>
                      <div className="input-group">
                        <label>Descripción del Modelado en 3D</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Ejemplo: Quiero una chica sentada en un banco viendo a una señora cantar amorfinos. La señora debe llevar un sombrero y una falda larga, y estar acompañada de un perrito que está bailando mientras ella canta."
                          required
                        />
                      </div>
                    </>
                  )}
                  <button className='boton-contacto' type="submit">Enviar</button>
                </form>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
