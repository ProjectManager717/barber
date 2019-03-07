import React from 'react';
import { StatusBar } from 'react-native';
import Routing from './routing';

StatusBar.setHidden(false);
StatusBar.setBarStyle('light-content');

const App = () => (
  <Routing />
);

export default App;
