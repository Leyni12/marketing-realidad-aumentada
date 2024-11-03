require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');
const AWS = require('aws-sdk');
const cors = require('cors');
const mongoose = require('mongoose');
const Form = require('./models/Form');

const app = express();
const port = 5000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Configuración de AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

// Credenciales de Vuforia
const serverAccessKey = process.env.VUFORIA_ACCESS_KEY;
const serverSecretKey = process.env.VUFORIA_SECRET_KEY;

// Configurar multer para almacenamiento de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Generar firma HMAC para Vuforia
const generateSignature = (method, contentMD5, contentType, date, requestPath) => {
  const stringToSign = `${method}\n${contentMD5}\n${contentType}\n${date}\n${requestPath}`;
  return crypto.createHmac('sha1', serverSecretKey).update(stringToSign).digest('base64');
};

// Ruta para manejar la carga de imagen y video
app.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, email, phone, option, description } = req.body;
    const image = req.files['image'][0];
    const imageBase64 = image.buffer.toString('base64');
    const targetName = `${Date.now()}_${image.originalname}`;
    const targetWidth = 32.0;

    if (option === 'multimedia') {
      const video = req.files['video'][0];

      // Subir video a AWS S3
      const videoParams = {
        Bucket: process.env.S3_BUCKET,
        Key: video.originalname,
        Body: video.buffer
      };

      s3.upload(videoParams, async (err, data) => {
        if (err) {
          console.error('Error al subir el video:', err);
          res.status(500).send(err);
        } else {
          console.log('Video subido exitosamente:', data.Location);

          // Guardar la URL del video en un archivo de texto
          fs.writeFile(path.join(__dirname, 'video_url.txt'), data.Location, err => {
            if (err) {
              console.error('Error al guardar la URL del video en el archivo:', err);
            } else {
              console.log('URL del video guardada en:', path.join(__dirname, 'video_url.txt'));
            }
          });

          // Construir el objeto application_metadata solo con la URL del video para Vuforia
          const applicationMetadata = data.Location;

          const body = {
            name: targetName,
            width: targetWidth,
            image: imageBase64,
            application_metadata: Buffer.from(applicationMetadata).toString('base64'),
          };

          const bodyString = JSON.stringify(body);
          const contentMD5 = crypto.createHash('md5').update(bodyString).digest('hex');

          const signature = generateSignature('POST', contentMD5, 'application/json', new Date().toUTCString(), '/targets');
          
          const vuforiaResponse = await axios.post(`https://vws.vuforia.com/targets`, body, {
            headers: {
              'Authorization': `VWS ${serverAccessKey}:${signature}`,
              'Content-Type': 'application/json',
              'Date': new Date().toUTCString(),
              'Content-MD5': contentMD5
            },
          });

          if (vuforiaResponse.status === 201) {
            const targetId = vuforiaResponse.data.target_id;

            // Guardar los datos del formulario en la base de datos
            const newForm = new Form({
              name,
              email,
              phone,
              option,
              targetId,
              videoUrl: data.Location,
            });

            try {
              await newForm.save();
              res.status(200).send({ targetId, videoLocation: data.Location });
            } catch (dbError) {
              console.error('Error al guardar en la base de datos:', dbError);
              res.status(500).send(dbError);
            }
          } else {
            res.status(vuforiaResponse.status).send('Error al agregar la imagen a Vuforia');
          }
        }
      });
    } else if (option === '3d') {
      // Construir el objeto para Vuforia
      const body = {
        name: targetName,
        width: targetWidth,
        image: imageBase64,
      };

      const bodyString = JSON.stringify(body);
      const contentMD5 = crypto.createHash('md5').update(bodyString).digest('hex');

      const signature = generateSignature('POST', contentMD5, 'application/json', new Date().toUTCString(), '/targets');

      const vuforiaResponse = await axios.post(`https://vws.vuforia.com/targets`, body, {
        headers: {
          'Authorization': `VWS ${serverAccessKey}:${signature}`,
          'Content-Type': 'application/json',
          'Date': new Date().toUTCString(),
          'Content-MD5': contentMD5
        },
      });

      if (vuforiaResponse.status === 201) {
        const targetId = vuforiaResponse.data.target_id;

        // Guardar los datos del formulario en la base de datos
        const newForm = new Form({
          name,
          email,
          phone,
          option,
          description,
          targetId,
        });

        try {
          await newForm.save();
          res.status(200).send({ targetId });
        } catch (dbError) {
          console.error('Error al guardar en la base de datos:', dbError);
          res.status(500).send(dbError);
        }
      } else {
        res.status(vuforiaResponse.status).send('Error al agregar la imagen a Vuforia');
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al subir los datos');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
