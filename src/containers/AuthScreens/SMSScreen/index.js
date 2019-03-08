import React, { Component } from 'react';
import { ImageBackground, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { styles } from './styles';
import {CloseButton, RedButton} from "../../../components/Buttons";

class SMSScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: ''
    }
  }

  onClose = () => {
    alert('close');
  };

  onContinue = () => {
    alert('continue');
  };

  onChangeText = (number) => {
    this.setState({ number });
  };

  render() {
    const { number } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.parentContainer}>
          <ImageBackground
            source={require('../../../assets/img_background4.png')}
            style={styles.container}
            imageStyle={styles.backgroundImg}
          >
            <View style={styles.closeContainer}>
              <CloseButton onPress={this.onClose} />
            </View>
            <Text style={styles.titleText}>
              {`Confirm using\nyour Phone Number`}
            </Text>
            <View style={styles.mainContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.titleText}>
                    +1
                  </Text>
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={this.onChangeText}
                  value={number}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.whiteText}>
                We will send you One-Time code.
              </Text>
              <RedButton label="Continue" onPress={this.onContinue} style={styles.btnContainer}/>
            </View>
          </ImageBackground>
          <View style={styles.bottomContainer} />
        </SafeAreaView>
      </View>
    );
  }
}

export default SMSScreen;
