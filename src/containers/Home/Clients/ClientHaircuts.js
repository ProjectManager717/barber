import React, {Component} from "react";
import moment from 'moment';
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TextInput, Dimensions,
} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {Header} from "react-native-elements";
import CalendarHeader from "react-native-calendars/src/calendar/header";

const {width, height} = Dimensions.get("window");
const today = moment().format("YYYY-MM-DD");
console.log("todaydate:"+today);
export default class ClientHaircuts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text2: 'Your Message...',
            upcomingBack: "transparent",
            completeBack: "transparent",
            cancelledBack: "transparent",
            allBack: "transparent",
            upcomingtext: "grey",
            completetext: "grey",
            cancelledtext: "grey",
            alltext: "grey",
            blue:"transparent",
            red:"transparent",
            green:"transparent",




        };
        this.calenderDayClicked=this.calenderDayClicked.bind(this);
    }


    optionSelected(item) {
        if (item === "upcoming") {
            this.setState({upcomingBack: "#1999CE", upcomingtext: "white"});
            this.setState({completeBack: "transparent", completetext: "grey"});
            this.setState({cancelledBack: "transparent", cancelledtext: "grey"});
            this.setState({allBack: "transparent", alltext: "grey"});
            this.setState({blue:"#1999CE",});
            this.setState({green:"transparent"});
            this.setState({red:"transparent"});


        }
        if (item === "complete") {
            this.setState({completeBack: "#00D200", completetext: "white"});
            this.setState({upcomingBack: "transparent", upcomingtext: "grey"});
            this.setState({cancelledBack: "transparent", cancelledtext: "grey"});
            this.setState({allBack: "transparent", alltext: "grey"});
            this.setState({green:"#00D200"});
            this.setState({blue:"transparent",});

            this.setState({red:"transparent"});
        }
        if (item === "cancelled") {
            this.setState({cancelledBack: "red", cancelledtext: "white"});
            this.setState({completeBack: "transparent", completetext: "grey"});
            this.setState({upcomingBack: "transparent", upcomingtext: "grey"});
            this.setState({allBack: "transparent", alltext: "grey"});
            this.setState({red:"red"});
            this.setState({green:"transparent"});
            this.setState({blue:"transparent",});
        }
        if (item === "all") {
            this.setState({allBack: "#7131FD", alltext: "white"});
            this.setState({cancelledBack: "transparent", cancelledtext: "grey"});
            this.setState({completeBack: "transparent", completetext: "grey"});
            this.setState({upcomingBack: "transparent", upcomingtext: "grey"});
            this.setState({red:"red",green:"#00D200",blue:"#1999CE"})
        }

    }
    calenderDayClicked()
    {

    }


    render() {
        return (<View style={styles.container}>

                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "HAIRCUTS", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("QRCheckIn");
                            }}
                        >
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/qr.png")}
                            />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={{
                        flex: 1,
                        marginStart: 5,
                        marginEnd: 5,
                        height: height - 110,
                        marginTop: 20
                    }}>


                        <Calendar
                            style={styles.calendar}
                            current={today}
                            minDate={'1970-1-1'}
                            maxDate={'2050-12-31'}
                            firstDay={1}
                            onDayPress={(day) => {console.log("hello"+day)}}
                            onDayLongPress={(val) => {
                                console.log('selectedday')
                            }}

                            markedDates={{
                                '2019-05-09': {
                                    selected: true, selectedColor:this.state.red,
                                },
                                '2019-05-13': {
                                    selected: true, selectedColor:this.state.green,
                                },
                                '2019-05-22': {selected: true,selectedColor:this.state.blue},
                                today: {marked: true, dotColor: "red"},
                            }}

                            hideDayNames={true}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            theme={{
                                monthTextColor: 'red',
                                calendarBackground: Colors.themeBackground,
                                arrowColor: 'white',
                            }}
                            hideExtraDays={true}
                            disabledByDefault={true}

                        />

                        <View style={{
                            flexDirection: "row",
                            borderColor: "grey",
                            width: "90%",
                            marginStart: 15,
                            marginTop: 20,
                            height: 35,
                            alignItems: "center",
                            borderRadius: 20,
                            borderWidth: 0.5,
                        }}>
                            <TouchableOpacity onPress={() => this.optionSelected("upcoming")}
                                              style={{
                                                  marginStart: 10,
                                                  backgroundColor: this.state.upcomingBack,
                                                  borderRadius: 15,
                                                  alignItems: "center"
                                              }}
                            >
                                <Text
                                    style={{
                                        color: this.state.upcomingtext,
                                        fontSize: 10,
                                        height: 20,
                                        marginTop: 5,
                                        marginStart: 5, marginEnd: 5
                                    }}
                                >{"UPCOMING"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.optionSelected("complete")}
                                              style={{
                                                  backgroundColor: this.state.completeBack,
                                                  borderRadius: 15,
                                                  width: "20%",
                                                  marginStart: 10,
                                                  alignItems: "center"
                                         }}
                            >
                                <Text
                                    style={{
                                        color: this.state.completetext,
                                        fontSize: 10,
                                        height: 20,
                                        marginTop: 5,
                                        textAlign: "center",
                                        marginStart: 5, marginEnd: 5
                                    }}>{"COMPLETE"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.optionSelected("cancelled")}
                                              style={{
                                                  backgroundColor: this.state.cancelledBack,
                                                  borderRadius: 15,
                                                  width: "25%",
                                                  alignItems: "center",
                                                  marginStart: 10,
                                              }}
                            >
                                <Text
                                    style={{
                                        color: this.state.cancelledtext,
                                        fontSize: 10,
                                        height: 20,
                                        marginTop: 5, marginStart: 5, marginEnd: 5
                                    }}>{"CANCELLED"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.optionSelected("all")}
                                              style={{
                                                  borderRadius: 15,
                                                  backgroundColor: this.state.allBack,
                                                  width: "18%",
                                                  marginStart: 10,
                                                  alignItems: "center"
                                              }}>
                                <Text
                                    style={{
                                        color: this.state.alltext,
                                        fontSize: 10,
                                        marginEnd: 5,
                                        marginTop: 5,
                                        height: 20, marginStart: 5
                                    }}>{"ALL"}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>


            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: Colors.themeBackground
    },
    row: {
        flexDirection: 'column',
        height: 'auto',
        marginTop: 4,
        marginLeft: 18,
        marginRight: 18,
        marginBottom: 10
    },
    txtHeader: {
        color: Colors.lightGrey,
        marginTop: 16,
        marginBottom: 4,
        marginLeft: 30,
        fontSize: 12,
        fontFamily: "AvertaStd-Regular"
    },
    leftIcon: {
        height: 16,
        width: 16,
        marginLeft: 8,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    row_title: {
        color: Colors.white,
        marginTop: 5,
        marginLeft: 10,
        alignSelf: 'center',
        fontFamily: "AvertaStd-Regular"
    },
    right_arrow: {
        position: 'absolute',
        right: 14,
        alignSelf: 'center',
        height: 9,
        width: 5,
        tintColor: 'white'
    }
});