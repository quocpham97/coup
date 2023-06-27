import { assertConfiguration, useChannel } from '@ably-labs/react-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { CHANNEL_NAME } from 'constants/channel';
import { getRoom, leaveRoom } from 'services/room';
import { ActionType, Room, RoomStatusType } from 'types';
import Action from 'components/Action';
import { useAction } from 'hooks/useAction';
import ButtonStart from 'components/ButtonStart';
import ActionWithTarget from 'components/ActionWithTarget';
import { TargetPlayer } from 'components/TargetPlayer';
// import { nextTurn, takeIncome } from 'services/action';

// const COUNT_DOWN_TIME = 30;

function RoomModule() {
  const router = useRouter();
  const { roomId } = router.query;
  const ably = assertConfiguration();

  const [room, setRoom] = useState<Room | null>();
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAction, setSelectedAction] = useState(room?.currentAction?.mainAction);
  const [channel] = useChannel(`${CHANNEL_NAME.room}-${roomId as string}`, (mess) => {
    const { action } = mess.data as { action: string };
    if (action === 'Wait') {
      getRoom(roomId as string).then((res) => setRoom(res));
    } else if (action === 'GetNewEndTime' || action === 'Next') {
      getRoom(roomId as string).then((res) => setRoom(res));
    } else if (action === 'JoinRoom' || action === 'LeaveRoom' || action === 'CompleteAction')
      getRoom(roomId as string).then((res) => setRoom(res));
    else if (action === 'Approve' || action === 'Challenge') {
      getRoom(roomId as string).then((res) => setRoom(res));
    }
  });
  const {
    normalActionList,
    proveActionGroup,
    challengeActionGroup,
    blockExchangeCardActionGroup,
    blockForeignAidActionGroup,
  } = useAction();

  useEffect(() => {
    if (roomId) {
      getRoom(roomId as string).then((res) => {
        setRoom(res);
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSelectedAction(room?.currentAction?.mainAction);
  }, [room?.currentAction]);

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
    if (timeLeft < 0) {
      // TODO: handle action when user is AFK or does not action within countdown
      // room?.currentTurn === ably.auth.clientId &&
      //   takeIncome(roomId as string, ably.auth.clientId).then(() => {
      //     nextTurn(roomId as string, ably.auth.clientId).then(() => {
      //       channel.publish({ data: { action: 'Next' } });
      //     });
      //   });
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
      <div>Current Action: {room?.currentAction?.mainAction} </div>
      <div>Action Status: {JSON.stringify(room?.currentAction)} </div>
      <div>Approved Players: {JSON.stringify(room?.currentAction?.approvedPlayers)} </div>
      <div>Selected Action: {selectedAction} </div>
      <div className="my-2">
        {room?.host === ably.auth.clientId && room?.status !== RoomStatusType.STARTED && (
          <ButtonStart roomId={roomId as string} isHighlight channel={channel} />
        )}
      </div>
      <div className="flex gap-2">
        {/* TODO: show/hide action button depend on current turn (playerId) */}
        {/* {((room?.currentTurn === ably.auth.clientId &&
          (!room?.currentAction?.isWaiting || !room.currentAction)) ||
          (room?.currentTurn !== ably.auth.clientId && room?.currentAction?.isWaiting)) && */}
        {room?.status === RoomStatusType.STARTED &&
          room?.currentTurn === ably.auth.clientId &&
          room.currentAction === null &&
          normalActionList.map((action, index) => {
            if (action.isHasTarget)
              return (
                <ActionWithTarget
                  key={`${action.type}-${index + 1}`}
                  type={action.type}
                  isHighlight
                  setSelectedAction={setSelectedAction}
                />
              );
            return (
              <Action
                key={`${action.type}-${index + 1}`}
                type={action.type}
                roomId={roomId as string}
                channel={channel}
                isHighlight
                isDisabled={!!selectedAction}
              />
            );
          })}

        {room?.status === RoomStatusType.STARTED &&
          room?.currentTurn !== ably.auth.clientId &&
          room.currentAction !== null &&
          room.currentAction.mainAction === ActionType.ExchangeCard &&
          !room.currentAction.isOpposing &&
          !room.currentAction.isChallenging &&
          room.players.filter((pl) => pl.playerId === ably.auth.clientId)[0].health > 0 &&
          !room.currentAction.approvedPlayers.includes(ably.auth.clientId) &&
          blockExchangeCardActionGroup.map((action, index) => (
            <Action
              key={`${action}-${index + 1}`}
              type={action}
              roomId={roomId as string}
              isHighlight
              channel={channel}
            />
          ))}

        {room?.status === RoomStatusType.STARTED &&
          room?.currentTurn !== ably.auth.clientId &&
          room.currentAction !== null &&
          room.currentAction.mainAction === ActionType.TakeForeignAid &&
          !room.currentAction.isOpposing &&
          !room.currentAction.isChallenging &&
          room.players.filter((pl) => pl.playerId === ably.auth.clientId)[0].health > 0 &&
          !room.currentAction.approvedPlayers.includes(ably.auth.clientId) &&
          blockForeignAidActionGroup.map((action, index) => (
            <Action
              key={`${action}-${index + 1}`}
              type={action}
              roomId={roomId as string}
              isHighlight
              channel={channel}
            />
          ))}

        {room?.status === RoomStatusType.STARTED &&
          room.currentAction !== null &&
          ((room?.currentTurn === ably.auth.clientId &&
            room.currentAction.isOpposing &&
            !room.currentAction.isChallenging &&
            room.players.filter((pl) => pl.playerId === ably.auth.clientId)[0].health > 0 &&
            !room.currentAction.approvedPlayers.includes(ably.auth.clientId)) ||
            (!room.currentAction.isChallenging &&
              room.currentAction.targetId === ably.auth.clientId)) &&
          challengeActionGroup.map((action, index) => (
            <Action
              key={`${action}-${index + 1}`}
              type={action}
              roomId={roomId as string}
              isHighlight
              channel={channel}
            />
          ))}

        {room?.status === RoomStatusType.STARTED &&
          room.currentAction !== null &&
          ((room?.currentTurn !== ably.auth.clientId &&
            room.currentAction.isOpposing &&
            room.currentAction.isChallenging &&
            room.players.filter((pl) => pl.playerId === ably.auth.clientId)[0].health > 0 &&
            room.currentAction.opposerId === ably.auth.clientId) ||
            (room?.currentTurn === ably.auth.clientId && room.currentAction.isChallenging)) &&
          proveActionGroup.map((action, index) => (
            <Action
              key={`${action}-${index + 1}`}
              type={action}
              roomId={roomId as string}
              isHighlight
              channel={channel}
            />
          ))}
      </div>
      <div className="flex gap-2 my-2">
        {room?.status === RoomStatusType.STARTED &&
          room?.currentTurn === ably.auth.clientId &&
          room.currentAction === null &&
          !!selectedAction &&
          room.players
            .filter((pl) => pl.playerId !== room?.currentTurn)
            .map((pl, index) => (
              <TargetPlayer
                key={`${pl.playerId}-${index + 1}`}
                type={selectedAction as ActionType}
                roomId={roomId as string}
                channel={channel}
                targetId={pl.playerId}
                targetName={pl.playerId}
              />
            ))}
      </div>
    </div>
  );
}

export default RoomModule;
