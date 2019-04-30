import React, {Component} from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, ImageButton, Input, RedButton} from '../../../components';
import {checkEmail} from '../../../utils';
import Preference from 'react-native-preference';

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
            isConnected: false,
        };
        this.state.userName = itemId;
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
    }

    onClose = () => {
        this.props.navigation.goBack();
    };

    onLogin = () => {
        if (itemId === "Client") {
            this.props.navigation.navigate('ClientTabNavigator');
        } else {
            //this.props.navigation.navigate('TabNavigator');
            if (this.state.isConnected) {
                if (this.state.user_email === "" || this.state.user_password === "") {
                    alert("Please fill all fields");
                } else {
                    const {user_email, user_password} = this.state;
                    fetch("https://Baber.app/api/login", {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify({
                            email: user_email,
                            password: user_password
                        }), // data can be `string` or {object}!
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then(response => response.json())
                        .then(response => {
                            console.log("response-->", "-" + JSON.stringify(response));
                            if (response.code === 200) {
                                Preference.set({
                                    login: true,
                                    userEmail: response.user.email,
                                    userId: response.user.id,
                                    userType: response.user.sub_type
                                });
                            } else {
                                if (response.code === 100) {
                                    alert(response.Message);
                                }
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    Keyboard.dismiss();
                }
            } else {
                alert("Please connect Internet");
            }
        }

    };

    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnected,
        });
    };

    onChangeText = (key, value) => {
        this.setState({[key]: value});
    };

    onForgot = () => {
        alert('forgot');
    };

    render() {
        const {email, password} = this.state;
        const isValidEmail = checkEmail(email);
        const isValidPassword = password.length >= 8;
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
                                iconSource={require('../../../assets/icon_facebook.png')}
                                iconStyle={styles.iconStyle}
                                style={styles.imgBtnContainer}
                            />
                            <ImageButton
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
                        <TouchableOpacity>
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
