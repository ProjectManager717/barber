import React, { Component } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import { CloseButton, Input, RedButton, ImageButton } from '../../../components';
import { checkEmail } from '../../../utils';

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
    return (
      <View>
        <Input
          iconSource={require('../../../assets/icon_name.png')}
          style={styles.inputContainer}
          placeholder="First & Last Name"
          value={userInfo.fullName}
          onChangeText={(text) => this.onChangeText('fullName', text)}
          isValid={isValidFullName}
        />
        <Input
          iconSource={require('../../../assets/icon_instagram.png')}
          style={styles.inputContainer}
          value={userInfo.instaUserName}
          placeholder="Instagram Username"
          onChangeText={(text) => this.onChangeText('instaUserName', text)}
          isValid={isValidInstaUsername}
        />
        <Input
          iconSource={require('../../../assets/icon_email.png')}
          style={styles.inputContainer}
          value={userInfo.email}
          placeholder="Email"
          onChangeText={(text) => this.onChangeText('email', text)}
          isValid={isValidEmail}
          keyboardType="email-address"
        />
        <Input
          iconSource={require('../../../assets/icon_password.png')}
          style={styles.inputContainer}
          value={userInfo.password}
          placeholder="Password"
          onChangeText={(text) => this.onChangeText('password', text)}
          secureTextEntry
          isValid={isValidPassword}
        />
        <Input
          iconSource={require('../../../assets/icon_password_confirm.png')}
          style={styles.inputContainer}
          value={userInfo.confirmPassword}
          placeholder="Confirm Your Password"
          onChangeText={(text) => this.onChangeText('confirmPassword', text)}
          secureTextEntry
          isValid={isValidPasswordConfirm}
        />
      </View>
    )
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
