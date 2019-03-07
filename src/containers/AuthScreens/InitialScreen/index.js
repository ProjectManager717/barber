import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { styles } from './styles';
import { WhiteButton, RedButton } from '../../../components';

class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onSignUp = () => {
    this.props.navigation.navigate('SignUpScreen');
  };

  onSignIn = () => {
    alert('signIn');
  };

  render() {
    return (
      <ImageBackground
        source={require('../../../assets/img_background3.png')}
        style={styles.container}
        imageStyle={styles.backgroundImg}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.buttonsContainer}>
              <WhiteButton label="Sign Up with Email" onPress={this.onSignUp} />
              <RedButton label="Sign In" onPress={this.onSignIn} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

export default InitialScreen;
