import React, { Component } from "react";
import { View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Platform } from "react-native";
import { Colors } from "../../themes";
import { globalStyles } from "../../themes/globalStyles";
import { constants } from "../../utils/constants";
import { NavigationActions, StackActions } from "react-navigation";
//import { styles } from "./styles";
import { Header } from "react-native-elements";
import Preference from 'react-native-preference';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import firebase from "react-native-firebase";
import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

let inviteBarber="Yo Barbers!\nThere's this dope new barber app that will take your craft to the next level. It let's you set your own schedule, charge your own prices, and even handles all your payments and reviews! Stop messing with those other booking apps and get ready to boss up! Download CLYPR today and try it out now!\n"
+"iOS: https://apps.apple.com/pk/app/clypr-supreme-barber-booking/id1463922784 \n"
+"Android: https://play.google.com/store/apps/details?id=com.app.rn.barber";

let inviteClient="Yo!"
+"I'm using this dope new barber app to handle all of my barber appointments and it SAVES ME SO MUCH TIME! I simply search for my barber on the app, check their schedule, and reserve my appointment. It's that simple. I never have to wait at the barbershop again! Plus I leave my barber a review when they're done and I pay digitally. No more ATM's!\n"
+"Stop wasting your time waiting at the barbershop and start doing more with your valuable time! Download CLYPR today and try it out now!\n"
+"iOS: https://apps.apple.com/pk/app/clypr-supreme-barber-booking/id1463922784 \n"
+"Android: https://play.google.com/store/apps/details?id=com.app.rn.barber";

const now = new Date();
var moment = require('moment');
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;


