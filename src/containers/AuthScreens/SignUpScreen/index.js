import React, { Component } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import { CloseButton, Input, RedButton, ImageButton } from '../../../components';
import { checkEmail } from '../../../utils';

const INPUTS_DATA = [{
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

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        fullName: '',
        instaUserName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  }

  onClose = () => {
    alert('onClose');
  };

  onChangeText = (key, value) => {
    const { userInfo } = this.state;
    const updatedUserInfo = { ...userInfo };
    updatedUserInfo[key] = value;
    this.setState({ userInfo: updatedUserInfo });
  };

  onSignUp = () => {
    alert('Sign up');
  };

  renderInputs = () => {
    const { userInfo } = this.state;
    const isValidFullName = !!userInfo.fullName.length;
    const isValidInstaUsername = !!userInfo.instaUserName.length;
    const isValidEmail = checkEmail(userInfo.email);
    const isValidPassword = userInfo.password.length >= 8;
    const isValidPasswordConfirm = userInfo.confirmPassword.length >= 8 && (userInfo.password === userInfo.confirmPassword);
    const inputsValid = [isValidFullName, isValidInstaUsername, isValidEmail, isValidPassword, isValidPasswordConfirm];
    return INPUTS_DATA.map((item, index) => (
      <Input
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
            <CloseButton onPress={this.onClose} />
          </View>
          <KeyboardAwareScrollView
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.subContainer}>
              <Text style={styles.whiteBoldBigText}>
                Register • Barber
              </Text>
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
                <ImageButton iconSource={require('../../../assets/icon_facebook.png')} />
                <View style={styles.space}/>
                <ImageButton iconSource={require('../../../assets/icon_gmail.png')} />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default SignUpScreen;
