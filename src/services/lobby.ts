import axios from 'axios';
import { Room } from 'types';

export interface IResponseData {
  rooms: Room[];
  success: boolean;
}

export const getLobby = async (): Promise<Room[] | null> => {
  try {
    return await axios
      .get<IResponseData>(`/api/lobby`)
      .then((res) => res.data.rooms)
      .catch(() => null);
  } catch (error) {
    return Promise.reject(error);
  }
};
