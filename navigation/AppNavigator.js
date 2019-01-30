import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import PublicStack from './PublicNavigator';

export default createSwitchNavigator({
  //Public views
  Public: PublicStack,
  //Only accessible screens
  Main: MainTabNavigator,
},
{
  initialRouteName: 'Public',
}
);