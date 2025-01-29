const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

router.get('/:NIM', (req, res) => {
    const mahasiswaID = req.params.NIM; 
    db.query('SELECT * FROM mahasiswa WHERE NIM = ?', [mahasiswaID], (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.json(results[0]);
        }
    });
});

router.put('/:NIM', (req, res) => {
    const mahasiswaNim = req.params.NIM; 
    const { NAMA, GENDER, PRODI, ALAMAT } = req.body;

    db.query('UPDATE mahasiswa SET NAMA = ?, GENDER = ?, PRODI = ?, ALAMAT = ? WHERE NIM = ?', 
    [NAMA, GENDER, PRODI, ALAMAT, mahasiswaNim], (error) => {
        if (error) {
            console.error('Error updating mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'Updating mahasiswa Successfully' }); 
        }
    });
});

router.delete('/:NIM', (req, res) => {
    const nim = req.params.NIM;
    db.query('DELETE FROM mahasiswa WHERE NIM = ?', [nim], (error, results) => {
      if (error) {
        console.error("Error deleting mahasiswa:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        res.json({ message: "Mahasiswa deleted successfully" });
      }
    });
  });



module.exports = router;