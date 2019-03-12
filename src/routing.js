
import React from "react";
import { StyleSheet, Image } from "react-native";

import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import {
  SelectScreen,
  ConfirmSMSScreen,
  InitialScreen,
  SignInScreen,
  SignUpScreen,
  SMSScreen
} from './containers';

import Home from "./containers/Home";
import Calendar from "./containers/Calendar";
import Reviews from "./containers/Barber/Reviews";
import Settings from "./containers/Settings";
import BarberProfile from "./containers/Barber/Profile";

import colors from "./themes/colors";

const TabNavigator = createBottomTabNavigator(
  {
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        tabBarLabel: "Calendar"
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home"
      }
    },
    Reviews: {
      screen: Reviews,
      navigationOptions: {
        tabBarLabel: "Reviews"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff",
      },
      headerTintColor: "#fff"
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Settings"
      },
    }
  },  
  { 
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        
        if (routeName == "Calendar") {
          if (focused) {
            return <Image source={require('./assets/images/calender.png')} style={styles.icon} />    
          } else {
            return <Image source={require('./assets/images/calender.png')} style={styles.icon} />
          }        
        } else if (routeName == "Home") {
          if (focused) {
            return <Image source={require('./assets/images/home.png')} style={styles.icon} />  
          } else {
            return <Image source={require('./assets/images/home.png')} style={styles.icon} />
          }        
        } else if (routeName == "Reviews") {
          if (focused) {
            return <Image source={require('./assets/images/review.png')} style={styles.icon} />  
          } else {
            return <Image source={require('./assets/images/review.png')} style={styles.icon} />
          }        
        } else if (routeName == "Settings") {
          if (focused) {
            return <Image source={require('./assets/images/setting.png')} style={styles.icon} />    
          } else {
            return <Image source={require('./assets/images/setting.png')} style={styles.icon} />
          }        
        } 
      },
    }), 
    tabBarOptions: {
      activeTintColor: colors.bottomTabTintColor
    }
  }
);

const AuthStack = createStackNavigator({
  SelectScreen: SelectScreen,
  ConfirmSMSScreen: ConfirmSMSScreen,
  InitialScreen: InitialScreen,
  SignInScreen: SignInScreen,
  SignUpScreen: SignUpScreen,
  SMSScreen: SMSScreen,
  BarberProfile : BarberProfile,
  TabNavigator: TabNavigator
}, {
  initialRouteName: 'TabNavigator',
  headerMode: 'none'
});

const routing = createSwitchNavigator({
  AuthStack: AuthStack
}, {
  initialRouteName: 'AuthStack',
  headerMode: 'none'
});

export default createAppContainer(AuthStack);

const styles = StyleSheet.create({
  icon: { height: 25, width: 25 }
});

