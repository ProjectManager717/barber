import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";

import { Header, AirbnbRating } from "react-native-elements";
import { globalStyles } from "../../../themes/globalStyles";
import { Colors } from "../../../themes";

//import { globalStyles } from "../../../themes/globalStyles";
import { styles } from "./styles";

export default class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {}
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

  renderItem(item) {
    let ratings = Math.floor(Math.random() * 5 + 1);
    return (
      <View style={styles.row_item}>
        <View style={[globalStyles.rowBackground, { marginTop: 40 }]}>
          <Text style={styles.client_name}>Karim Banz</Text>
          <View style={styles.rating_container}>
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={ratings}
              size={10}
            />
            <Text style={styles.rating_text}>{ratings} of 5.0</Text>
          </View>
          <Text style={styles.comments}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </Text>
        </View>
        <Image
          source={{ uri: "https://loremflickr.com/240/240/student" }}
          style={styles.thumbnail}
        />
      </View>
    );
  }

  renderListHeader() {
    let ratings = Math.floor(Math.random() * 5 + 1);
    return (
      <View style={{ height: 90, justifyContent: "center" }}>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={ratings}
            size={25}
          />
          <Text style={[styles.rating_text,{fontSize:16}]}>({ratings} of 5.0)</Text>
        </View>
      </View>
    );
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
          centerComponent={{ text: "REVIEWS", style: { color: "#fff" } }}
          rightComponent={{ color: "#fff" }}
          containerStyle={{
            backgroundColor: Colors.dark,
            justifyContent: "space-around"
          }}
        />
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderListHeader}
          numColumns={1}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
