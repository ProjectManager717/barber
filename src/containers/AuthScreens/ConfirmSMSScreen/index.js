import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import CodeInput from 'react-native-confirmation-code-input';
import { styles } from './styles';
import { CloseButton, RedButton } from '../../../components';
import { Colors } from '../../../themes';
import Preference from "react-native-preference";
let number = "";
class ConfirmSMSScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    number = navigation.getParam('Number');
    console.log("gettingUSersignIn--->" + number);

    this.state = {
      No:undefined
    };
    this.state.No=number;
  }

  onClose = () => {
    alert('onClose');
  };

  onFinishCheckingCode = (isValid, code) => {
    console.info('isValid', isValid);
    console.info('code', code);
    if (isValid) {

    } else {
      alert('invalid');
    }
  };

  onSubmit = () => {
      if (Preference.get("userType") === "Barber"){
    this.props.navigation.navigate('BarberEditProfile');}
      else if (Preference.get("userType") === "Client"){
        this.props.navigation.navigate("ClientEditProfile")

      }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.closeContainer}>
          <CloseButton onPress={this.onClose} />
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.whiteBoldBigText}>
            Confirmation
          </Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.whiteText}>
              {`We just sent on SMS to\n ${this.state.No}\n with your verification code.\nEnter the 2-step verification code below.`}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <CodeInput
              ref="codeInputRef2"
              keyboardType="numeric"
              codeLength={5}
              className="border-b"
              compareWithCode={'12345'}
              autoFocus={false}
              codeInputStyle={styles.codeInputStyle}
              onFulfill={this.onFinishCheckingCode}
              inactiveColor={Colors.border}
            />
          </View>
          <View style={styles.resendContainer}>
            <Text style={styles.whiteSmallText}>
              {`Didn't get it? `}
            </Text>
            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.whiteSmallBoldText}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
          <RedButton label="Submit" onPress={this.onSubmit} />
        </View>
      </SafeAreaView>
    )
  }
}

export default ConfirmSMSScreen;
