import React, { Component } from "react";
import { View, Text, Image,TouchableOpacity } from "react-native";

import { Header } from "react-native-elements";
import { globalStyles } from "../../../themes/globalStyles";
import { Colors } from "../../../themes";

import QRCode from "react-native-qrcode";

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
            text: "CUSTOMER CHECK IN",
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
            backgroundColor: Colors.dark,
            justifyContent: "space-around"
          }}
        />
        
        <View style={styles.qr_outer_container}>
          <Image style={[styles.corner_images,{ left:0,top:0 }]} source={require("../../../assets/images/ic_qr_top_left.png")} />
          <Image style={[styles.corner_images,{ right:0,top:0 }]} source={require("../../../assets/images/ic_qr_top_right.png")} />
          <Image style={[styles.corner_images,{ left:0,bottom:0 }]} source={require("../../../assets/images/ic_qr_bottom_left.png")} />
          <Image style={[styles.corner_images,{ right:0,bottom:0 }]} source={require("../../../assets/images/ic_qr_bottom_right.png")} />
          <View style={styles.qrcontainer}>
            <QRCode
              value={this.state.text}
              size={250}
              bgColor="black"
              fgColor="white"
            />
          </View>
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