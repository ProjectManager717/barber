import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header, AirbnbRating} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";


export default class ReceiptCancelled extends Component {

    constructor(props) {
        super(props)
        this.state={
            showLoading:false,
        }
    }

    componentDidMount(): void {
        this.getRecieptDetails();
    }

    getRecieptDetails() {
        this.setState({showLoading:true})
        fetch(constants.ClientRecieptCancelled + "/" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getBarberDetails-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading:false})
                    let barberData = response.Data;
                } else {
                    this.setState({showLoading:false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            this.setState({showLoading:false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    renderRow(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 30}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    renderRow2(item) {
        return <View style={{width: "100%", flexDirection: 'row', height: 30}}>
            <Text style={[styles.row_title, {
                width: "75%",
                justifyContent: "flex-start",
                marginStart: 10
            }]}>{item.title}</Text>
            <Text style={[styles.row_title, {width: "25%", justifyContent: "flex-end",}]}>{item.value}</Text>
        </View>;
    }


    renderSeperator() {
        return <View style={{height: 0.5, backgroundColor: Colors.lightGrey}}></View>
    }

    render() {
        let ratings = Math.floor(Math.random() * 5 + 1);
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "RECEIPT", style: {color: "#fff"}}}
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


                    <View
                        style={{flex: 1, flexDirection: "column", marginBottom: 150}}>
                        <View style={{width: "100%", alignItems: "center"}}>
                            <Image
                                source={require("../../../assets/images/logo.png")}
                                style={{marginTop: 20, resizeMode: 'contain', width: 200}}/>
                        </View>
                        <Text style={styles.txtHeader}>CANCELLED</Text>
                        <View style={{width: "100%", flexDirection: "row", marginStart: 30}}>
                            <Text style={{width: "40%", color: "white", justifyContent: "flex-start", fontSize: 12}}>Invoice
                                No.00305</Text>
                            <Text style={{
                                justifyContent: "flex-end",
                                fontSize: 12,
                                color: "#71747A"
                            }}>{"13th September 2019"}</Text>
                            <Text style={{color: "white"}}>{" - 9:30am"}</Text>
                        </View>
                        <View style={[globalStyles.rowBackground, styles.row]}>
                            <Text style={{
                                color: "white",
                                alignItems: "flex-start",
                                fontSize: 16,
                                fontWeight: "bold",
                                marginStart: 10,
                                marginTop: 10
                            }}>To be paid to:</Text>
                            {this.renderRow({
                                title: "Anthony Matrial (CYLPR Barbershop)",
                                ic: require("../../../assets/images/ic_barbershop.png"),
                            })}
                            {this.renderRow({
                                title: "305 Biscayne Blvd, Miami, FL 33132",
                                ic: require("../../../assets/images/location.png"),
                            })}
                            {this.renderSeperator()}
                            {this.renderRow2({
                                title: "Haircut",
                                value: "$20.00",
                            })}
                            {this.renderRow2({
                                title: "Beard Trim",
                                value: "$15.00",
                            })}
                            {this.renderSeperator()}
                            <View style={{width: "100%", flexDirection: 'row', height: 36}}>
                                <Text style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 16,
                                    width: "75%",
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 10
                                }}>{"Subtotal:"}</Text>
                                <Text style={{
                                    color: "white",
                                    width: "25%",
                                    alignItems: "flex-end",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 10
                                }}>{"$35.00"}</Text>
                            </View>
                            {this.renderRow2({
                                title: "Service Fee",
                                value: "$1.25",
                            })}

                            {this.renderRow2({
                                title: "Surge Price",
                                value: "$17.50",
                            })}
                            <View style={{width: "100%", flexDirection: 'row', height: 36}}>
                                <Text style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 16,
                                    width: "75%",
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 5
                                }}>{"Total:"}</Text>
                                <Text style={{
                                    color: "white",
                                    width: "25%",
                                    alignItems: "flex-end",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 5
                                }}>{"$61.75"}</Text>

                            </View>
                            {this.renderSeperator()}


                            <Text style={{
                                color: "white",
                                alignItems: "flex-start",
                                fontSize: 16,
                                width: "75%",
                                fontWeight: "bold",
                                marginStart: 10,
                                marginTop: 5,
                            }}>{"Cancelled by:"}</Text>
                            <Text
                                style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 14,
                                    width: "75%",
                                    marginStart: 10,
                                }}>{"Dani Alvez (Client) "}</Text>
                            <View style={{width: "100%", flexDirection: 'row', height: 36}}>
                                <Text style={{
                                    color: "white",
                                    alignItems: "flex-start",
                                    fontSize: 15,
                                    width: "40%",
                                    fontWeight: "bold",
                                    marginStart: 10,
                                    marginTop: 10,
                                }}>{"Time Cancelled:"}</Text>
                                <Text style={{
                                    color: "white",
                                    width: "55%",
                                    textAlign: "center",
                                    fontSize: 14,
                                    //backgroundColor:"red",
                                    marginTop: 10
                                }}>{"2nd September at 10:00 AM"}</Text>
                            </View>
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
