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
    maxlength: 30,
    default: 'Billy herrington'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Актёр'
  },
  avatar: {
    type: String,
    default: 'https://i.redd.it/221v3dpoggcd1.jpeg',
    validate: {
      validator: (v: string) => validator.isURL(v, { require_protocol: true }),
      message: 'Некорректный формат URL'
    }
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
    required: true,
    select: false
  }
});

export default model<IUser>('user', UserSchema);
