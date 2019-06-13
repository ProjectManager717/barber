import React, {Component} from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput, Picker,
    ImageBackground
} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {Header} from "react-native-elements";
import {NavigationActions, StackActions} from "react-navigation";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";

export default class PaymentMethod extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cardNumber: "",
            month: "04",
            year: "19",
            cvc: "",
            cardHolderName: "",
            pickMonth: false,
            isConnected: true
        }
        console.disableYellowBox = true;
        //this.state = {text: ' 4242 - 4242 - 4242- 4242'};
    }

    saveCard = () => {
        /*const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'ClientTabNavigator'})],
        });
        this.props.navigation.dispatch(resetAction);*/
        let usertype = "";
        if (Preference.get("userType") === "Barber")
            usertype = "barber";
        else
            usertype = "client";

        if (this.state.isConnected) {
            if (this.state.cardNumber === "" || this.state.cardNumber.length < 16 ||
                this.state.month === "" || this.state.year === "" || this.state.cvc === "" || this.state.cardHolderName === "") {
                alert("Please enter full data.");
            } else {
                var details = {
                    user_id: Preference.get("userId"),
                    card_number: this.state.cardNumber,
                    expiration_date: this.state.month + "/" + this.state.year,
                    cvc: this.state.cvc,
                    card_holder_name: this.state.cardHolderName,
                    user_type: usertype,
                };
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(constants.ClientPaymentMethod, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                        if (response.ResultType === 1) {
                            alert("Card Updated successfully");
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'ClientTabNavigator'})],
                            });
                            this.props.navigation.dispatch(resetAction);
                        } else {
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        } else {
            alert("Please connect Internet");
        }


        //this.props.navigation.navigate("ClientTabNavigator");
    }

    render() {
        return (<View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "PAYMENT METHOD", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={<TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Image
                            style={{
                                tintColor: 'white',
                                height: 20,
                                resizeMode: 'contain'
                            }}
                            source={require("../../../assets/images/ic_back.png")}
                        />
                    </TouchableOpacity>}
                />
                <ScrollView>
                    <View style={{flexDirection: "column"}}>
                        <View style={{width: "100%",}}>
                            <View style={{width: "100%", flexDirection: "column", alignItems: "center"}}>

                                <ImageBackground resizeMode={"contain"}
                                                 source={require("../../../assets/images/paycard_bg.png")}
                                                 style={{width: "100%", height: 240}}>
                                    <Image resizeMode={"contain"}
                                           source={require("../../../assets/images/rectangle.png")}
                                           style={[{
                                               position: "absolute",
                                               height: 27, top: 60, left: 35
                                           }]}/>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/viss.png")}
                                           style={[{
                                               position: "absolute",
                                               height: 15, top: 65, right: 30

                                           }]}/>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/Forma1.png")}
                                           style={[{
                                               position: "absolute",
                                               height: 23, top: 130, right: "41%",
                                               justifyItems: "center"
                                           }]}/>
                                    <Text style={[{textAlign: "center", color: "white", top: 160, fontSize: 12}]}>
                                        Scan Credit Card</Text>

                                </ImageBackground>
                            </View>
                        </View>
                        <View style={{marginStart: 10, marginEnd: 10}}>
                            <Text style={styles.txtHeader}>CARD NUMBER</Text>

                            <TouchableOpacity>
                                <View style={[globalStyles.rowBackground, {flex: 1, flexDirection: 'row', height: 40}]}>
                                    <Image style={[styles.right_arrow]}
                                           source={require("../../../assets/images/vcircle.png")}/>
                                    <TextInput style={{fontSize: 15, color: 'white', marginStarts: 5}}
                                               value={this.state.cardNumber}
                                               placeholder={"4242-4242-4242-4242"}
                                               onChangeText={(text) => this.setState({cardNumber: text})}
                                               placeholderTextColor={"white"}/>
                                </View>
                            </TouchableOpacity>

                            <View style={{flexDirection: "row", width: "100%"}}>
                                <View style={{width: "65%"}}>
                                    <Text style={styles.txtHeader}>EXPIRATION DATE</Text>
                                </View>
                                <View style={{width: "35%"}}>
                                    <Text style={styles.txtHeader}>CVV/CVC</Text>
                                </View>
                            </View>


                            <View style={{width: "100%", flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => this.setState({pickMonth: true})}
                                                  style={[styles.row_back, {width: "25%", marginStart: 10}]}>
                                    <Picker selectedValue={this.state.month}
                                            style={{width: 100, color: "white", marginBottom: 5}}
                                            onValueChange={(txt) => this.setState({month: txt})}>
                                        <Picker.Item label="01" value="01"/>
                                        <Picker.Item label="02" value="02"/>
                                        <Picker.Item label="03" value="03"/>
                                        <Picker.Item label="04" value="04"/>
                                        <Picker.Item label="05" value="05"/>
                                        <Picker.Item label="06" value="06"/>
                                        <Picker.Item label="07" value="07"/>
                                        <Picker.Item label="08" value="08"/>
                                        <Picker.Item label="09" value="09"/>
                                        <Picker.Item label="10" value="10"/>
                                        <Picker.Item label="11" value="11"/>
                                        <Picker.Item label="12" value="12"/>
                                    </Picker>

                                    {/*  <Text style={{fontSize: 15, color: 'white', marginStart: 10, marginTop: 10}}
                                          placeholder={this.state.month}
                                          placeholderTextColor={"white"}>{this.state.month}</Text>
                                    <Image resizeMode={"contain"} style={[styles.dropDown]}
                                           source={require("../../../assets/images/dropdown.png")}/>*/}
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.row_back, {width: "25%", marginStart: 5}]}>
                                    <Picker selectedValue={this.state.month}
                                            style={{width: 100, color: "white", marginBottom: 5}}
                                            onValueChange={(txt) => this.setState({month: txt})}>
                                        <Picker.Item label="19" value="19"/>
                                        <Picker.Item label="20" value="20"/>
                                        <Picker.Item label="21" value="21"/>
                                        <Picker.Item label="22" value="22"/>
                                        <Picker.Item label="23" value="23"/>
                                        <Picker.Item label="24" value="24"/>
                                        <Picker.Item label="25" value="25"/>
                                        <Picker.Item label="26" value="26"/>
                                        <Picker.Item label="27" value="27"/>
                                        <Picker.Item label="28" value="28"/>
                                        <Picker.Item label="29" value="29"/>
                                        <Picker.Item label="30" value="30"/>
                                        <Picker.Item label="31" value="31"/>
                                        <Picker.Item label="32" value="32"/>
                                        <Picker.Item label="33" value="33"/>
                                        <Picker.Item label="34" value="34"/>
                                        <Picker.Item label="35" value="35"/>
                                    </Picker>
                                    {/*<Text style={{fontSize: 15, color: 'white', marginStart: 10, marginTop: 10}}
                                          placeholder={this.state.year}
                                          placeholderTextColor={"white"}>{this.state.year}</Text>
                                    <Image resizeMode={"contain"} style={[styles.dropDown]}
                                           source={require("../../../assets/images/dropdown.png")}/>*/}
                                </TouchableOpacity>
                                <View style={{width: "17%",}}>

                                </View>

                                <View style={[styles.row_back, {width: "25%"}]}>
                                    <TextInput style={{fontSize: 15, color: 'white', marginStart: 5}}
                                               value={this.state.cvc}
                                               placeholder={"123"}
                                               onChangeText={(text) => this.setState({cvc: text})}
                                               placeholderTextColor={"white"}/>
                                </View>
                            </View>
                            <Text style={styles.txtHeader}>CARD HOLDER NAME</Text>
                            <View style={{flex: 1, flexDirection: 'column', width: "100%"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <TextInput
                                        style={{height: 40, color: "white", marginStart: 28}}
                                        placeholder={"Card holder name"}
                                        value={this.state.cardHolderName}
                                        onChangeText={(text) => this.setState({cardHolderName: text})}
                                        placeholderTextColor={"white"}
                                    />
                                </View>
                                <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 10}}></View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this.saveCard} style={[globalStyles.button, {
                            marginTop: 40,
                            height: 35,
                            width: 260,
                            marginBottom: 30
                        }]}>
                            <Text style={{fontSize: 14, fontWeight: "bold", color: "white"}}>Add My Card</Text>
                        </TouchableOpacity>
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
        height: 20,
        width: 20,

    },
    row_back: {
        backgroundColor: Colors.gray,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 5,
        flexDirection: "row",
        margin: 1,
        height: 40
    },
    dropDown: {
        position: 'absolute',
        right: 14,
        alignSelf: 'center',
        height: 10,
        width: 10,

    }
});
