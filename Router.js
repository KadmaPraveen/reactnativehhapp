import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Screen imports
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import Otp from './src/Screens/Otp';
import Dashboard from './src/Screens/Dashboard';
//tab screens
import TabOne from './src/Screens/TabOne';
import TabTwo from './src/Screens/TabTwo';
import TabThree from './src/Screens/TabThree';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HamMenu = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login1" component={Login} options={{title:'My own Title'}}/>
      <Drawer.Screen name="Reg1" component={Register} />
      <Drawer.Screen name="TabOne" component={TabOne} />
    </Drawer.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TabTwo"
        component={TabTwo}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TabThree"
        component={TabThree}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'HomeTabs'}>
        <Stack.Screen name="Drawer" component={HamMenu} options={{ headerShown: false }}/>
        <Stack.Screen
          name="Tabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'Register'} component={Register} options={{title:'My own Register'}}/>
        <Stack.Screen name={'Dashboard'} component={Dashboard} />
        <Stack.Screen name={'Otp'} component={Otp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
