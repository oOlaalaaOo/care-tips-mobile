import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntroductionPage from '../pages/main/introduction/introduction.page';
import ItemDetailsPage from '../pages/main/item-details/item-details.page';
import LoginPage from '../pages/main/auth/login.page';
import RegisterPage from '../pages/main/auth/register.page';
import BottomTabNavigation from './bottom-tab.navigation';
import Auth from '@aws-amplify/auth';

const Stack = createStackNavigator();

const MainNavigation: React.FC<any> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        await Auth.currentSession();
        setIsSessionValid(true);
      } catch (err) {
        console.log('err', err);
        setIsSessionValid(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!isSessionValid && (
        <>
          <Stack.Screen
            name="IntroductionPage"
            component={IntroductionPage}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: true, title: ''}}
          />

          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{headerShown: true, title: ''}}
          />

          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ItemDetailsPage"
            component={ItemDetailsPage}
            options={{
              title: '',
              headerBackTitle: '',
            }}
          />
        </>
      )}

      {isSessionValid && (
        <>
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ItemDetailsPage"
            component={ItemDetailsPage}
            options={{
              title: '',
              headerBackTitle: '',
            }}
          />

          <Stack.Screen
            name="IntroductionPage"
            component={IntroductionPage}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{headerShown: true, title: ''}}
          />

          <Stack.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={{headerShown: true, title: ''}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
