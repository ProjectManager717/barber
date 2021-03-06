import React, { Component } from 'react';
import {
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Image,
    Alert,
} from 'react-native';
import { NavigationActions, SafeAreaView, StackActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import { CloseButton, ImageButton, Input, RedButton } from '../../../components';
import { checkEmail } from '../../../utils';
import Preference from 'react-native-preference';
import { constants } from "../../../utils/constants";
import firebase from 'react-native-firebase';
import NotificationPopup from 'react-native-push-notification-popup';
import _ from 'lodash';


//import * as constants from "../../../utils/constants";
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;


import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


let itemId = "";
let fcmToken = "";

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        const { navigation } = this.props;
        itemId = navigation.getParam('User');
        console.log("gettingUSersignIn--->" + itemId);
        this.state = {
            showLoading: false,
            email: '',
            password: '',
            userName: undefined,
            isConnected: true,
            accessToken: null,
            dataFacebook: undefined,
        };
        this.state.userName = itemId;
        this.responseInfoCallback = this.responseInfoCallback.bind(this);
        this.signinFacebook = this.signinFacebook.bind(this);
    }

    componentDidMount(): void {

        if (itemId === "Client") {
            if (Preference.get("clientlogin") === true) {
                this.props.navigation.navigate("ClientTabNavigator");
            }
        } else {
            if (Preference.get("barberlogin") === true) {
                this.props.navigation.navigate("TabNavigator");
            }
        }

        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
            // Repleace with your webClientId generated from Firebase console
            //webClientId: "264908010858-90qei6m96daq2doi543gnahouvunl4v4.apps.googleusercontent.com",//old
            webClientId: "212651275284-misr3qfdg29bh690dpjev4jnfl2clirv.apps.googleusercontent.com",//new
            //iosClientId: '264908010858-imh71lfsb360c40oq6c7hrgqdkhuqu3b.apps.googleusercontent.com',
        });
        this.checkPermission();

