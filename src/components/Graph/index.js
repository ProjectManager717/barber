import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Image, Text } from "react-native";
import colors from "../../themes/colors";

const { height, width } = Dimensions.get("window");

export default class lGraphComp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', width, height: 30, marginTop: 10, marginBottom: 10, alignItems: 'center'}}>
          <Text style={[styles.label, {marginLeft: 20}]}>Sep</Text>
          <Image source={require("../../assets/images/arrow_down.png")} style={[styles.arrow_down, {marginLeft: 5}]} />
          <Text style={[styles.label, {marginLeft: 15, fontWeight: 'bold'}]}>Week2</Text>
          <Image source={require("../../assets/images/arrow_down.png")} style={[styles.arrow_down, {marginLeft: 5}]} />
        </View>
        <View style={styles.graphContainer}>
          <Image
            source={require("../../assets/images/graph.png")}
            style={styles.graph}
            resizeMode="cover"
          />
        </View>
        <View style={styles.allBoxes}>
          <View style={styles.boxContainer}>
            <View style={styles.smallBox} >
              <Image source={require("../../assets/images/client.png")} style={{width: 28, height: 25}} />
              <View style={{alignItems: 'center', marginLeft: 3}}>
                <Text style={[styles.label]}>CLIENT</Text>
                <Text style={[styles.label, {fontWeight: 'bold', fontSize: 15}]}>245</Text>
              </View>
            </View>
            <View style={[styles.smallBox, { width: width / 3.5 }]} >
              <Image source={require("../../assets/images/close.png")} style={{width: 25, height: 25}} />
              <View style={{marginLeft: 3}}>
                <Text style={[styles.label]}>CANCELLATIONS</Text>
                <Text style={[styles.label, {fontWeight: 'bold', fontSize: 15}]}>11</Text>
              </View>
            </View>
            <View style={[styles.smallBox, { width: width / 3 }]} >
              <Image source={require("../../assets/images/total_tip.png")} style={{width: 28, height: 25}} />
              <View style={{marginLeft: 3}}>
                <Text style={[styles.label]}>TOTAL TIP</Text>
                <Text style={[styles.label, {fontWeight: 'bold', fontSize: 15}]}>$400.00</Text>
              </View>
            </View>
          </View>
          <View style={styles.largeBox} >
              <Image source={require("../../assets/images/dollar.png")} style={{width: 25, height: 25, marginLeft: 15}} />
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={[styles.label]}>TOTAL REVENUE</Text>
                <Text style={[styles.label, {fontWeight: 'bold', fontSize: 15}]}>$2650.00</Text>
              </View>
              <View style={{width: 100, height: 30, borderRadius: 15, borderColor: colors.green, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                <Text style={{color: colors.green, fontSize: 13}}>Cashout</Text>
              </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
    height: height / 1.5
  },
  graphContainer: { width, height: height / 3.5 },
  graph: { height: "100%", width: "100%" },
  boxContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: width / 1.12
  },
  smallBox: {
    flexDirection: 'row',
    backgroundColor: colors.btn_bg_color,
    width: width / 4.3,
    height: height / 10,
    borderRadius: 4,
    borderWidth: .25,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  largeBox: {
    flexDirection: 'row',
    width: width / 1.12,
    height: height / 12,
    borderRadius: 4,
    backgroundColor: colors.btn_bg_color,
    borderWidth: .25,
    borderColor: colors.white,
    marginTop: 10,
    alignItems: 'center',


  },
  allBoxes: {
    height: height / 12 + height / 10 + 7,
    justifyContent: "space-between",
    marginTop: 40
  },
  arrow_down: {
    width: 9,
    height: 5
  }, 
  label: {
    fontSize: 8, color: colors.white
  }
});
