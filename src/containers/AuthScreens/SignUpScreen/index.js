import React, {Component} from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {CloseButton, Input, RedButton, ImageButton} from '../../../components';
import {checkEmail} from '../../../utils';

const InputDataClient=[{
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
const InputDataBarber=[{
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
                fieldUsename:false,
            }
        };
        this.state.userName = itemId;
        if(itemId==="Client")
        {
            //this.setState({fieldUsername:false,userName:"Client"});
            this.state.fieldUsername=false;
            this.state.userName="Client";
            INPUTS_DATA=InputDataClient;
        }else
        {
            this.state.fieldUsername=true;
            this.state.userName="Barber";
            //this.setState({userName:"Barber",fieldUsername:true});
            INPUTS_DATA=InputDataBarber;
        }
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

    onSignUp = () => {
        this.props.navigation.navigate('SMSScreen');
    };

    onFacebook = () => {
        alert('facebook');
    };

    onGoogle = () => {
        alert('google');
    };

    renderInputs = () => {
        const {userInfo} = this.state;
        const isValidFullName = !!userInfo.fullName.length;
        const isValidInstaUsername = !!userInfo.instaUserName.length;
        const isValidEmail = checkEmail(userInfo.email);
        const isValidPassword = userInfo.password.length >= 8;
        const isValidPasswordConfirm = userInfo.confirmPassword.length >= 8 && (userInfo.password === userInfo.confirmPassword);
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
