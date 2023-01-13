import React, { createContext } from 'react';
import { Room } from 'types';

const LobbyContext = createContext<{ rooms: Room[] }>({ rooms: [] });
const { Provider } = LobbyContext;

export function LobbyContextProvider({
  rooms,
  children,
}: {
  rooms: Room[];
  children: React.ReactNode;
}) {
  return <Provider value={{ rooms }}>{children}</Provider>;
}

export default LobbyContext;
