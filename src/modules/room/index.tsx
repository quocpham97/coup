import { assertConfiguration, useChannel } from '@ably-labs/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { CHANNEL_NAME } from 'constants/channel';
import { getRoom, leaveRoom } from 'services/room';
import { ActionType, Room } from 'types';
import Action from 'components/Action';
import { useAction } from 'hooks/useAction';

const COUNT_DOWN_TIME = 30;

function RoomModule() {
  const router = useRouter();
  const { roomId } = router.query;

  const [room, setRoom] = useState<Room | null>();
  const [timeLeft, setTimeLeft] = useState(COUNT_DOWN_TIME);
  const [channel] = useChannel(`${CHANNEL_NAME.room}-${roomId as string}`, (mess) => {
    const { action } = mess.data as { action: string };
    if (action === 'GetNewEndTime' || action === 'Next') {
      getRoom(roomId as string).then((res) => setRoom(res));
    }
    if (action === 'JoinRoom' || action === 'LeaveRoom' || action === 'CompleteAction')
      getRoom(roomId as string).then((res) => setRoom(res));
  });
  const ably = assertConfiguration();
  const { actionList } = useAction();

  useEffect(() => {
    if (roomId) {
      getRoom(roomId as string).then((res) => setRoom(res));
    }
  }, [roomId]);

  useEffect(() => {
    channel.presence.enter(null, () => {
      channel.publish({ data: { action: 'JoinRoom' } });
    });

    return () => {
      channel.presence.leave(null, () => {
        channel.publish({ data: { action: 'LeaveRoom' } });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(differenceInSeconds(new Date(room?.endTimeTurn as string), new Date()));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [room?.endTimeTurn]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleLeaveRoom = async () => {
    await leaveRoom(roomId as string, ably.auth.clientId);
    router.push(`/lobby`);
  };

  const renderTimer = () => {
    if (timeLeft > 1) return `${timeLeft} seconds`;
    if (timeLeft > 0) return `${timeLeft} second`;
    return 'End';
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
      <div>Time left: {room?.endTimeTurn}</div>
      <div>Timer: {renderTimer()} </div>
      <div>My ID: {ably.auth.clientId} </div>
      <div>Current Player: {room?.currentTurn} </div>
      <div className="flex gap-2">
        {room?.currentTurn === ably.auth.clientId &&
          actionList.map((action, index) => (
            <Action
              key={`${action}-${index + 1}`}
              type={action}
              roomId={roomId as string}
              isHidden={
                // (room?.host !== ably.auth.clientId || room?.status === RoomStatusType.STARTED) &&
                room?.host !== ably.auth.clientId && ActionType.Start === action
              }
              channel={channel}
            />
          ))}
      </div>
    </div>
  );
}

export default RoomModule;
