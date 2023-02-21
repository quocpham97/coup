import axios from 'axios';
import { ActionType } from 'types';

export interface IResponseData {
  endTimeTurn: string;
  success: boolean;
}

export const startGame = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios
      .post(`/api/action`, { roomId, playerId, action: ActionType.Start })
      .then(() => {})
      .catch(() => {});
  } catch (error) {
    return Promise.reject(error);
  }
};

export const nextTurn = async (roomId: string, playerId: string): Promise<IResponseData | null> => {
  try {
    return await axios
      .post<IResponseData>(`/api/action`, { roomId, playerId, action: ActionType.Next })
      .then((res) => res.data)
      .catch(() => null);
  } catch (error) {
    return Promise.reject(error);
  }
};
