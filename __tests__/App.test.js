import React from 'react';
import renderer from 'react-test-renderer';
import LoginButton from '../components/buttons/LoginButton';

test('renders correctly', () => {
  const tree = renderer.create(<LoginButton />).toJSON();
  expect(tree).toMatchSnapshot();
});