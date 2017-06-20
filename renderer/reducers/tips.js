import {
  NEXT_TIP,
  PREVIOUS_TIP,
} from '../actions';

const defaultTips = {
  currentTipIndex: 0,
};

export const tipsReducer = (state = defaultTips, action) => {
  switch (action.type) {
    case NEXT_TIP:
      return {
        ...state,
        currentTipIndex: state.currentTipIndex + 1,
      };
    case PREVIOUS_TIP:
      return {
        ...state,
        currentTipIndex: state.currentTipIndex - 1,
      };
    default:
      return state;
  }
};
