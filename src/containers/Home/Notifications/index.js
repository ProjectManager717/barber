import React, {Component} from "react";
//import rect in our project
import {StyleSheet, View, FlatList, Text, Image} from "react-native";
//import all the components we will need
import {Colors} from "../../../themes";
import {styles} from "./styles";
import {Avatar} from "react-native-elements";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";

export default class Notifications extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: {},
            Notifications: []
        };
    }

    componentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(3)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        that.setState({
            dataSource: items
        });
        this.getNotification()

    }

    getNotification() {
        this.state.Notifications = [];
        fetch(constants.GetNotifications + "?user_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseworkinghours-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({Notifications: response.Data})
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: "+error);
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
                    renderItem={({item}) => (
                        <View style={{height: 160, flexDirection: "row"}}>
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
                                        style={{height: 30, width: 30, alignSelf: "center"}}
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
                            <View style={{flexDirection: "row", marginTop: 30, height: 60}}>
                                <Avatar
                                    source={{uri: "https://loremflickr.com/240/240/actor"}}
                                    rounded
                                    size="large"
                                    style={{
                                        marginLeft: 10,
                                        height: 60,
                                        width: 60
                                    }}
                                />
                                <Text style={styles.client_name}>
                                    he{/*{item.sender.firstname}*/}
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
                            <View style={{
                                position: "absolute",
                                bottom: 1,
                                left: 80,
                                right: 0,
                                height: 0.5,
                                backgroundColor: Colors.border
                            }}/>
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
