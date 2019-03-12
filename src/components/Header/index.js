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

export default class Header extends Component {
  render() {
    this.props.bgIcon
    return (
      <ImageBackground
        source= {this.props.bgIcon}
        style={styles.mainContainer}
      >
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageButton}>
            <Image
              source={this.props.leftIcon}
              style={[styles.image, { marginLeft: 4 }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton}>
            <Image
              source={this.props.rightIcon}
              style={[styles.image, { marginRight: 20 }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

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
    marginTop: 20,
    tintColor: "#fff",
    height: 35,
    width: 49
  },
  imageButton: {
    height: 40,
    width: 40
  }
});
