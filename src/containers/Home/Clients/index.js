import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    ScrollView,
    Switch,
    Linking
} from "react-native";
import firebase from 'react-native-firebase'

var moment = require("moment");
import { Header, AirbnbRating } from "react-native-elements";

import { Colors } from "../../../themes";
import { styles } from "./styles";
import { globalStyles } from "../../../themes/globalStyles";
import ClientQR from "../../Settings/ClientQR";
import Preference from "react-native-preference";
import { constants } from "../../../utils/constants";
import { SafeAreaView } from "react-navigation";

let getmonth = new Date().getMonth();
getmonth = parseInt(getmonth) + 1;
if (parseInt(getmonth) < 10)
    getmonth = "0" + getmonth;
let getDate = new Date().getDate();
if (parseInt(getDate) < 10)
    getDate = "0" + getDate;

let getYear = new Date().getFullYear();
export default class ClientHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            dataSource: [],
            dataSource2: [],
        }
    }

    async componentDidMount(): void {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", payload => {
            this.getRecentBookings();
        });
        //this.getRecentBookings();
        this.checkPendingReviews();

        this.initDeepLinking()
    }

    initDeepLinking() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                if (url) {
                    this.navigate(url);
                }
            })
        }

        Linking.addEventListener('url', this.handleOpenURL);
        firebase.links().getInitialLink().then(url => {
            console.log('initDeepLinking-getInitialLink', JSON.stringify(url))
            if (url) {
                this.navigate(url);
            }
        })
        this.firebaseUniversalLinking = firebase.links().onLink(url => {
            console.log('initDeepLinking-firebase', JSON.stringify(url))
            if (url) {
                this.navigate(url);
            }
        })
    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    }

    navigate = (url) => {
        const { navigate } = this.props.navigation;

        console.log("Deep linking1: " + JSON.stringify(url))

        const route = url.replace('clypr://', '');
        console.log("Deep linking2: " + JSON.stringify(route))
        const params = route.split('/')
        console.log("Deep linking3: " + JSON.stringify(params))

        if (params[0] == 'profile') {
            navigate({
                routeName: 'Profile',
                params: {
                    id: params[1],
                    isShared: true,
                }
            })
        }
    }

    componentWillUnmount(): void {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    checkPendingReviews() {
        console.log("CPReviewsResponse-->", "-" + "Inside");
        //this.setState({showLoading: true});
        var details = {
            client_id: Preference.get("userId")
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("CPReviewsResponse-->", "-" + JSON.stringify(details));
        fetch(constants.ClientPendingReviews, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("CPReviewsResponse-->", "-" + JSON.stringify(response));
                this.setState({ showLoading: false });
                if (response.ResultType === 1) {
                    if (!response.Data.Review_Status) {
                        this.props.navigation.push("ClientLeaveReview", {
                            barber_id: response.Data.Barber_ID,
                            client_id: response.Data.Client_ID,
                            appointmentId: response.Data.Appointment_ID,
                            appointmentPrice: response.Data.Total_Prize
                        })
                    }

                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
                this.setState({ showLoading: false });
                //console.error('Errorr:', error);
                console.log('CPReviewsResponse Error:', error);
                //alert("Error: " + error);
            });
    }

    getDateTime = (item) => {
        // 2020-01-06 07:00
        const date = item.date.split('T')

        if (date.length > 0) {
            if (item.selected_slot_id[0]?.start_time) {
                dateString = date[0] + ' ' + item.selected_slot_id[0]?.start_time
                return moment(dateString, 'YYYY-MM-DD HH:mm')
            }
        }

        return null;
    }

    getRecentBookings() {
        this.setState({ showLoading: true });
        fetch(constants.ClientRecentBookings + "?client_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getRecentBookings-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    //this.setState({showLoading: false});
                    const data = response.Data

                    // Function used to determine the order of the elements. It is expected to return
                    // a negative value if first argument is less than second argument, zero if they're equal and a positive
                    // value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
                    // [11,2,22,1].sort((a, b) => a - b)

                    data.sort((a, b) => {
                        // 2020-01-06 07:00

                        const aDate = this.getDateTime(a)
                        const bDate = this.getDateTime(b)

                        if (aDate && bDate) {
                            if (aDate.isAfter(bDate)) {
                                return -1
                            } else if (aDate.isBefore(bDate)) {
                                return 1
                            } else {
                                0
                            }
                        } else {
                            if (aDate) {
                                return -1
                            } else {
                                return 1
                            }
                        }
                    })

                    this.setState({ dataSource: data });
                    this.getFavoriteBarbers();
                } else {
                    this.setState({ showLoading: false });
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
                this.setState({ showLoading: false });
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });
    }

    getFavoriteBarbers() {
        fetch(constants.ClientFavoritBarbers + "?client_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getFavoriteBarbers-->", "-" + JSON.stringify(response));
                this.setState({ showLoading: false });
                if (response.ResultType === 1) {
                    this.setState({ dataSource2: response.Data });
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
                this.setState({ showLoading: false });
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });
    }

    checkTodayAppointment() {
        //getmonth = parseInt(getmonth) + 1;
        let todayDate = getYear + "-" + getmonth + "-" + getDate;
        console.log("DateComparison:::" + "===" + todayDate);
        let allbookings = this.state.dataSource;
        let hasAppoint = false;
        for (let k = 0; k < allbookings.length; k++) {
            let AppointDate = allbookings[k].date;
            let AppointType = allbookings[k].appointment_type;
            AppointDate = AppointDate.split("T");
            console.log("DateComparison:::" + AppointDate[0] + "===" + todayDate);
            console.log("DateComparison APPOINTMENT Type " + AppointType)
            if (AppointDate[0] === todayDate && allbookings[k].appointment_type === "confirmed") {
                console.log("DateComparison:  Got item::" + AppointDate[0] + "===" + todayDate);
                console.log("TYPER " + allbookings[k].appointment_type);
                this.props.navigation.navigate("ClientQR", { qr_code: allbookings[k].qr_code });
                hasAppoint = true;
                break;
            }
        }
        if (hasAppoint === false) {
            alert("No Appointment Confirmed For Today")
        }
    }

    renderRecentBookings(item, index) {
        if (item.selected_slot_id.length > 0) {
            var date = item.date;
            date = date.split("T");
            var time = item.selected_slot_id[0].start_time;
            time = time.split(":");
            var timeShow = "";
            if (time[0] < 12) {
                timeShow = time[0] + ":" + time[1] + " AM";
            } else {
                timeShow = time[0] + ":" + time[1] + " PM";
            }
            console.log("AppointmentType-->", item.appointment_type);
            if (index < 6) {
                return <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        width: "100%",
                        alignItems: "center",
                        height: 70,
                        backgroundColor: "#474857",
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: "white"
                    }}>
                    <Image resizeMode={"cover"} source={{ uri: item.barber_image }} style={{
                        marginStart: 10, height: 50, width: 50, borderRadius: 25
                    }} />
                    <View style={{ flexDirection: "column", marginStart: 10 }}>
                        <Text
                            style={{ fontSize: 15, color: "white" }}
                        >{item.barber}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Image resizeMode={"contain"} source={require("../../../assets/images/time.png")}
                                style={{ height: 12, width: 12 }} />
                            <Text style={{ fontSize: 10, color: "#939FB1", marginStart: 4 }}>{moment(timeShow, "HH:mm A").format("LT")}</Text>
                            <Image resizeMode={"contain"} source={require("../../../assets/images/date.png")}
                                style={{ height: 12, width: 12, marginStart: 12 }} />
                            <Text style={{ fontSize: 10, color: "#939FB1", marginStart: 4 }}>{date[0]}</Text>
                        </View>
                    </View>
                    {item.appointment_type === "completed" ?
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Receipt", { appointmentId: item._id })}
                            style={{
                                top: 0,
                                right: 0,
                                position: "absolute",
                                height: 26,
                                width: 75,
                                marginTop: 10,
                                marginEnd: 10,
                                alignItems: 'center',
                                justifyContent: "center",
                                borderRadius: 12,
                                borderWidth: 1, borderColor: "green",
                                backgroundColor: "#626371"
                            }}>

                            <Text style={{
                                marginTop: 3,
                                color: "white",
                                fontSize: 10,
                                width: "100%",
                                textAlign: "center",
                                fontWeight: "bold"
                            }}>{"Completed"}</Text>
                        </TouchableOpacity>
                        : item.appointment_type === "cancelled" ?
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("ReceiptCancelled", { appointmentId: item._id })}
                                style={{
                                    top: 0,
                                    right: 0,
                                    position: "absolute",
                                    height: 26,
                                    width: 75,
                                    marginTop: 10,
                                    marginEnd: 10,
                                    alignItems: 'center',
                                    justifyContent: "center",
                                    borderRadius: 12,
                                    borderWidth: 1, borderColor: "red",
                                    backgroundColor: "#626371"
                                }}>
                                <Text style={{
                                    marginTop: 3,
                                    color: "white",
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: 10,
                                    fontWeight: "bold"
                                }}>{"Canceled"}</Text>
                            </TouchableOpacity>
                            : item.appointment_type === "confirmed" ?
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("ReceiptUpcoming", { appointmentId: item._id })}
                                    style={{
                                        top: 0,
                                        right: 0,
                                        position: "absolute",
                                        height: 26,
                                        width: 75,
                                        marginTop: 10,
                                        marginEnd: 10,
                                        alignItems: 'center',
                                        justifyContent: "center",
                                        borderRadius: 12,
                                        borderWidth: 1, borderColor: "#30A4DC",
                                        backgroundColor: "#626371"
                                    }}>

                                    <Text style={{
                                        color: "white",
                                        fontSize: 10,
                                        width: "100%",
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }}>{"Confirmed"}</Text>
                                </TouchableOpacity>
                                : item.appointment_type === "inprogress" ?
                                    <TouchableOpacity
                                        style={{
                                            top: 0,
                                            right: 0,
                                            position: "absolute",
                                            height: 26,
                                            width: 75,
                                            marginTop: 10,
                                            marginEnd: 10,
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            borderRadius: 12,
                                            borderWidth: 1, borderColor: "purple",
                                            backgroundColor: "#626371"
                                        }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 10,
                                            width: "100%",
                                            textAlign: "center",
                                            fontWeight: "bold"
                                        }}>{"In-Progress"}</Text>
                                    </TouchableOpacity> : <TouchableOpacity
                                        style={{
                                            top: 0,
                                            right: 0,
                                            position: "absolute",
                                            height: 26,
                                            width: 75,
                                            marginTop: 10,
                                            marginEnd: 10,
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            borderRadius: 12,
                                            borderWidth: 1, borderColor: "grey",
                                            backgroundColor: "#626371"
                                        }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 10,
                                            width: "100%",
                                            textAlign: "center",
                                            fontWeight: "bold"
                                        }}>{"No-Show"}</Text>
                                    </TouchableOpacity>
                    }
                </View>
            }
            else {
                return false
            }
        }
    }

    renderFavBarbers(item) {
        if (item.avilabeSlot != 'Tomorrow') {
            item.avilabeSlot = moment(item.avilabeSlot, "hh:mm").format("hh:mm a");
        }
        let ratings = Math.floor(Math.random() * 5 + 1);
        return <View
            style={{
                flexDirection: 'row',
                marginTop: 10,
                width: "100%",
                alignItems: "center",
                height: 150,
                borderRadius: 30,
            }}>
            <ImageBackground source={{ uri: item.banner_image }}
                style={{ width: "100%", height: "100%", borderRadius: 7, overflow: 'hidden', borderWidth: 1, borderColor: "#84858f" }}>
                <View style={{ flexDirection: "row", width: "100%", height: "100%", }}>

                    <View style={{
                        flexDirection: "column",
                        width: "60%",
                        height: "100%",
                        marginTop: 75,
                        marginStart: 10

                    }}>
                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: "#454656",
                            borderRadius: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: "darkgrey",
                            opacity: 0.8
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                textShadowColor: "black",
                                textShadowOffset: { width: -2, height: 1 },
                                textShadowRadius: 3,
                                color: Colors.white,
                                marginStart: 10,
                                width: "90%",
                                textAlign: "left",
                            }}>{item.barber_name}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: "#454656",
                            borderRadius: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: "darkgrey",
                            opacity: 0.8
                        }}>
                            <Image source={require("../../../assets/images/shop.png")} resizeMode={"contain"}
                                style={{ width: 20, height: 20 }} />
                            <Text style={{
                                fontSize: 12, color: Colors.white,
                                textShadowColor: "black",
                                textShadowOffset: { width: -2, height: 1 },
                                textShadowRadius: 3,
                            }}>{item.shop_name}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: "#454656",
                            borderRadius: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: "darkgrey",
                            opacity: 0.8
                        }}>
                            <AirbnbRating
                                showRating={false}
                                count={5}
                                defaultRating={item.average_rating}
                                size={10}
                                style={{ marginStart: 10, height: 30 }}
                            />
                            <Text style={{
                                marginStart: 5, fontSize: 10, color: Colors.white,
                                textShadowColor: "black",
                                textShadowOffset: { width: -2, height: 1 },
                                textShadowRadius: 3,
                            }}>{"(" + item.total_reviews + " Reviews)"}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "column", width: "40%", height: "100%" }}>
                        <View style={{ alignItems: "flex-end", marginEnd: 20 }}>

                            <Image resizeMode={"contain"} source={require("../../../assets/images/star.png")}
                                style={{ width: 20, height: 20, marginTop: 10 }} />
                            {item.mobilePayEnabled &&
                                <Image resizeMode={"contain"} source={require("../../../assets/images/price.png")}
                                    style={{ width: 20, height: 20, marginTop: 10 }} />}
                            {!item.mobilePayEnabled &&
                                <Image resizeMode={"contain"} style={{ width: 20, height: 20, marginTop: 10 }} />}
                            <TouchableOpacity
                                onPress={() => { /*  Linking.openURL('http://appcrates.net/barber/profile/'+item.barber_id) */
                                this.props.navigation.push("ClientBarberProfile", {
                                    barberId: item.barber_id,
                                    barberRating: item.average_rating,
                                    barberReviews: item.total_reviews,
                                    barberMobilePay: item.mobilePayEnabled
                                })
                                
                            }}
                                style={{ width: "100%", alignItems: "flex-end" }}>
                                <View style={{
                                    marginTop: 20,
                                    flexDirection: "row",
                                    width: "95%",
                                    backgroundColor: "white",
                                    height: 27,
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{ marginStart: 5, fontSize: 10, color: "red" }}>{"Next Available"}</Text>
                                    <Image resizeMode={"contain"}
                                        source={require("../../../assets/images/nextarrow.png")}
                                        style={{ width: 8, height: 8, marginStart: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <View style={{
                                marginTop: 2,
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "red",
                                opacity: 0.9,
                                height: 27,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ fontSize: 12, color: "white" }}>{item.avilabeSlot}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: "light-content" }}
                    barStyle="light-content" // or directly
                    style={{ backgroundColor: "yellow" }}
                    outerContainerStyles={{ backgroundColor: "#1999CE" }}
                    leftComponent={
                        <TouchableOpacity
                            onPress={() =>
                                this.checkTodayAppointment()
                            }
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

                    centerComponent={{ text: "WELCOME", style: { color: "#fff" } }}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <ScrollView>
                    <View>
                        <Text style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginStart: 20,
                            marginTop: 20
                        }}>{"Recent Bookings"} </Text>
                    </View>
                    <View style={{ marginTop: 0, marginStart: 20, marginEnd: 20 }}>
                        {(this.state.dataSource.length > 0) &&
                            <FlatList renderItem={({ item, index }) => this.renderRecentBookings(item, index)}
                                data={this.state.dataSource}
                                keyExtractor={(item, index) => index}
                                numColumns={1}
                            />}

                        {!(this.state.dataSource.length > 0) &&
                            <View style={{ width: "100%", height: 80, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 15, color: "white" }}>{"You don't have any recent Bookings yet"}</Text>
                            </View>}

                    </View>
                    <View>
                        <Text style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginStart: 20,
                            marginTop: 20,

                        }}>{"Favorite Barbers"} </Text>
                    </View>

                    <View style={{ marginTop: 0, marginStart: 20, marginEnd: 20, marginBottom: 20 }}>
                        {(this.state.dataSource2.length > 0) &&
                            <FlatList renderItem={({ item }) => this.renderFavBarbers(item)}
                                data={this.state.dataSource2}
                                keyExtractor={(item, index) => index}
                                numColumns={1}
                            />}

                        {!(this.state.dataSource2.length > 0) &&
                            <View style={{ width: "100%", height: 80, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: "white",
                                    textAlign: "center"
                                }}>{"You don't have any Favorite barbers yet \n Search and find your favorite barber!"}</Text>
                            </View>}
                    </View>
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
                        style={{ width: 60, height: 60, opacity: 1, }} />
                </View>}
            </View>

        )
    }
}
