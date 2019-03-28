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
            dayData: [],

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
        let hours = Array.apply(null, Array(10)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        console.log("slotsData-->" + JSON.stringify(hours));
        this.setState({
            dayData: hours,
            dataSource: items
        });
    }

    renderItem(item) {
        //item.id*30
        let bgColor = Colors.themeBackground;
        if (item.id == 0) {
            bgColor = Colors.green;
        }
        if (item.id == 1) {
            bgColor = Colors.purple
        }
        if (item.id == 2) {
            bgColor = Colors.magenta
        }
        if (item.id == 3) {
            bgColor = Colors.magenta
        }
        if (item.id == 6) {
            bgColor = Colors.magenta
        }


        var m = moment(new Date(2011, 2, 12, 0, 0, 0));
        m.add(item.id * 30, "minutes");
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Appointments")}>
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
                    <View style={{
                        backgroundColor: "#454656",
                        width: "75%",
                        flexDirection: "row",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: "white",
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                    }}>
                        <View style={{flexDirection: "row", width: "100%"}}>
                            <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <View style={{flexDirection: "row", marginStart: 10}}>
                                    <Text style={{
                                        fontWeight: "bold", color: "white",
                                        fontSize: 11
                                    }}>Haircut & Beard</Text>
                                    <Text style={{marginStart: 8,marginTop:1, color: "white", fontSize: 10}}>Sergio
                                        Ramos</Text>
                                </View>
                                <View style={{flexDirection: "row", marginStart: 10, marginTop: 7}}>
                                    <Image source={require("../../../assets/images/chair.png")} resizeMode={"contain"}
                                           style={{
                                               position: "absolute",
                                               height: 12,
                                               width: 12,
                                               marginStart: -20,
                                               marginTop: 3

                                           }}
                                    />
                                    <Text style={{color: "#95A2B5", fontSize: 12}}>30 mins</Text>
                                    <View style={{
                                        flexDirection: "column",
                                        width: 1,height:13,
                                        marginTop:3,
                                        backgroundColor: "grey",
                                        marginStart: 10,
                                        marginEnd: 10
                                    }}/>
                                    <Text style={{color: "#95A2B5", fontSize: 12}}>$30.00</Text>
                                </View>
                            </View>

                        </View>
                        <Image resizeMode={"cover"}
                               style={{width: 60, height: "100%", position: "absolute", right: 0, top: 0}}
                               source={require("../../../assets/images/completed.png")}
                        />
                        <Text style={{color: "#5AD800", fontSize: 7,fontWeight:"bold",position:"absolute",right:6,bottom:15}}>{"COMPLETED"}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    renderRow(item) {


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
                                this.props.navigation.navigate("ClientBlast");
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
                    renderItem={({item}) => this.renderItem(item)}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />


            </View>
        );
    }
}
