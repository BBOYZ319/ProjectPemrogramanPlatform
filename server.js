const express = require('express');
const { generateToken } = require('./tokenService');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const mahasiswaController = require('./controller/mahasiswaController');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(loggerMiddleware);
app.use(authMiddleware);
app.use(bodyParser.json());
app.use(express.json());
app.use('/mahasiswa', mahasiswaController);
app.use('/mahasiswa/nim', mahasiswaController);
app.put('/mahasiswa/nim', mahasiswaController);
app.post('/mahasiswa',mahasiswaController );
app.delete('/mahasiswa', loggerMiddleware, authMiddleware, mahasiswaController );
app.post('/generate-token', (req, res) => {
    const userData = {
        id: req.body.id || 1, 
        username: req.body.username || 'Front-Man', 
    };

    const token = generateToken(userData);
    res.json({ token });
});


app.listen(PORT, (err) => {
    if (err) {
        return console.error('Error starting server:', err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});