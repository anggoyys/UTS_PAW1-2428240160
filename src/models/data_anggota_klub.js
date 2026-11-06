import mongoose from 'mongoose';

const anggotaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, 'nama wajib diisi'],
      trim: true,
    },
    membership_number: {
      type: String,
      required: [true, 'nomor anggota wajib diisi'],
      trim: true,
    },
    joined_date: {
      type: Date,
      default: Date.now
    },
    is_active: {
      type: Boolean,
      default: true
    },
  },
);


const Anggota = mongoose.model('Member', anggotaSchema);

export default Anggota;