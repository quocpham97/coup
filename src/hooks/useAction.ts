import { assertConfiguration } from '@ably-labs/react-hooks';
import { Types } from 'ably';
import { approve, nextTurn, startGame, takeForeignAid, takeIncome } from 'services/action';
import { ActionType } from 'types';

export function useAction() {
  const normalActionList: Array<ActionType> = [
    ActionType.TakeIncome,
    ActionType.TakeForeignAid,
    // ActionType.MakeCoup,
    // ActionType.Steal,
    // ActionType.Kill,
    // ActionType.ExchangeCard,
    // ActionType.DrawCard,
  ];
  const challengeActionList: Array<ActionType> = [
    ActionType.Challenge,
    // ActionType.Next,
    ActionType.Approve,
  ];
  const blockActionList: Array<ActionType> = [
    ActionType.BlockSteal,
    ActionType.BlockForeignAid,
    ActionType.BlockKill,
  ];
  const ably = assertConfiguration();

  const getAction = (type: ActionType, roomId: string, channel: Types.RealtimeChannelCallbacks) => {
    switch (type) {
      case ActionType.TakeIncome:
        return async () => {
          await takeIncome(roomId, ably.auth.clientId).then(async () => {
            await nextTurn(roomId, ably.auth.clientId).then(() => {
              channel.publish({ data: { action: 'CompleteAction' } });
            });
          });
        };
      case ActionType.TakeForeignAid:
        return async () => {
          await takeForeignAid(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Wait' } });
          });
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
      case ActionType.Approve:
        return async () => {
          console.log(ActionType.Approve);
          await approve(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Approve' } });
          });
        };
      case ActionType.Next:
        return async () => {
          await nextTurn(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Next' } });
          });
        };
      case ActionType.Start:
        return async () => {
          await startGame(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'GetNewEndTime' } });
          });
        };

      default:
        return () => {};
    }
  };

  const getText = (type: ActionType) => {
    switch (type) {
      case ActionType.TakeIncome:
        return 'Take Income';
      case ActionType.TakeForeignAid:
        return 'Take Foreign Aid';
      case ActionType.MakeCoup:
        return 'Make Coup';
      case ActionType.Steal:
        return 'Steal';
      case ActionType.Kill:
        return 'Kill';
      case ActionType.BlockSteal:
        return 'Block Steal';
      case ActionType.BlockForeignAid:
        return 'Block Foreign Aid';
      case ActionType.BlockKill:
        return 'Block Kill';
      case ActionType.ExchangeCard:
        return 'Exchange Card';
      case ActionType.DrawCard:
        return 'Draw Card';
      case ActionType.Challenge:
        return 'Challenge';
      case ActionType.Next:
        return 'Next';
      case ActionType.Start:
        return 'Start';
      case ActionType.Approve:
        return 'Approve';

      default:
        return null;
    }
  };

  return { normalActionList, challengeActionList, blockActionList, getAction, getText };
}