if(appleAuth.isSupported){
    this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
        console.warn('Credential Revoked');
        this.fetchAndUpdateCredentialState().catch(error =>
            this.setState({ credentialStateForUser: `Error: ${error.code}` }),
        );
    });

    this.fetchAndUpdateCredentialState()
        .then(res => this.setState({ credentialStateForUser: res }))
        .catch(error => this.setState({ credentialStateForUser: `Error: ${error.code}` }))

}
    
    }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            console.log("fcmToken getting");
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        console.log("fcmToken getting inside");
        fcmToken = await Preference.get('fcmToken');
        console.log("fcmToken getting inside", JSON.stringify(fcmToken));
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log("fcmToken getting inside Got", JSON.stringify(fcmToken));
            if (fcmToken) {
                // user has a device token
                console.log("fcmToken: ", fcmToken);
                Preference.set('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            //Alert.alert("Warning!","")
            console.log('permission rejected');
        }
    }

    _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {

            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            console.log('Google --> ', "yessss");
            const userInfo = await GoogleSignin.signIn();
            console.log('Google User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
            this.socialLoginGoogle(userInfo, "google");

        } catch (error) {
            console.log('Message1122', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened' + error.code);
            }
        }
    };


    signIn = async () => {
        console.warn('Beginning Apple Authentication');

        // start a login request
        if (appleAuth.isSupported) {
            try {
                const appleAuthRequestResponse = await appleAuth.performRequest({
                    requestedOperation: appleAuth.Operation.LOGIN,
                    requestedScopes: [
                        appleAuth.Scope.EMAIL,
                        appleAuth.Scope.FULL_NAME,
                    ],
                });

                console.log('appleAuthRequestResponse', appleAuthRequestResponse);

                const {
                    user: newUser,
                    email,
                    nonce,
                    identityToken,
                    realUserStatus /* etc */,
                } = appleAuthRequestResponse;

                this.user = newUser;

                this.fetchAndUpdateCredentialState()
                    .then(res => this.setState({ credentialStateForUser: res }))
                    .catch(error =>
                        this.setState({ credentialStateForUser: `Error: ${error.code}` }),
                    );

                if (identityToken) {
                    // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
                    console.log(nonce, identityToken);
                } else {
                    // no token - failed sign-in?
                }

                if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
                    console.log("I'm a real person!");
                }
                this.socialLoginGoogle({
                    user: {
                        email: appleAuthRequestResponse.email,
                        givenName: appleAuthRequestResponse.fullName.givenName,
                        familyName: appleAuthRequestResponse.fullName.familyName
                    },
                    idToken: appleAuthRequestResponse.user,
                }, "apple")


                console.warn(`Apple Authentication Completed, ${this.user}, ${email}`);
            } catch (error) {
                if (error.code === appleAuth.Error.CANCELED) {
                    console.warn('User canceled Apple Sign in.');
                } else {
                    console.error(error);
                }
            }
        }

    };

    fetchAndUpdateCredentialState = async () => {
        if (this.user === null) {
            this.setState({ credentialStateForUser: 'N/A' });
        } else {
            const credentialState = await appleAuth.getCredentialStateForUser(this.user);
            if (credentialState === appleAuth.State.AUTHORIZED) {
                this.setState({ credentialStateForUser: 'AUTHORIZED' });
            } else {
                this.setState({ credentialStateForUser: credentialState });
            }
        }
    }

    onAppleButtonPress = async () => {
        console.log('onAppleButtonPress')
        if (appleAuth.isSupported) {
            // performs login request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });
            console.log('appleAuthRequestResponse:', JSON.stringify(appleAuthRequestResponse))

            if (_.isNil(appleAuthRequestResponse.email)) {
                console.log("======------", Preference.get("appleLoginEmail"), Preference.get("appleLoginGivenName"), Preference.get("appleLoginfamilyName"))
                this.socialLoginGoogle({
                    user: {
                        email: Preference.get("appleLoginEmail"),
                        givenName: Preference.get("appleLoginGivenName"),
                        familyName: Preference.get("appleLoginfamilyName")
                    },
                    idToken: appleAuthRequestResponse.identityToken,
                }, "apple")

            } else {
                console.log('appleAuthRequestResponse hitting Login:', JSON.stringify(appleAuthRequestResponse))
                this.socialLoginGoogle({
                    user: {
                        email: appleAuthRequestResponse.email,
                        givenName: appleAuthRequestResponse.fullName.givenName,
                        familyName: appleAuthRequestResponse.fullName.familyName
                    },
                    idToken: appleAuthRequestResponse.identityToken,
                }, "apple")
                Preference.set({ "appleLoginEmail": appleAuthRequestResponse.email, "appleLoginGivenName": appleAuthRequestResponse.fullName.givenName, "appleLoginfamilyName": appleAuthRequestResponse.fullName.familyName })
            }
        }

    }

    socialLoginGoogle(userInfo, src) {
        if (itemId === "Client") {
            var details = {
                email: userInfo.user.email,
                authType: src,
                authId: userInfo.idToken,
                firstName: userInfo.user.givenName,
                lastName: userInfo.user.familyName,
                device_token: fcmToken
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            console.log("--------", formBody)
            this.setState({ showLoading: true });
            formBody = formBody.join("&");
            fetch(constants.ClientSocialLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json())
                .then(response => {
                    console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                    this.setState({ showLoading: false });
                    if (response.ResultType === 1) {
                        Preference.set({
                            AlertNotification: response.Data.alert_notification,
                            clientlogin: true,
                            userEmail: response.Data.email,
                            userId: response.Data.id,
                            userName: userInfo.user.givenName,
                            userType: "Client",
                            userToken: response.Data.token
                        });
                        this.moveToHome();
                    } else {
                        if (response.ResultType === 0) {
                            alert(response.Message);
                        }
                    }
                })
                .catch(error => {
                    this.setState({ showLoading: false });
                    //console.error('Errorr:', error);
                    console.log('Error:', error);
                    alert("Error: " + error);
                });
            //Keyboard.dismiss();

            //this.props.navigation.navigate('ClientTabNavigator');
        } else {

            var details = {
                email: userInfo.user.email,
                authType: "google",
                authId: userInfo.idToken,
                firstName: userInfo.user.givenName,
                lastName: userInfo.user.familyName,
                device_token: fcmToken
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            this.setState({ showLoading: true });
            formBody = formBody.join("&");
            fetch(constants.BarberSocialLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json())
                .then(response => {
                    console.log("responseBarberlogin-->", "-" + JSON.stringify(response));
                    this.setState({ showLoading: false });
                    if (response.ResultType === 1) {
                        Preference.set({
                            AlertNotification: response.Data.alert_notification,
                            barberlogin: true,
                            userEmail: response.Data.email,
                            userName: userInfo.user.givenName,
                            userId: response.Data.id,
                            userType: "Barber",
                            userToken: response.Data.token,
                            MobilePayActivation: response.Data.mobile_pay_activation,
                        });
                        this.moveToHome();
                    } else {
                        if (response.ResultType === 0) {
                            alert(response.Message);
                        }
                    }
                })
                .catch(error => {
                    this.setState({ showLoading: false });
                    //console.error('Errorr:', error);
                    console.log('Error:', error);
                    alert("Error: " + error);
                });
            //Keyboard.dismiss();

        }

    }

    _getCurrentUser = async () => {
        //May be called eg. in the componentDidMount of your main component.
        //This method returns the current user
        //if they already signed in and null otherwise.
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        }
    };

    _revokeAccess = async () => {
        //Remove your application from the user authorized applications.
        try {
            await GoogleSignin.revokeAccess();
            console.log('deleted');
        } catch (error) {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        }
    };

    onClose = () => {
        this.props.navigation.goBack();
    };

    onLogin = () => {
        if (itemId === "Client") {
            if (this.state.email === "" || this.state.password === "") {
                alert("Please fill all fields");
            } else {
                this.setState({ showLoading: true });
                const { email, password } = this.state;
                var details = {
                    email: email,
                    password: password,
                    device_token: fcmToken
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                console.log("DataSend: ", JSON.stringify(constants.ClientLogin))
                console.log("DataSend: ", JSON.stringify(formBody))
                fetch(constants.ClientLogin, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            if (response.Data.is_active === 1) {

                                this.setState({ showLoading: false });
                                Preference.set({
                                    AlertNotification: response.Data.alert_notification,
                                    clientlogin: true,
                                    userEmail: response.Data.email,
                                    userId: response.Data.id,
                                    userName: response.Data.firstname + " " + response.Data.lastname,
                                    userType: "Client",
                                    userToken: response.Data.token
                                });
                                console.log("Client alert notifications" + Preference.get("AlertNotification"));

                                this.moveToHome();


                            } else if (response.Data.is_active === 0) {
                                this.setState({ showLoading: false });
                                Preference.set({
                                    clientlogin: false,
                                    userEmail: response.Data.email,
                                    userId: response.Data.id,
                                    userName: response.Data.firstname + " " + response.Data.lastname,
                                    userType: "Client",
                                    userToken: response.Data.token
                                });
                                this.props.navigation.navigate("SMSScreen");
                            }
                        } else {
                            this.setState({ showLoading: false });
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        this.setState({ showLoading: false });
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: " + error);
                    });
                //Keyboard.dismiss();
            }
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            //this.props.navigation.navigate('TabNavigator');

            if (this.state.email === "" || this.state.password === "") {
                alert("Please fill all fields");
            } else {
                this.setState({ showLoading: true });
                const { email, password } = this.state;
                var details = {
                    email: email,
                    password: password,
                    device_token: fcmToken
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(constants.BarberLogin, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responseBarberlogin-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            if (response.Data.is_active === 1) {
                                this.setState({ showLoading: false });
                                Preference.set({
                                    AlertNotification: response.Data.alert_notification,
                                    barberlogin: true,
                                    userEmail: response.Data.email,
                                    userId: response.Data.id,
                                    userName: response.Data.firstname + " " + response.Data.lastname,
                                    userType: "Barber",
                                    userToken: response.Data.token,
                                    MobilePayActivation: response.Data.mobile_pay_activation,
                                });
                                console.log("alert notifications" + Preference.get("AlertNotification"));

                                this.moveToHome();
                            }
                        }

                        if (response.Data.is_active === 0) {
                            this.setState({ showLoading: false });
                            Preference.set({
                                barberlogin: false,
                                userEmail: response.Data.email,
                                userId: response.Data.id,
                                userName: response.Data.firstname + " " + response.Data.lastname,
                                userType: "Barber",
                                userToken: response.Data.token
                            });
                            this.props.navigation.navigate("SMSScreen");
                        } else {
                            this.setState({ showLoading: false });
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        this.setState({ showLoading: false });
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: " + error);
                    });
                //Keyboard.dismiss();
            }

        }

    };

    facebokLogin = async () => {
        let result
        try {
            console.log("OSfor this APP: ", Platform.OS)
            if (Platform.OS === "ios") {
                console.log("OSfor this APP1: ", Platform.OS)
                //LoginManager.logInWithReadPermissions
                result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
            } else {
                result = await LoginManager.logInWithReadPermissions(['email', 'public_profile']);
                //result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
            }

            //result = await LoginManager.logInWithPermissions(['email', 'public_profile']);
            console.log("OSfor this APP1: ", JSON.stringify(result))
            if (result.isCancelled) {
                alert("Login was cancelled");
            } else {
                //alert("Login is succesfull with permission " + result.grantedPermissions.toString())
                this.FBGraphRequest('id,email,name,first_name,last_name,picture', this.FBLoginCallback);
            }

            /* const accessToken = await AccessToken.getCurrentAccessToken();
             console.log("Facebook access token: " + JSON.stringify(accessToken))
             if (accessToken) {
                 //this.fetchFacebookData(accessToken.accessToken.toString());
                 console.log("Facebook access token: " + accessToken.accessToken)
                 let infoRequest = new GraphRequest(
                     '/me',
                     {
                         accessToken: accessToken.accessToken,
                         parameters: {
                             fields: {
                                 string: 'id,email,name,first_name,last_name,picture'
                             }
                         }
                     },
                     (error, result) => {
                         if (error) {
                             console.log(error)
                             alert('Error fetching data: ' + error.toString());
                         } else {
                             console.log('Success fetching data: ' + JSON.stringify(result))
    
                             this.setState({dataFacebook: result, accessToken: accessToken});
                             this.signinFacebook(this.state.dataFacebook, this.state.accessToken);
                             //alert('Success fetching data: ' + JSON.stringify(result));
                         }
                     });
    
                 await new GraphRequestManager().addRequest(infoRequest).start();
             }*/

            // this.setState({
            //     accessToken: accessToken
            // }).bind(this)
        } catch (e) {
            alert("Login error: " + e);
        }
    };

    async FBGraphRequest(fields, callback) {
        const accessData = await AccessToken.getCurrentAccessToken();
        // Create a graph request asking for user information
        this.setState({ accessToken: accessData.accessToken });
        const infoRequest = new GraphRequest('/me', {
            accessToken: accessData.accessToken,
            parameters: {
                fields: {
                    string: fields
                }
            }
        }, callback.bind(this));
        // Execute the graph request created above
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    async FBLoginCallback(error, result) {
        if (error) {
            alert(JSON.stringify(error))
        } else {
            //alert(JSON.stringify(result))
            this.setState({ dataFacebook: result });
            this.signinFacebook(this.state.dataFacebook, this.state.accessToken);
        }
    }

    signinFacebook(data, accessToken) {
        if (itemId === "Client") {
            var details = {
                email: data.email,
                authType: "google",
                authId: accessToken,
                firstName: data.first_name,
                lastName: data.last_name,
                device_token: fcmToken
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(constants.ClientSocialLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json())
                .then(response => {
                    console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                    if (response.ResultType === 1) {
                        Preference.set({
                            AlertNotification: response.Data.alert_notification,
                            clientlogin: true,
                            userEmail: response.Data.email,
                            userName: data.first_name,
                            userId: response.Data.id,
                            userType: "Client",
                            userToken: response.Data.token
                        });
                        if (response.Data.firstTimeSignUp === true) {
                            this.props.navigation.navigate("SMSScreen");
                        } else {
                            this.moveToHome();
                        }

                    } else {
                        if (response.ResultType === 0) {
                            alert(response.Message);
                        }
                    }
                })
                .catch(error => {
                    //console.error('Errorr:', error);
                    console.log('Error:', error);
                    alert("Error: " + error);
                });
            //Keyboard.dismiss();
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            var details = {
                email: data.email,
                authType: "google",
                authId: accessToken,
                firstName: data.first_name,
                lastName: data.last_name,
                device_token: fcmToken
            };
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(constants.BarberSocialLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json())
                .then(response => {
                    console.log("responseBarberlogin-->", "-" + JSON.stringify(response));
                    if (response.ResultType === 1) {
                        Preference.set({
                            AlertNotification: response.Data.alert_notification,
                            barberlogin: true,
                            userEmail: response.Data.email,
                            userName: data.first_name,
                            userId: response.Data.id,
                            userType: "Barber",
                            userToken: response.Data.token,
                            MobilePayActivation: response.Data.mobile_pay_activation,
                        });
                        console.log("alert notifications" + Preference.get("AlertNotification"));
                        if (response.Data.firstTimeSignUp === true) {
                            this.props.navigation.navigate("SMSScreen");
                        } else {
                            this.moveToHome();
                        }
                    } else {
                        if (response.ResultType === 0) {
                            alert(response.Message);
                        }
                    }
                })
                .catch(error => {
                    //console.error('Errorr:', error);
                    console.log('Error:', error);
                    alert("Error: " + error);
                });
            //Keyboard.dismiss();
        }
    }

    responseInfoCallback = (error, result) => {
        if (error) {
            console.log(error)
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log('Success fetching data: ' + JSON.stringify(result))
            alert('Success fetching data: ' + JSON.stringify(result));
        }
    }

    moveToHome() {
        if (itemId === "Client") {

            const goToIntoScreen = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ClientTabNavigator' })],
            });
            this.props.navigation.dispatch(goToIntoScreen);
            // this.props.navigation.navigate("ClientTabNavigator");
        } else {
            const goToIntoScreen = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'TabNavigator' })],
            });
            this.props.navigation.dispatch(goToIntoScreen);
            // this.props.navigation.navigate("TabNavigator");
        }
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value });
    };

    signupClicked() {
        this.props.navigation.navigate('SignUpScreen', { User: this.state.userName });
        //this.props.navigation.navigate("SignUpScreen");
    }

    onForgot = () => {
        //alert('forgot');
        this.props.navigation.push("ForgetPasswordScreen", { User: itemId });
    };

    render() {
        const { email, password } = this.state;
        const isValidEmail = checkEmail(email);
        const isValidPassword = password.length >= 6;
        return (
            <View style={styles.container}>
                <NotificationPopup ref={ref => this.popup = ref} />
                <View style={styles.bottomContainer} />
                <KeyboardAwareScrollView >
                    <View style={[styles.closeContainer, { marginTop: 50 }]}>
                        <CloseButton onPress={this.onClose} />
                    </View>
                    <View style={{ width: "100%", height: "10%", justifyContent: 'center', alignItems: "center" }}>
                        <Image style={{ resizeMode: "contain", width: 150, height: 100 }}
                            source={require("../../../assets/images/logo.png")}
                        />
                    </View>
                    <View style={[styles.mainContainer, { marginTop: 20 }]}>
                        <View style={styles.subContainer}>
                            <Text style={styles.whiteBoldBigText}>
                                Login • {this.state.userName}
                            </Text>
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={email}
                                placeholder="Email"
                                onChangeText={(text) => this.onChangeText('email', text)}
                                keyboardType="email-address"
                                autoCapitalize={false}
                                isValid={isValidEmail}
                            />
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={password}
                                placeholder="Password"
                                onChangeText={(text) => this.onChangeText('password', text)}
                                secureTextEntry
                                isValid={isValidPassword}
                            />
                        </View>
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={[styles.whiteText, { width: 80, textAlign: "center" }]}>
                                {`Can't login? `}
                            </Text>
                            <TouchableOpacity onPress={this.onForgot}>
                                <Text style={[styles.redText, { width: 130, textAlign: "center" }]}>
                                    {'Forgot password! '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <RedButton style={styles.loginButton} label="Login" textStyle={{ textAlign: "center", width: "100%" }} onPress={this.onLogin} />
                            <ImageButton
                                onPress={this.facebokLogin}
                                iconSource={require('../../../assets/icon_facebook.png')}
                                iconStyle={styles.iconStyle}
                                style={styles.imgBtnContainer}
                            />
                            <ImageButton
                                onPress={this._signIn}
                                iconSource={require('../../../assets/icon_gmail.png')}
                                iconStyle={styles.iconStyle}
                                style={styles.imgBtnContainer}
                            />
                        </View>
                        {Platform.OS === 'ios' &&
                            <AppleButton
                                buttonStyle={AppleButton.Style.WHITE}
                                buttonType={AppleButton.Type.LOGIN}
                                style={{ width: '90%', height: 40, marginTop: 20, alignSelf: 'center' }}
                                onPress={() => this.onAppleButtonPress()}
                            />
                        }
                    </View>
                    {/* <View style={{flex: 1}}>
                    </View>*/}


                    {this.state.showLoading && <View style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        position: "absolute",
                        opacity: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")}
                            style={{ width: 60, height: 60, opacity: 1, }} />
                    </View>}


                </KeyboardAwareScrollView>
                <View style={styles.bottomButtonContainer}>
                    <Text style={[styles.grayText, { width: 160, textAlign: "center" }]}>
                        {`Don't have an account? `}
                    </Text>
                    <TouchableOpacity onPress={() => this.signupClicked()}>
                        <Text style={[styles.redText, { width: 60, textAlign: "center" }]}>
                            {'Sign Up!'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default SignInScreen;
