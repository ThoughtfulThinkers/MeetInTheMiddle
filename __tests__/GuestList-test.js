import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import GuestList from '../components/Meetup/GuestList/GuestList';

test('renders GuestList correctly', () => {
  const tree = renderer.create(
    <GuestList guests={['Test User', 'Test Two']} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
