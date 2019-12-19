import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight,TouchableWithoutFeedback} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";

import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";

export default class Subscription extends Component {
    state = {
        showLoading:false,
        SubscriptionInfo:[],
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

    }

    componentDidMount(): void {
         this.SubscriptionInfo();

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
            SelectedSupreme:false,

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
        if (Preference.get("newUser") === true) {
            if (this.state.SelectedBasic === true) {
                Preference.set("userPackage", "basic");
                 this.CancelSubscription();
                this.props.navigation.navigate("BookingPreferences");
            } else if (this.state.SelectedSupreme === true) {
                if(this.state.SubscriptionInfo.account_subscription_type===2&&this.state.SubscriptionInfo.supreme_barber===true){
                    alert("You are already a Supreme User");
                    this.props.navigation.navigate("BookingPreferences");
                    Preference.set("userPackage", "supreme");
                }else{
                    this.props.navigation.navigate("BarberPaymentMethod")}
            }
        } else {
            if (this.state.SelectedBasic === true) {
                Preference.set("userPackage", "basic");
                 this.CancelSubscription();
                this.props.navigation.goBack()
            } else if (this.state.SelectedSupreme === true) {
                if(this.state.SubscriptionInfo.account_subscription_type===2&&this.state.SubscriptionInfo.supreme_barber===true){
                    alert("You are already a Supreme User");
                    Preference.set("userPackage", "supreme");
                }else{
                    this.props.navigation.navigate("BarberPaymentMethod")}

            }
        }


    }

    SubscriptionInfo(){

            this.setState({showLoading:true});
            var details = {
                barberID:Preference.get("userId")
            };
            console.log("userid----->"+JSON.stringify(details));

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
                    console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                    this.setState({showLoading:false});
                    if (response.ResultType === 1) {
                        this.setState({SubscriptionInfo:response.Data},()=>{
                            console.log("SUBCRIPTIOn INfo"+JSON.stringify(this.state.SubscriptionInfo))})
                        if (this.state.SubscriptionInfo.supreme_barber===true &&this.state.SubscriptionInfo.account_subscription_type===2 ){
                            this._selectedSupreme();
                        }
                        else {
                            this._selectedBasic();
                        }


                    } else {
                        if (response.ResultType === 0) {
                            alert(response.Message);

                        }
                    }
                })
                .catch(error => {
                    //console.error('Errorr:', error);
                    console.log('Error:', error);
                    this.setState({showLoading:false})
                    alert("Error: "+error);
                });

        }


    CancelSubscription(){

        this.setState({showLoading:true});
        var details = {
            barberEmail:Preference.get("userEmail"),
            accountSubscriptionType:1,
            supremeBarber:false
        };
        console.log("userid----->"+JSON.stringify(details));

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
                console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                this.setState({showLoading:false});
                if (response.ResultType === 1) {
                    alert("Basic Subscription Activated");
                   this.SubscriptionInfo();


                } else {
                    if (response.ResultType === 0) {
                        //alert(response.Message);

                    }
                }
            })
            .catch(error => {
                //console.error('Errorr:', error);
                console.log('Error:', error);
                this.setState({showLoading:false});
                //alert("Error: "+error);
            });

    }



    render() {
        return (<View style={styles.container}>

                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "SUBSCRIPTION", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image
                                style={{tintColor: 'white', height: 20, resizeMode: 'contain'}}
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
                            }}/>
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
                                }}>{"BASIC"}</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this._selectedBasic()}>
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
                                    <View style={{marginLeft: 10, flexDirection: "row", marginBottom: 10}}>
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
                                            marginLeft: 10
                                        }}>Pay by appointment ($0.15 each) </Text>
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
                                    color: this.state.supreme.supremeTextColor
                                }}>SUPREME</Text>

                            </View>
                            <TouchableWithoutFeedback onPress={() => this._selectedSupreme()}>
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
                                    <View style={{marginLeft: 10, flexDirection: "row", marginBottom: 10}}>
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
                                            marginLeft: 10
                                        }}>{"Pay per month($30 subscription) "} </Text>
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

                            <TouchableOpacity onPress={() => this.Onsubmit()}
                                              style={[globalStyles.button, {
                                                  marginTop: 100,
                                                  height: 40,
                                                  width: 260,

                                                  bottom: 40
                                              }]}>
                                <Text style={globalStyles.buttonText}>SUBMIT</Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.CancelSubscription()}
                                              style={{bottom: 20, marginBottom: 40}}>
                                <Text style={{color: "grey", fontSize: 12}}>I'd Like to Cancel My Membership</Text>
                            </TouchableOpacity>

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
                           style={{width: 60, height: 60, opacity: 1,}}/>
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
