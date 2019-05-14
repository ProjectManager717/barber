import React, {Component} from "react";
import {View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image} from "react-native";

import {Header} from "react-native-elements";

import {Colors} from "../../../themes";
import {styles} from "./styles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";

var moment = require("moment");

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            dayData: [],
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
        this.getCalenderSlots();
    }

    itemSelect(colorItem, item) {
        if (colorItem !== "#DF00FF" && colorItem !== "yellow") {
            this.props.navigation.navigate("Appointments", {
                bgc: colorItem,
                clientName: item.client,
                createdAt:item.createdAt,
                startTime:item.time_from,
                endtTime:item.time_to,
                price:item.price,
                services:item.booking_title
            })
        }
    }

    getCalenderSlots() {
        this.state.calenderSlots = [];
        console.log("userID" + Preference.get("userId"));
        fetch(constants.GetCalenderSlots + "?user_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseCalenderSlots-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({calenderSlots: response.Data})
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            console.error('Errorr:', error);
        });
    }

    renderItem(item) {
        let time = item.time_from;
        let AM = "";
        if (time.indexOf("am") > -1) {
            time = time.split("am");
            AM = "AM";
        } else {
            time = time.split("pm");
            AM = "PM";
        }

        let vtime = time[0].split(":");
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
        if (item.booking_type === "Completed") {
            imagep = require("../../../assets/images/completed.png");
            imgText = "COMPLETED";
            imgTextcolor = Colors.green;
            bgc = Colors.green;
        } else if (item.booking_type === "In Progress") {
            imagep = require("../../../assets/images/progress.png");
            imgText = "IN PROGRESS";
            imgTextcolor = Colors.purple;
            bgc = Colors.purple;
        } else if (item.booking_type === "Confirmed") {
            imagep = require("../../../assets/images/confirmed.png");
            imgText = "CONFIRMED";
            imgTextcolor = Colors.magenta;
            bgc = Colors.magenta;
        } else if (item.booking_type === "Pending") {
            imagep = require("../../../assets/images/pending.png");
            imgText = "PENDING";
            imgTextcolor = Colors.yellow;
            bgc = Colors.yellow;
        } else if (item.booking_type === "Cancelled") {
            imagep = require("../../../assets/images/cancelled.png");
            imgText = "CANCELLED";
            imgTextcolor = Colors.red;
            bgc = Colors.red;
        } else if (item.booking_type === "No Show") {
            imagep = require("../../../assets/images/noShow.png");
            imgText = "NO SHOW";
            imgTextcolor = Colors.grey;
            bgc = Colors.grey;
        } else {

        }
        if (item.total_time === "30") {
            return <TouchableWithoutFeedback onPress={() => this.itemSelect(bgc, item)}>
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
                                    }}>{item.booking_title}</Text>
                                    <Text style={{marginStart: 8, marginTop: 1, color: "white", fontSize: 10}}>
                                        {item.client}
                                    </Text>
                                </View>
                                <View style={{flexDirection: "row", marginTop: 7}}>
                                    <Image source={require("../../../assets/images/chair.png")} resizeMode={"contain"}
                                           style={{
                                               height: 12,
                                               width: 12,
                                               marginTop: 3

                                           }}
                                    />
                                    <Text style={{color: "#95A2B5", fontSize: 12}}>{item.total_time + " mins"}</Text>
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
                            right: 8,
                            bottom: 15
                        }}>{imgText}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>;
        }
        if (item.total_time === "60") {
            return <TouchableOpacity onPress={() => this.itemSelect(bgc, item)}>
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
        if (item.total_time === "break") {
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
        if (item.total_time === "45") {
            return <TouchableOpacity onPress={() => this.itemSelect(bgc, item)}>
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
                    {monthNames[new Date().getMonth() + 1]} {new Date().getFullYear()}
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
                    //data={this.state.dayData}
                    data={this.state.calenderSlots}
                    renderItem={({item}) => this.renderItem(item)}
                    numColumns={1}
                    keyExtractor={(item, index) => index}
                />


            </View>
        );
    }
}
