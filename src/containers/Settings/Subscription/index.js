import React, { Component } from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Platform,
    Alert,
    Linking
} from "react-native";
import { Colors } from "../../../themes";
import { globalStyles } from "../../../themes/globalStyles";
import PopupDialog from 'react-native-popup-dialog';
//import { styles } from "./styles";
import { Header } from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";

import Preference from "react-native-preference";
import { constants } from "../../../utils/constants";
import RNIap, {
    Product,
    ProductPurchase,
    PurchaseError,
    acknowledgePurchaseAndroid,
    purchaseErrorListener,
    purchaseUpdatedListener,
} from 'react-native-iap';
import moment from "moment";

const BASIC_SUB = "basic.membership.clypr"
const SUPREME_SUB = "supreme.membership.clypr"

const itemSkus = Platform.select({
    ios: [
        'supreme.membership.clypr'
    ],
    android: [
        'com.example.productId'
    ]
});

const itemSubs = Platform.select({
    ios: [
        'test.sub'
    ],
    android: [
        'test.sub'
    ]
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default class Subscription extends Component {

    purchaseUpdatedListenerCount = 0
    purchaseErrorListenerCount = 0
    state = {
        showLoading: false,
        SubscriptionInfo: [],
        SubscriptionPopUp: false,
        basic: {
            basicBgColor: "#686975",
            basicBorderColor: "white",
            mainBgColor: "#2F3041",
            mainBorderColor: "grey",
            basicImage: require("../../../assets/images/basic_white.png"),
            basicCheck: require("../../../assets/images/radio_unselected.png"),
        },
        supreme: {
            supremeBgColor: "#66172F",
            supremeBorderColor: "red",
            supremeTextColor: "red",
            supremeMainBgColor: "#2F3041",
            supremeMainBorderColor: "grey",
            supremeImage: require("../../../assets/images/supreme_red.png"),
            supremeCheck: require("../../../assets/images/radio_unselected.png"),
        },
        SelectedBasic: false,
        SelectedSupreme: false,
        productList: [],
        isSubscription: false

    }

    async componentDidMount(): void {
        // setTimeout(() => {
        //     this.forceUpdate()
        // }, 5000);
        //this.getItems()
        this.SubscriptionInfo();
        if (Platform.OS == 'ios') {
            try {
                const result = await RNIap.initConnection();
                console.log('initInAppPurchase', 'result', result);

            } catch (err) {
                console.log('initInAppPurchase', 'error', err.code, err.message);
            }

            // purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {

            //     if (this.purchaseUpdatedListenerCount >= 1) {
            //         // console.log('initInAppPurchase', 'result>1', "purchaseUdatedListener");
            //         return
            //     }

            //     this.purchaseUpdatedListenerCount = this.purchaseUpdatedListenerCount + 1
            //     console.log('initInAppPurchase', 'result', "bye-count", this.purchaseUpdatedListenerCount);
            //     if (purchase && purchase.transactionReceipt) {
            //         console.log('initInAppPurchase', "purchase", purchase);
            //         alert(purchase.productId + "      " + purchase.transactionReceipt)
            //         if (purchase.productId == "basic.membership.clypr") {
            //             this.PaymentFlow(1, false)
            //         }
            //         else if (purchase.productId == "supreme.membership.clypr") {
            //             this.PaymentFlow(2, true)
            //         }
            //     }

            // });

            purchaseErrorSubscription = purchaseErrorListener((error) => {

                console.log('initInAppPurchase', 'purchaseErrorListener', error);
                if (this.purchaseErrorListenerCount >= 1) {
                    return
                }
                this.purchaseErrorListenerCount = this.purchaseErrorListenerCount + 1
                let message = ''
                if (error.code == 'E_ALREADY_OWNED') {
                    message = 'You already own this item.'
                } else if (error.code == 'E_USER_CANCELLED') {
                    message = 'Payment is Cancelled.'
                } else if (error.code == 'PROMISE_BUY_ITEM') {
                    message = 'This item is not currently available.'
                }
                else if (error.code == "E_UNKNOWN" && error.responseCode == 0) {
                    this.setState({ showLoading: false });
                    message = 'Cannot connect to iTunes Store'
                }
                else if (error.code == "E_USER_CANCELLED" && error.responseCode == 2) {
                    this.setState({ showLoading: false });
                    // message = 'Cannot connect to iTunes Store'
                }
                else {
                    message = 'Unable to purchase this item. Please try later.'
                }
                Alert.alert('Alert', message);
            });
        }
    }


    componentWillUnmount(): void {
        if (purchaseUpdateSubscription) {
            purchaseUpdateSubscription.remove();
            purchaseUpdateSubscription = null;
        }
        if (purchaseErrorSubscription) {
            purchaseErrorSubscription.remove();
            purchaseErrorSubscription = null;
        }
    }


    getItems = async (): void => {
        try {
            // console.log('itemSkus[0]', itemSkus[0]);
            const products: Product[] = await RNIap.getProducts([BASIC_SUB, SUPREME_SUB]);
            // console.log('Products[0]', products[0]);
            this.setState({ productList: products });
        } catch (err) {
            this.setState({ showLoading: true });
            alert(err)
            console.log('getItems || purchase error => ', err);
        }
    };

    getSubscriptions = async (): void => {
        try {
            const products = await RNIap.getSubscriptions(itemSubs);
            console.log('Products => ', products);
            this.setState({ productList: products });
        } catch (err) {
            console.log('getSubscriptions error => ', err);
        }
    };


    getAvailablePurchases = async (): void => {
        try {
            const purchases = await RNIap.getAvailablePurchases();
            console.info('Available purchases => ', purchases);
            if (purchases && purchases.length > 0) {
                this.setState({
                    availableItemsMessage: `Got ${purchases.length} items.`,
                    receipt: purchases[0].transactionReceipt,
                });
            }
        } catch (err) {
            console.warn(err.code, err.message);
            console.log('getAvailablePurchases error => ', err);
        }
    };
    requestPurchase = async (sku): void => {

        try {
            this.purchaseUpdatedListenerCount = 0
            this.purchaseErrorListenerCount = 0
            RNIap.requestPurchase(sku);
        } catch (err) {
            console.log('requestPurchase error => ', err);
        }
    };
    requestSubscription = async (sku) => {
        console.log("request purchase called", sku)
        try {
            this.setState({ showLoading: true });
            await this.getItems();
            const purchase = await RNIap.requestPurchase(sku);
            this.setState({ showLoading: false });
            console.log("requestSubscription-result", purchase.productId)

            if (purchase && purchase.transactionReceipt) {
                this.setState({ showLoading: false });
                // console.log('initInAppPurchase', "purchase", purchase);
                // alert(purchase.productId + "      " + purchase.transactionReceipt)
                if (purchase.productId == "basic.membership.clypr") {
                    this.PaymentFlow(1, false)
                }
                else if (purchase.productId == "supreme.membership.clypr") {
                    this.PaymentFlow(2, true)
                }
            }
        } catch (err) {
            this.setState({ showLoading: false });
            console.log('requestSubscription-error => ', err);
        }
    };
    purchaseConfirmed = () => {

        //alert("Subscription purchased Succesfully");
        //you can code here for what changes you want to do in db on purchase successfull
    };



    PaymentFlow(type, select) {
        //let selectedcard=this.state.SelectedCard;
        let date = new Date()
        console.log("current Date", moment(date).add(1, 'months').format("YYYY-MM-DD HH:MM"))

        // this.setState({ showLoading: true })
        var details = {
            barberEmail: Preference.get("userEmail"),
            accountSubscriptionType: type/* this.state.SelectedSupreme? *//* 2,:1, */,
            supremeBarber: select /* this.state.SelectedSupreme?  *//* true *//* :false */,
            exp_on: moment(date).add(1, 'months').format("YYYY-MM-DD HH:MM")
            //cardID: "",
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
        fetch(constants.BarberPaymentFlow, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                this.setState({ showLoading: false });
                this.setState({ isSubscription: true });
                if (Preference.get("newUser") === true) {
                    this.props.navigation.navigate("BookingPreferences");
                } else {
                    this.props.navigation.goBack();
                }
                // this.SubscriptionInfo();
                // this.setState({ showLoading: false })
                // if (response.ResultType === 1) {
                //     if (Preference.get("newUser") === true) {
                //         //alert("Supreme Subscription Activated");
                //         this.props.navigation.navigate("Settings");
                //     }
                //     else {
                //         //alert("Supreme Subscription Activated");
                //         this._selectedSupreme();
                //         //this.props.navigation.navigate("");
                //     }
                // } else {
                //     if (response.ResultType === 0) {
                //         Alert.alert(null,response.Message);
                //     }
                // }
            })
            .catch(error => {
                //console.error('Errorr:', error);
                console.log('Error:', error);
                this.setState({ showLoading: false })
                alert("Error: " + error);
            });

    }

    _selectedBasic() {
        this.setState({
            basic: {
                basicBgColor: "#2F5F24",
                basicBorderColor: "#3FAF09",
                mainBgColor: "#273830",
                mainBorderColor: "#48E100",
                basicImage: require("../../../assets/images/basic_green.png"),
                basicCheck: require("../../../assets/images/radio_selected.png"),
            },
            supreme: {
                supremeBgColor: "#66172F",
                supremeBorderColor: "red",
                supremeTextColor: "red",
                supremeMainBgColor: "#2F3041",
                supremeMainBorderColor: "grey",
                supremeImage: require("../../../assets/images/supreme_red.png"),
                supremeCheck: require("../../../assets/images/radio_unselected.png"),
            },
            SelectedBasic: true,
            SelectedSupreme: false,

        });
    }

    _selectedSupreme() {
        this.setState({
            basic: {
                basicBgColor: "#686975",
                basicBorderColor: "white",
                mainBgColor: "#2F3041",
                mainBorderColor: "grey",
                basicImage: require("../../../assets/images/basic_white.png"),
                basicCheck: require("../../../assets/images/radio_unselected.png"),
            },
            supreme: {
                supremeBgColor: "#2F5F24",
                supremeBorderColor: "#3FAF09",
                supremeTextColor: "white",
                supremeMainBgColor: "#273830",
                supremeMainBorderColor: "#48E100",
                supremeImage: require("../../../assets/images/supreme_green.png"),
                supremeCheck: require("../../../assets/images/radio_selected.png"),
            },
            SelectedSupreme: true,
            SelectedBasic: false,
        });
    }

    Onsubmit() {
        //alert("You are already a Supreme User");
        if (Preference.get("newUser") === true) {
            if (this.state.SelectedBasic === true) {
                if (this.state.SubscriptionInfo.account_subscription_type === 1 && this.state.SubscriptionInfo.supreme_barber === false) {
                    alert("You are already a Basic User");
                    this.props.navigation.navigate("BookingPreferences");
                    Preference.set("userPackage", "basic");
                } else {

                    // this.CancelSubscription();
                    // this.props.navigation.navigate("BookingPreferences");
                    if (Platform.OS === "ios") {
                        this.requestSubscription(this.state.SelectedSupreme ? SUPREME_SUB : BASIC_SUB)
                    } else {
                        this.props.navigation.navigate("BarberPaymentMethod")
                    }
                }
            } else if (this.state.SelectedSupreme === true) {
                if (this.state.SubscriptionInfo.account_subscription_type === 2 && this.state.SubscriptionInfo.supreme_barber === true) {
                    alert("You are already a Supreme User");
                    this.props.navigation.navigate("BookingPreferences");
                    Preference.set("userPackage", "supreme");
                } else {
                    //this.props.navigation.navigate("BarberPaymentMethod")}
                    if (Platform.OS === "ios") {
                        this.requestSubscription(this.state.SelectedSupreme ? SUPREME_SUB : BASIC_SUB)
                    } else {
                        this.props.navigation.navigate("BarberPaymentMethod")
                    }
                }

            }
        } else {
            if (this.state.SelectedBasic === true) {
                Preference.set("userPackage", "basic");
                //this.CancelSubscription();
                //this.props.navigation.goBack()
                if (Platform.OS === "ios") {
                    this.requestSubscription(this.state.SelectedSupreme ? SUPREME_SUB : BASIC_SUB)
                } else {
                    this.props.navigation.navigate("BarberPaymentMethod")
                }
            } else if (this.state.SelectedSupreme === true) {
                if (this.state.SubscriptionInfo.account_subscription_type === 2 && this.state.SubscriptionInfo.supreme_barber === true) {
                    alert("You are already a Supreme User");
                    Preference.set("userPackage", "supreme");
                } else {
                    if (Platform.OS === "ios") {
                        this.requestSubscription(this.state.SelectedSupreme ? SUPREME_SUB : BASIC_SUB)
                    } else {
                        this.props.navigation.navigate("BarberPaymentMethod")
                    }
                }

            }
        }


    }

    SubscriptionInfo() {

        this.setState({ showLoading: true });
        var details = {
            barberID: Preference.get("userId")
        };
        console.log("userid----->" + JSON.stringify(details));

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.BarberSubscriptionInfo, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseSubscriptionInfo-->", "-" + JSON.stringify(response));
                this.setState({ showLoading: false });

                // if (response.ResultType === 1) {
                this.setState({ SubscriptionInfo: response.Data }, () => {
                    var todayDate =moment(new Date()).format("YYYY-MM-DD") ;
                    var SubsDate =moment(response.Data.exp_on).format("YYYY-MM-DD")
                   
                    console.log("BothDates: ",JSON.stringify(todayDate +"---"+SubsDate) )
                   
                    console.log("SUBCRIPTIOn INfo" + JSON.stringify(this.state.SubscriptionInfo))
                    if (this.state.SubscriptionInfo.supreme_barber === true && this.state.SubscriptionInfo.account_subscription_type === 2 && todayDate<SubsDate) {
                        this.setState({ isSubscription: true })
                        this._selectedSupreme();
                    }
                    else if (this.state.SubscriptionInfo.supreme_barber === false && this.state.SubscriptionInfo.account_subscription_type === 1 && todayDate<SubsDate) {
                        this.setState({ isSubscription: true })
                        this._selectedBasic();
                    }
                    else if (this.state.SubscriptionInfo.supreme_barber === false && this.state.SubscriptionInfo.account_subscription_type === 0) {
                        this.setState({ isSubscription: false })
                    }
                })
               
            })
            .catch(error => {
                console.log('Error:', error);
                this.setState({ showLoading: false })
                alert("Error: " + error);
            });

    }


    CancelSubscription() {

        this.setState({ showLoading: true });
        var details = {
            barberEmail: Preference.get("userEmail"),
            accountSubscriptionType: 0,
            supremeBarber: false,
            pform: Platform.OS
        };
        console.log("userid----->" + JSON.stringify(details));

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.CancelBarberSubscription, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("CancelSubscriptionResponse-->", "-" + JSON.stringify(response));
                this.setState({ showLoading: false });
                if (response.ResultType === 0) {
                    alert("Subscription Cancel Successfully");
                    //this.SubscriptionInfo();
                    this.SubscriptionInfo();
                    this.props.navigation.goBack()

                } else {
                    // if (response.ResultType === 0) {
                    alert("Subscription Cancel Successfully");
                    this.SubscriptionInfo();
                    this.props.navigation.goBack()
                    // }
                }
            })
            .catch(error => {
                console.log('Error:', error);
                this.setState({ showLoading: false });
            });

    }



    render() {
        return (<View style={styles.container}>

            <Header
                statusBarProps={{ barStyle: "light-content" }}
                barStyle="light-content" // or directly
                style={{ backgroundColor: "yellow" }}
                outerContainerStyles={{ backgroundColor: "#1999CE" }}
                centerComponent={{ text: "SUBSCRIPTION", style: { color: "#fff" } }}
                rightComponent={{ color: "#fff" }}
                containerStyle={{
                    backgroundColor: Colors.dark,
                    justifyContent: "space-around"
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Image
                            style={{ tintColor: 'white', height: 20, resizeMode: 'contain' }}
                            source={require("../../../assets/images/ic_back.png")}
                        />
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={require("../../../assets/images/logo.png")}
                        style={{
                            marginTop: 9,
                            resizeMode: 'contain',
                            width: 180
                        }} />
                    <Text style={{ fontSize: 14, color: "white" }}>{"Current Subscription:"}</Text>
                    <Text style={{ fontSize: 17, color: "white", marginBottom: 10 }}>{(this.state.SubscriptionInfo.supreme_barber && this.state.isSubscription) ? "Supreme Membership" : (this.state.SubscriptionInfo.supreme_barber == false && this.state.isSubscription) ? "Basic Membership" : "none"}</Text>
                    <Text style={{ fontSize: 14, color: "white" }}>{"Next Renewal Date:"}</Text>
                    <Text style={{ fontSize: 17, color: "white", marginBottom: 10 }}>{this.state.isSubscription ? moment(this.state.SubscriptionInfo.exp_on).format("LL") : "Please Subscribe First"}</Text>
                    <View style={{
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: "30%",
                            alignItems: "center",
                            justifyContent: "center",
                            end: 85,
                            backgroundColor: this.state.basic.basicBgColor,
                            height: 25,
                            marginTop: 20,
                            borderColor: this.state.basic.basicBorderColor,
                            borderBottomWidth: 0,
                            borderWidth: 0.5,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 17,
                                color: "white",
                                width: "100%",
                                textAlign: "center",
                                //backgroundColor: "yellow",
                            }}>{"BASIC"}</Text>
                        </View>
                        {console.log(this.state.isSubscription, this.state.SelectedSupreme, this.state.SelectedBasic)}
                        <TouchableWithoutFeedback onPress={() => this._selectedBasic()} disabled={(this.state.SelectedSupreme == true && this.state.isSubscription == true) && true}>
                            <View style={{
                                backgroundColor: this.state.basic.mainBgColor,
                                width: "90%",
                                marginStart: 20,
                                marginEnd: 20,
                                borderRadius: 5,
                                marginBottom: 5,
                                borderWidth: 0.5,
                                borderColor: this.state.basic.mainBorderColor,
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        marginStart: 30,
                                        marginTop: 15,
                                        fontSize: 14,
                                        textAlignVertical: "top",
                                        marginBottom: 15,
                                        marginEnd: 40,
                                        fontFamily: "AvertaStd-Thin"
                                    }}
                                >Join the CLYPR team and bulid up your clientele! Have your own profile and let your
                                        clients book using your schedule.</Text>
                                <View style={{ marginLeft: 10, flexDirection: "row", marginBottom: 10 }}>
                                    <Image source={this.state.basic.basicCheck}
                                        style={{
                                            width: 10,
                                            height: 10,
                                            marginTop: 5,
                                            resizeMode: "contain",
                                        }}
                                    />
                                    <Text style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginLeft: 10, width: "100%",
                                        textAlign: "left",
                                    }}>Pay per month ($1 subscription) </Text>
                                </View>

                                <Image resizeMode={"contain"} source={this.state.basic.basicImage}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        position: "absolute",
                                        right: 0,
                                        top: 0
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{
                            width: "30%",
                            alignItems: "center",
                            end: 85,
                            justifyContent: "center",
                            backgroundColor: this.state.supreme.supremeBgColor,
                            height: 27,
                            marginTop: 20,
                            borderColor: this.state.supreme.supremeBorderColor,
                            borderWidth: 0.5,
                            borderBottomWidth: 0,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 17,
                                width: "100%",
                                textAlign: "center",
                                color: this.state.supreme.supremeTextColor
                            }}>SUPREME</Text>

                        </View>
                        <TouchableWithoutFeedback onPress={() => this._selectedSupreme()} disabled={(this.state.SelectedBasic && this.state.isSubscription) && true}>
                            <View style={{
                                backgroundColor: this.state.supreme.supremeMainBgColor,
                                width: "90%",
                                marginStart: 20,
                                marginEnd: 20,
                                justifyContent: 'center',
                                borderRadius: 5,
                                marginBottom: 20,
                                borderWidth: 0.5,
                                borderColor: this.state.supreme.supremeMainBorderColor,
                            }}>
                                <Text style={{
                                    color: "white",
                                    marginStart: 30,
                                    marginTop: 15,
                                    fontSize: 14,
                                    textAlignVertical: "top",
                                    marginBottom: 15,
                                    marginEnd: 40,
                                    fontFamily: "AvertaStd-Thin"
                                }}>Unlock all the awesome features CLYPR has to offer! Such as Surge Pricing,
                                    HouseCalls, and much more! 1 flat rate and you can cut as many heads as you
                                        want.</Text>
                                <View style={{ marginLeft: 10, flexDirection: "row", marginBottom: 10 }}>
                                    <Image source={this.state.supreme.supremeCheck}
                                        style={{
                                            width: 10,
                                            height: 10,
                                            marginTop: 5,
                                            resizeMode: "contain",
                                        }}
                                    />
                                    <Text style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                        width: "100%",
                                        textAlign: "left",
                                    }}>{"Pay per month ($5 subscription) "} </Text>
                                </View>

                                <Image resizeMode={"contain"} source={this.state.supreme.supremeImage}
                                    style={{
                                        width: 52,
                                        height: 52,
                                        position: "absolute",
                                        right: 0,
                                        top: 0
                                    }}
                                />

                            </View>
                        </TouchableWithoutFeedback>
                        {/* {
                            this.state.SubscriptionInfo.supreme_barber === false ? */}
                        {!this.state.isSubscription && <TouchableOpacity /* disabled={(this.state.SelectedSupreme == true || this.state.SelectedBasic == true) && true} */
                            onPress={() => {
                                // if (Platform.OS === "ios") {
                                //     this.requestSubscription(this.state.SelectedSupreme ? SUPREME_SUB : BASIC_SUB)
                                // }
                                // else {
                                //     // this.props.navigation.navigate("BarberPaymentMethod")
                                this.Onsubmit()
                                // }
                            }}
                            style={[globalStyles.button, {
                                marginTop: 100,
                                height: 40,
                                width: 260,
                                bottom: 40
                            }]}>
                            <Text style={globalStyles.buttonText}>{Platform.OS === "ios" ? "Pay now" : "SUBMIT"}</Text>

                        </TouchableOpacity>}

                        <PopupDialog
                            visible={this.state.SubscriptionPopUp}
                            width={0.7}

                            onTouchOutside={() => {
                                this.setState({ SubscriptionPopUp: false });
                            }}>
                            <View style={{ flexDirection: "column", backgroundColor: Colors.white }}>
                                <TouchableOpacity onPress={() => this.setState({ SubscriptionPopUp: false })} style={{ width: 30, height: 30, position: "absolute", right: 20, top: 20, zIndex: 9999 }} >
                                    <Image source={require("../../../assets/images/cancelled.png")} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                                <View style={{
                                    width: "100%",
                                    height: 0,
                                    marginTop: 3,
                                    marginBottom: 3,
                                    backgroundColor: "white",
                                    flexDirection: "column",
                                }} />


                                <Text style={{
                                    fontSize: 18,
                                    marginTop: 5,
                                    marginBottom: 20,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "black"
                                }}>Select Option</Text>



                                <View style={{ flexDirection: "column", marginBottom: 30, height: 50 }}>
                                    {/* <TouchableOpacity style={{ width: "100%", height: 50 }} onPress={() => {
                                        this.setState({ SubscriptionPopUp: false }, () => {
                                            this.props.navigation.navigate("BarberPaymentMethod")
                                        })
                                    }} >
                                        <Text style={{ width: "100%", fontSize: 18, marginStart: 20 }}>Stripe</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={{ width: "100%", height: 50 }} onPress={() => {
                                        this.setState({ SubscriptionPopUp: false }, () => {

                                        })
                                    }} >
                                        <Text style={{ width: "100%", fontSize: 18, marginStart: 20, marginTop: 5 }}>Pay Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </PopupDialog>


                        {this.state.isSubscription && <TouchableOpacity onPress={() => {
                            if (Platform.OS == "ios") {
                                // Linking.openURL('https://apps.apple.com/account/subscriptions')
                                this.CancelSubscription()
                            }
                            else {
                                this.CancelSubscription()
                            }
                        }}
                            style={{ bottom: 20, marginBottom: 40, marginTop: 40 }}>
                            <Text style={{ color: "grey", fontSize: 12 }}>I'd Like to Cancel My Membership</Text>
                        </TouchableOpacity>}

                    </View>


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
        );
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
