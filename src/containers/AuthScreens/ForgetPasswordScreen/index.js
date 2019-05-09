import React, {Component} from 'react';
import {ImageBackground, Text, View, TouchableOpacity, NetInfo} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, ImageButton, Input, RedButton} from '../../../components';
import {checkEmail} from '../../../utils';
import {constants} from "../../../utils/constants";


let itemId = "";

class ForgetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        const {navigation} = this.props;
        itemId = navigation.getParam('User');
        this.state = {
            email: '',
            isConnected: false,
            sendMail: true,
            resetPassword: false,
        };
        this.state.userName = itemId;
        this.showResetPassword = this.showResetPassword.bind(this);
        this.onCloseReset = this.onCloseReset.bind(this);
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

    showResetPassword() {
        this.setState({resetPassword: true, sendMail: false});
    }

    onClose = () => {
        this.props.navigation.goBack();
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
        //alert('forgot');
        if (this.state.email === "") {
            alert("Please enter email?");
        } else {
            fetch("https://CYLPR.app/api/forget_password", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    email: this.state.email,
                }), // data can be `string` or {object}!
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(response => {
                    console.log("response-->", "-" + JSON.stringify(response));
                    if (response.code === 200) {
                        alert("Please check your mail for reset password.")
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
    };


    Reset() {
        //alert("Reset Clicked");
        this.props.navigation.goBack();
    }

    onCloseReset() {
        this.setState({resetPassword: false, sendMail: true});

    }

    render() {
        const {email} = this.state;
        const isValidEmail = checkEmail(email);
        return (
            <ImageBackground
                source={require('../../../assets/img_background2.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                {/*<View style={styles.bottomContainer}/>*/}
                {this.state.sendMail && <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onClose}/>
                    </View>
                    <KeyboardAwareScrollView style={styles.mainContainer}>
                        <View style={[styles.subContainer, {margginTop: 10}]}>
                            <Text style={styles.whiteBoldBigText}>
                                Forgot Password • {this.state.userName}
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
                        </View>
                        <View style={styles.buttonsContainer}>
                            <RedButton style={styles.loginButton} label="Send Email" onPress={this.showResetPassword}/>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>}

                {this.state.resetPassword && <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onCloseReset}/>
                    </View>
                    <KeyboardAwareScrollView style={styles.mainContainer}>
                        <View style={[styles.subContainer, {margginTop: 10}]}>
                            <Text style={styles.whiteBoldBigText}>
                                Reset Password • {this.state.userName}
                            </Text>
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={email}
                                placeholder="New Password"
                                onChangeText={(text) => this.onChangeText('email', text)}
                                secureTextEntry
                                isValid={isValidEmail}
                            />
                            <Input
                                iconSource={require('../../../assets/icon_email.png')}
                                style={styles.inputContainer}
                                value={email}
                                placeholder="Confirm New Password"
                                onChangeText={(text) => this.onChangeText('email', text)}
                                secureTextEntry
                                isValid={isValidEmail}
                            />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <RedButton style={styles.loginButton} label="Reset" onPress={this.Reset}/>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>}
            </ImageBackground>
        )
    }
}

export default ForgetPasswordScreen;
