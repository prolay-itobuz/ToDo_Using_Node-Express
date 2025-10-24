import mongoose from 'mongoose';

const usrSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model('userdata', usrSchema);
export default user;
