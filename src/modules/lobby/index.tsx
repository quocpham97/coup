import React, { useContext } from 'react';
import { assertConfiguration } from '@ably-labs/react-hooks';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { joinRoom } from 'services/room';
import LobbyContext from 'contexts/LobbyContext';

const backgrounds = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-gray-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-white',
  'bg-sky-500',
];

function LobbyModule() {
  const router = useRouter();
  const ably = assertConfiguration();
  const { rooms } = useContext(LobbyContext);

  const handleJoinRoom = async (roomId: string) => {
    await joinRoom(roomId, ably.auth.clientId);
    router.push(`/room/${roomId}`);
  };

  return (
    <div>
      LobbyModule
      <div className="grid grid-cols-3">
        {rooms &&
          rooms.map((room, index) => (
            <button type="button" onClick={() => handleJoinRoom(room.roomId)} key={room.roomId}>
              <div className={clsx('min-h-[250px]', backgrounds[index])} />
            </button>
          ))}
      </div>
    </div>
  );
}

export default LobbyModule;
