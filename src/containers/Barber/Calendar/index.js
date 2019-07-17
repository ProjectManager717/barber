import React, {Component} from "react";
import {View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image} from "react-native";

import {Header} from "react-native-elements";

import {Colors} from "../../../themes";
import {styles} from "./styles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {SafeAreaView} from "react-navigation";

var moment = require("moment");

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let getmonth = new Date().getMonth();
let getDate = new Date().getDate();
let getDay = new Date().getDay();
let getYear = new Date().getFullYear();

export default class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            showLoading: false,
            dataSource: [],
            dayData: [],
            monthDays: [],
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            listData: [
                {
                    id: 1,
                    service: "Haircut & Beard",
                    clientName: "Sergio Ramos",
                    duration: '30 mins',
                    price: '$30.00',
                    imagep: require("../../../assets/images/completed.png"),
                    imgText: "COMPLETED",
                    imgTextcolor: Colors.green,
                    bitSet: 0,
                    bgc: Colors.green,
                },
                {
                    id: 2,
                    service: "Haircut",
                    clientName: "Sir Alex Ferguson",
                    duration: '30 mins',
                    price: '$25.00',
                    imagep: require("../../../assets/images/progress.png"),
                    imgText: "IN PROGRESS",
                    imgTextcolor: Colors.purple,
                    bitSet: 0,
                    bgc: Colors.purple,
                },
                {
                    id: 3,
                    service: "Haircut, Beard & Shave",
                    clientName: "Leo Messi",
                    duration: '1 hr',
                    price: '$45.00',
                    imagep: require("../../../assets/images/confirmed.png"),
                    imgText: "CONFIRMED",
                    imgTextcolor: Colors.magenta,
                    bitSet: 1,
                    bgc: Colors.magenta,
                },
                {
                    id: 4,
                    bgc: Colors.magenta,
                },
                {
                    id: 5,
                    bitSet: 2
                },
                {
                    id: 6,
                },
                {
                    id: 7,
                    service: "Haircut & Beard",
                    clientName: "Anthony Martial",
                    duration: '30 mins',
                    price: '$30.00',
                    imagep: require("../../../assets/images/pending.png"),
                    imgText: "PENDING",
                    imgTextcolor: Colors.yellow,
                    bitSet: 0,
                    bgc: Colors.yellow,
                },
                {
                    id: 8,
                    service: "Haircut & Beard",
                    clientName: "Anthony Martial",
                    duration: '45 mins',
                    price: '$28.00',
                    imagep: require("../../../assets/images/cancelled.png"),
                    imgText: "CANCELLED",
                    imgTextcolor: Colors.red,
                    bitSet: 3,
                    bgc: Colors.red,
                },
                {
                    id: 9,
                    bgc: Colors.red
                },
                {
                    id: 10,
                    service: "Haircut & Beard",
                    clientName: "Anthony Martial",
                    duration: '30 mins',
                    price: '$30.00',
                    imagep: require("../../../assets/images/noShow.png"),
                    imgText: "NO SHOW",
                    imgTextcolor: Colors.grey,
                    bitSet: 0,
                    bgc: Colors.grey,
                },
            ],
            calenderSlots: [],
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
        let hours = Array.apply(null, Array(46)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });

        console.log("slotsData-->" + JSON.stringify(hours));
        this.setState({
            dayData: hours,
            dataSource: items
        });
        //
        //this.setState({calenderSlots:this.state.listData});


        const input = getmonth + 1 + "-19";
        const output = moment(input, "MM-YY");
        console.log("DateMonth--" + output);
        let lastDay = output.endOf('month').format('DD');
        console.log("DateMonth--" + lastDay);
        let monthh = getmonth + 1;
        if (monthh < 10)
            monthh = "0" + monthh;
        let daysData = [];
        for (let i = getDate; i <= lastDay; i++) {

            let realDate = getYear + "-" + monthh + "-" + i;
            console.log("Real_date-----> ", realDate);
            if (getDay == 1)
                daysData.push({
                    id: i,
                    day: i,
                    dayColor: "#ffffff",
                    weekDay: "Mon",
                    bottomColor: "transparent",
                    showdate: realDate
                })
            if (getDay == 2)
                daysData.push({
                    id: i,
                    day: i,
                    dayColor: "#ffffff",
                    weekDay: "Tue",
                    bottomColor: "transparent",
                    showdate: realDate
                })
            if (getDay == 3)
                daysData.push({
                    id: i,
                    day: i,
                    dayColor: "#ffffff",
                    weekDay: "Wed",
                    bottomColor: "transparent",
                    showdate: realDate
                })
            if (getDay == 4)
                daysData.push({
                    id: i,
                    day: i,
                    dayColor: "#ffffff",
                    weekDay: "Thur",
                    bottomColor: "transparent",
                    showdate: realDate
                })
            if (getDay == 5)
                daysData.push({
                    id: i,
                    day: i,
                    dayColor: "#ffffff",
                    weekDay: "Fri",
                    bottomColor: "transparent",
                    showdate: realDate
                })
            if (getDay == 6)
                daysData.push({
                    id: i,
                    day: i,
                    dayColor: "#ffffff",
                    weekDay: "Sat",
                    bottomColor: "transparent",
                    showdate: realDate
                })
            if (getDay == 7)
                daysData.push({
                    id: i,
                    day: i,
                    dayColor: "#ffffff",
                    weekDay: "Sun",
                    bottomColor: "transparent",
                    showdate: realDate
                })

            if (getDay === 7)
                getDay = 1;
            getDay++;
        }
        let mon = this.state.month[getmonth];
        this.setState({monthDays: daysData});
        this.getCalenderSlots(getYear + "-" + monthh + "-" + getDate);
        //console.log("Real_date-----> ",JSON.stringify(daysData));
        //console.log("Real_date-----> ",JSON.stringify(this.state.monthDays));
    }

    itemSelect(colorItem, item, services) {
        let endSlot = item.selected_slot_id.length - 1;
        if (colorItem !== "#DF00FF" && colorItem !== "yellow") {
            this.props.navigation.navigate("Appointments", {
                bgc: colorItem,
                client_Image: item.barber_image,
                clientName: item.barber,
                createdAt: item.createdAt,
                startTime: item.selected_slot_id[0].start_time,
                endtTime: item.selected_slot_id[endSlot].end_time,
                price: item.total_price,
                services: services
            })
        }
    }

    getCalenderSlots(datee) {
        this.state.calenderSlots = [];
        this.setState({showLoading: true})
        //let datee = this.state.selectedDate;
        console.log("URL--->" + constants.GetCalenderSlots + "?barber_id=" + Preference.get("userId") + "&date=" + datee);
        fetch(constants.GetCalenderSlots + "?barber_id=" + Preference.get("userId") + "&date=" + datee, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseCalenderSlots-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    console.log("responseCalenderSlots--->", JSON.stringify(response.Data.appointments));
                    if (response.Message === "No Appointment found against this Barber") {
                        this.setState({calenderSlots: []})
                    } else {
                        this.setState({calenderSlots: response.Data.appointments})
                    }

                    /*if (this.state.calenderSlots.length < 1) {
                        this.setState({calenderSlots: this.state.listData})
                    }*/
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            this.setState({showLoading: false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    renderItem(item) {
        console.log("renderItem--->", item.length)
        if (this.state.calenderSlots.length > 0) {
            console.log("calenderSlotslength- > 0");
            let time = item.selected_slot_id[0].start_time;
            let AM = "";
            let vtime = time.split(":");
            if (vtime[0] < 12) {
                AM = "AM";
            } else {
                AM = "PM";
            }

            var m = moment(new Date(2011, 2, 12, vtime[0], vtime[1], 0));
            var n = moment(new Date(2011, 2, 12, vtime[0], vtime[1], 0));
            var o = moment(new Date(2011, 2, 12, vtime[0], vtime[1], 0));
            //m.add(item.id * 30, "minutes");
            n.add(30, "minutes");
            o.add(item.id * 30 + 15, "minutes");
            /*bit set for */
            /*0=30mins*/
            /*1=1hour*/
            /*2=30minbreak*/
            /*3=45min*/
            let imagep = "", imgText = "", imgTextcolor = "", bgc = "";
            if (item.appointment_type === "completed") {
                imagep = require("../../../assets/images/completed.png");
                imgText = "COMPLETED";
                imgTextcolor = Colors.green;
                bgc = Colors.green;
            } else if (item.appointment_type === "inprogress") {
                imagep = require("../../../assets/images/progress.png");
                imgText = "IN PROGRESS";
                imgTextcolor = Colors.purple;
                bgc = Colors.purple;
            } else if (item.appointment_type === "confirmed") {
                imagep = require("../../../assets/images/confirmed.png");
                imgText = "CONFIRMED";
                imgTextcolor = Colors.magenta;
                bgc = Colors.magenta;
            } else if (item.appointment_type === "pending") {
                imagep = require("../../../assets/images/pending.png");
                imgText = "PENDING";
                imgTextcolor = Colors.yellow;
                bgc = Colors.yellow;
            } else if (item.appointment_type === "cancelled") {
                imagep = require("../../../assets/images/cancelled.png");
                imgText = "CANCELLED";
                imgTextcolor = Colors.red;
                bgc = Colors.red;
            } else if (item.appointment_type === "noshow") {
                imagep = require("../../../assets/images/noShow.png");
                imgText = "NO SHOW";
                imgTextcolor = Colors.grey;
                bgc = Colors.grey;
            } else {

            }
            let numberOfSlotsSlected = item.selected_slot_id.length;
            console.log("Numberof slots------>", numberOfSlotsSlected)
            let timeofSlots = numberOfSlotsSlected * 15;
            if(timeofSlots===15)
                timeofSlots=30;
            let period = "";
            if (timeofSlots < 60) {
                period = "mins";
            } else {
                period = "hr";
            }
            let servicesSelected = "";
            for (let f = 0; f < item.selected_services.length; f++) {
                if (f === item.selected_slot_id.length) {
                    servicesSelected += item.selected_services[f].name;
                } else {
                    servicesSelected += item.selected_services[f].name + ",";
                }

            }


            if (timeofSlots === 15 || timeofSlots === 30) {
                console.log("calenderSlots-time > " + timeofSlots);
                return <TouchableWithoutFeedback onPress={() => this.itemSelect(bgc, item, servicesSelected)}>
                    <View style={{height: 70, flexDirection: "row"}} cellKey={item.id}>
                        <Text style={{
                            textAlignVertical: "top",
                            height: 40,
                            marginLeft: 10,
                            marginBottom: 30,
                            width: 50,
                            fontFamily: "AvertaStd-Regular",
                            color: Colors.white,
                            fontSize: 10
                        }}>
                            {m.format("hh:mm") + " " + AM}
                        </Text>
                        <View style={{width: 6, backgroundColor: bgc}}/>
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
                                <View style={{
                                    flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
                                    width: "100%", marginStart: 20
                                }}>
                                    <View style={{flexDirection: "row",}}>
                                        <Text style={{
                                            fontWeight: "bold", color: "white",
                                            fontSize: 11
                                        }}>{servicesSelected}</Text>
                                        <Text style={{marginStart: 8, marginTop: 1, color: "white", fontSize: 10}}>
                                            {item.barber}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: "row", marginTop: 7}}>
                                        <Image source={require("../../../assets/images/chair.png")}
                                               resizeMode={"contain"}
                                               style={{
                                                   height: 12,
                                                   width: 12,
                                                   marginTop: 3

                                               }}
                                        />
                                        <Text
                                            style={{color: "#95A2B5", fontSize: 12}}>{" " + timeofSlots + period}</Text>
                                        <View style={{
                                            flexDirection: "column",
                                            width: 1, height: 13,
                                            marginTop: 3,
                                            backgroundColor: "grey",
                                            marginStart: 10,
                                            marginEnd: 10
                                        }}/>
                                        <Text style={{color: "#95A2B5", fontSize: 12}}>{" $" + item.total_price}</Text>
                                    </View>
                                </View>

                            </View>
                            <Image resizeMode={"cover"}
                                   style={{width: 60, height: "100%", position: "absolute", right: 0, top: 0}}
                                   source={imagep}
                            />
                            <Text style={{
                                color: [imgTextcolor],
                                fontSize: 7,
                                fontWeight: "bold",
                                position: "absolute",
                                right: 8,
                                bottom: 15
                            }}>{imgText}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>;
            }
            if (timeofSlots === 60) {
                console.log("calenderSlots-time > " + item.total_time);
                return <TouchableOpacity onPress={() => this.itemSelect(bgc, item, servicesSelected)}>
                    <View style={{height: 140, flexDirection: "row"}} cellKey={item.id}>
                        <View style={{flexDirection: "column"}}>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    width: 50,
                                    height: 70,
                                    fontFamily: "AvertaStd-Regular",
                                    color: Colors.white,
                                    fontSize: 10
                                }}
                            >
                                {m.format("HH:mm") + " " + AM}
                            </Text>

                            <Text
                                style={{
                                    marginLeft: 10,
                                    width: 50,
                                    fontFamily: "AvertaStd-Regular",
                                    color: Colors.white,
                                    fontSize: 10
                                }}
                            >
                                {n.format("HH:mm") + " " + AM}
                            </Text>
                        </View>

                        <View style={{width: 6, backgroundColor: bgc}}/>
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
                                <View style={{
                                    flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
                                    width: "100%", marginStart: 20
                                }}>
                                    <View style={{flexDirection: "row",}}>
                                        <Text style={{
                                            fontWeight: "bold", color: "white",
                                            fontSize: 11
                                        }}>{item.booking_title}</Text>
                                        <Text style={{marginStart: 8, marginTop: 1, color: "white", fontSize: 10}}>
                                            {item.client}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: "row", marginTop: 7}}>
                                        <Image source={require("../../../assets/images/chair.png")}
                                               resizeMode={"contain"}
                                               style={{
                                                   height: 12,
                                                   width: 12,
                                                   marginTop: 3

                                               }}
                                        />
                                        <Text style={{color: "#95A2B5", fontSize: 12}}>{" 1hr"}</Text>
                                        <View style={{
                                            flexDirection: "column",
                                            width: 1, height: 13,
                                            marginTop: 3,
                                            backgroundColor: "grey",
                                            marginStart: 10,
                                            marginEnd: 10
                                        }}/>
                                        <Text style={{color: "#95A2B5", fontSize: 12}}>{item.price}</Text>
                                    </View>
                                </View>

                            </View>
                            <Image resizeMode={"cover"}
                                   style={{width: 60, height: "100%", position: "absolute", right: 0, top: 0}}
                                   source={imagep}
                            />
                            <Text style={{
                                color: [imgTextcolor],
                                fontSize: 7,
                                fontWeight: "bold",
                                position: "absolute",
                                right: 6,
                                bottom: 37
                            }}>{imgText}</Text>
                        </View>
                    </View>

                </TouchableOpacity>;
            }
            if (timeofSlots === 0) {
                console.log("calenderSlots-time > " + item.total_time);
                return (<TouchableOpacity onPress={() => this.props.navigation.navigate("Appointments")}>
                    <View style={{height: 140, flexDirection: "row"}} cellKey={item.id}>
                        <View style={{flexDirection: "column"}}>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    width: 50,
                                    height: 70,
                                    fontFamily: "AvertaStd-Regular",
                                    color: Colors.white,
                                    fontSize: 10
                                }}
                            >
                                {m.format("HH:mm A")}
                            </Text>

                            <Text
                                style={{
                                    marginLeft: 10,
                                    width: 50,
                                    fontFamily: "AvertaStd-Regular",
                                    color: Colors.white,
                                    fontSize: 10
                                }}
                            >
                                {n.format("HH:mm A")}
                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: "grey",
                            width: "76.5%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderLeftWidth: 0.5,
                            borderLeftColor: "grey"

                        }}>
                            <Image source={require("../../../assets/images/break.png")} resizeMode={"cover"}
                                   style={{
                                       width: "100%",
                                       height: "100%",
                                   }}/>
                            <Text style={{
                                color: "white",
                                textAlign: "center",
                                position: "absolute"
                            }}>{"BREAK TIME"}</Text>
                        </View>


                    </View>
                </TouchableOpacity>);

            }
            if (timeofSlots === 45) {
                console.log("calenderSlots-time > " + item.total_time);
                return <TouchableOpacity onPress={() => this.itemSelect(bgc, item, servicesSelected)}>
                    <View style={{height: 140, flexDirection: "row"}} cellKey={item.id}>
                        <View style={{flexDirection: "column"}}>
                            <Text
                                style={{
                                    marginLeft: 10,
                                    width: 50,
                                    height: 70,
                                    fontFamily: "AvertaStd-Regular",
                                    color: Colors.white,
                                    fontSize: 10
                                }}
                            >
                                {m.format("hh:mm") + " " + AM}
                            </Text>

                            <Text
                                style={{
                                    marginLeft: 10,
                                    width: 50,
                                    fontFamily: "AvertaStd-Regular",
                                    color: Colors.white,
                                    fontSize: 10
                                }}
                            >
                                {n.format("HH:mm") + " " + AM}
                            </Text>
                        </View>
                        <View style={{height: 105, width: 6, backgroundColor: bgc}}/>
                        <View style={{
                            backgroundColor: "#454656",
                            width: "75%",
                            height: 105,
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
                                <View style={{
                                    flexDirection: "column", alignItems: "flex-start", justifyContent: "center",
                                    width: "100%", marginStart: 20
                                }}>
                                    <View style={{flexDirection: "row",}}>
                                        <Text style={{
                                            fontWeight: "bold", color: "white",
                                            fontSize: 11
                                        }}>{item.booking_title}</Text>
                                        <Text style={{marginStart: 8, marginTop: 1, color: "white", fontSize: 10}}>
                                            {item.client}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: "row", marginTop: 7}}>
                                        <Image source={require("../../../assets/images/chair.png")}
                                               resizeMode={"contain"}
                                               style={{
                                                   height: 12,
                                                   width: 12,
                                                   marginTop: 3

                                               }}
                                        />
                                        <Text style={{color: "#95A2B5", fontSize: 12}}>{" 45 mins"}</Text>
                                        <View style={{
                                            flexDirection: "column",
                                            width: 1, height: 13,
                                            marginTop: 3,
                                            backgroundColor: "grey",
                                            marginStart: 10,
                                            marginEnd: 10
                                        }}/>
                                        <Text style={{color: "#95A2B5", fontSize: 12}}>{item.price}</Text>
                                    </View>
                                </View>

                            </View>
                            <Image resizeMode={"cover"}
                                   style={{width: 60, height: "100%", position: "absolute", right: 0, top: 0}}
                                   source={imagep}
                            />
                            <Text style={{
                                color: [imgTextcolor],
                                fontSize: 7,
                                fontWeight: "bold",
                                position: "absolute",
                                right: 6,
                                bottom: 37
                            }}>{imgText}</Text>
                        </View>
                    </View>

                </TouchableOpacity>;
            }
        }

    }

    selectday(indx) {
        //alert("dayselected " + indx);
        let monthDaysData = this.state.monthDays;
        console.log("ShowDateSelected", JSON.stringify(monthDaysData[indx].showdate));
        this.setState({selectedDate: monthDaysData[indx].showdate})

        for (let s = 0; s < monthDaysData.length; s++) {
            console.log("slectDay-loop" + s);
            if (s === indx) {
                console.log("slectDay-loop-index-true" + s);
                monthDaysData[s].dayColor = "green";
                monthDaysData[s].bottomColor = "green";
            } else {
                console.log("slectDay-loop-index-false" + s);
                monthDaysData[s].dayColor = "#ffffff";
                monthDaysData[s].bottomColor = "transparent";
            }
        }
        console.log("NEWMonthdata1 ", JSON.stringify(monthDaysData));
        this.setState({monthDays: monthDaysData}, () => {
            console.log("NEWMonthdata ", JSON.stringify(this.state.monthDays));
        });
        this.getCalenderSlots(monthDaysData[indx].showdate);
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
                    {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
                </Text>
                {/*<View style={styles.calendar_weekly_header}>
                    {this.state.dataSource}
                </View>*/}
                <View style={{width: "100%", height: 60,}}>
                    <FlatList
                        data={this.state.monthDays}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                        numColumns={1}
                        horizontal={true}
                        extraData={this.state}
                        renderItem={({item, index}) => <View
                            style={{justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity style={{
                                width: "100%", justifyContent: "center",
                                alignItems: "center", height: 60, marginStart: 20, marginEnd: 20,
                                borderBottomWidth: 2,
                                borderBottomColor: item.bottomColor
                            }} onPress={() => this.selectday(index)}>
                                <Text style={{color: item.dayColor, fontSize: 15}}>{item.weekDay}</Text>
                                <Text
                                    style={{
                                        color: item.dayColor,
                                        fontWeight: "bold",
                                        fontSize: 12
                                    }}>{item.day}</Text>

                            </TouchableOpacity>
                        </View>
                        }/>
                </View>

                <View
                    style={{
                        marginLeft: 0,
                        height: 0.2, marginBottom: 20,
                        backgroundColor: Colors.lightGrey
                    }}
                />
                {(this.state.calenderSlots.length > 0) && <FlatList
                    //data={this.state.dayData}
                    data={this.state.calenderSlots}
                    extraData={this.state}
                    renderItem={({item}) => this.renderItem(item)}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />}

                {!(this.state.calenderSlots.length > 0) && <View style={{
                    width: "100%",
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={{fontSize: 16, color: "white"}}>{"There are no bookings on current date"}</Text>
                </View>}
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
}
