import mongoose from 'mongoose';
import { Player } from 'types';

const roomSchema = new mongoose.Schema<{
  roomId: string;
  cards: string[];
  host: string;
  players: Player[];
  _id?: mongoose.Types.ObjectId | undefined;
}>(
  {
    _id: mongoose.Schema.Types.ObjectId,
    roomId: { type: String, required: true },
    cards: { type: [String], required: true },
    host: { type: String },
    players: { type: [Object] },
  },
  { collection: 'room' },
);

const Room = mongoose.models.room || mongoose.model('room', roomSchema);

export default Room;
