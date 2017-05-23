import { exportOptionsReducer } from './exportoptions';
import { setExportOption } from '../actions';

describe('exportOptionsReducer', () => {
  it('should initialize to no options set', () => {
    expect(exportOptionsReducer(undefined, {})).toMatchSnapshot();
  });
  it('should properly set an option', () => {
    expect(exportOptionsReducer(undefined, setExportOption('hyper', true))).toMatchSnapshot();
  });
});
