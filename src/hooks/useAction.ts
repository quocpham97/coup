import { ActionType } from 'types';

export function useAction() {
  const actionTypes: Array<ActionType> = [
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
  ];

  const getAction = (type: ActionType) => {
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

      default:
        return () => {};
    }
  };

  return { actionTypes, getAction };
}
