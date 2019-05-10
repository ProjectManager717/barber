import React, {Component} from 'react';
import {ImageBackground, View, Text, NetInfo} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, Input, RedButton, ImageButton} from '../../../components';
import {checkEmail} from '../../../utils';
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

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
        this.checkFields=this.checkFields.bind(this);
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

        this.onSignUp = this.onSignUp.bind(this)
    }

    _handleConnectivityChange = (isConnected) => {
        this.setState({
            isConnected,
        });
    };

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


    onSignUp() {
        if (this.state.isConnected) {

            if (!this.checkFields()) {
                //alert("Please enter correct data");
                return false;
            } else {
                const {userInfo} = this.state;
                var details = {
                    firstname: userInfo.fullName,
                    username: userInfo.instaUserName,
                    email: userInfo.email,
                    password: userInfo.password,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
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
                            Preference.set({
                                login: true,
                                userEmail: response.Data.email,
                                userName: response.Data.username,
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
            }
        } else {
            alert("Please connect Internet.")
        }
    }

    moveToHome() {
        this.props.navigation.navigate("TabNavigator");
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

    checkFields() {
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
        } else
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

    renderInputs = () => {
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
            <ImageBackground
                source={require('../../../assets/img_background2.png')}
                style={styles.container}
                imageStyle={styles.backgroundImg}
            >
                <SafeAreaView style={styles.parentContainer}>
                    <View style={styles.closeContainer}>
                        <CloseButton onPress={this.onClose}/>
                    </View>
                    <KeyboardAwareScrollView
                        style={styles.mainContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.subContainer}>
                            <Text style={styles.whiteBoldBigText}>Register • {this.state.userName}</Text>
                            {this.renderInputs()}
                            <RedButton label="Sign Up" onPress={this.onSignUp} style={styles.buttonContainer}/>
                        </View>
                        <View style={styles.termsContainer}>
                            <Text style={styles.whiteText}>
                                {'By Signing Up, you agree to our '}
                            </Text>
                            <Text style={styles.redText}>
                                Terms and Conditions
                            </Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Text style={styles.grayText}>
                                Or
                            </Text>
                            <View style={styles.buttonsSubContainer}>
                                <ImageButton
                                    iconSource={require('../../../assets/icon_facebook.png')}
                                    onPress={this.onFacebook}
                                />
                                <View style={styles.space}/>
                                <ImageButton
                                    iconSource={require('../../../assets/icon_gmail.png')}
                                    onPress={this.onGoogle}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

export default SignUpScreen;
