import React, { Component } from "react";
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image} from "react-native";
//import all the components we will need
import { Colors } from "../../../themes";
import { globalStyles } from "../../../themes/globalStyles";

export default class Clients extends Component {
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
          height: 8,
          width: "86%",
          backgroundColor: "transparent",
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
            <View style={globalStyles.rowBackground}>
              <Image
                source={require("../../../assets/images/personface.png")}
                style={{
                  alignSelf: "center",
                  marginLeft: 10,
                  height: 60,
                  width: 60
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  marginTop: 15
                }}
              >
                <Text style={{ color: "#fff", fontSize: 20 }}>
                  {item.title}
                </Text>
                <View
                  style={{
                    backgroundColor: "#f00",
                    marginTop: 10,
                    width:70,
                    height:20,
                    borderWidth: 0.5,
                    borderColor: "#f00",
                    borderRadius: 4
                  }}
                >
                  <Text style={{alignSelf:'center',fontSize:10,marginTop:4}}>
                    {"#"+ item.id+ " TIMES"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  position:'absolute' , right:10,top:20
                }}
              >
                <Text style={{ color: "#fff", fontSize: 10,alignSelf:"center" }}>
                  Average Tip
                </Text>
                <View
                  style={{
                    backgroundColor: Colors.border,
                    marginTop: 6,
                    width:80,
                    height:24,
                    borderWidth: 0.5,
                    borderColor: Colors.border,
                    borderRadius: 12
                  }}
                >
                  <Text style={{alignSelf:'center',fontSize:16,marginTop:2}}>
                    $15.00
                  </Text>
                </View>
              </View>
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

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 30
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100
  }
});
