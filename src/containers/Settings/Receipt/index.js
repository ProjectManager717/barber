import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header, AirbnbRating} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";


export default class Receipt extends Component {

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

    renderRowButtons(item) {
        return <TouchableOpacity
            style={{
                width: "95%",
                height: 26,
                marginTop: 8,
                alignItems: "center",
                justifyContent: "center",
                borderRadius:12,
                borderWidth: 2, borderColor: item.clor,
                backgroundColor:"#626371"
            }}>
            <Text style={globalStyles.receiptButtonText}>{item.text}</Text>

        </TouchableOpacity>;
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
                    <ImageBackground
                        source={require('../../../assets/img_background2.png')}
                        style={styles.container}
                        imageStyle={styles.backgroundImg}
                    >
                        <View
                            style={{flex: 1, flexDirection: "column", marginTop: 100, marginStart: 20, marginEnd: 20}}>
                            <Text style={styles.txtHeader}>BILLING DETAILS</Text>
                            <View style={{width: "100%", flexDirection: "row", marginStart: 30}}>
                                <Text
                                    style={{width: "40%", color: "white", justifyContent: "flex-start", fontSize: 12}}>Invoice
                                    No.2652</Text>
                                <Text style={{
                                    width: "60%",
                                    color: "white",
                                    justifyContent: "flex-end",
                                    marginEnd: 30,
                                    fontSize: 10
                                }}>12th September
                                    2019.9:30am</Text>
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
                                    title: "Anthony Matrial(CYLPR Barbershop)",
                                    ic: require("../../../assets/images/ic_barbershop.png"),
                                })}
                                {this.renderRow({
                                    title: "305 Biscayne Blvd,Miami,FL 33132",
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
                                    <Text style={[styles.row_title, {
                                        width: "75%",
                                        alignItems: "flex-start",
                                        fontWeight: "bold",
                                        fontSize: 16
                                    }]}>{"Subtotal:"}</Text>
                                    <Text style={[styles.row_title, {
                                        width: "25%",
                                        alignItems: "flex-end",
                                        fontWeight: "bold",
                                        fontSize: 16
                                    }]}>{"$35.00"}</Text>
                                </View>
                                {this.renderRow2({
                                    title: "Service Fee",
                                    value: "$1.25",
                                })}
                                {this.renderRow2({
                                    title: "Tip Left",
                                    value: "$8.00",
                                })}
                                {this.renderRow2({
                                    title: "Surge Price",
                                    value: "$17.50",
                                })}
                                <View style={{width: "100%", flexDirection: 'row', height: 36}}>
                                    <Text style={[styles.row_title, {
                                        width: "75%",
                                        alignItems: "flex-start",
                                        fontWeight: "bold",
                                        fontSize: 16
                                    }]}>{"Total:"}</Text>
                                    <Text style={[styles.row_title, {
                                        width: "25%",
                                        alignItems: "flex-end",
                                        fontWeight: "bold",
                                        fontSize: 16
                                    }]}>{"$61.75"}</Text>
                                </View>

                            </View>
                            <Text style={styles.txtHeader}>REVIEW LEFT</Text>
                            <View style={[globalStyles.rowBackground, styles.row]}>
                                <View style={{flexDirection: "row", width: "100%"}}>
                                    <View style={{
                                        flexDirection: "column",
                                        width: "27%",
                                        height: "100%",
                                        marginStart: 15,
                                        marginTop: 10
                                    }}>
                                        <AirbnbRating
                                            showRating={false}
                                            count={5}
                                            defaultRating={ratings}
                                            size={14}
                                            style={{marginStart: 10, height: 30}}
                                        />
                                        <Text style={{marginStart: 10, color: Colors.white}}>{ratings} of 5.0</Text>
                                    </View>
                                    <View style={{flexDirection: "column", width: "32%", marginStart: 5}}>
                                        {this.renderRowButtons({
                                            text: "Good Quality",
                                            clor:"#D05916"

                                        })}
                                        {this.renderRowButtons({
                                            text: " Cleanliness",
                                            clor:"#47EF00"

                                        })}

                                    </View>
                                    <View style={{
                                        flexDirection: "column",
                                        width: "32%",
                                        marginStart: 5,
                                        marginBottom: 10
                                    }}>
                                        {this.renderRowButtons({
                                            text: "Punctuality",
                                            clor:"#1358CA"

                                        })}

                                        {this.renderRowButtons({
                                            text: "Professional",
                                            clor:"#FF39F4"

                                        })}
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginTop: 40,
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 20
                            }}>
                                <Text style={{fontSize: 16, color: "white"}}>{"Does something look wrong?"}</Text>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{fontSize: 16, color: "red"}}>{"Contact us "}</Text>
                                    <Text style={{fontSize: 16, color: "white"}}>{"if you have any disputes"}</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>

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
