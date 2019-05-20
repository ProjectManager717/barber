import React, { Component } from 'react';
import { ImageBackground, View, Text, Image } from 'react-native';
import {Colors} from "../../../themes";

class SelectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(): void {
    setTimeout(() => {
      //this.setState({splashScreen: false});
      // Alert.alert("hello");
      this.closeScreen();
    }, 3000)
  }
  closeScreen() {
    this.props.navigation.navigate("SelectScreen");

  }


  render() {
    return (
      <ImageBackground
        source={require('../../../assets/img_background1.png')}
        style={{ flex: 1,
          paddingTop: 0,
          backgroundColor: Colors.themeBackground}}
        imageStyle={{resizeMode: 'stretch',backgroundColor:"grey"}}
      >
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <Image resizeMode={"contain"} source={require("../../../assets/images/logo.png")} style={{height:100,width:140}}/>
        </View>
      </ImageBackground>
    )
  }
}

export default SelectScreen;
