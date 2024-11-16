import { Schema, model } from 'mongoose';
import validator from 'validator';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Неправильный формат почты'
    }
  },
  password: {
    type: String,
    required: true
  }
});

export default model<IUser>('user', UserSchema);
