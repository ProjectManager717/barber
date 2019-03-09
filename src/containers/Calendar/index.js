import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import colors from "../../themes/colors";
const { height, width } = Dimensions.get("window");

export default class Calendar extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text style={{textAlign: 'center', fontSize: 30, color: 'white'}}>Calendar</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: colors.themeBackground,
    justifyContent: 'center'
  },
});
