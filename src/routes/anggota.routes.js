import express from 'express';
import mongoose from 'mongoose';
import Anggota from '../models/data_anggota_klub.js';

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);


const pickFields = (body) => ({
  nama: body.nama,
  membership_number: body.membership_number,
  joined_date: body.joined_date,
});


router.post('/', async (req, res) => {
  try {
    const anggota = await Anggota.create(pickFields(req.body));
    res.status(201).json({ success: true, message: 'Anggota berhasil ditambahkan', data: anggota });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const data = await Anggota.find();
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const anggota = await Anggota.findById(id);
    if (!anggota) {
      return res.status(404).json({ success: false, message: 'Anggota tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: anggota });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const anggota = await Anggota.findByIdAndUpdate(id, pickFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!anggota) {
      return res.status(404).json({ success: false, message: 'Anggota tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Anggota berhasil diperbarui', data: anggota });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const anggota = await Anggota.findByIdAndDelete(id);
    if (!anggota) {
      return res.status(404).json({ success: false, message: 'Anggota tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Anggota berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;