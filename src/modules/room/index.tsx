import { assertConfiguration, useChannel } from '@ably-labs/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CHANNEL_NAME } from 'constants/channel';
import { getRoom, leaveRoom } from 'services/room';
import { Room } from 'types';
import Action from 'components/Action';
import { useAction } from 'hooks/useAction';

// const COUNT_DOWN_TIME = 15;

function RoomModule() {
  const router = useRouter();
  const { roomId } = router.query;

  const [room, setRoom] = useState<Room | null>();
  // const [timeLeft, setTimeLeft] = useState(COUNT_DOWN_TIME);
  const [channel] = useChannel(`${CHANNEL_NAME.room}-${roomId as string}`, () => {});
  const ably = assertConfiguration();
  const { actionTypes } = useAction();

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

  // TODO: countdown
  // const intervalRef = useRef<NodeJS.Timer>();

  // useEffect(() => {
  //   intervalRef.current = setInterval(() => {
  //     setTimeLeft((t) => t - 1);
  //   }, 1000);
  //   return () => clearInterval(intervalRef.current);
  // }, []);

  // useEffect(() => {
  //   channel.publish({ data: timeLeft.toString() });
  //   if (timeLeft <= 0) {
  //     clearInterval(intervalRef.current);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [timeLeft]);

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
      <div>Players: {JSON.stringify(room?.players)}</div>
      <div className="flex gap-2">
        {actionTypes.map((a, index) => (
          <Action key={`${a}-${index + 1}`} type={a} isDisabled={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

export default RoomModule;
