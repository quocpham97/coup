import axios from 'axios';
import { ActionType } from 'types';

interface IResponseAction {
  action: ActionType;
  playerId: string;
  targetId: string;
}

export const startGame = async (roomId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/startGame`, { roomId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const nextTurn = async (roomId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/nextTurn`, { roomId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const takeIncome = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/takeIncome`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const takeForeignAid = async ({
  roomId,
  playerId,
  isApproved,
}: {
  roomId: string;
  playerId?: string;
  isApproved?: boolean;
}): Promise<void> => {
  try {
    return await axios.post(`/api/action/takeForeignAid`, {
      roomId,
      playerId,
      isApproved,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const approve = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/approve`, { roomId, playerId }).then(async (res) => {
      const { isApproved } = res.data as { isApproved: boolean };
      if (isApproved) await nextTurn(roomId);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const challenge = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/challenge`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const exchangeCard = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/exchangeCard`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const blockForeignAid = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/blockForeignAid`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const steal = async (roomId: string, playerId: string, targetId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/steal`, { roomId, playerId, targetId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const kill = async (roomId: string, playerId: string, targetId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/kill`, { roomId, playerId, targetId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const accept = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios
      .post<IResponseAction>(`/api/action/accept`, { roomId, playerId })
      .then(async (res) => {
        const { action, targetId, playerId: resPlayerId } = res.data;

        if (action === ActionType.Kill) {
          if (resPlayerId === playerId) {
            await kill(roomId, resPlayerId, '');
          } else if (targetId === playerId) {
            await kill(roomId, resPlayerId, targetId);
          }
        }

        await nextTurn(roomId);
      });
  } catch (error) {
    return Promise.reject(error);
  }
};

// TODO: enable when user has appropriate card
export const showCard = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios
      .post<IResponseAction>(`/api/action/showCard`, { roomId, playerId })
      .then(async (res) => {
        const { action, playerId: resPlayerId } = res.data;

        if (action === ActionType.Kill && resPlayerId === playerId) {
          await kill(roomId, resPlayerId, '');
        }

        await nextTurn(roomId);
      });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const blockExchangeCard = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/blockExchangeCard`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const blockSteal = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/blockSteal`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const blockKill = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/blockKill`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const faceUp = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/faceUp`, { roomId, playerId }).then(async () => {
      await nextTurn(roomId);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
