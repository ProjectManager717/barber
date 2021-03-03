import React, { Component } from 'react';
import { ImageBackground, View, Text, Image, Clipboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import firebase from 'react-native-firebase';
import { SmallWhiteButton } from '../../../components';
import { styles } from './styles';
import Preference from "react-native-preference";

let timesAppVersionPressed;
class SelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    }
  }

  onBarber = () => {
    this.props.navigation.navigate('InitialScreen', { User: "Barber" });
  };

  onClient = () => {
    this.props.navigation.navigate('InitialScreen', { User: "Client" });
  };

  componentWillMount() {
    timesAppVersionPressed = 0;
    firebase.messaging().getToken()
      .then(fcmToken => {
        console.log(fcmToken, 'fcm token==??')
        if (fcmToken) {
          this.setState({ token: fcmToken });
        }

      });
  }

  componentDidMount() {

    this.closeScreen();
    //this.getPermissions()
  }

  closeScreen() {
    if (Preference.get("clientlogin") === true) {
      this.props.navigation.navigate("ClientTabNavigator");
    } else if (Preference.get("barberlogin") === true) {
      this.props.navigation.navigate("TabNavigator");
    }
  }

  async writeToClipboard() {
    await Clipboard.setString(this.state.token);
  }

  appVersionPressed() {
    ++timesAppVersionPressed;
    if (timesAppVersionPressed === 5) {
        timesAppVersionPressed = 0;
        this.writeToClipboard();
    }
}

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/img_background1.png')}
        style={styles.container}
        imageStyle={styles.backgroundImg}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.labelContainer}>
              <Text style={[styles.whiteBoldText, { width: "50%", height: 20, textAlign: "right" }]}>
                {'Supreme barbers. '}
              </Text>
              <Text style={[styles.whiteTinyText, { width: "50%", height: 20, textAlign: "left" }]}>
                {'   Supreme cuts.'}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <SmallWhiteButton label="Barber" onPress={this.onBarber} textStyle={{ width: 60, textAlign: "center" }} />
              <SmallWhiteButton label="Client" onPress={this.onClient} textStyle={{ width: 60, textAlign: "center" }} />
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => {this.appVersionPressed()}}>
            <View style={styles.bottomIconContainer}>
              <Text style={styles.whiteTinySmallText}>
                CLYPR Technologies V1.0
            </Text>
              <View style={styles.bottomSubContainer}>
                <Text style={styles.whiteBoldSmallText}>
                  Made in Miami
              </Text>
                <Image source={require('../../../assets/icon_miami.png')} style={styles.iconMiami} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

export default SelectScreen;