export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationAlert: Preference.get("AlertNotification"),
        }
    }

    renderRow(item) {
        return <View style={{ flex: 1, flexDirection: 'row', height: 36 }}>
            <Image style={styles.leftIcon} source={item.ic} />
            <Text style={styles.row_title}>{item.title}</Text>
            <Image style={styles.right_arrow} source={require("../../assets/images/ic_forward_arrow.png")} />
        </View>;
    }

    renderSeperator() {
        return <View style={{ marginLeft: 40, height: 0.5, backgroundColor: Colors.lightGrey }}></View>
    }

    _signOut = async () => {
        //Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({
                userInfo: null,
                data: ''
            }); // Remove the user from your app's state as well

            await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGOUT
              })

        } catch (error) {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            //alert("Error: "+error);
        }
    };

    Notifications() {
        var Details = {
            barber_id: Preference.get("userId"),
            notificationAlert: this.state.notificationAlert
        };
        var formBody = [];
        for (var property in Details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(Details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.BarberNotificationAlert, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }, body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("getFavoriteBarbers-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    //this.createNotificationListeners();
                    this.setState({ notificationAlert: response.Data.notification_alert }, () => {
                        console.log("NOTiIFICATIONS" + this.state.notificationAlert);
                    })
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });

    }

    NoticationToggle() {
        if (this.state.notificationAlert === true)
            this.setState({ notificationAlert: false }, () => {
                this.Notifications();
            });

        else {
            this.setState({ notificationAlert: true }, () => {
                this.Notifications();
            });

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: "light-content" }}
                    barStyle="light-content" // or directly
                    style={{ backgroundColor: "yellow" }}
                    outerContainerStyles={{ backgroundColor: "#1999CE" }}
                    leftComponent={{ color: "#fff" }}
                    centerComponent={{ text: "SETTINGS", style: { color: "#fff" } }}
                    rightComponent={{ color: "#fff" }}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <ScrollView>
                    <Text style={styles.txtHeader}>ACCOUNT</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Subscription');
                        }}>
                            {this.renderRow({
                                title: "Edit Account",
                                ic: require("../../assets/images/ic_settings_account.png")
                            })}
                        </TouchableOpacity>
                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangePassword")}>
                            {this.renderRow({
                                title: "Change Password",
                                ic: require("../../assets/images/ic_settings_lock.png")
                            })}
                        </TouchableOpacity>
                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("Share")
                        }}>
                            {this.renderRow({ title: "Share Profile", ic: require("../../assets/images/share.png") })}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtHeader}>NOTIFICATIONS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <View style={{ flex: 1, flexDirection: 'row', height: 36 }}>
                            <Image style={styles.leftIcon}
                                source={require("../../assets/images/ic_setting_alert.png")} />
                            <Text style={styles.row_title}>Alert</Text>
                            <Switch onChange={() => this.NoticationToggle()} value={this.state.notificationAlert}
                                style={{
                                    transform: [{ scaleX: .8 }, { scaleY: .8 }],
                                    position: 'absolute',
                                    right: 14,
                                    alignSelf: 'center',
                                    tintColor: 'white'
                                }} />
                        </View>
                    </View>
                    <Text style={styles.txtHeader}>PAYMENT</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("MobilePay");

                        }}>

                            {this.renderRow({
                                title: "Mobile Pay",
                                ic: require("../../assets/images/ic_setting_mobile_pay.png")
                            })}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtHeader}>APPOINTMENTS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('BookingPreferences');
                        }}>
                            {this.renderRow({
                                title: "Booking Preferences",
                                ic: require("../../assets/images/ic_settings_booking_pref.png")
                            })}
                        </TouchableOpacity>
                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Cancellations');
                        }}>
                            {this.renderRow({
                                title: "Cancelations & No-Shows",
                                ic: require("../../assets/images/ic_settings_cancellation.png")
                            })}
                        </TouchableOpacity>

                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('SurgePricing');
                        }}>

                            {this.renderRow({
                                title: "Surge Pricing",
                                ic: require("../../assets/images/ic_settings_surge.png")
                            })}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtHeader}>PROMOTIONS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('DiscoverMe');
                        }}>
                            {this.renderRow({ title: "Discover Me", ic: require("../../assets/images/ic_siren.png") })}
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.txtHeader}>SHARE</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => {
                            if (Platform.OS === "ios") {
                                return Linking.openURL('sms:&body='+inviteBarber)

                            } else {
                                return Linking.openURL('sms:?body='+inviteBarber)
                            }
                        }}>
                            {this.renderRow({
                                title: "Invite Barbers",
                                ic: require("../../assets/images/ic_invite_barbers.png")
                            })}
                        </TouchableOpacity>
                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => {
                            if (Platform.OS === "ios") {
                                return Linking.openURL('sms:&body='+inviteClient)

                            } else {
                                return Linking.openURL('sms:?body='+inviteClient)
                            }
                        }}>
                            {this.renderRow({
                                title: "Invite Clients",
                                ic: require("../../assets/images/ic_settings_clients.png")
                            })}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtHeader}>CONTACT US</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:support@clypr.co')}>
                        <View style={[globalStyles.rowBackground, styles.row]}>
                            {this.renderRow({
                                title: "Send Feedback",
                                ic: require("../../assets/images/ic_setting_send_feedback.png")
                            })}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.txtHeader}>FOLLOW US</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL('https://www.facebook.com/teamCLYPR')
                        }}>
                            {this.renderRow({ title: "Facebook", ic: require("../../assets/images/ic_settings_fb.png") })}
                        </TouchableOpacity>
                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => {
                            Linking.openURL('https://www.instagram.com/clypr')
                        }}>
                            {this.renderRow({
                                title: "Instagram",
                                ic: require("../../assets/images/ic_setting_instagram.png")
                            })}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtHeader}>ABOUT</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL('https://www.clypr.co')
                        }}>
                            {this.renderRow({
                                title: "Website",
                                ic: require("../../assets/images/ic_settings_website.png")
                            })}
                        </TouchableOpacity>
                        {this.renderSeperator()}

                        <TouchableOpacity onPress={() => {
                            Linking.openURL('https://clypr.co/terms-of-service')
                        }}>
                            {this.renderRow({
                                title: "Terms of Service",
                                ic: require("../../assets/images/ic_settings_tns.png")
                            })}
                        </TouchableOpacity>
                        {this.renderSeperator()}
                        <TouchableOpacity onPress={() => {
                            Linking.openURL('https://clypr.co/privacy-policy')
                        }}>

                            {this.renderRow({
                                title: "Privacy Policy",
                                ic: require("../../assets/images/ic_settings_pp.png")
                            })}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[globalStyles.button, { marginTop: 30, marginBottom: 30 }]} onPress={() => {
                       // alert("dsfhjfgjshd"+Preference.get("userEmail")+Preference.get("userName"))
                       let appleEmail=Preference.get("appleLoginEmail"),appleGivenName=Preference.get("appleLoginGivenName"),appleFamilyName=Preference.get("appleLoginfamilyName")
                        
                        Preference.clear();
                        Preference.set({"appleLoginEmail":appleEmail,"appleLoginGivenName":appleGivenName,"appleLoginFamilyName":appleFamilyName})
                        this._signOut();
                        LoginManager.logOut();
                        
                        const goToIntoScreen = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'SelectScreen' })],
                        });
                        this.props.navigation.dispatch(goToIntoScreen);
                    }}>
                        <Text style={globalStyles.buttonText}>Logout</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                        <Text style={{ color: "grey", fontFamily: "AvertaStd-Thin" }}>{"CLYPR Technologies V1.0"}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontStyle: "italic" }}> Made in
                                Miami </Text>
                            <Image resizeMode={"contain"} source={require("../../assets/images/beach.png")}
                                style={{ height: 20, width: 20, marginStart: 10 }}

                            />
                        </View>
                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: Colors.themeBackground
    },
    row: {
        flexDirection: 'column',
        height: 'auto',
        marginTop: 4,
        marginLeft: 18,
        marginRight: 18
    },
    txtHeader: {
        color: Colors.lightGrey,
        marginTop: 16,
        marginBottom: 4,
        marginLeft: 30,
        fontSize: 12,
        fontFamily: "AvertaStd-Regular"
    },
    leftIcon: {
        height: 16,
        width: 16,
        marginLeft: 8,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    row_title: {
        color: Colors.white,
        marginTop: 4,
        marginLeft: 10,
        alignSelf: 'center',
        fontFamily: "AvertaStd-Regular"
    },
    right_arrow: {
        position: 'absolute',
        right: 14,
        alignSelf: 'center',
        height: 9,
        width: 5,
        tintColor: 'white'
    }
});
