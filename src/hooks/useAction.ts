import { assertConfiguration } from '@ably-labs/react-hooks';
import { Types } from 'ably';
import { nextTurn, startGame } from 'services/action';
import { ActionType } from 'types';

export function useAction() {
  const actionList: Array<ActionType> = [
    ActionType.TakeIncome,
    ActionType.TakeForeignAid,
    ActionType.MakeCoup,
    ActionType.Steal,
    ActionType.Kill,
    ActionType.BlockSteal,
    ActionType.BlockForeignAid,
    ActionType.BlockKill,
    ActionType.ExchangeCard,
    ActionType.DrawCard,
    ActionType.Challenge,
    ActionType.Next,
    ActionType.Start,
  ];
  const ably = assertConfiguration();

  const getAction = (type: ActionType, roomId: string, channel: Types.RealtimeChannelCallbacks) => {
    switch (type) {
      case ActionType.TakeIncome:
        return () => {
          console.log(ActionType.TakeIncome);
        };
      case ActionType.TakeForeignAid:
        return () => {
          console.log(ActionType.TakeForeignAid);
        };
      case ActionType.MakeCoup:
        return () => {
          console.log(ActionType.MakeCoup);
        };
      case ActionType.Steal:
        return () => {
          console.log(ActionType.Steal);
        };
      case ActionType.Kill:
        return () => {
          console.log(ActionType.Kill);
        };
      case ActionType.BlockSteal:
        return () => {
          console.log(ActionType.BlockSteal);
        };
      case ActionType.BlockForeignAid:
        return () => {
          console.log(ActionType.BlockForeignAid);
        };
      case ActionType.BlockKill:
        return () => {
          console.log(ActionType.BlockKill);
        };
      case ActionType.ExchangeCard:
        return () => {
          console.log(ActionType.ExchangeCard);
        };
      case ActionType.DrawCard:
        return () => {
          console.log(ActionType.DrawCard);
        };
      case ActionType.Challenge:
        return () => {
          console.log(ActionType.Challenge);
        };
      case ActionType.Next:
        return async () => {
          await nextTurn(roomId, ably.auth.clientId).then((res) => {
            channel.publish({ data: { action: 'NextPlayer', endTimeTurn: res?.endTimeTurn } });
          });
        };
      case ActionType.Start:
        return async () => {
          await startGame(roomId, ably.auth.clientId);
          channel.publish({ data: { action: 'GetNewEndTime' } });
        };

      default:
        return () => {};
    }
  };

  return { actionList, getAction };
}
