import React, {Component} from "react";
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Linking,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Header from "../../../components/Header";
import {ScrollView} from "react-native-gesture-handler";
import colors from "../../../themes/colors";
import CheckBoxSquare from "../../../components/CheckBox";
import {Colors} from "../../../themes";
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {AirbnbRating} from "react-native-elements";
import {isIPhoneX} from '../../../utils/Dimensions';
import {NavigationActions, StackActions} from "react-navigation";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const {height, width} = Dimensions.get("window");
var moment = require("moment");
let Policy = "By booking now, you are \n" +
    "agreeing to be charged 25% if you cancel 30 minutes prior to your appointment and \n" +
    "also agreeing to be charged 50% of your total if you are a No-Show.";

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
let getmonth = new Date().getMonth();
let getmonthh = new Date().getMonth();
let getDate = new Date().getDate();
let getDay = new Date().getDay();
let getYear = new Date().getFullYear();
console.log("todayDate::", getmonthh + 1 + "-" + getDate + "-" + getYear);
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
getmonthh = 1 + getmonthh;
console.log("todayDate::", getmonthh);
if (getmonthh < 10)
    getmonthh = "0" + getmonthh;

if (getDate < 10)
    getDate = "0" + getDate;
console.log("todayDate::", getmonthh + "-" + getDate + "-" + getYear);
let barberId = 0;


