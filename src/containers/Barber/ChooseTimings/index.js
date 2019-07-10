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
            daysData: [],
            workingDays: [],
            startTime: new Date(),
            endTime: new Date(),
            chosenDate: new Date(),
            isOffToday: false,
            date: new Date().setHours(13, 0, 0),
            daySelected:"",
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
        console.log("url--->" + constants.BarberWorkingHours + "?user_id=" +  Preference.get("userId"));
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
                    this.setState({workingDays:response.Data.working_days});
                    //this.setWorkingDay();
                    this.setDays();
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

        let details = {
            barber_id:Preference.get("userId"),
            working_days:this.state.workingDays
        };
        this.setState({showLoading:true});
        fetch(constants.UpdateWorkingHours, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseworkinghours-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading:false})
                    alert("Your working hours updated.");
                    if (Preference.get("newUser") === true)
                        this.props.navigation.push("Subscription")
                    else
                        this.props.navigation.goBack();

                } else {
                    this.setState({showLoading:false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading:false})
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
        console.log("OutPutData::",details);
    }

    setNotWorkingDay(val) {
        let workdays=this.state.workingDays;
        workdays[val].is_off=true;
        this.setState({workingDays:workdays})
        let items = [];
        for (i = 0; i < 7; i++) {
            items.push(this.renderWeekDay({k: i}));
        }
        this.setState({
            dataSource: items
        });
        console.log("SortedArray::",JSON.stringify(this.state.workingDays));
    }

    setDays()
    {
        console.log("WorkingDays-->--->"+this.state.workingDays.length)
        let items = [];
        for (i = 0; i < 7; i++) {
            items.push(this.renderWeekDay({k: i}));
        }
        this.setState({dataSource: items});
        this.setTimeofDay("Mon");
    }

    setTimeofDay(day)
    {
        this.setState({daySelected:day})
        let workingdayz=this.state.workingDays;
        for(let j=0;j<7;j++)
        {
            if(day===workingdayz[j].day)
            {
                let startTime=workingdayz[j].working_from;
                let startTime1=startTime.split(":");
                console.log("SetTime Splited time:::-->"+startTime1);
                let startimeDay=this.state.startTime;
                startimeDay.setHours(startTime1[0]);
                startimeDay.setMinutes(startTime1[1]);
                this.setState({startTime:startimeDay})
                console.log("SetTime:::-->"+startTime1);

                let endTime=workingdayz[j].working_to;
                let endTime1=endTime.split(":");
                console.log("SetTime Splited time:::-->"+endTime1);
                let endtimeDay=this.state.endTime;
                endtimeDay.setHours(endTime1[0]);
                endtimeDay.setMinutes(endTime1[1]);
                this.setState({endTime:endtimeDay})
                console.log("SetTime:::-->"+this.state.endTime);
            }

        }

    }

    setWorkingDay(val) {
        let workdays=this.state.workingDays;
        workdays[val].is_off=false;
        this.setState({workingDays:workdays})
        let items = [];
        for (i = 0; i < 7; i++) {
            items.push(this.renderWeekDay({k: i}));
        }
        this.setState({
            dataSource: items
        });
    }

    dayItemClicked(index) {
        if(index===0)
        {
            this.setTimeofDay("Mon");
        }
        if(index===1)
        {
            this.setTimeofDay("Tue");
        }
        if(index===2)
        {
            this.setTimeofDay("Wed");
        }
        if(index===3)
        {
            this.setTimeofDay("Thurs");
        }
        if(index===4)
        {
            this.setTimeofDay("Fri");
        }
        if(index===5)
        {
            this.setTimeofDay("Sat");
        }
        if(index===6)
        {
            this.setTimeofDay("Sun");
        }

    }

    renderWeekDay(item) {
        var week = new Array("MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN");
        let workingdayz=this.state.workingDays;
        console.log("workingDay--->>" + workingdayz[item.k]);
        if (workingdayz[item.k].is_off === false) {
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

    setTimeStart(date)
    {
        let workdays=this.state.workingDays;
        this.setState({startTime: date});
        for(let h=0;h<7;h++)
        {
            if(this.state.daySelected===workdays[h].day)
            {
                workdays[h].working_from=date.getHours()+":"+date.getMinutes();
            }
        }
        console.log("TimeSetAfter:",JSON.stringify(this.state.workingDays));
    }

    setTimeEnd(date)
    {
        let workdays=this.state.workingDays;
        this.setState({endTime: date});
        for(let h=0;h<7;h++)
        {
            if(this.state.daySelected===workdays[h].day)
            {
                workdays[h].working_to=date.getHours()+":"+date.getMinutes();
            }
        }
        console.log("TimeSetAfter:",JSON.stringify(this.state.workingDays));
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
                            onDateChange={date => this.setTimeStart(date)}
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
                            onDateChange={date => this.setTimeEnd(date)}
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
