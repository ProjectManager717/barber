import React, {Component} from 'react';
import {ImageBackground, View, Text, Image} from 'react-native';
import {Colors} from "../../../themes";

import Preference from 'react-native-preference';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox=true;
        this.state = {}
    }

    componentDidMount(){
        setTimeout(() => {
            //this.setState({splashScreen: false});
            // Alert.alert("hello");
            this.closeScreen();
        }, 3000)
    }

    closeScreen() {
        if (Preference.get("clientlogin") === true) {
            this.props.navigation.navigate("ClientTabNavigator");
            //this.checkPendingReviews();
        } else if (Preference.get("barberlogin") === true) {
            this.props.navigation.navigate("TabNavigator");
        } else
            this.props.navigation.navigate("SelectScreen");
    }


    render() {
        return (
            <ImageBackground
                source={require('../../../assets/images/splash_bg.png')}
                style={{
                    flex: 1,
                    paddingTop: 0,
                    backgroundColor: Colors.themeBackground
                }}
                imageStyle={{resizeMode: 'stretch', backgroundColor: "grey"}}>
                <View style={{/* width: "100%", height: "100%", */flex:1, justifyContent: "center", alignItems: "center"}}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/logo.png")}
                            style={{height: 135, width: 175,marginBottom:45,marginStart:5}}/>
                </View>
            </ImageBackground>
        )
    }
}

export default SplashScreen;
