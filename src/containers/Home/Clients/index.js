import React, { Component } from "react";
import { View, FlatList, Text, Image } from "react-native";
import { Avatar } from "react-native-elements";

import { Colors } from "../../../themes";
import { globalStyles } from "../../../themes/globalStyles";
import { styles } from "./styles";

export default class Clients extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {}
    };
  }
  componentDidMount() {
    let items = Array.apply(null, Array(4)).map((v, i) => {
      return { id: i, title: "Title " + i };
    });
    this.setState({
      dataSource: items
    });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 4,
          width: "86%",
          backgroundColor: "transparent",
          marginLeft: "14%"
        }}
      />
    );
  };
  //let ratings = Math.floor(Math.random() * 5 + 1);

  renderItem(item) {
    let ctype = Math.floor(Math.random() * 2 + 1);
    var typeTitle = "#" + (item.id+1)+ " TIMES";
    var buttonBgColor = Colors.red;
    var txtColor = Colors.white;
    if (ctype == 2) {
      typeTitle = "NEW";
      txtColor = Colors.darkBlack;
      buttonBgColor = Colors.btn_new_color;
    }
    return (
      <View style={[globalStyles.rowBackground,{marginLeft:16,marginRight:16}]}>
        <View style={styles.avatar_conatiner}>
          <Avatar
            source={{ uri: "https://loremflickr.com/240/240/girl" }}
            rounded
            size="large"
            style={{
              alignSelf: "center",
              height: 60,
              width: 60
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
            marginTop: 15
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>{item.title}</Text>
          <View
            style={{
              backgroundColor: buttonBgColor,
              marginTop: 10,
              width: 70,
              height: 20,
              borderWidth: 0.5,
              borderColor: buttonBgColor,
              borderRadius: 4
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 10,
                marginTop: 4,
                fontWeight: "bold",
                color: txtColor
              }}
            >
              {typeTitle}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            right: 10,
            top: 20
          }}
        >
          <Text style={{ color: "#fff", fontSize: 10, alignSelf: "center" }}>
            Average Tip
          </Text>
          <View style={styles.tip_price_container}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 14,
                marginTop: 4,
                color: Colors.white
              }}
            >
              $15.00
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderListHeader() {
    let ratings = Math.floor(Math.random() * 5 + 1);
    return (
      <View style={{ height: 50,flexDirection: "row" }}>
        <View style={{ position:'absolute',right:20,top:16,flexDirection: "row", alignSelf: "center" }}>
          <Image style={styles.icon_header} source={require("../../../assets/images/ic_returning_customer.png")} />
          <Text style={{ alignSelf: "center",fontSize:10, marginLeft: 6, color: Colors.white }}>            
            2 Returning Customers
          </Text>
        </View>

        <View style={{position:'absolute',left:18,top:16, flexDirection: "row", alignSelf: "center" }}>
          <Image style={styles.icon_header} source={require("../../../assets/images/ic_new_customer_header.png")} />
          <Text style={{ alignSelf: "center", marginLeft: 6, color: Colors.white,fontSize:10 }}>
          1 New Customer
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderListHeader}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
