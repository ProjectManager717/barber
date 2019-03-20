import React, {Component} from "react";
import {View, Text, FlatList, TouchableOpacity, Image} from "react-native";

import {Header} from "react-native-elements";

import {Colors} from "../../../themes";
import {styles} from "./styles";

var moment = require("moment");

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

export default class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            dayData: []
        };
    }

    startOfWeek(date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    renderWeekDay(item) {
        var mDate = moment(item.d);
        var week = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");

        var date1 = moment(item.d).format("YYYY-MM-DD");
        var date2 = moment(new Date()).format("YYYY-MM-DD");

        var currentStyle = {};

        if (date1 === date2) {
            currentStyle = {color: Colors.green};
        }

        return (
            <View
                key={item.k}
                style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                    backgroundColor: item.bg
                }}
            >
                <Text style={[styles.week_day_container, currentStyle]}>
                    {week[item.k]}
                </Text>
                <Text
                    style={[
                        styles.week_day_container,
                        {color: Colors.grey1},
                        currentStyle
                    ]}
                >
                    {mDate.format("DD")}
                </Text>
            </View>
        );
    }

    componentDidMount() {
        let items = [];
        for (i = 0; i < 7; i++) {
            var weekDate = this.startOfWeek(new Date());
            var newDate = weekDate.addDays(i);
            items.push(this.renderWeekDay({k: i, d: newDate}));
        }
        let hours = Array.apply(null, Array(48)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        this.setState({
            dayData: hours,
            dataSource: items
        });
    }

    renderItem(item) {
        //item.id*30
        var bgColor = Colors.red;
        if (item.id % 2 == 0) {
            bgColor = Colors.green;
        }
        var m = moment(new Date(2011, 2, 12, 0, 0, 0));
        m.add(item.id * 30, "minutes");
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Receipt")}>
                <View style={{height: 70, flexDirection: "row"}} cellKey={item.id}>
                    <Text
                        style={{
                            marginLeft: 10,
                            marginTop: 6,
                            width: 50,
                            fontFamily: "AvertaStd-Regular",
                            color: Colors.white,
                            fontSize: 10
                        }}
                    >
                        {m.format("HH:mm")}
                    </Text>
                    <View style={{width: 6, backgroundColor: bgColor}}/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("ChooseTimings");
                            }}
                        >
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/ic_timing.png")}
                            />
                        </TouchableOpacity>
                    }
                    rightComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                        >
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/ic_siren_main.png")}
                            />
                        </TouchableOpacity>
                    }
                    centerComponent={{text: "CALENDER", style: {color: "#fff"}}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <Text
                    style={{
                        fontFamily: "AvertaStd-Semibold",
                        alignSelf: "center",
                        marginTop: 12,
                        color: Colors.red1
                    }}
                >
                    March 2019
                </Text>
                <View style={styles.calendar_weekly_header}>
                    {this.state.dataSource}
                </View>
                <View
                    style={{
                        marginLeft: 0,
                        height: 0.2,
                        backgroundColor: Colors.lightGrey
                    }}
                />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.dayData}
                    renderItem={({item}) =>this.renderItem(item)}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}
