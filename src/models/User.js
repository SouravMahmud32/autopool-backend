import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  downline: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('User', userSchema);
