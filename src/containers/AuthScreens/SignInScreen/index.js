import React, { Component } from 'react';
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import {CloseButton, ImageButton, Input, RedButton} from '../../../components';
import { checkEmail } from '../../../utils';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  onClose = () => {
    alert('onClose');
  };

  onLogin = () => {
    alert('login');
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  onForgot = () => {
    alert('forgot');
  };

  render() {
    const { email, password } = this.state;
    const isValidEmail = checkEmail(email);
    const isValidPassword = password.length >= 8;
    return (
      <ImageBackground
        source={require('../../../assets/img_background2.png')}
        style={styles.container}
        imageStyle={styles.backgroundImg}
      >
        <View style={styles.bottomContainer} />
        <SafeAreaView style={styles.parentContainer}>
          <View style={styles.closeContainer}>
            <CloseButton onPress={this.onClose} />
          </View>
          <KeyboardAwareScrollView style={styles.mainContainer}>
            <View style={styles.subContainer}>
              <Text style={styles.whiteBoldBigText}>
                Login • Barber
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
          <View style={{ flex: 1 }}>
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
