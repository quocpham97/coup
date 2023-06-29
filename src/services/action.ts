import axios from 'axios';

export interface IResponseData {
  success: boolean;
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

export const takeForeignAid = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/takeForeignAid`, { roomId, playerId });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const approve = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/approve`, { roomId, playerId }).then(async (res) => {
      const { isApproved, currentTurn } = res.data as {
        isApproved: boolean;
        currentTurn: string;
      };
      if (isApproved) {
        await takeForeignAid(roomId, currentTurn);
        await nextTurn(roomId);
      }
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

export const accept = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/accept`, { roomId, playerId }).then(async () => {
      await nextTurn(roomId);
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// TODO: rework logic show card
export const showCard = async (roomId: string, playerId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/showCard`, { roomId, playerId }).then(async () => {
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

export const steal = async (roomId: string, playerId: string, targetId: string): Promise<void> => {
  try {
    return await axios.post(`/api/action/steal`, { roomId, playerId, targetId });
  } catch (error) {
    return Promise.reject(error);
  }
};
