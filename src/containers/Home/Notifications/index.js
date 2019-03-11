import React, { Component } from "react";
//import rect in our project
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
//import all the components we will need
import { Colors } from "../../../themes";
import { styles } from "./styles";

export default class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {}
    };
  }
  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(3)).map((v, i) => {
      return { id: i, title: "Title " + i };
    });
    that.setState({
      dataSource: items
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.1,
          width: "86%",
          backgroundColor: "white",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ height: 160, flexDirection: "row" }}>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: "column"
                }}
              >
                <View
                  style={{
                    width: 1,
                    alignSelf: "center",
                    backgroundColor: Colors.border,
                    height: 30
                  }}
                />
                <View style={styles.circular_container}>
                  <Image
                    resizeMode="stretch"
                    source={require("../../../assets/images/ic_new_customer.png")}
                    style={{ height: 30, width: 30, alignSelf: "center" }}
                  />
                </View>
                <View
                  style={{
                    width: 1,
                    alignSelf: "center",
                    backgroundColor: Colors.border,
                    height: 70
                  }}
                />
              </View>
              <View style={{ flexDirection: "row",marginTop:30,height:60 }}>
                <Image
                  source={require("../../../assets/images/personface.png")}
                  style={{
                    marginLeft: 10,
                    height: 60,
                    width: 60
                  }}
                />
                <Text style={styles.client_name}>
                  {item.title}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  marginTop: 15
                }}
              />

              <View
                style={{
                  position: "absolute",
                  right: 10,
                  top: 20
                }}
              >
                <View style={styles.status_container}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 12,
                      marginTop: 6
                    }}
                  >
                    NEW BOOKING
                  </Text>
                </View>
                <Text style={styles.time_ago}>
                  20s ago
                </Text>
              </View>
              <View style={{position:"absolute",bottom:1,left:80,right:0, height:0.5,backgroundColor:Colors.border}} />
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
