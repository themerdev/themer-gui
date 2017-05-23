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
    const defaultState = exportProgressReducer(undefined, {});
    expect(defaultState.state).toEqual(NOT_STARTED);
  });
  it('should reflect current status when there is progress', () => {
    const message = 'working...';
    const expected = {
      status: message,
      state: IN_PROGRESS,
      exportedPath: null,
    };
    expect(exportProgressReducer(undefined, exportProgress(message))).toEqual(expected);
  });
  it('should support an error state', () => {
    const message = 'something went wrong';
    const expected = {
      status: message,
      state: COMPLETE_ERROR,
      exportedPath: null,
    };
    expect(exportProgressReducer(undefined, exportError(message))).toEqual(expected);
  });
  it('should support complete state with path', () => {
    const path = '/dev/null';
    const actual = exportProgressReducer(undefined, exportComplete(path));
    expect(actual.exportedPath).toEqual(path);
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
