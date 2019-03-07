import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';
import {
  SelectScreen,
  ConfirmSMSScreen,
  InitialScreen,
  SignInScreen,
  SignUpScreen,
  SMSScreen
} from './containers';

const AuthStack = createStackNavigator({
  SelectScreen: SelectScreen,
  ConfirmSMSScreen: ConfirmSMSScreen,
  InitialScreen: InitialScreen,
  SignInScreen: SignInScreen,
  SignUpScreen: SignUpScreen,
  SMSScreen: SMSScreen
}, {
  initialRouteName: 'SelectScreen',
  headerMode: 'none'
});

const routing = createSwitchNavigator({
  AuthStack: AuthStack
}, {
  initialRouteName: 'AuthStack',
  headerMode: 'none'
});

export default createAppContainer(AuthStack);
