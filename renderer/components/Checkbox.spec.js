import React from 'react';
import renderer from 'react-test-renderer';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('should render properly', () => {
    expect(renderer.create(
      <Checkbox
        value={ false }
        label="off"
        onChange={ () => {} }
      />
    )).toMatchSnapshot();
    expect(renderer.create(
      <Checkbox
        value={ true }
        label="on"
        onChange={ () => {} }
      />
    )).toMatchSnapshot();
  });
});
