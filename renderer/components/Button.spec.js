import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  it('should render properly', () => {

    expect(renderer.create(
      <Button onClick={ () => {} }>Hello</Button>
    )).toMatchSnapshot();

    expect(renderer.create(
      <Button
        primary
        onClick={ () => {} }
      >Hello</Button>
    )).toMatchSnapshot();

    expect(renderer.create(
      <Button
        plain
        onClick={ () => {} }
      >Hello</Button>
    )).toMatchSnapshot();

    expect(renderer.create(
      <Button
        noSpace
        onClick={ () => {} }
      >Hello</Button>
    )).toMatchSnapshot();

  });
});
