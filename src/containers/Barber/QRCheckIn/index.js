import React, { Component } from "react";
import { View, Text, Image,TouchableOpacity } from "react-native";

import { Header } from "react-native-elements";
import { globalStyles } from "../../../themes/globalStyles";
import { Colors } from "../../../themes";

import  {CameraKitCamera} from 'react-native-camera-kit';
import { styles } from "./styles";

export default class QRCheckIn extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
      text: "Google"
    };
  }
  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(6)).map((v, i) => {
      return { id: i, title: "Title " + i };
    });
    that.setState({
      dataSource: items
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          barStyle="light-content" // or directly
          style={{ backgroundColor: "yellow" }}
          outerContainerStyles={{ backgroundColor: "#1999CE" }}
          leftComponent={{ color: "#fff" }}
          centerComponent={{
            text: "CHECK IN",
            style: { color: "#fff" }
          }}
          rightComponent={
            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
              <Image 
                style={{tintColor:'white',height:20, resizeMode:'contain'}}
                source={require("../../../assets/images/ic_forward_arrow.png")} 
                />
            </TouchableOpacity>}
          containerStyle={{
            backgroundColor: Colors.themeBackground,
            justifyContent: "space-around"
          }}
        />
        
        <View style={{width:"100%",height:"100%"}}>
            <CameraKitCamera
                ref={cam => this.camera = cam}
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
                cameraOptions={{
                    flashMode: 'auto',             // on/off/auto(default)
                    focusMode: 'on',               // off/on(default)
                    zoomMode: 'on',                // off/on(default)
                    ratioOverlay:'1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
                    ratioOverlayColor: '#00000077' // optional
                }}
                onReadQRCode={(event) => console.log("QRScan =="+event.nativeEvent.qrcodeStringValue)} // optional

            />
        </View>
        <TouchableOpacity style={[globalStyles.button,{marginTop:70, marginBottom:30}]} onPress={()=>{
          //this.props.navigation.navigate('BarberProfile');
        }}>
          <Text style={globalStyles.buttonText}>Check In Customer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}