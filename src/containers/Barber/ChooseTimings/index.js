import React, {Component} from "react";
import {View, Text, FlatList, TouchableOpacity, Image, ScrollView,Platform,} from "react-native";

import {Header} from "react-native-elements";

import DatePicker from 'react-native-date-picker';


import {Colors} from "../../../themes";
import {styles} from "./styles";

//import { globalStyles } from "../../themes/globalStyles";

import {globalStyles} from "../../../themes/globalStyles";
import CheckBoxSquare from "../../../components/CheckBox";

var moment = require("moment");
const dateFormat = "hh:mm a";

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

export default class ChooseTimings extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            dayData: [],
            chosenDate: new Date(),date: new Date()};



        this.setDate = this.setDate.bind(this);

    }
    setDate(newDate) {
        this.setState({chosenDate: newDate});
    }

    startOfWeek(date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    renderWeekDay(item) {
        var week = new Array("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN");
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
                <Image
                    style={{
                        height: 16,
                        resizeMode: "contain",
                        alignSelf: "center",
                        marginBottom: 10
                    }}
                    source={require("../../../assets/images/ic_notworking.png")}
                />
                <Text
                    style={[styles.week_day_container, {fontFamily: "AvertaStd-Thin"}]}
                >
                    {week[item.k]}
                </Text>
            </View>
        );
    }

    onTimeSelected = date => {
    };

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
                                this.props.navigation.goBack();
                            }}
                        >
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/ic_back.png")}
                            />
                        </TouchableOpacity>
                    }
                    centerComponent={{
                        text: "Choose Your Working Hours",
                        style: {color: "#fff"}
                    }}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />

                <View style={[globalStyles.rowBackground, {height: 60, margin: 20}]}>
                    {this.state.dataSource}
                </View>

                <View style={{flexDirection: "row", width: "100%", height: 100}}>
                    <View style={{flexDirection: "column", width: "50%"}}>
                        <Text style={{
                            color: "grey",
                            fontWeight: "bold",
                            fontSize: 13,
                            marginBottom: 10,
                            marginStart: 20
                        }}>{"FROM"}</Text>
                        <DatePicker
                            date={this.state.date}
                            onDateChange={date => this.setState({ date })}
                            mode={"time"}
                            textColor={"#ffffff"}
                        />


                    </View>
                    <View style={{flexDirection: "column", width: "50%"}}>
                        <Text style={{
                            color: "grey",
                            fontWeight: "bold",
                            fontSize: 13,
                            marginBottom: 10,
                            marginStart: 20
                        }}>{"TO"}</Text>

                        <DatePicker
                            date={this.state.date}
                            onDateChange={date => this.setState({ date })}
                            mode={"time"}
                            textColor={"#ffffff"}
                        />

                    </View>


                </View>






                <View style={{flexDirection: 'row', height: 40, marginLeft: 20, marginTop: 100}}>
                    <CheckBoxSquare onClick={() => {
                    }} isChecked={true} style={{alignSelf: 'center'}}/>
                    <Text style={{color: "white", marginTop: 7, marginStart: 7}}>{"Off"}<Text style={
                        {color: "grey",}
                    }>{"  (Today Not Working)"}</Text></Text>
                </View>


                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        {marginTop: 10, marginBottom: 10, width: "80%"}
                    ]}
                    onPress={() => {
                        this.props.navigation.navigate("BarberProfile");
                    }}
                >
                    <Text style={globalStyles.buttonText}>Update Now</Text>
                </TouchableOpacity>
                <ScrollView>
                    {this.renderTimingView({
                        title: "Add Break Time",
                        src: require("../../../assets/images/ic_break_time.png")
                    })}
                    {this.renderTimingView({
                        title: "Vacation Days",
                        src: require("../../../assets/images/ic_vacation_days.png")
                    })}
                    <View style={{marginBottom: 50}}/>
                </ScrollView>

            </View>
        );
    }

    renderTimingView(item) {
        return (
            <View style={[globalStyles.rowBackground, {height: 80, marginTop: 16}]}>
                <View
                    style={{
                        justifyContent: "center",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        backgroundColor: Colors.grey,
                        width: 80
                    }}
                >
                    <Image
                        style={{
                            position: "absolute",
                            height: 40,
                            width: 40,
                            resizeMode: "contain",
                            alignSelf: "center"
                        }}
                        source={item.src}
                    />
                </View>
                <Text
                    style={{
                        color: Colors.white,
                        fontFamily: "AvertaStd-Semibold",
                        alignSelf: "center",
                        marginLeft: 24,
                        fontSize: 18
                    }}
                >
                    {item.title}
                </Text>
                <Image
                    style={{
                        position: "absolute",
                        right: 20,
                        height: 12,
                        width: 17,
                        resizeMode: "contain",
                        alignSelf: "center"
                    }}
                    source={require("../../../assets/images/ic_long_arrow.png")}
                />
            </View>

        );
    }
}
