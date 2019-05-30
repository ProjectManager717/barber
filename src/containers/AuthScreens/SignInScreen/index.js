import React, {Component} from 'react';
import {ImageBackground, Text, View, TouchableOpacity, NetInfo} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, ImageButton, Input, RedButton} from '../../../components';
import {checkEmail} from '../../../utils';
import Preference from 'react-native-preference';
import {constants} from "../../../utils/constants";
//import * as constants from "../../../utils/constants";
import {LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';


let itemId = "";

class SignInScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        itemId = navigation.getParam('User');
        console.log("gettingUSersignIn--->" + itemId);
        this.state = {
            email: '',
            password: '',
            userName: undefined,
            isConnected: true,
            accessToken: null,
        };
        this.state.userName = itemId;
        this.responseInfoCallback = this.responseInfoCallback.bind(this);
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
            webClientId:
                '1006799815583-9p41g2vs13dn03lp4j7bkvuiku3gcrtk.apps.googleusercontent.com',
        });
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
            this.setState({userInfo: userInfo});
            this.socialLoginGoogle(this.state.userInfo);

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

    socialLoginGoogle(userInfo) {
        if (itemId === "Client") {
            if (this.state.isConnected) {
                var details = {
                    email: userInfo.user.email,
                    authType:"google",
                    authId:userInfo.idToken,
                    firstName:userInfo.user.givenName,
                    lastName:userInfo.user.familyName,
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
                                userId: response.Data.id,
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
                        console.error('Error:', error);
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
                        authId:userInfo.idToken,
                        firstName:userInfo.user.givenName,
                        lastName:userInfo.user.familyName,
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
                            console.error('Error:', error);
                        });
                    //Keyboard.dismiss();
            } else {
                alert("Please connect Internet");
            }
        }

    }

    _getCurrentUser = async () => {
        //May be called eg. in the componentDidMount of your main component.
        //This method returns the current user
        //if they already signed in and null otherwise.
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({userInfo});
        } catch (error) {
            console.error(error);
        }
    };
    _signOut = async () => {
        //Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({
                userInfo: null,
                data: ''
            }); // Remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };
    _revokeAccess = async () => {
        //Remove your application from the user authorized applications.
        try {
            await GoogleSignin.revokeAccess();
            console.log('deleted');
        } catch (error) {
            console.error(error);
        }
    };

    onClose = () => {
        this.props.navigation.goBack();
    };

    onLogin = () => {
        if (itemId === "Client") {
            if (this.state.isConnected) {
                if (this.state.email === "" || this.state.password === "") {
                    alert("Please fill all fields");
                } else {
                    const {email, password} = this.state;
                    var details = {
                        email: email,
                        password: password,
                    };
                    var formBody = [];
                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
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
                                Preference.set({
                                    clientlogin: true,
                                    userEmail: response.Data.email,
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
                            console.error('Error:', error);
                        });
                    //Keyboard.dismiss();
                }
            } else {
                alert("Please connect Internet");
            }
            //this.props.navigation.navigate('ClientTabNavigator');
        } else {
            //this.props.navigation.navigate('TabNavigator');
            if (this.state.isConnected) {
                if (this.state.email === "" || this.state.password === "") {
                    alert("Please fill all fields");
                } else {
                    const {email, password} = this.state;
                    var details = {
                        email: email,
                        password: password,
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
                                Preference.set({
                                    barberlogin: true,
                                    userEmail: response.Data.email,
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
                            console.error('Error:', error);
                        });
                    //Keyboard.dismiss();
                }
            } else {
                alert("Please connect Internet");
            }
        }

    };

    async facebokLogin() {
        try {
            let result = await LoginManager.logInWithReadPermissions(['email', 'public_profile']);
            if (result.isCancelled) {
                alert("Login was cancelled");
            } else {
                alert("Login is succesfull with permission " + result.grantedPermissions.toString())
            }

            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    console.log("facebook_token: " + data.accessToken.toString());
                    this.setState({
                        accessToken: data.accessToken.toString()
                    })
                });

            this.fetchFacebookData(this.state.accessToken);
        } catch (e) {
            alert("Login error: " + e);
        }
    }

    fetchFacebookData = (token) => {
        let infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: token,
                parameters: {
                    fields: {
                        string: 'id,email,name,first_name,last_name,picture'
                    }
                }
            },
            this.responseInfoCallback
        );

        new GraphRequestManager().addRequest(infoRequest).start();
    }

    responseInfoCallback = (error, result) => {
        if (error) {
            console.log(error)
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log(result)
            alert('Success fetching data: ' + JSON.stringify(result));
        }
    }

    moveToHome() {
        if (itemId === "Client")
            this.props.navigation.navigate("ClientTabNavigator");
        else {
            this.props.navigation.navigate("TabNavigator");
        }
    }

    onChangeText = (key, value) => {
        this.setState({[key]: value});
    };

    signupClicked() {
        this.props.navigation.navigate('SignUpScreen', {User: this.state.userName});
        //this.props.navigation.navigate("SignUpScreen");
    }

    onForgot = () => {
        //alert('forgot');
        this.props.navigation.push("ForgetPasswordScreen", {User: itemId});
    };

    render() {
        const {email, password} = this.state;
        const isValidEmail = checkEmail(email);
        const isValidPassword = password.length >= 6;
        return (
            <ImageBackground
                source={require('../../../assets/img_background2.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                <View style={styles.bottomContainer}/>
                <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onClose}/>
                    </View>
                    <KeyboardAwareScrollView style={styles.mainContainer}>
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
                            <Text style={styles.whiteText}>
                                {`Can't login? `}
                            </Text>
                            <TouchableOpacity onPress={this.onForgot}>
                                <Text style={styles.redText}>
                                    Forgot password!
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <RedButton style={styles.loginButton} label="Login" onPress={this.onLogin}/>
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
                    </KeyboardAwareScrollView>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <Text style={styles.grayText}>
                            {`Don't have an account? `}
                        </Text>
                        <TouchableOpacity onPress={() => this.signupClicked()}>
                            <Text style={styles.redText}>
                                Sign Up!
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        )
    }
}

export default SignInScreen;
