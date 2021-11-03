import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../pages/main/home/home.page';
import AccountPage from '../pages/bottom-tab/account/account.page';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONT_FAMILY} from '../constants/themes';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation: React.FC<any> = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = 'planet';

          if (route.name === 'HomePage') {
            iconName = focused ? 'planet' : 'planet-outline';
          } else if (route.name === 'AccountPage') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY.medium,
          marginBottom: 5,
        },
      })}>
      <BottomTab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          title: 'HOME',
        }}
      />
      <BottomTab.Screen
        name="AccountPage"
        component={AccountPage}
        options={{
          headerShown: false,
          title: 'ACCOUNT',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
