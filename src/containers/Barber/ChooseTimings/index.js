import React, {Component} from "react";
import {View, Text, FlatList, TouchableOpacity, Image, ScrollView, Platform, NetInfo} from "react-native";

import {Header} from "react-native-elements";

import DatePicker from 'react-native-date-picker';


import {Colors} from "../../../themes";
import {styles} from "./styles";

//import { globalStyles } from "../../themes/globalStyles";

import {globalStyles} from "../../../themes/globalStyles";
import CheckBoxSquare from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

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
            showLoader: false,
            dataSource: [],
            dayData: [],
            workingDays: [],
            startTime: new Date(),
            endTime: new Date(),
            chosenDate: new Date(),
            isOffToday: false,
            date: new Date().setHours(13, 0, 0)
        };
        this.setDate = this.setDate.bind(this);
        console.log("Timimng:::" + this.state.date);

    }

    componentDidMount() {
        this.fetchWorkingHours();
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
    }


    startOfWeek(date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    fetchWorkingHours = () => {
        this.setState({showLoading: true});
        console.log("userID---->" + Preference.get("userId"));
        console.log("url--->" + constants.BarberWorkingHours + "?user_id=" + Preference.get("userId"));
        fetch(constants.BarberWorkingHours + "?user_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseworkinghours-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    let worddays = response.Data.working_days;
                    let setWorkDays = [];
                    for (let i = 0; i < 7; i++) {
                        if (worddays[i] === "Mon"
                            || worddays[i] === "Tue"
                            || worddays[i] === "Wed"
                            || worddays[i] === "Thurs"
                            || worddays[i] === "Fri"
                            || worddays[i] === "Sat"
                            || worddays[i] === "Sun") {
                            setWorkDays.push(true);
                        } else {
                            setWorkDays.push(false);
                        }
                    }
                    console.log("setWorkDays-->" + JSON.stringify(setWorkDays));

                    this.setState({workingDays: setWorkDays, isOffToday: response.Data.is_off});
                    let items = [];
                    for (i = 0; i < 7; i++) {
                        var weekDate = this.startOfWeek(new Date());
                        var newDate = weekDate.addDays(i);
                        items.push(this.renderWeekDay({k: i, d: newDate}));
                    }
                    let hours = Array.apply(null, Array(48)).map((v, i) => {
                        return {id: i, title: "Title " + i};
                    });
                    let start = response.Data.working_from;
                    let end = response.Data.working_to;
                    console.log("starttime-->" + start);
                    console.log("starttime-->" + end);
                    let startTime1 = start.split(" ");
                    let endTime1 = end.split(" ");
                    console.log("starttime-->" + startTime1[0]);
                    console.log("starttime-->" + endTime1[0]);
                    let startTime2 = startTime1[0].split(":");
                    let endTime2 = endTime1[0].split(":");

                    console.log("starttime-->" + startTime2[0]);
                    console.log("starttime-->" + endTime2[0]);
                    let dateSet = new Date();
                    dateSet.setHours(startTime2[0], startTime2[1], 0)
                    let dateSet1 = new Date();
                    dateSet1.setHours(endTime2[0], endTime2[1], 0)
                    this.setState({
                        dayData: hours,
                        dataSource: items,
                        startTime: dateSet,
                        endTime: dateSet1,
                    });
                    console.log("starttime123-->" + this.state.startTime);
                    console.log("starttime123-->" + this.state.endTime);
                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false});
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
    };

    updateWorkingHours() {
        let offDays = "";
        if (this.state.workingDays[0] === false)
            offDays += "Mon";
        if (this.state.workingDays[1] === false)
            offDays += ",Tue";
        if (this.state.workingDays[2] === false)
            offDays += ",Wed";
        if (this.state.workingDays[3] === false)
            offDays += ",Thur";
        if (this.state.workingDays[4] === false)
            offDays += ",Fri";
        if (this.state.workingDays[5] === false)
            offDays += ",Sat";
        if (this.state.workingDays[6] === false)
            offDays += ",Sun";

        if (offDays.charAt(0) === ",")
            offDays = offDays.substr(1);

        console.log("offDays--->" + JSON.stringify(offDays));
        var details = {
            user_id: Preference.get("userId"),
            working_from: this.state.startTime,
            working_to: this.state.endTime,
            is_off: this.state.isOffToday,
            off_day: offDays,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.UpdateWorkingHours, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseworkinghours-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    alert("Your working hours updated.");
                    if (Preference.get("newUser") === true)
                        this.props.navigation.push("Subscription")
                    else
                        this.props.navigation.goBack();

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

    setNotWorkingDay(val) {
        let workdays = this.state.workingDays;
        workdays[val] = false;
        this.setState({workdays: workdays});
        let items = [];
        for (i = 0; i < 7; i++) {
            var weekDate = this.startOfWeek(new Date());
            var newDate = weekDate.addDays(i);
            items.push(this.renderWeekDay({k: i, d: newDate}));
        }
        this.setState({
            dataSource: items
        });
    }

    setWorkingDay(val) {
        let workdays = this.state.workingDays;
        workdays[val] = true;
        this.setState({workdays: workdays});
        let items = [];
        for (i = 0; i < 7; i++) {
            var weekDate = this.startOfWeek(new Date());
            var newDate = weekDate.addDays(i);
            items.push(this.renderWeekDay({k: i, d: newDate}));
        }
        this.setState({
            dataSource: items
        });
    }

    dayItemClicked() {

    }

    renderWeekDay(item) {
        var week = new Array("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN");
        console.log("workingDay--->>" + this.state.workingDays[item.k]);
        if (this.state.workingDays[item.k] === true) {
            return (<View style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                    backgroundColor: item.bg
                }}>
                    <TouchableOpacity key={item.k} onPress={() => this.setNotWorkingDay(item.k)}>

                        <Image
                            style={{
                                height: 16,
                                resizeMode: "contain",
                                alignSelf: "center",
                                marginBottom: 10
                            }}
                            source={require("../../../assets/images/ic_working.png")}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.dayItemClicked(item.k)}>
                        <Text
                            style={[styles.week_day_container, {fontFamily: "AvertaStd-Thin"}]}>
                            {week[item.k]}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (<View style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                    backgroundColor: item.bg
                }}>
                    <TouchableOpacity key={item.k}
                                      onPress={() => this.setWorkingDay(item.k)}>
                        <Image
                            style={{
                                height: 16,
                                resizeMode: "contain",
                                alignSelf: "center",
                                marginBottom: 10
                            }}
                            source={require("../../../assets/images/ic_notworking.png")}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.dayItemClicked(item.k)}>
                        <Text
                            style={[styles.week_day_container, {fontFamily: "AvertaStd-Thin"}]}>
                            {week[item.k]}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    onTimeSelected = date => {
    };


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
                    <View style={{width: "50%"}}>
                        <Text style={{
                            color: "grey",
                            fontWeight: "bold",
                            fontSize: 13,
                            marginBottom: 10,
                            marginStart: 20
                        }}>{"FROM"}</Text>
                        <DatePicker
                            date={this.state.startTime}
                            style={{marginLeft: -50}}
                            minuteInterval={15}
                            onDateChange={date => this.setState({startTime: date})}
                            mode={"time"}
                            textColor={"#ffffff"}
                        />


                    </View>
                    <View style={{width: "50%"}}>
                        <Text style={{
                            color: "grey",
                            fontWeight: "bold",
                            fontSize: 13,
                            marginBottom: 10,
                            marginStart: 20
                        }}>{"TO"}</Text>

                        <DatePicker
                            date={this.state.endTime}
                            onDateChange={date => this.setState({endTime: date})}
                            minuteInterval={15}
                            mode={"time"}
                            style={{marginLeft: -50}}
                            textColor={"#ffffff"}
                        />
                    </View>


                </View>


                <View style={{flexDirection: 'row', height: 40, marginLeft: 20, marginTop: 130}}>
                    {/*<CheckBoxSquare onClick={() => {
                    }} isChecked={this.state.isOffToday} style={{alignSelf: 'center'}}/>
                    <Text style={{color: "white", textAlignVertical: "center", marginStart: 7}}>{"Off"}<Text style={
                        {color: "grey",}
                    }>{"  (Today Not Working)"}</Text></Text>*/}
                </View>


                <TouchableOpacity style={[
                    globalStyles.button,
                    {marginTop: 10, marginBottom: 10, width: "80%"}]}
                                  onPress={() => this.updateWorkingHours()}>
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
                {this.state.showLoading && <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    position: "absolute",
                    opacity: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")}
                           style={{width: 100, height: 100, opacity: 1,}}/>
                </View>}

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
