import mongoose from 'mongoose';
import { Room as RoomDTO } from 'types';

const roomSchema = new mongoose.Schema<RoomDTO>(
  {
    _id: mongoose.Schema.Types.ObjectId,
    roomId: { type: String, required: true },
    status: { type: String, required: true },
    cards: { type: [String], required: true },
    host: { type: String },
    players: { type: [Object] },
    currentAction: { type: Object },
    currentTurn: { type: String },
    endTimeTurn: { type: String },
  },
  { collection: 'room' },
);

const Room = mongoose.models.room || mongoose.model('room', roomSchema);

export default Room;
