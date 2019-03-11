import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
const { height, width } = Dimensions.get("window");

export const Header = ({}) => (
  <ImageBackground
    source={require("../../assets/images/header.png")}
    style={styles.mainContainer}
  >
    <View style={styles.imageContainer}>
      <TouchableOpacity style={styles.imageButton}>
        <Image
          source={require("../../assets/images/qr.png")}
          style={[styles.image,{marginLeft : 4}]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageButton} >
        <Image
          source={require("../../assets/images/share.png")}
          style={[styles.image,{marginRight : 20}]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 3,
    width
  },
  imageContainer: {
    width: "95%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center"
  },
  image: {
    marginTop:20,
    tintColor:'#fff',
    height: 35,
    width: 49
  },
  imageButton: {
    height: 40,
    width: 40
  }
});
