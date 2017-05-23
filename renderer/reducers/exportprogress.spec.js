import { exportProgressReducer } from './exportprogress';
import {
  exportCancelled,
  exportProgress,
  exportError,
  exportComplete,
  exportReset,
} from '../actions';
import {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETE_ERROR,
  COMPLETE_SUCCESS,
} from '../helpers/exportProgressStates';

describe('exportProgressReducer', () => {
  it('should initialize to a state of not started', () => {
    expect(exportProgressReducer(undefined, {})).toMatchSnapshot();
  });
  it('should reset when the export is cancelled', () => {
    expect(exportProgressReducer(undefined, exportCancelled())).toMatchSnapshot();
  });
  it('should reflect current status when there is progress', () => {
    expect(exportProgressReducer(undefined, exportProgress('working...'))).toMatchSnapshot();
  });
  it('should support an error state', () => {
    expect(exportProgressReducer(undefined, exportError('something went wrong'))).toMatchSnapshot();
  });
  it('should support complete state with path', () => {
    expect(exportProgressReducer(undefined, exportComplete('/dev/null'))).toMatchSnapshot();
  });
  it('should properly reset when needed', () => {
    const beginningState = {
      status: 'working...',
      state: IN_PROGRESS,
      exportedPath: null,
    };
    const expected = exportProgressReducer(undefined, {});
    expect(exportProgressReducer(beginningState, exportReset())).toEqual(expected);
  });
});
