import React, { useEffect, useState } from 'react';
import Ably from 'ably/promises';
import { configureAbly } from '@ably-labs/react-hooks';
import { CHANNEL_NAME } from 'constants/channel';
import { Room } from 'types';
import { getLobby } from 'services/lobby';
import { LobbyContextProvider } from 'contexts/LobbyContext';

configureAbly({
  authUrl: `${process.env.API_ENTRYPOINT || ''}/api/createTokenRequest`,
});

function ConfigureAbly({ children }: { children: JSX.Element }) {
  const realtime = new Ably.Realtime.Promise({
    authUrl: `${process.env.API_ENTRYPOINT || ''}/api/createTokenRequest`,
  });

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getLobby().then((res) => setRooms(res as Room[]));
  }, []);
  const channelRooms = rooms.map((room) =>
    realtime.channels.get(`${CHANNEL_NAME.room}-${room.roomId}`),
  );

  useEffect(() => {
    channelRooms.forEach((cm) => {
      cm.presence.subscribe('enter', (member) => {
        // eslint-disable-next-line no-console
        console.log(`${member.clientId} entered realtime-chat`);
      });
      // cm.presence.subscribe('update', (member) => {
      //   console.log(member);
      // });
      cm.presence.subscribe('leave', (member) => {
        // eslint-disable-next-line no-console
        console.log(`${member.clientId} left realtime-chat`);
      });
    });

    return () => {
      channelRooms.forEach((cm) => {
        cm.presence.unsubscribe('enter');
        cm.presence.unsubscribe('leave');
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  return (
    <div>
      <LobbyContextProvider rooms={rooms}>{children}</LobbyContextProvider>
    </div>
  );
}

export default ConfigureAbly;
