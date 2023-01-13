import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema<{
  roomId: string;
  cards: string[];
  players: string[];
  _id?: mongoose.Types.ObjectId | undefined;
}>(
  {
    _id: mongoose.Schema.Types.ObjectId,
    roomId: { type: String, required: true },
    cards: { type: [String], required: true },
    players: { type: [String] },
  },
  { collection: 'room' },
);

const Room = mongoose.models.room || mongoose.model('room', roomSchema);

export default Room;
