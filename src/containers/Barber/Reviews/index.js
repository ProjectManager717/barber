import React, {Component} from "react";
import {View, Text, FlatList, Image} from "react-native";

import {Header, AirbnbRating} from "react-native-elements";
import {globalStyles} from "../../../themes/globalStyles";
import {Colors} from "../../../themes";

//import { globalStyles } from "../../../themes/globalStyles";
import {styles} from "./styles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

export default class Reviews extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: {},
            reviews: [],
            AverageRating: "",
        };
        this.getReviews = this.getReviews.bind(this);
    }

    componentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(6)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        that.setState({
            dataSource: items
        });
        this.getReviews();

    }

    getReviews() {
        this.state.reviews = [];
        fetch(constants.GetReviews + "?user_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseReviews-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    let val = Math.round(response.Data.averageRating);
                    this.setState({reviews: response.Data.ratings, AverageRating: val})
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
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
                <View style={[globalStyles.rowBackground, {marginTop: 40}]}>
                    <Text style={styles.client_name}>{item.name}</Text>
                    <View style={styles.rating_container}>
                        <AirbnbRating
                            showRating={false}
                            count={5}
                            defaultRating={item.rating}
                            size={10}
                        />
                        <Text style={styles.rating_text}>{item.rating} of 5.0</Text>
                    </View>
                    <Text style={styles.comments}>
                        {item.review_text}
                    </Text>
                </View>
                <Image
                    source={{uri: "https://loremflickr.com/240/240/student"}}
                    style={styles.thumbnail}
                />
            </View>
        );
    }

    renderListHeader() {

        return (
            <View style={{height: 90, justifyContent: "center"}}>
                <View style={{flexDirection: "row", alignSelf: "center"}}>
                    <AirbnbRating
                        isDisabled={true}
                        showRating={false}
                        count={5}
                        defaultRating={0}
                        size={25}
                    />
                    <Text style={[styles.rating_text, {fontSize: 16}]}>({ratings} of 5.0)</Text>
                </View>
            </View>
        );
    }

    render() {
        let ratings = Math.floor(Math.random() * 5 + 1);
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    leftComponent={{color: "#fff"}}
                    centerComponent={{text: "REVIEWS", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />

                <View style={{height: 90, justifyContent: "center"}}>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <AirbnbRating
                            isDisabled={true}
                            showRating={false}
                            count={5}
                            defaultRating={this.state.AverageRating}
                            size={25}
                        />
                        <Text style={[styles.rating_text, {fontSize: 16}]}>({this.state.AverageRating} of 5.0)</Text>
                    </View>
                </View>
                {(this.state.reviews.length > 0) && <FlatList
                    data={this.state.reviews}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />}
                {(this.state.reviews.length < 1) &&
                <View style={{marginTop: 30, height: 30, marginStart: 20, marginEnd: 20,alignItems:"center"}}>
                    <Text style={{color:"white",fontSize:20,}}>{"You have no reviews yet!"}</Text>
                </View>}
            </View>
        );
    }
}
