import { UPDATE_READY } from '../actions';

const defaultUpdate = {
  available: false,
};

export const updateReducer = (state = defaultUpdate, action) => {
  switch (action.type) {
    case UPDATE_READY:
      return {
        ...state,
        available: true,
      };
    default:
      return state;
  }
};
