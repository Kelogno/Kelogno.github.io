const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de almacenamiento para archivos subidos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Ruta para recibir archivos
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        console.log(`Archivo recibido: ${req.file.filename}`);
        return res.status(200).send('Archivo subido correctamente');
    } else {
        return res.status(400).send('Error al subir archivo');
    }
});

// Servidor activo
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
