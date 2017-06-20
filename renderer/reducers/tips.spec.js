import { tipsReducer } from './tips';
import { nextTip, previousTip } from '../actions';

describe('tipsReducer', () => {
  it('should initialize at the first tip', () => {
    expect(tipsReducer(undefined, {})).toMatchSnapshot();
  });
  it('should proceed back and forth through tips', () => {
    const firstState = tipsReducer(undefined, nextTip());
    expect(firstState).toMatchSnapshot();
    const secondState = tipsReducer(firstState, previousTip());
    expect(secondState).toMatchSnapshot();
  });
});
