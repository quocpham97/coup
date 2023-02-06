import React from 'react';
import clsx from 'clsx';
import { Action as ActionType } from 'types';
import { useAction } from 'hooks/useAction';

function Action({ type, isDisabled }: { type: ActionType; isDisabled: boolean }) {
  const { getAction } = useAction();

  const renderActionText = () => {
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

      default:
        return null;
    }
  };

  return (
    <button
      className={clsx(
        'border  rounded-md px-3 py-1 ',
        isDisabled ? 'border-gray-500 text-gray-500' : 'border-blue-500 text-blue-500',
      )}
      type="button"
      onClick={() => getAction(type)()}
    >
      {renderActionText()}
    </button>
  );
}

export default Action;
