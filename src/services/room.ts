import axios from 'axios';
import { Room } from 'types';

export interface IResponseData {
  cards: string[];
  room: Room;
  success: boolean;
}

export const getRoom = async (roomId: string): Promise<Room | null> => {
  try {
    return await axios
      .post<IResponseData>(`/api/room`, { roomId })
      .then((res) => res.data.room)
      .catch(() => null);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const joinRoom = async (roomId: string, playerId: string): Promise<string[] | null> => {
  try {
    return await axios
      .put<IResponseData>(`/api/room`, { roomId, playerId, action: 'JOIN' })
      .then((res) => res.data.cards)
      .catch(() => null);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const leaveRoom = async (roomId: string, playerId: string): Promise<string[] | null> => {
  try {
    return await axios
      .put<IResponseData>(`/api/room`, { roomId, playerId, action: 'LEAVE' })
      .then((res) => res.data.cards)
      .catch(() => null);
  } catch (error) {
    return Promise.reject(error);
  }
};
