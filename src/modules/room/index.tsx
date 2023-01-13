import { assertConfiguration, useChannel } from '@ably-labs/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CHANNEL_NAME } from 'constants/channel';
import { getRoom, leaveRoom } from 'services/room';
import { Room } from 'types';

function RoomModule() {
  const router = useRouter();
  const { roomId } = router.query;

  const [room, setRoom] = useState<Room | null>();
  const [channel] = useChannel(`${CHANNEL_NAME.room}-${roomId as string}`, () => {});
  const ably = assertConfiguration();

  useEffect(() => {
    if (roomId) {
      getRoom(roomId as string).then((res) => setRoom(res));
    }
  }, [roomId]);

  useEffect(() => {
    channel.presence.enter();

    return () => {
      channel.presence.leave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeaveRoom = async () => {
    await leaveRoom(roomId as string, ably.auth.clientId);
    router.push(`/lobby`);
  };

  return (
    <div>
      RoomModule
      <div>
        <button type="button" onClick={() => handleLeaveRoom()}>
          Back to Lobby
        </button>
      </div>
      <div>Room ID: {room?.roomId}</div>
      <div>Cards: {room?.cards}</div>
      <div>Players: {room?.players}</div>
    </div>
  );
}

export default RoomModule;
