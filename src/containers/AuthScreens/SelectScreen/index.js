import React, { Component } from 'react';
import { ImageBackground, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { SmallWhiteButton } from '../../../components';
import { styles } from './styles';
//import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Preference from "react-native-preference";

class SelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onBarber = () => {
    this.props.navigation.navigate('InitialScreen',{User:"Barber"});
  };

  onClient = () => {
    this.props.navigation.navigate('InitialScreen',{User:"Client"});
  };

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
              <Text style={[styles.whiteBoldText,{width:"50%",height:20,textAlign:"right"}]}>
                {'Supreme barbers. '}
              </Text>
              <Text style={[styles.whiteTinyText,{width:"50%",height:20,textAlign:"left"}]}>
                {'Supreme cuts.'}
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <SmallWhiteButton label="Barber" onPress={this.onBarber} textStyle={{width:60,textAlign:"center"}} />
              <SmallWhiteButton label="Client" onPress={this.onClient} textStyle={{width:60,textAlign:"center"}}  />
            </View>
          </View>
          <View style={styles.bottomIconContainer}>
            <Text style={styles.whiteTinySmallText}>
              CLYPR Technology V1.0
            </Text>
            <View style={styles.bottomSubContainer}>
              <Text style={styles.whiteBoldSmallText}>
                Made in Miami
              </Text>
              <Image source={require('../../../assets/icon_miami.png')} style={styles.iconMiami}/>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

export default SelectScreen;
