import React, {Component} from 'react';
import {ImageBackground, View, Text, NetInfo, Image, TouchableOpacity, Linking, Platform,} from 'react-native';
import {NavigationActions, SafeAreaView, StackActions} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, Input, RedButton, ImageButton} from '../../../components';
import {checkEmail} from '../../../utils';
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {AccessToken, GraphRequest, GraphRequestManager} from "react-native-fbsdk";
import firebase from "react-native-firebase";
import {GoogleSignin, statusCodes} from "react-native-google-signin";

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;



const InputDataClient = [{
    iconSource: require('../../../assets/icon_name.png'),
    placeholder: 'First & Last Name',
    key: 'fullName',
}, {
    iconSource: require('../../../assets/icon_email.png'),
    placeholder: 'Email',
    key: 'email',
    keyboardType: 'email-address'
}, {
    iconSource: require('../../../assets/icon_password.png'),
    placeholder: 'Password',
    key: 'password',
    secureTextEntry: true,
}, {
    iconSource: require('../../../assets/icon_password_confirm.png'),
    placeholder: 'Confirm Your Password',
    key: 'confirmPassword',
    secureTextEntry: true,
}];
const InputDataBarber = [{
    iconSource: require('../../../assets/icon_name.png'),
    placeholder: 'First & Last Name',
    key: 'fullName',
}, {
    iconSource: require('../../../assets/icon_instagram.png'),
    placeholder: 'Instagram Username',
    key: 'instaUserName',
}, {
    iconSource: require('../../../assets/icon_email.png'),
    placeholder: 'Email',
    key: 'email',
    keyboardType: 'email-address'
}, {
    iconSource: require('../../../assets/icon_password.png'),
    placeholder: 'Password',
    key: 'password',
    secureTextEntry: true,
}, {
    iconSource: require('../../../assets/icon_password_confirm.png'),
    placeholder: 'Confirm Your Password',
    key: 'confirmPassword',
    secureTextEntry: true,
}];
let INPUTS_DATA = {};
let itemId = "";
let fcmToken="";
class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        const itemId = navigation.getParam('User');
        console.log("gettingUSersignup--->" + itemId);


        this.state = {
            userInfo: {
                fullName: '',
                instaUserName: '',
                email: '',
                password: '',
                confirmPassword: '',
                userName: undefined,
                fieldUsename: false,
                isConnected: false,
            }
        };
        this.checkFieldsBarber = this.checkFieldsBarber.bind(this);
        this.checkFieldsClient = this.checkFieldsClient.bind(this);
        this.state.userName = itemId;
        if (itemId === "Client") {
            //this.setState({fieldUsername:false,userName:"Client"});
            this.state.fieldUsername = false;
            this.state.userName = "Client";
            INPUTS_DATA = InputDataClient;
        } else {
            this.state.fieldUsername = true;
            this.state.userName = "Barber";
            //this.setState({userName:"Barber",fieldUsername:true});
            INPUTS_DATA = InputDataBarber;
        }


        this.responseInfoCallback = this.responseInfoCallback.bind(this);
        this.signinFacebook = this.signinFacebook.bind(this);
    }

    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnected,
        });
    };
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
        //fcmToken = await Preference.get('fcmToken');
        console.log("fcmToken getting inside",JSON.stringify(fcmToken));
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log("fcmToken getting inside Got",JSON.stringify(fcmToken));
            if (fcmToken) {
                // user has a device token
                console.log("fcmToken: ",fcmToken);
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

    _signIn1 = async () => {
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
            this.setState({userInfo: userInfo});
            this.socialLoginGoogle(userInfo);

        } catch (error) {
            console.log('Message', error.message);
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
            // this.setState({userInfo: userInfo});
            this.socialLoginGoogle(userInfo);

        } catch (error) {
            console.log('Message1122', error);
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

    socialLoginGoogle(userInfo) {
        if (itemId === "Client") {
            if (this.state.isConnected) {
                var details = {
                    email: userInfo.user.email,
                    authType: "google",
                    authId: userInfo.idToken,
                    firstName: userInfo.user.givenName,
                    lastName: userInfo.user.familyName,
                    device_token:fcmToken
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                this.setState({showLoading:true});
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
                        this.setState({showLoading:false});
                        if (response.ResultType === 1) {
                            Preference.set({
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
                        this.setState({showLoading:false});
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: "+error);
                    });
                //Keyboard.dismiss();
            } else {
                alert("Please connect Internet");
            }
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            if (this.state.isConnected) {
                var details = {
                    email: userInfo.user.email,
                    authType: "google",
                    authId: userInfo.idToken,
                    firstName: userInfo.user.givenName,
                    lastName: userInfo.user.familyName,
                    device_token:fcmToken
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                this.setState({showLoading:true});
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
                        this.setState({showLoading:false});
                        if (response.ResultType === 1) {
                            Preference.set({
                                barberlogin: true,
                                userEmail: response.Data.email,
                                userName: userInfo.user.givenName,
                                userId: response.Data.id,
                                userType: "Barber",
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
                        this.setState({showLoading:false});
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        alert("Error: "+error);
                    });
                //Keyboard.dismiss();
            } else {
                alert("Please connect Internet");
            }
        }

    }
    componentDidMount(): void {
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({isConnected});
            }
        );

        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: "264908010858-90qei6m96daq2doi543gnahouvunl4v4.apps.googleusercontent.com",
            iosClientId: '264908010858-imh71lfsb360c40oq6c7hrgqdkhuqu3b.apps.googleusercontent.com',
        });
        this.checkPermission();
    }

    facebokLogin = async () => {
        let result;
        try {
            if(Platform.OS==="ios"){  result = await LoginManager.logInWithReadPermissions(['email', 'public_profile']);}
            else{  result = await LoginManager.logInWithPermissions(['email', 'public_profile']);}

            if (result.isCancelled) {
                alert("Login was canceled");
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
        this.setState({accessToken: accessData.accessToken});
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
            this.setState({dataFacebook: result});
            this.signinFacebook(this.state.dataFacebook, this.state.accessToken);
        }
    }   moveToHome() {
        if (itemId === "Client"){

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
    signinFacebook(data, accessToken) {
        if (itemId === "Client") {
            if (this.state.isConnected) {
                var details = {
                    email: data.email,
                    authType: "google",
                    authId: accessToken,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    device_token:fcmToken
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
                        alert("Error: "+error);
                    });
                //Keyboard.dismiss();
            } else {
                alert("Please connect Internet");
            }
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            if (this.state.isConnected) {
                var details = {
                    email: data.email,
                    authType: "google",
                    authId: accessToken,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    device_token:fcmToken
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
                                barberlogin: true,
                                userEmail: response.Data.email,
                                userName: data.first_name,
                                userId: response.Data.id,
                                userType: "Barber",
                                userToken: response.Data.token,
                                MobilePayActivation:response.Data.mobile_pay_activation,
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
                        alert("Error: "+error);
                    });
                //Keyboard.dismiss();
            } else {
                alert("Please connect Internet");
            }
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
    onSignUp() {
        if (this.state.userName === "Client") {
            if (this.state.isConnected) {
                if (!this.checkFieldsClient()) {
                    //alert("Please enter correct data");
                    return false;
                } else {
                    this.setState({showLoading: true});
                    const {userInfo} = this.state;
                    var details = {
                        firstname: userInfo.fullName,
                        username: userInfo.instaUserName,
                        email: userInfo.email,
                        password: userInfo.password,
                        device_token:fcmToken
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                    console.log("SendingData: ", JSON.stringify(formBody))
                    fetch(constants.ClientSignUp, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formBody
                    }).then(response => response.json())
                        .then(response => {
                            console.log("responseClientsignup-->", "-" + JSON.stringify(response));
                            if (response.ResultType === 1) {
                                this.setState({showLoading: false});
                                Preference.set({
                                    clientlogin: false,
                                    userEmail: response.Data.email,
                                    userName: response.Data.username,
                                    userId: response.Data.id,
                                    userType: "Client",
                                    userToken: response.Data.token,
                                    newUser: true
                                });
                                this.moveToSMSScreen();
                            } else {
                                this.setState({showLoading: false});
                                if (response.ResultType === 0) {
                                    alert(response.Message);
                                }
                            }
                        })
                        .catch(error => {
                            this.setState({showLoading: false});
                            console.log('Error:', error);
                            alert("Error: " + error);
                        });
                }
            } else {
                alert("Please connect Internet.")
            }
        } else {
            if (this.state.isConnected) {
                if (!this.checkFieldsBarber()) {
                    //alert("Please enter correct data");
                    return false;
                } else {
                    this.setState({showLoading: true});
                    const {userInfo} = this.state;
                    var details = {
                        firstname: userInfo.fullName,
                        username: userInfo.instaUserName,
                        email: userInfo.email,
                        password: userInfo.password,
                        device_token:fcmToken
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                    console.log("SendingData: ", JSON.stringify(formBody))
                    fetch(constants.BarberSignUp, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: formBody
                    }).then(response => response.json())
                        .then(response => {
                            console.log("responseBarbersignup-->", "-" + JSON.stringify(response));
                            if (response.ResultType === 1) {
                                this.setState({showLoading: false});
                                Preference.set({
                                    barberlogin: false,
                                    userEmail: response.Data.email,
                                    userName: response.Data.username,
                                    userId: response.Data.id,
                                    userMobilePay: false,
                                    userType: "Barber",
                                    userToken: response.Data.token,
                                    newUser: true,
                                    MobilePayActivation:response.Data.mobile_pay_activation,
                                });
                                this.moveToSMSScreen();
                            } else {
                                this.setState({showLoading: false});
                                if (response.ResultType === 0) {
                                    alert(response.Message);
                                }
                            }
                        })
                        .catch(error => {
                            this.setState({showLoading: false});
                            //console.error('Error:', error);
                            console.log('Error:', error);
                            alert("Error: " + error);
                        });
                }
            } else {
                alert("Please connect Internet.")
            }
        }

    }

   moveToSMSScreen() {

        this.props.navigation.navigate("SMSScreen");
    }



    onClose = () => {
        //alert('onClose');
        this.props.navigation.goBack();
    };

    onChangeText = (key, value) => {
        const {userInfo} = this.state;
        const updatedUserInfo = {...userInfo};
        updatedUserInfo[key] = value;
        this.setState({userInfo: updatedUserInfo});
    };

    /*onSignUp = () => {
        this.props.navigation.navigate('SMSScreen');
    };
*/
    onFacebook = () => {
        alert('facebook');
    };

    onGoogle = () => {
        alert('google');
    };

    checkFieldsClient() {
        console.log("validating......");
        if (this.state.userInfo.fullName === "") {
            alert("Name field is required");
            return false;
        } else if (this.state.userInfo.email === "") {
            alert("Email field is required");
            return false;
        } else if (this.state.userInfo.password === "") {
            alert("Password field is required");
            return false;
        } else if (this.state.userInfo.confirmPassword.length < 6 || !(this.state.userInfo.password === this.state.userInfo.confirmPassword)) {
            alert("Retype password does not match password.");
            return false;
        } else if (!checkEmail(this.state.userInfo.email)) {
            alert("Enter correct email.");
            return false;
        }
        return true;
    }

    checkFieldsBarber() {
        console.log("validating......");
        if (this.state.userInfo.fullName === "") {
            alert("Name field is required");
            return false;
        } else if (this.state.userInfo.instaUserName === "") {
            alert("Name field is required");
            return false;
        } else if (this.state.userInfo.email === "") {
            alert("Email field is required");
            return false;
        } else if (this.state.userInfo.password === "") {
            alert("Password field is required");
            return false;
        } else if (this.state.userInfo.confirmPassword.length < 6 || !(this.state.userInfo.password === this.state.userInfo.confirmPassword)) {
            alert("Retype password does not match password.");
            return false;
        } else if (!checkEmail(this.state.userInfo.email)) {
            alert("Enter correct email.");
            return false;
        }
        return true;
    }

    /*validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({email: text})
            return false;
        } else {
            this.setState({email: text})
            console.log("Email is Correct");
            return true;
        }
    }*/

    renderInputsClient = () => {
        const {userInfo} = this.state;
        const isValidFullName = !!userInfo.fullName.length;
        const isValidInstaUsername = !!userInfo.instaUserName.length;
        const isValidEmail = checkEmail(userInfo.email);
        const isValidPassword = userInfo.password.length >= 6;
        const isValidPasswordConfirm = userInfo.confirmPassword.length >= 6 && (userInfo.password === userInfo.confirmPassword);
        const inputsValid = [isValidFullName, isValidEmail, isValidPassword, isValidPasswordConfirm];
        return INPUTS_DATA.map((item, index) => (<Input
                iconSource={INPUTS_DATA[index].iconSource}
                style={styles.inputContainer}
                placeholder={INPUTS_DATA[index].placeholder}
                value={userInfo[INPUTS_DATA[index].key]}
                onChangeText={(text) => this.onChangeText(INPUTS_DATA[index].key, text)}
                isValid={inputsValid[index]}
                keyboardType={INPUTS_DATA[index].keyboardType}
                secureTextEntry={INPUTS_DATA[index].secureTextEntry}
                key={`key-${index}`}
            />
        ));
    };

    renderInputsBarber = () => {
        const {userInfo} = this.state;
        const isValidFullName = !!userInfo.fullName.length;
        const isValidInstaUsername = !!userInfo.instaUserName.length;
        const isValidEmail = checkEmail(userInfo.email);
        const isValidPassword = userInfo.password.length >= 6;
        const isValidPasswordConfirm = userInfo.confirmPassword.length >= 6 && (userInfo.password === userInfo.confirmPassword);
        const inputsValid = [isValidFullName, isValidInstaUsername, isValidEmail, isValidPassword, isValidPasswordConfirm];
        return INPUTS_DATA.map((item, index) => (<Input
                iconSource={INPUTS_DATA[index].iconSource}
                style={styles.inputContainer}
                placeholder={INPUTS_DATA[index].placeholder}
                value={userInfo[INPUTS_DATA[index].key]}
                onChangeText={(text) => this.onChangeText(INPUTS_DATA[index].key, text)}
                isValid={inputsValid[index]}
                keyboardType={INPUTS_DATA[index].keyboardType}
                secureTextEntry={INPUTS_DATA[index].secureTextEntry}
                key={`key-${index}`}
            />
        ));
    };

    render() {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.parentContainer}>
                        <View style={styles.closeContainer}>
                            <CloseButton onPress={this.onClose}/>
                        </View>
                        <View style={{width:"100%",height:"10%",justifyContent:'center',alignItems:"center"}}  >
                            <Image style={{resizeMode:"contain",width:150,height:100}}
                                   source={require("../../../assets/images/logo.png")}
                            />
                        </View>
                        <View
                            style={styles.mainContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {this.state.userName === "Client" && <View style={styles.subContainer}>
                                <Text style={styles.whiteBoldBigText}>Register • {this.state.userName}</Text>
                                {this.renderInputsClient()}
                                <RedButton label="Sign Up" onPress={()=>this.onSignUp()} textStyle={{width:"100%",textAlign:"center"}} style={styles.buttonContainer}/>
                            </View>}
                            {this.state.userName === "Barber" && <View style={styles.subContainer}>
                                <Text style={styles.whiteBoldBigText}>Register • {this.state.userName}</Text>
                                {this.renderInputsBarber()}
                                <RedButton label="Sign Up" onPress={()=>this.onSignUp()} textStyle={{width:"100%",textAlign:"center"}} style={[styles.buttonContainer]}/>

                            </View>}
                            <View style={styles.termsContainer}>
                                <Text style={[styles.whiteText,{width:"60%",textAlign:"right"}]}>
                                    {'By Signing Up, you agree to our '}
                                </Text>
                                <TouchableOpacity onPress={()=>{ Linking.openURL('https://clypr.co/terms-of-service')}}
                                style={{width:"40%",textAlign:"left"}}>
                                    <Text style={[styles.redText,{width:"100%",textAlign:"center"}]}>
                                        {'Terms and Conditions'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Text style={styles.grayText}>
                                    Or
                                </Text>
                                <View style={styles.buttonsSubContainer}>
                                    <ImageButton
                                        iconSource={require('../../../assets/icon_facebook.png')}
                                        onPress={this.facebokLogin}
                                    />
                                    <View style={styles.space}/>
                                    <ImageButton
                                        onPress={this._signIn}
                                        iconSource={require('../../../assets/icon_gmail.png')}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
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
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}
            </SafeAreaView>



        );
    }
}

export default SignUpScreen;
