import 'react-native-gesture-handler';

import React from 'react';
import MainNavigation from './src/navigations/main.navigation';
import {NavigationContainer} from '@react-navigation/native';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

const App: React.ReactNode = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
