import axios from 'axios';
import { ActionType } from 'types';

export interface IResponseData {
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

export const nextTurn = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios
      .post(`/api/action`, { roomId, playerId, action: ActionType.Next })
      .then(() => {})
      .catch(() => {});
  } catch (error) {
    return Promise.reject(error);
  }
};

export const takeIncome = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios
      .post(`/api/action`, { roomId, playerId, action: ActionType.TakeIncome })
      .then(() => {})
      .catch(() => {});
  } catch (error) {
    return Promise.reject(error);
  }
};

export const takeForeignAid = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios
      .post(`/api/action`, { roomId, playerId, action: ActionType.TakeForeignAid })
      .then(() => {})
      .catch(() => {});
  } catch (error) {
    return Promise.reject(error);
  }
};
