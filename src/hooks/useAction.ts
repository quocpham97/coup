import { assertConfiguration } from '@ably-labs/react-hooks';
import { Types } from 'ably';
import {
  accept,
  approve,
  blockExchangeCard,
  blockForeignAid,
  challenge,
  exchangeCard,
  nextTurn,
  showCard,
  startGame,
  steal,
  takeForeignAid,
  takeIncome,
} from 'services/action';
import { ActionType } from 'types';

export function useAction() {
  const normalActionList: Array<{ type: ActionType; isHasTarget: boolean }> = [
    { type: ActionType.TakeIncome, isHasTarget: false },
    { type: ActionType.TakeForeignAid, isHasTarget: false },
    // ActionType.MakeCoup,
    // ActionType.Kill,
    { type: ActionType.ExchangeCard, isHasTarget: false },
    { type: ActionType.Steal, isHasTarget: true },
    // ActionType.DrawCard,
  ];
  const challengeActionGroup: Array<ActionType> = [ActionType.Challenge, ActionType.Accept];
  const proveActionGroup: Array<ActionType> = [ActionType.ShowCard, ActionType.Accept];
  const blockExchangeCardActionGroup: Array<ActionType> = [
    ActionType.BlockExchangeCard,
    ActionType.Approve,
  ];
  const blockForeignAidActionGroup: Array<ActionType> = [
    ActionType.BlockForeignAid,
    ActionType.Approve,
  ];
  const blockActionList: Array<ActionType> = [
    ActionType.BlockSteal,
    ActionType.BlockForeignAid,
    ActionType.BlockKill,
  ];
  const ably = assertConfiguration();

  const getAction = ({
    type,
    roomId,
    channel,
    targetId,
  }: {
    type: ActionType;
    roomId: string;
    channel: Types.RealtimeChannelCallbacks;
    targetId?: string;
  }) => {
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
        return async () => {
          await steal(roomId, ably.auth.clientId, targetId as string).then(() => {
            channel.publish({ data: { action: 'Wait' } });
          });
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
        return async () => {
          await blockForeignAid(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Wait' } });
          });
        };
      case ActionType.BlockKill:
        return () => {
          console.log(ActionType.BlockKill);
        };
      case ActionType.BlockExchangeCard:
        return async () => {
          await blockExchangeCard(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Wait' } });
          });
        };
      case ActionType.ExchangeCard:
        return async () => {
          await exchangeCard(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Wait' } });
          });
        };
      case ActionType.DrawCard:
        return () => {
          console.log(ActionType.DrawCard);
        };
      case ActionType.Challenge:
        return async () => {
          await challenge(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Challenge' } });
          });
        };
      case ActionType.Accept:
        return async () => {
          await accept(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Next' } });
          });
        };
      case ActionType.ShowCard:
        return async () => {
          await showCard(roomId, ably.auth.clientId).then(() => {
            channel.publish({ data: { action: 'Next' } });
          });
        };
      case ActionType.Approve:
        return async () => {
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
      case ActionType.BlockExchangeCard:
        return 'Block Exchange Card';
      case ActionType.ExchangeCard:
        return 'Exchange Card';
      case ActionType.DrawCard:
        return 'Draw Card';
      case ActionType.Challenge:
        return 'Challenge';
      case ActionType.Accept:
        return 'Accept';
      case ActionType.Next:
        return 'Next';
      case ActionType.Start:
        return 'Start';
      case ActionType.Approve:
        return 'Approve';
      case ActionType.ShowCard:
        return 'Show Card';

      default:
        return null;
    }
  };

  return {
    normalActionList,
    proveActionGroup,
    challengeActionGroup,
    blockForeignAidActionGroup,
    blockExchangeCardActionGroup,
    blockActionList,
    getAction,
    getText,
  };
}