let barberMobilePay = false;
export default class ClientBarberProfile extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        barberId = navigation.getParam('barberId');
        let barberRating = navigation.getParam('barberRating');
        let barberReviews = navigation.getParam('barberReviews');
        barberMobilePay = navigation.getParam('barberMobilePay');
        this.state = {
            isConnected: true,
            showLoading: false,
            selectedMonth: "",
            showMonth: "",
            barberProfileImage: "",
            barberInsta: "",
            barberName: "",
            barberShopName: "",
            stripeActive: false,
            barberRating: barberRating,
            barberReviews: barberReviews,
            barberImages: [],
            barberServices: [],
            barberTimeSlots: [],
            barberTotalAmout: 0,
            selectedCardNum: "",
            selectedCardImage: "Visa",
            barberFav: false,
            barberMobilePay: "",
            //barberData:undefined,
            dataSource: [],
            monthSet: undefined,
            monthDays: [],
            surgePriceSelected: false,
            serviceTypeSelected: false,
            serviceDaySelected: true,
            serviceTimeSelected: false,
            totalPriceService: 0,
            selectedServices: [],
            Barberbanner: "",
            totalServicesTime: 0,
            selectedDate: "",
            selectedSlotTime: "",
            selectedSlotIds: [],
            buttonPayText: "Pay",
            mobilePayActivation: false,
            SelectedCard: "",
            addTip: true,
            percentPrice: 0,
            dayData: [
                {
                    id: 1,
                    time: "10:00AM",
                    selected: "transparent",
                    surgePrice: true,
                }, {
                    id: 2,
                    time: "10:30AM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 3,
                    time: "11:00AM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 4,
                    time: "11:30AM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 5,
                    time: "12:00PM",
                    selected: "transparent",
                    surgePrice: false,
                }, {
                    id: 6,
                    time: "12:30AM",
                    selected: "transparent",
                    surgePrice: false,
                }],
            savedCard: [],
            DialogVisible: false,
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            ListData: [
                {
                    id: 1,
                    imagePath: require('../../../assets/images/vp2.png')
                },
                {
                    id: 2,
                    imagePath: require('../../../assets/images/vp2.png')
                },
                {
                    id: 3,
                    imagePath: require('../../../assets/images/vp2.png')
                }],
            ListData2: [],
            showFullImage: false,
            clientLogin: false
        }
    }

    rightAction() {
        //this.props.navigation.navigate('BarberEditProfile');
        //this.props.navigation.push('Share');
        if (this.state.clientLogin) {
            Share.share({message: "Share Profile"}).then(result => {
            }).catch(errorMessage => console.log(errorMsg));
        } else {
            Alert.alert("Authentication", "Please login to share the details.")

        }

    }

    leftAction() {
        this.props.navigation.goBack();
    }

    componentDidMount() {
        this.setState({clientLogin: Preference.get('clientlogin')}, () => {
            console.log("clientLogin", this.state.clientLogin)
        })

        let items = [];
        for (let i = 0; i < 7; i++) {
            var weekDate = this.startOfWeek(new Date());
            var newDate = weekDate.addDays(i);
            items.push(this.renderWeekDay({k: i, d: newDate}));
        }
        let hours = Array.apply(null, Array(46)).map((v, i) => {
            return {id: i, title: "Title " + i};
        });
        console.log("slotsData-->" + JSON.stringify(hours));
        /*this.setState({
            dayData: hours,
            dataSource: items
        });*/
        this.setState({
            dataSource: items, showFullImage: false,
        });
        ////////////////////////////////////////////////////////////////////Calender
        //this.setMonthDays(getmonthh, getYear);
        this.setMonth();
    }

    startOfWeek(date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    itemSelect(indx) {
        //alert("index-"+indx);
        let dataDay = this.state.barberTimeSlots;
        for (let i = 0; i < dataDay.length; i++) {
            if (i === indx) {
                dataDay[indx].slot_detail.selected = "green";
                this.setState({selectedSlotTime: dataDay[indx].slot_detail._id})
                if (dataDay[indx].surge_price === true) {
                    this.setState({surgePriceSelected: true})
                } else {
                    this.setState({surgePriceSelected: false})
                }
            } else {
                dataDay[i].slot_detail.selected = "transparent";
            }
        }
        console.log("SurgePriceSelected-" + this.state.surgePriceSelected)
        this.setState({dayData: dataDay, serviceTimeSelected: true});
        this.checkSlotsAvailability(dataDay[indx].slot_detail._id);
    }

    renderWeekDay(item) {
        let bottomLine = "";
        let bottomLineHeight = "";
        var mDate = moment(item.d);
        var week = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");

        var date1 = moment(item.d).format("YYYY-MM-DD");
        var date2 = moment(new Date()).format("YYYY-MM-DD");

        var currentStyle = {};


        if (date1 === date2) {
            currentStyle = {color: Colors.green};
            bottomLine = Colors.green;
            bottomLineHeight = 2;
        } else {
            bottomLine = Colors.grey;
            bottomLineHeight = 0.5;
        }
        return (
            <View
                key={item.k}
                style={{
                    justifyContent: "center",
                    flexDirection: "column",
                    flex: 1,
                }}>
                <Text style={[styles.week_day_container, currentStyle]}>
                    {week[item.k]}
                </Text>
                <Text
                    style={[
                        styles.week_day_container,
                        {color: Colors.grey1},
                        currentStyle
                    ]}>
                    {mDate.format("DD")}
                </Text>
                <View style={{height: bottomLineHeight, width: "100%", backgroundColor: bottomLine, marginTop: 5}}/>

            </View>
        );
    }


    addFavoriteBarber() {
        var details = {
            user_id: barberId,
            client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.ClientAddFavoriteBarber, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {
                console.log("ClientAddFavoriteBarber-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})

                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    removeFavoriteBarber() {
        var details = {
            user_id: barberId,
            client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.ClientRemoveFavoriteBarber, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {
                console.log("ClientAddFavoriteBarber-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})

                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})

            console.log('Error:', error);
            alert("Error: " + error);
        });
    }


    getDaySlots(dateDay) {
        console.log("getBarberDetails barberID-->" + barberId);
        console.log("getBarberDetails barberID-->" + dateDay);
        var details = {
            barber_id: barberId,
            check_date: dateDay,
            //client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.getDaySlots, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {

                console.log("gettingDaySlots-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    let barberData = response.Data;

                    this.setState({
                        barberTimeSlots: barberData.slots,
                    }, () => {
                    });
                    //this.setState({barberData: response.Data});
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    getBarberDetails(dateDay) {
        let totalPr = 0
        if (this.state.totalPriceService > 0) {
            totalPr = this.state.totalPriceService;
        } else {
            totalPr = 0
        }
        console.log("getBarberDetails barberID-->" + barberId);
        console.log("getBarberDetails barberID-->" + dateDay);
        var details = {
            barber_id: barberId,
            check_date: dateDay,
            client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.ClientBarbersProfileSlots, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBarbersProfileSlots-->", "-" + JSON.stringify(response));

                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    let barberData = response.Data;
                    if (barberData.favorite_bit === 0)
                        this.setState({barberFav: false})
                    else
                        this.setState({barberFav: true})


                    this.setState({
                        barberProfileImage: {uri: barberData.user_image},
                        barberInsta: barberData.username,
                        barberName: barberData.firstname + " " + barberData.lastname,
                        barberShopName: barberData.shop_name,
                        ListData: barberData.portoflios,
                        //ListData2: barberData.services,
                        barberTimeSlots: barberData.slots,
                        barberRating: barberData.average_rating,
                        barberReviews: barberData.total_reviews,
                        barberTotalAmout: 0,
                        totalPriceService: totalPr,
                        stripeActive: barberData.stripe_active,
                        barberMobilePay: barberData.payment_option,
                        Barberbanner: {uri: barberData.banner_image},
                        mobilePayActivation: barberData.mobile_pay_activation,
                        savedCard: barberData.card_list
                    }, () => {
                        console.log("stripeActiveCheck:", this.state.stripeActive)
                        // console.log("SavedCards:", this.state.savedCard)
                        if (this.state.ListData2.length < 1) {
                            this.setState({ListData2: barberData.services})
                        }
                    });


                    let PortfolioImages = this.state.ListData;
                    for (let i = 0; i < PortfolioImages.length; i++) {
                        console.log("ImagesDataURl", PortfolioImages[i].portfolio_image);
                        PortfolioImages[i].portfolio_image = constants.portfolioImagePath + PortfolioImages[i].portfolio_image;
                    }
                    this.setState({ListData: PortfolioImages})
                    //this.setState({barberData: response.Data});

                    if (this.state.barberMobilePay === "mobilePay") {
                        this.setState({buttonPayText: "PAY"}, () => {
                            if (this.state.mobilePayActivation) {
                                this.setState({buttonPayText: "PAY"})
                            } else {
                                this.setState({buttonPayText: "RESERVE"})
                            }
                        })
                    } else {
                        this.setState({buttonPayText: "RESERVE"})
                    }


                    console.log("Slotsdata::", this.state.barberTimeSlots);
                    //this.setState({barberData: response.Data});
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})

            console.log('Error:', error);
            //alert("Error: " + error);
        });
    }

    bookApointmentCard(data) {
        let surgeP = 0;
        let totalP = this.state.totalPriceService
        if (this.state.surgePriceSelected) {
            surgeP = totalP / 2;
        } else {
            surgeP = 0;
        }
        this.setState({showLoading: true});
        var details = {
            client_id: Preference.get("userId"),
            barber_id: barberId,
            selected_services: this.state.selectedServices,
            date: this.state.selectedDate,
            selected_slot_id: this.state.selectedSlotIds,
            total_price: this.state.totalPriceService + surgeP,
            service_fee: "2.00",
            tip_price: this.state.percentPrice,
            selected_surge_price: false,
            cus_stripe_id: data.cus_stripe_id,
            transaction_id: data.transaction_id,
            balance_transaction: data.balance_transaction,
            destination: data.destination,
            destination_payment: data.destination_payment,
            source_transaction: data.source_transaction,
            payment_date: data.date,
            payment_created: data.created,
            charge_id:data.charge_id
        };
        console.log("Outputdata::::" + JSON.stringify(details));
        fetch(constants.ClientBookAppointment, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details),
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBookAppointment-->", "-" + JSON.stringify(response));
                this.setState({showLoading: false})
                if (response.ResultType === 1) {
                    this.props.navigation.navigate("ClientTabNavigator");
                    /*   this.props.navigation.navigate('ClientLeaveReview', {
                           client_id: Preference.get("userId"),
                           barber_id: barber_id,
                           barberImage: barberImage,
                           barberName: barberName,
                           barberShopName: barberShopName,
                           appointmentPrice: appointmentPrice,
                           selected_services: selected_services,
                           date: date,
                           selected_slot_id: selected_slot_id,
                           total_price: total_price,
                           service_fee: "1",
                           selected_surge_price: false,
                           appointmentId: response.Data._id
                       });*/
                } else {
                    if (response.ResultType === 0) {
                        Alert.alert("Error", response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})

            console.log('Error:', error);
            //alert("Error: " + error);
        });
    }

    bookApointment() {
        let surgeP = 0;
        let totalP = this.state.totalPriceService
        if (this.state.surgePriceSelected) {
            surgeP = totalP / 2;
        } else {
            surgeP = 0;
        }
        this.setState({showLoading: true});
        var details = {
            client_id: Preference.get("userId"),
            barber_id: barberId,
            selected_services: this.state.selectedServices,
            date: this.state.selectedDate,
            selected_slot_id: this.state.selectedSlotIds,
            total_price: this.state.totalPriceService + surgeP,
            service_fee: "2.00",
            tip_price: this.state.percentPrice,
            selected_surge_price: false,
            cus_stripe_id: "",
            transaction_id: "",
            balance_transaction: "",
            destination: "",
            destination_payment: "",
            source_transaction: "",
            payment_date: "",
            payment_created: ""
        };
        console.log("Outputdata::::" + JSON.stringify(details));
        fetch(constants.ClientBookAppointment, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details),
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBookAppointment-->", "-" + JSON.stringify(response));
                this.setState({showLoading: false})
                if (response.ResultType === 1) {

                    this.props.navigation.navigate('ClientTabNavigator',);
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})

            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    checkSlotsAvailability(id) {
        console.log("checkSlots -Availability:", "---inside")
        //let selectedslot = this.state.selectedSlotTime;
        let totalslots = this.state.barberTimeSlots;
        //console.log("checkSlots -Availability:", "---selectedSlot-->" + id)
        //console.log("checkSlots -Availability:", "---AllSlot-->" + JSON.stringify(totalslots))
        let calculateTotalTimeforSlots = this.state.totalServicesTime;
        //console.log("checkSlots -Availability:", "------calculateTotalTimeforSlots-" + calculateTotalTimeforSlots);
        let totalSlotsNeeded = Math.ceil(calculateTotalTimeforSlots / 15);
        //console.log("checkSlots -Availability:", "------totalSlotsNeeded-" + totalSlotsNeeded);
        let availSlots = 0;
        let totalSelectedSlotsIds = [];
        for (let i = 0; i < totalslots.length; i++) {
            //console.log("checkSlots -Availability:", i + "------inside loop-" + id + "===" + totalslots[i].slot_detail._id);
            if (id === totalslots[i].slot_detail._id) {
                for (let j = 0; j < totalSlotsNeeded; j++) {
                    console.log("checkSlotsss -Availability--:", i + j + "--*********--" + totalslots.length);
                    if ((i + j) > totalslots.length - 1) {
                        Alert.alert("Check Service Time!", "Selected service time exceeds shop time.")
                    } else {
                        if (totalslots[i + j].slot_status === 0) {
                            console.log("checkSlots -Availability:", i + "----" + j + "--");
                            availSlots++;
                            totalSelectedSlotsIds.push(totalslots[i + j].slot_detail._id);
                        } else {
                            if (totalslots[i + j].slot_status === 1) {
                                console.log("checkSlots -Availability:", i + "----" + j + "--rejected");
                                Alert.alert("Warning!", "Consective slots are not available for these services.");
                                return false;
                            }
                        }
                        if (availSlots === totalSlotsNeeded) {
                            //console.log("checkSlots -Availability:", i + "----" + j + "--allAvailable");
                            this.setState({selectedSlotIds: totalSelectedSlotsIds});
                            console.log("checkSlots -Availability:", i + "----" + j + "--allAvailable----->>>>>>" + JSON.stringify(totalSelectedSlotsIds));
                            return true;
                        }
                    }

                }
            }
        }
    }


    setFavorite() {
        if (this.state.barberFav === true) {
            this.setState({barberFav: false});
            this.removeFavoriteBarber();
        } else {
            this.setState({barberFav: true});
            this.addFavoriteBarber();
        }
    }

    renderItem(item, index) {
        if (item.slot_status === 0) {
            //var m = moment(new Date(2011, 2, 12, 0, 0, 0));
            //m.add(item.id * 30, "minutes");
            let currentTime = moment().format('YYYY-MM-DD h:mm a');
            // let date1 = new Date(this.state.selectedDate + " " + item.slot_detail.start_time + ":00")
            let slotTime = moment(this.state.selectedDate + " " + item.slot_detail.start_time + ":00").format('YYYY-MM-DD h:mm a');
            //console.log("SlotTime condition:",JSON.stringify(currentTime.isBefore(slotTime))); // true
            //console.log("SlotTime condition1:", JSON.stringify(currentTime)); // Mon May 12 2014 08:45:00
            //console.log("SlotTime condition2:", JSON.stringify(slotTime)); // Mon May 12 2014 09:00:00
            if (currentTime < slotTime) {
                //console.log("SlotTime condition--->: ","True"); // Mon May 12 2014 09:00:00
                if (item.surge_price === true) {
                    return (<View>
                        <TouchableOpacity onPress={() => this.itemSelect(index)}>
                            <View style={{
                                height: 20,
                                flexDirection: "row",
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: item.slot_detail.selected,
                                marginStart: 10,
                                alignItems: 'center'
                            }} cellKey={item.id}>
                                <Image resizeMode={"contain"}
                                       source={require("../../../assets/images/dollar_surge.png")}
                                       style={{width: 12, height: 12, marginStart: 5, marginTop: 2}}/>
                                <Text style={{
                                    textAlignVertical: "top",
                                    // height: 40,
                                    marginStart: 4,
                                    marginEnd: 7,
                                    marginTop: 2,
                                    fontFamily: "AvertaStd-Regular",
                                    color: "#01E8F1",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                }}>
                                    {this.showTime(item.slot_detail.start_time)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
                } else {
                    return (<View>
                        <TouchableOpacity onPress={() => this.itemSelect(index)}>
                            <View style={{
                                height: 20,
                                flexDirection: "row",
                                borderRadius: 10,
                                borderWidth: 1,
                                alignItems: "center",
                                borderColor: item.slot_detail.selected,
                                marginStart: 3,
                            }} cellKey={item.slot_detail._id}>
                                <Text style={{
                                    textAlignVertical: "top",
                                    marginLeft: 10,
                                    marginRight: 10,
                                    width: 50,
                                    textAlign: "center",
                                    fontFamily: "AvertaStd-Regular",
                                    color: Colors.white,
                                    fontSize: 11,
                                    fontWeight: "bold",
                                }}>
                                    {this.showTime(item.slot_detail.start_time)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>)
                }
            } else {
                console.log("SlotTime condition--->: ", "false"); // Mon May 12 2014 09:00:00
            }

        } else {
            return (<View>
                <View style={{
                    height: 20,
                    flexDirection: "row",
                    borderRadius: 10,
                    borderWidth: 1,
                    alignItems: "center",
                    borderColor: item.slot_detail.selected,
                    marginStart: 3,
                }} cellKey={item.slot_detail._id}>
                    <Text style={{
                        textAlignVertical: "top",
                        marginLeft: 10,
                        marginRight: 10,
                        width: 50,
                        textAlign: "center",
                        fontFamily: "AvertaStd-Regular",
                        color: "green",
                        fontSize: 11,
                        fontWeight: "bold",
                    }}>
                        {"Booked"}
                    </Text>
                </View>
            </View>)
        }

    }

    showTime(time) {
        //console.log("SlotDATime : ", time);
        return moment(time, "HH:mm").format("hh:mm a");
    }

    showDialog() {
        this.setState({DialogVisible: true})
    }

    cardSelected(card) {
        this.setState({
            DialogVisible: false,
            SelectedCard: card,
            selectedCardNum: card.last4,
            selectedCardImage: card.brand
        })
    }

    checkSurgePriceSelected() {
        //alert("TotalPriceAppoinment:"+ this.state.totalPriceService)
        console.log("MobileSurgePrice: ", this.state.surgePriceSelected)
        if (this.state.serviceTypeSelected === true && this.state.serviceDaySelected === true && this.state.serviceTimeSelected === true) {
            if (this.state.surgePriceSelected === true)
                this.props.navigation.navigate('SurgePricingRate', {
                    client_id: Preference.get("userId"),
                    barber_id: barberId,
                    barberImage: this.state.barberProfileImage,
                    barberName: this.state.barberName,
                    tip_price: this.state.percentPrice,
                    barberShopName: this.state.barberShopName,
                    appointmentPrice: this.state.totalPriceService,
                    selected_services: this.state.selectedServices,
                    date: this.state.selectedDate,
                    selected_slot_id: this.state.selectedSlotIds,
                    total_price: this.state.totalPriceService,
                    service_fee: "2.00",
                    //selected_surge_price:this.state.surgePriceSelected,
                    selected_surge_price: true,
                    barberMobilePay: this.state.barberMobilePay
                });
            else {
                if (this.state.mobilePayActivation === true) {
                    if (this.state.barberMobilePay === "inShop") {
                        this.bookApointment();
                    } else {
                        if (this.state.savedCard.length < 1) {
                            this.props.navigation.navigate("PaymentMethodClient", {
                                client_id: Preference.get("userId"),
                                barber_id: barberId,
                                barberImage: this.state.barberProfileImage,
                                barberName: this.state.barberName,
                                tip_price: this.state.percentPrice,
                                barberShopName: this.state.barberShopName,
                                appointmentPrice: this.state.totalPriceService,
                                selected_services: this.state.selectedServices,
                                date: this.state.selectedDate,
                                selected_slot_id: this.state.selectedSlotIds,
                                total_price: this.state.totalPriceService,
                                service_fee: "2.00",
                                selected_surge_price: false,
                            })
                        } else {
                            this.PaymentFlow();
                        }
                    }
                } else {
                    this.bookApointment();
                }
            }
        } else {
            alert("Please select Service,Time and Day for further procedure.");
        }
    }

    PaymentFlow() {
        let selectedcard = this.state.SelectedCard;
        let surgeP = 0;
        let totalP = this.state.totalPriceService
        if (this.state.surgePriceSelected) {
            surgeP = totalP / 2;
        } else {
            surgeP = 0;
        }
        let tipPrice = 0
        if (!!this.state.percentPrice) {
            tipPrice = this.state.percentPrice
        }
        if (this.state.isConnected) {
            this.setState({showLoading: true})
            var details = {
                barberID: barberId,
                clientID: Preference.get("userId"),
                amount: (this.state.totalPriceService + 2.00 + surgeP + tipPrice) * 100,
                card_id: selectedcard.id,
            };
            console.log("CARD Email----->" + JSON.stringify(details));
            console.log("APi URL ----->" + JSON.stringify(constants.PaymentFLow));
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(constants.PaymentFLow, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json())
                .then(response => {
                    console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                    this.setState({showLoading: false})
                    if (response.ResultType === 1) {
                        this.bookApointmentCard(response.Data)
                    } else {
                        if (response.ResultType === 0) {
                            Alert.alert("Transaction not completed", "Please enter a valid Debit/Credit Card.")
                            //Alert.alert("Error",response.Message);
                        }
                    }
                })
                .catch(error => {
                    console.log('Error:', error);
                    this.setState({showLoading: false})
                    //alert("Error: "+error);
                });

        } else {
            alert("Please connect Internet");
        }
    }

    checkBoxClicked(id) {
        //console.log("IDforService---->" + id);
        let mainData = this.state.ListData2;
        if (mainData[id].check === true) {
            //console.log("IDforService---->"+mainData[id].check);
            mainData[id].check = false;
            //console.log("IDforService---->"+mainData[id].check);
            let totalprice = this.state.totalPriceService;
            //totalprice = totalprice - mainData[id].price;
            totalprice = parseInt(totalprice) - parseInt(mainData[id].price);
            this.setState({totalPriceService: totalprice});
        } else {
            //console.log("IDforService---->"+ mainData[id].check);
            mainData[id].check = true;
            //console.log("IDforService---->"+mainData[id].check);
            let totalprice = this.state.totalPriceService;
            totalprice = parseInt(totalprice) + parseInt(mainData[id].price);
            this.setState({totalPriceService: totalprice});
        }

        this.setState({serviceTypeSelected: false, selectedServices: []});
        let selectedservice = [];
        let totalTime = 0;
        for (let j = 0; j < mainData.length; j++) {
            //console.log("IDforService---->"+j+"--"+ mainData[j].check);
            if (mainData[j].check === true) {
                //console.log("IDforService---->"+j+"-true-"+ mainData[j].check);
                selectedservice.push(mainData[j]._id);
                totalTime += parseInt(mainData[j].duration);
                this.setState({serviceTypeSelected: true});
                //console.log("IDforService---->" + JSON.stringify(selectedservice));
            }
        }

        this.setState({ListData2: mainData, selectedServices: selectedservice, totalServicesTime: totalTime});
        //console.log("IDforService--t-->"+ JSON.stringify(totalTime));
    }

    selectday(indx, item) {
        //alert("dayselected " + indx);
        let monthDaysData = this.state.monthDays;
        //console.log("Dateselected is",monthDaysData[indx].dateOfDay)
        this.setState({selectedDate: monthDaysData[indx].dateOfDay}, () => {
            console.log("SlectedDateofDAy:", this.state.selectedDate + "--" +
                JSON.stringify(item));
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
            console.log("selectedDateIs", JSON.stringify(monthDaysData[indx].dateOfDay));
            this.getDaySlots(monthDaysData[indx].dateOfDay)
            //alert("dayselected " + this.state.selectedDate);
        });

    }

    async setMonth() {
        const input = getmonth + "-" + moment().format('YY');
        let outt = input.split("-");
        let showmonth = monthNames[outt[0]] + " 20" + outt[1];
        this.setState({selectedMonth: input, showMonth: showmonth});
        await this.setMonthDays(input, true);
    }

    increaseMonth() {
        //alert("increaseMonth");
        const input = this.state.selectedMonth;
        console.log("SetMonth---->>>", input);
        let outt = input.split("-");
        console.log("SetMonth---->>>--->", outt);
        if (parseInt(outt[0]) === 11) {
            outt[0] = 0;
            outt[1] = parseInt(outt[1]) + 1;
        } else {
            outt[0] = parseInt(outt[0]) + 1;
            console.log("SetMonth---->>>--->", parseInt(outt[0]) + 1);
        }
        console.log("SetMonth---->>>--->", outt[0]);
        let showmonth = monthNames[outt[0]] + " 20" + outt[1];
        console.log("SetMonth---->>>", showmonth);
        let selectedmonth = outt[0] + "-" + outt[1];
        this.setState({selectedMonth: selectedmonth, showMonth: showmonth});
        this.setMonthDays(selectedmonth, false);
    }

    decreaseMonth() {
        // alert("decreaseMonth")
        const input = this.state.selectedMonth;
        console.log("SetMonth---->>>", input);
        let outt = input.split("-");
        if (parseInt(outt[0]) === 0) {
            outt[0] = 11;
            outt[1] = parseInt(outt[1]) - 1;
        } else {
            outt[0] = parseInt(outt[0]) - 1;
        }
        let showmonth = monthNames[outt[0]] + " 20" + outt[1];
        console.log("SetMonth---->>>", showmonth);
        let selectedmonth = outt[0] + "-" + outt[1];
        this.setState({selectedMonth: selectedmonth, showMonth: showmonth});
        this.setMonthDays(selectedmonth, false);
    }

    setMonthDays(input, current) {
        const inputt = input.split("-");
        console.log("DateMonth--" + inputt);
        const output = moment(parseInt(inputt[0]) + 1 + "-" + inputt[1], "MM-YY");
        console.log("DateMonth--" + output);
        let lastDay = output.endOf('month').format('DD');
        console.log("DateMonth--" + lastDay);
        let monthh = getmonth + 1;
        if (monthh < 10)
            monthh = "0" + monthh;
        let daysData = [];
        let loopstart = 0;
        if (current) {
            loopstart = parseInt(getDate);
        } else
            loopstart = 1;
        for (let i = loopstart; i <= lastDay; i++) {
            let realDate = "";
            let month = parseInt(inputt[0]) + 1;
            if (i < 10) {
                if (month < 10) {
                    realDate = "20" + inputt[1] + "-0" + month + "-0" + i;
                } else {
                    realDate = "20" + inputt[1] + "-" + month + "-0" + i;
                }
            } else {
                if (month < 10) {
                    realDate = "20" + inputt[1] + "-0" + month + "-" + i;
                } else {
                    realDate = "20" + inputt[1] + "-" + month + "-" + i;
                }
            }

            console.log("Real_date-----> ", realDate);
            let dayColor = "";
            let bottomColor = "";
            if (i === loopstart) {
                dayColor = "green";
                bottomColor = "green";
            } else {
                dayColor = "#ffffff";
                bottomColor = "transparent";
            }
            daysData.push({
                id: i,
                day: i,
                dayColor: dayColor,
                weekDay: this.getDayOfWeek(realDate),
                bottomColor: bottomColor,
                dateOfDay: realDate
            })
        }
        let mon = this.state.month[getmonth];
        console.log("daysDataOutput:", JSON.stringify(daysData));
        this.setState({monthDays: daysData, selectedDate: daysData[0].dateOfDay});
        if (Preference.get("clientlogin"))
            this.getBarberDetails(daysData[0].dateOfDay);
        else
            this.getBarberDetailsWithOutClientID(daysData[0].dateOfDay);
        //this.selectday(0);
    }

    getBarberDetailsWithOutClientID(dateDay) {
        let totalPr = 0
        if (this.state.totalPriceService > 0) {
            totalPr = this.state.totalPriceService;
        } else {
            totalPr = 0
        }
        console.log("getBarberDetails barberID-->" + barberId);
        console.log("getBarberDetails barberID-->" + dateDay);
        var details = {
            barber_id: barberId,
            check_date: dateDay,
            //client_id: Preference.get("userId"),
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log("formData:" + JSON.stringify(formBody));
        this.setState({showLoading: true})
        fetch(constants.ClientBarbersProfileSlotsWithOutLogin, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody,
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBarbersProfileSlots-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    let barberData = response.Data;
                    if (barberData.favorite_bit === 0)
                        this.setState({barberFav: false})
                    else
                        this.setState({barberFav: true})
                    this.setState({
                        barberProfileImage: {uri: barberData.user_image},
                        barberInsta: barberData.username,
                        barberName: barberData.firstname + " " + barberData.lastname,
                        barberShopName: barberData.shop_name,
                        ListData: barberData.portoflios,
                        //ListData2: barberData.services,
                        //barberTimeSlots: barberData.slots,
                        barberRating: barberData.average_rating,
                        barberReviews: barberData.total_reviews,
                        barberTotalAmout: 0,
                        totalPriceService: totalPr,
                        stripeActive: barberData.stripe_active,
                        barberMobilePay: "mobilePay",//barberData.payment_option,
                        Barberbanner: {uri: barberData.banner_image},
                        mobilePayActivation: barberData.mobile_pay_activation,
                        //savedCard: barberData.card_list
                    }, () => {
                        console.log("stripeActiveCheck:", this.state.stripeActive)
                        if (this.state.ListData2.length < 1) {
                            this.setState({ListData2: barberData.services})
                        }
                    });


                    let PortfolioImages = this.state.ListData;
                    for (let i = 0; i < PortfolioImages.length; i++) {
                        console.log("ImagesDataURl", PortfolioImages[i].portfolio_image);
                        PortfolioImages[i].portfolio_image = constants.portfolioImagePath + PortfolioImages[i].portfolio_image;
                    }
                    this.setState({ListData: PortfolioImages})
                    //this.setState({barberData: response.Data});

                    if (this.state.barberMobilePay === "mobilePay") {
                        this.setState({buttonPayText: "PAY"}, () => {
                            if (this.state.mobilePayActivation) {
                                this.setState({buttonPayText: "PAY"})
                            } else {
                                this.setState({buttonPayText: "RESERVE"})
                            }
                        })
                    } else {
                        this.setState({buttonPayText: "RESERVE"})
                    }


                    console.log("Slotsdata::", this.state.barberTimeSlots);
                    //this.setState({barberData: response.Data});
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            console.log('Error:', error);
            alert("Error: " + error);
        });

    }

    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getDay();
        //var dayOfWeek = new Date("2020-06-14").getDay();
        console.log("WEEK DAAYSs" + dayOfWeek)
        //return dayOfWeek;
        return isNaN(dayOfWeek) ? null : ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'][dayOfWeek];
    }

    showImageInLarge(imagePath) {
        this.setState({imageInFull: imagePath, showFullImage: true})
    }

    setAddTip() {
        if (this.state.addTip === false) {
            this.setState({addTip: true});
            this.setPercentage(this.state.percentage)
        } else
            this.setState({addTip: false, percentPrice: 0})
    }

    setPercentage(per) {
        let percentprice = 0;
        //appointmentPrice=30;
        let appointmentPrice = this.state.totalPriceService
        this.setState({percentage: per, DialogVisiblePercent: false});
        if (per == "10%") {
            percentprice = (appointmentPrice * 10) / 100;
        }
        if (per == "20%") {
            percentprice = (appointmentPrice * 20) / 100;
        }
        if (per == "25%") {
            percentprice = (appointmentPrice * 25) / 100;
        }
        if (per == "50%") {
            percentprice = (appointmentPrice * 50) / 100;
        }
        console.log("PercentPrice---->", percentprice);
        this.setState({percentPrice: percentprice})
    }

    render() {
        return (
            <View style={{height: windowHeight, backgroundColor: colors.themeBackground}}>
                <ScrollView>
                    {!(this.state.showFullImage) && <View style={styles.container}>
                        <Header
                            leftAction={this.leftAction.bind(this)}
                            rightAction={this.rightAction.bind(this)}
                            bgIcon={this.state.Barberbanner}
                            rightIcon={require("../../../assets/images/share.png")}
                            leftIcon={require("../../../assets/images/ic_back.png")}/>
                        {(this.state.barberFav && this.state.clientLogin) &&
                        <TouchableOpacity onPress={() => this.setFavorite()}
                                          style={{position: "absolute", top: 40, right: 60}}>
                            <Image source={require("../../../assets/images/star.png")}
                                   style={{width: 20, height: 20,}}/>
                        </TouchableOpacity>}
                        {!this.state.barberFav && <TouchableOpacity onPress={() => {
                            if (this.state.clientLogin)
                                this.setFavorite()
                            else {
                                Alert.alert("Authentiation!", "Please login to add favorite.")
                            }

                        }
                        }
                                                                    style={{position: "absolute", top: 40, right: 60}}>
                            <Image source={require("../../../assets/images/star-unselected.png")}
                                   style={{width: 20, height: 20,}}/>
                        </TouchableOpacity>}
                        <View style={styles.detailsContainer}>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    source={this.state.barberProfileImage}
                                    style={styles.profileImage}>
                                </Image>
                            </View>

                            <TouchableOpacity style={styles.icon}
                                              onPress={() => Linking.openURL('https://www.instagram.com/' + this.state.barberInsta)}>
                                <Image
                                    source={require("../../../assets/images/insta.png")}
                                    style={{height: 50, width: 50,}}
                                />
                            </TouchableOpacity>


                            <View>
                                <View style={[styles.infoContainer]}>
                                    <Text style={[styles.allFontStyle, styles.name]}>
                                        {this.state.barberName}
                                    </Text>
                                    <View style={{flexDirection: "row",}}>
                                        <Text style={{color: colors.white, fontSize: 12}}>
                                            {this.state.barberShopName}
                                        </Text>
                                        {/*<Image resizeMode={"contain"}
                                           style={{height: 8, width: 8, marginStart: 10, marginTop: 5}}
                                           source={require("../../../assets/images/arrow_down.png")}/>*/}
                                    </View>

                                    {(this.state.barberReviews > 0) ? <View style={styles.review}>
                                            <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('ClientSupremeReview', {barberId: barberId});
                                            }}>
                                                <AirbnbRating
                                                    isDisabled={true}
                                                    showRating={false}
                                                    count={5}
                                                    defaultRating={this.state.barberRating}
                                                    size={10}
                                                    style={{marginStart: 10, height: 30}}
                                                />
                                                {/*     <Image
                                            resizeMode="contain"
                                            source={require("../../../assets/images/start.png")}
                                            style={styles.rating}
                                        />*/}
                                            </TouchableOpacity>
                                            <Text
                                                style={[styles.allFontStyle, styles.reviewText]}>{"(" + this.state.barberReviews + " Reviews)"}</Text>
                                        </View> :
                                        <View style={styles.review}>
                                            <Text
                                                style={[styles.allFontStyle, styles.reviewText]}>{"This barber has no reviews yet!"}</Text>
                                        </View>}

                                </View>
                            </View>

                        </View>
                        <View style={{height: 25}}/>
                        <Text style={styles.row_title}>{"EXPERIENCE"}</Text>
                        <View style={[{
                            flex: 1,
                            width: '100%',
                            height: "100%",
                            flexDirection: "row"
                        }]}>

                            {/*<FlatList renderItem={({item}) =>
                            <View>
                                <Image style={{
                                    borderRadius: 10,
                                    marginStart: 8,
                                    height: 140,
                                    width: 160,
                                    backgroundColor: "grey"
                                }}
                                       resizeMode='cover'
                                       source={item.imagePath}/>
                            </View>}
                                  data={this.state.ListData}
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}
                                  keyExtractor={item => item.id}/>
                        <Image resizeMode={"contain"} source={require("../../../assets/images/arrow1.png")}
                               style={{position: "absolute", width: 35, height: 35, right: 10, top: 50}}/>*/}
                            {(this.state.ListData.length > 0) && <FlatList
                                data={this.state.ListData}
                                extraData={this.state}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={index => index}
                                renderItem={({item}) =>
                                    <TouchableOpacity onPress={() => {
                                        this.showImageInLarge(item.portfolio_image)
                                    }}>
                                        <Image style={{
                                            borderRadius: 10,
                                            marginStart: 8,
                                            height: 140,
                                            width: 160,
                                            backgroundColor: "grey"
                                        }}
                                               resizeMode='cover'
                                               source={{uri: item.portfolio_image}}/>
                                    </TouchableOpacity>}
                            />}
                            {(this.state.ListData.length < 1) &&
                            <View style={{width: "100%", height: 60, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{
                                    fontSize: 15,
                                    color: "white"
                                }}>{this.state.barberName + " don't have any Experience Images"}</Text>
                            </View>}
                            {(this.state.ListData.length > 0) &&
                            <Image resizeMode={"contain"} source={require("../../../assets/images/arrow1.png")}
                                   style={{position: "absolute", width: 35, height: 35, right: 10, top: 50}}/>}
                        </View>
                        <View style={{height: 15}}/>


                        <View style={[{
                            backgroundColor: "grey",
                            color: "white",
                            margin: 20,
                            borderRadius: 12
                        }]}>

                            <View
                                style={[{
                                    width: "100%",
                                    flexDirection: "row",
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    alignItems: "center",
                                    height: 35,
                                    backgroundColor: "#868791",
                                }]}>
                                <View style={{
                                    width: "45%", height: "100%", justifyContent: "center"
                                    , marginStart: 10
                                }}>
                                    <Text style={{color: "white", fontSize: 12}}>Type</Text>
                                </View>
                                <View style={{
                                    width: "30%", height: "100%", alignItems: "center"
                                    , flexDirection: "row"
                                }}>
                                    <View style={{width: 3, height: "100%", backgroundColor: "#686975"}}/>
                                    <Text style={{color: "white", marginStart: 15, fontSize: 12}}>Duration </Text>
                                    <View style={{
                                        width: 3,
                                        height: "100%",
                                        marginStart: 10,
                                        backgroundColor: "#686975"
                                    }}/>
                                </View>
                                <View style={[{width: "25%", right: 5, flexDirection: "row"}]}>
                                    <View style={{width: 1, height: "100%", backgroundColor: "#686975"}}/>
                                    <Text style={{color: "white", fontSize: 12}}>Prices</Text>
                                </View>
                            </View>

                            {this.state.ListData2.length > 0 && <FlatList
                                renderItem={({item, index}) =>
                                    <View style={{flexDirection: "column"}}>
                                        <TouchableOpacity onPress={() => this.checkBoxClicked(index)} style={[{
                                            flexDirection: "row",
                                            height: 30,
                                            backgroundColor: "#686975"
                                        }]}>
                                            <View style={[{
                                                flexDirection: "row",
                                                width: "50%",
                                                marginStart: 10,
                                                alignItems: "center"
                                            }]}>
                                                <CheckBoxSquare onClick={() => this.checkBoxClicked(index)}
                                                                isChecked={item.check}
                                                                uncheckedCheckBoxColor={"#272727"}/>
                                                <Text style={{color: "white", fontSize: 12}}>   {item.name} </Text>
                                            </View>
                                            <View style={[{
                                                flexDirection: "row",
                                                width: "25%",
                                                alignItems: "center"
                                            }]}>
                                                <Text style={{
                                                    color: "white",
                                                    fontSize: 12
                                                }}>{item.duration + " mins"}</Text>
                                            </View>
                                            <View style={[{
                                                flexDirection: "row",
                                                width: "25%",
                                                alignItems: "center"
                                            }]}>
                                                <Text
                                                    style={{color: "white", fontSize: 12}}>{"$" + item.price}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height: 0.5, backgroundColor: "#868791"}}/>
                                    </View>}
                                data={this.state.ListData2}
                                keyExtractor={(index) => index}
                                showsVerticalScrollIndicator={true}
                                removeClippedSubviews={false}
                                initialNumToRender={5}
                                numColumns={1}
                                style={{
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12, paddingBottom: 12, backgroundColor: "#686975"
                                }}/>}

                            {this.state.ListData2.length < 1 &&
                            <View
                                style={{width: "100%", height: 60, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontSize: 15, color: "white"}}>{"You don't have any Services"}</Text>
                            </View>}


                        </View>
                        {this.state.clientLogin && <View>
                            {this.state.ListData2.length > 0 && <View Style={{flexDirection: "column"}}>
                                <View style={{flexDirection: "row", width: "100%", height: 40}}>

                                    <Text
                                        style={{
                                            fontFamily: "AvertaStd-Semibold",
                                            alignSelf: "center",
                                            marginTop: 5,
                                            color: Colors.red1,
                                            textAlign: "center",
                                            width: "100%"
                                        }}>
                                        {this.state.showMonth}
                                    </Text>
                                    <TouchableOpacity onPress={() => this.decreaseMonth()}
                                                      style={{position: "absolute", top: 15, left: 20}}>
                                        <Image style={{height: 13, width: 13,}}
                                               source={require("../../../assets/images/left_calender.png")}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.increaseMonth()}
                                                      style={{position: "absolute", top: 15, right: 20}}>
                                        <Image style={{height: 13, width: 13,}}
                                               source={require("../../../assets/images/right_arrow_calender.png")}/>
                                    </TouchableOpacity>
                                </View>

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
                                        }} onPress={() => this.selectday(index, item)}>
                                            <Text style={{color: item.dayColor, fontSize: 15}}>{item.weekDay}</Text>
                                            <Text
                                                style={{
                                                    color: item.dayColor,
                                                    fontWeight: "bold",
                                                    fontSize: 12,
                                                    width: "100%",
                                                    textAlign: "center"
                                                }}>{item.day}</Text>

                                        </TouchableOpacity>
                                    </View>
                                    }/>
                                <View style={{height: 0.5, width: "100%", backgroundColor: "grey", marginBottom: 10}}/>
                                {(this.state.barberTimeSlots.length > 0) && <FlatList
                                    /* data={this.state.dayData}*/
                                    data={this.state.barberTimeSlots}
                                    /* data={this.state.listData}*/
                                    renderItem={({item, index}) => this.renderItem(item, index)}
                                    numColumns={1}
                                    extraData={this.state}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index}
                                    horizontal={true}/>}
                                {!(this.state.barberTimeSlots.length > 0) && <View style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "transparent"
                                }}>
                                    <Text style={{color: "white", fontSize: 15}}>{"Fully Booked"}</Text>
                                </View>}
                            </View>}
                            <View style={{
                                flexDirection: "row",
                                width: "90%",
                                height: 50,
                                marginLeft: 20,
                                marginTop: 20,
                                justifyContent: "center",
                                alignItems: "center",

                            }}>
                                <View style={{flexDirection: "column", width: "60%",}}>
                                    <View style={{flexDirection: "row", marginTop: 10}}>
                                        <CheckBoxSquare rightText={"Add a Tip"} isChecked={this.state.addTip}
                                                        onClick={() => this.setAddTip()}
                                                        style={{marginTop: 4, width: 140}}/>
                                        {/*<Text style={{color: "white", marginStart: 10, fontSize: 15,}}></Text>*/}
                                    </View>
                                    <Text style={{
                                        fontSize: 11,
                                        fontFamily: "AvertaStd-RegularItalic",
                                        marginStart: 20,
                                        color: "grey"
                                    }}>(100% goes to your
                                        barber)</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    width: "40%",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginStart: 0, width: "50%"
                                    }}>${this.state.percentPrice > 0 ? this.state.percentPrice.toFixed(2) : 0}</Text>
                                    <TouchableOpacity onPress={() => this.setState({DialogVisiblePercent: true})}
                                                      style={{
                                                          flexDirection: "row",
                                                          backgroundColor: "#474857",
                                                          marginStart: 20,
                                                          borderRadius: 20,
                                                          height: 25,
                                                          width: 50,
                                                          justifyContent: "center",
                                                          alignItems: "center",
                                                      }}>
                                        <Text style={{
                                            color: "white",
                                            fontSize: 13,
                                            marginStart: 10
                                        }}>{this.state.percentage}</Text>
                                        <Image
                                            resizeMode={"contain"}
                                            style={{
                                                height: 7,
                                                width: 7,
                                                marginStart: 5,
                                                marginEnd: 10
                                            }}
                                            source={require("../../../assets/images/arrow_down.png")}/>
                                    </TouchableOpacity>
                                </View>


                            </View>


                            <View
                                style={{
                                    flexDirection: "column",
                                    height: 100,
                                    width: "100%",
                                    marginTop: 10
                                }}>
                                <View style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "#010221"
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        width: "40%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <View style={{
                                            flexDirection: "column",
                                            // height: "100%",
                                            width: "100%",
                                            marginStart: 25,
                                        }}>
                                            <Text style={{
                                                fontSize: 16, color: "white",
                                                fontFamily: "AvertaStd-Thin",
                                                marginTop: 10

                                            }}>Subtotal:</Text>
                                            <Text
                                                style={{
                                                    fontSize: 33,
                                                    fontWeight: "bold",
                                                    textAlign: "left",
                                                    color: "white",
                                                }}
                                            >${(this.state.totalPriceService + 2.00 + this.state.percentPrice).toFixed(2)}</Text>
                                            <Text style={{
                                                color: "white",
                                                fontFamily: "AvertaStd-Thin",
                                                fontSize: 12,
                                                marginBottom: 5,
                                            }}>Service
                                                Fee:
                                                <Text style={{
                                                    // fontWeight: "900",

                                                    color: "white"
                                                }}>{" $2.00"}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    {(this.state.buttonPayText == "PAY") && (this.state.savedCard.length < 1) &&<TouchableOpacity
                                    onPress={()=>{//alert("Add new card & Pay")
                                    this.checkSurgePriceSelected()
                                }}
                                    style={{
                                        flexDirection: "row",
                                        width: "40%",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Text style={{
                                            textAlign: "center",
                                            fontSize: 14,
                                            marginStart: 5,
                                            color: "white"
                                        }}>{'Add new Card & Pay'}</Text>
                                        </TouchableOpacity>}
                                    {(this.state.buttonPayText == "PAY") && (this.state.savedCard.length > 0) &&
                                    <TouchableOpacity onPress={() => this.showDialog()} style={{
                                        flexDirection: "row",
                                        width: "40%",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        {this.state.selectedCardImage === "Visa" &&
                                        <Image resizeMode={"contain"}
                                               source={require("../../../assets/images/visa.png")}
                                               style={{width: 25}}/>}
                                        {this.state.selectedCardImage === "Discover" && <Image resizeMode={"contain"}
                                                                                               source={require("../../../assets/images/discover.png")}
                                                                                               style={{width: 25}}/>}
                                        {this.state.selectedCardImage === "MasterCard" &&
                                        <Image resizeMode={"contain"}
                                               source={require("../../../assets/images/master.png")}
                                               style={{width: 25}}/>}
                                        {this.state.selectedCardImage === "American Express" &&
                                        <Image resizeMode={"contain"}
                                               source={require("../../../assets/images/american.png")}
                                               style={{width: 25}}/>}
                                        {this.state.selectedCardImage === "UnionPay" && <Image resizeMode={"contain"}
                                                                                               source={require("../../../assets/images/unionpay.png")}
                                                                                               style={{width: 25}}/>}
                                        {this.state.selectedCardImage === "Diners Club" && <Image resizeMode={"contain"}
                                                                                                  source={require("../../../assets/images/dinnerclub.png")}
                                                                                                  style={{width: 25}}/>}
                                        {this.state.selectedCardImage === "JCB" &&
                                        <Image resizeMode={"contain"} source={require("../../../assets/images/jcb.png")}
                                               style={{width: 25}}/>}

                                        <Text style={{
                                            textAlign: "center",
                                            fontSize: 17,
                                            marginStart: 5,
                                            color: "white"
                                        }}>{this.state.selectedCardNum}</Text>
                                        <Image
                                            style={{
                                                marginStart: 5,
                                            }} resizeMode={"contain"}
                                            source={require("../../../assets/images/arrow_down.png")}/>
                                    </TouchableOpacity>}
                                    {(this.state.buttonPayText == "RESERVE") && <View style={{
                                        width: "40%",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: "white",
                                            fontStyle: 'italic'
                                        }}>{" Pay in Store "}</Text>
                                    </View>}

                                    <TouchableOpacity onPress={() => {
                                        this.checkSurgePriceSelected()
                                    }} style={{
                                        backgroundColor: "red",
                                        width: "20%",
                                        height: "100%",
                                        position: "absolute",
                                        right: 0,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: "white",
                                            fontWeight: "bold",
                                            width: "100%",
                                            textAlign: "center"
                                        }}>{this.state.buttonPayText}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>}

                        <Dialog
                            visible={this.state.DialogVisible}
                            onTouchOutside={() => {
                                this.setState({DialogVisible: false});
                            }}
                            width={0.6}>
                            <DialogContent>
                                <Text style={{
                                    fontSize: 18,
                                    color: "black",
                                    fontWeight: "bold",
                                    marginBottom: 10,
                                    marginTop: 10
                                }}>{"Please select your Card"}</Text>
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{marginTop: 10}}
                                    data={this.state.savedCard}
                                    extraData={this.state.savedCard}
                                    renderItem={({item}) =>
                                        <TouchableOpacity onPress={() => this.cardSelected(item)}>
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    color: "black",
                                                    margin: 10
                                                }}>{"Card # **** **** ****" + item.last4}</Text>
                                            <View style={{width: "100%", height: 0.5, backgroundColor: "black"}}/>
                                        </TouchableOpacity>
                                    }
                                    numColumns={1}
                                    keyExtractor={(item, index) => index}
                                    horizontal={false}/>
                            </DialogContent>
                        </Dialog>
                        <Dialog
                            visible={this.state.DialogVisiblePercent}
                            onTouchOutside={() => {
                                this.setState({DialogVisiblePercent: false});
                            }}
                            width={0.6}>
                            <DialogContent>
                                <Text style={{
                                    fontSize: 18,
                                    color: "black",
                                    fontWeight: "bold",
                                    marginBottom: 10,
                                    marginTop: 10
                                }}>{"Please select Percentage"}</Text>
                                <Text onPress={() => this.setPercentage("10%")}
                                      style={{
                                          fontSize: 18,
                                          color: "black",
                                          marginBottom: 10,
                                          marginTop: 10
                                      }}>{"10%"}</Text>
                                <Text onPress={() => this.setPercentage("20%")}
                                      style={{
                                          fontSize: 18,
                                          color: "black",
                                          marginBottom: 10,
                                          marginTop: 10
                                      }}>{"20%"}</Text>
                                <Text onPress={() => this.setPercentage("25%")}
                                      style={{
                                          fontSize: 18,
                                          color: "black",
                                          marginBottom: 10,
                                          marginTop: 10
                                      }}>{"25%"}</Text>
                                <Text onPress={() => this.setPercentage("50%")}
                                      style={{
                                          fontSize: 18,
                                          color: "black",
                                          marginBottom: 10,
                                          marginTop: 10
                                      }}>{"50%"}</Text>
                            </DialogContent>
                        </Dialog>


                    </View>}
                    {this.state.showFullImage && <View style={{
                        width: width,
                        height: height,
                        backgroundColor: "grey",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Image style={{width: "100%", height: "100%", backgroundColor: "yellow"}}
                               source={{uri: this.state.imageInFull}}/>
                        <TouchableOpacity onPress={() => this.setState({showFullImage: false})} style={{
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            top: 20,
                            right: 20,
                            width: 50,
                            height: 50
                        }}>
                            <Image style={{width: 35, height: 35}}
                                   source={require("../../../assets/images/error.png")}/>
                        </TouchableOpacity>

                    </View>}
                    {this.state.clientLogin && <TouchableOpacity
                        onPress={() => Alert.alert("This barber has Cancelation & No-Show Policies activated.", Policy)}
                        style={{
                            width: "100%",
                            height: 40,
                            backgroundColor: "white",
                            paddingBottom: isIPhoneX() ? 10 : 0
                        }}>

                        <Text style={{
                            width: "100%",
                            fontSize: 12,
                            color: "blue",
                            textAlign: "center"
                        }}>{"Cancelation & No-Show Policy"}</Text>
                    </TouchableOpacity>}
                </ScrollView>
                {!Preference.get('clientlogin') &&<View style={{width: "100%", height: 100, position: "absolute", bottom: 0, alignItems: "center",backgroundColor:colors.themeBackground}}>
                    <View style={{
                        width: "80%",
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: "space-between",
                        backgroundColor:Colors.themeBackground,
                        marginTop: 10
                    }}>
                        <TouchableOpacity onPress={()=>{
                            //this.props.navigation.goBack();
                            const goToIntoScreen = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'SelectScreen' })],
                            });
                            this.props.navigation.dispatch(goToIntoScreen);
                        }} style={{width: "40%", backgroundColor: Colors.red, height: 40, borderRadius: 20,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{color:"white"}}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                //this.props.navigation.goBack();
                                const goToIntoScreen = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'SelectScreen' })],
                                });
                                this.props.navigation.dispatch(goToIntoScreen);
                            }}
                            style={{width: "40%", backgroundColor: "white", height: 40, borderRadius: 20,alignItems:"center",justifyContent:"center"}}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
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
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: colors.themeBackground
    },
    detailsContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: 20
    },
    profileImageContainer: {
        height: width / 2.7,
        width: width / 2.7,
        borderRadius: width / 2.7 / 2,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -width / 5
    },
    icon: {height: 50, width: 50, position: 'absolute', top: 10, right: width / 2 - width / 2.7 / 2},
    iconContainer: {},
    profileImage: {
        height: width / 3,
        width: width / 3,
        borderRadius: (width / 3) / 2,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    infoContainer: {
        height: 80,
        justifyContent: "space-around",
        width,
        alignItems: "center"
    },
    allFontStyle: {
        color: "#535361"
    },
    row_title: {
        color: "#697078",
        marginLeft: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        fontFamily: "AvertaStd-Regular"
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        width: "100%",
        textAlign: "center"
    },
    button: {
        width: width / 2.2,
        backgroundColor: "#FF0000",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 30,
        height: height / 19,
        alignItems: "center"
    },
    buttonText: {color: "white", fontSize: 15, fontWeight: "500"},
    review: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    reviewText: {
        fontSize: 12,
        color: colors.white
    },
    rating: {height: 30, width: width / 4},
    tip_price_container: {
        backgroundColor: Colors.border,
        marginTop: 8,
        width: 80,
        height: 24,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 12
    },
    MainContainer: {
        justifyContent: "center",
        flex: 1,
    },
    avatar_conatiner: {
        alignSelf: "center",
        marginLeft: 10,
        height: 60,
        width: 60
    },
    icon_header: {
        height: 20,
        width: 20
    },


    calendar_weekly_header: {
        height: 60,
        flexDirection: "row"
    },
    week_day_container: {
        alignSelf: "center",
        color: "white",
        fontFamily: "AvertaStd-Semibold",
        fontSize: 12
    }


});
