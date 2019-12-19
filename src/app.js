import React, {Component} from 'react';
import {Platform, StatusBar, View, Linking} from 'react-native';
import Routing from './Routing';
import NotificationPopup from 'react-native-push-notification-popup';
import firebase from 'react-native-firebase';
import {NavigationActions} from "react-navigation";

StatusBar.setHidden(false);
StatusBar.setBarStyle('light-content');
const now = new Date();
var moment = require('moment');
const prefix = 'clypr://';
import Preference from "react-native-preference";


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {

        /*setTimeout(() => {
            //this.setState({splashScreen: false});
            // Alert.alert("hello");
            this.showAlert("CLYPR", "Testing message from App");
        }, 5000);*/
        this.createNotificationListeners();

    }


    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const {title, body, data} = notification;
            console.log('Notifications', title, body, JSON.stringify(data))
            if (title == 'Appointment completed' && data.appointment_status == '1') {
                if (Preference.get("clientlogin") === true)
                    this.moveToClientLeaveReview(data)
            }
            this.showAlert(title, body, data);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const {title, body} = notificationOpen.notification;
            //this.showAlert(title, body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const {title, body} = notificationOpen.notification;
            //this.showAlert(title, body);
        }

    }

    showAlert(title, body, data) {
        if (this.popup) {
            this.popup.show({
                onPress: () => {
                    if (title == 'Appointment completed' && data.appointment_status == '1') {
                        if (Preference.get("clientlogin") === true)
                            this.moveToClientLeaveReview(data)
                    }
                },
                appIconSource: require('./assets/images/logo.png'),
                appTitle: title,
                timeText: moment(now).calendar(),
                title: title,
                body: body,
                slideOutTime: 5000
            });
        }
    }

    moveToClientLeaveReview = (data) => {
        this.navigator.dispatch(
            NavigationActions.navigate({
                routeName: 'ClientLeaveReview', params: {
                    barber_id: data.barber_id,
                    client_id: data.client_id,
                    appointmentId: data.appointmentId,
                    appointmentPrice: data.appointmentPrice
                }
            })
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Routing ref={ref => {
                    this.navigator = ref;
                }} uriPrefix={prefix}/>
                <NotificationPopup ref={ref => this.popup = ref} style={{zIndex: 999}}/>
            </View>)
    }
}

export default App;
