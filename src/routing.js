import React from "react";
import {StyleSheet, Image} from "react-native";

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
import Calendar from "./containers/Barber/Calendar";
import ChooseTimings from "./containers/Barber/ChooseTimings";
import Reviews from "./containers/Barber/Reviews";
import Settings from "./containers/Settings";
import Profile from "./containers/Barber/Profile";
import QRCheckIn from "./containers/Barber/QRCheckIn";
import Cancellations from "./containers/Settings/Cancellations";
import BookingPreferences from "./containers/Settings/BookingPreferences";
import ClientQR from "./containers/Settings/ClientQR";
import Receipt from "./containers/Settings/Receipt";
import DiscoverMe from "./containers/Settings/DiscoverMe";
import SurgePricing from "./containers/Settings/SurgePricing";
import MobilePay from "./containers/Settings/MobilePay";
import MobilePaySettings from "./containers/Settings/MobilePay/MobilePaySettings"
import Appointments from "./containers/Barber/Appointments"
import SurgePricingRate from "./containers/Settings/SurgePricing/SurgePricingRate"
import PaymentMethod from "./containers/Settings/MobilePay/PaymentMethod"
import BarberEditProfile from "./containers/Barber/Profile/BarberEditProfile"


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
        initialRouteName: "Calendar",
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;

                if (routeName == "Calendar") {
                    if (focused) {
                        return <Image source={require('./assets/images/calender.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/calender.png')} style={styles.icon}/>
                    }
                } else if (routeName == "Home") {
                    if (focused) {
                        return <Image source={require('./assets/images/home.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/home.png')} style={styles.icon}/>
                    }
                } else if (routeName == "Reviews") {
                    if (focused) {
                        return <Image source={require('./assets/images/review.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/review.png')} style={styles.icon}/>
                    }
                } else if (routeName == "Settings") {
                    if (focused) {
                        return <Image source={require('./assets/images/setting.png')} style={styles.icon}/>
                    } else {
                        return <Image source={require('./assets/images/setting.png')} style={styles.icon}/>
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
    Profile: Profile,
    QRCheckIn: QRCheckIn,
    ClientQR: ClientQR,
    Cancellations: Cancellations,
    BookingPreferences: BookingPreferences,
    Receipt: Receipt,
    ChooseTimings: ChooseTimings,
    TabNavigator: TabNavigator,
    DiscoverMe: DiscoverMe,
    SurgePricing: SurgePricing,
    MobilePay: MobilePay,
    MobilePaySettings:MobilePaySettings,
    Appointments:Appointments,
    SurgePricingRate:SurgePricingRate,
    PaymentMethod:PaymentMethod,
    BarberEditProfile:BarberEditProfile,

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

const styles = StyleSheet.create({
    icon: {height: 25, width: 25}
});

