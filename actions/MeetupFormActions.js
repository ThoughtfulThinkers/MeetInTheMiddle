import { Actions } from 'react-native-router-flux';
import {
  MEETUP_CHANGED
} from './types';

export const meetupChange = (prop, value) => {
  return {
    type: MEETUP_CHANGED,
    prop,
    value
  };
};
