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
        
        <View style={styles.qr_outer_container}>


          <View style={styles.qrcontainer}>
            <QRCode
              value={this.state.text}
              size={200}
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