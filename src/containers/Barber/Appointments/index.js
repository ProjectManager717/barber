import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";


export default class Appointments extends Component {


    renderRowSurge(item) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                <Image style={styles.leftIcon} source={item.ic}/>
                <Text style={styles.row_title}>{item.title}</Text>
                <Switch
                    onTintColor="#00D200"
                    thumbTintColor="#fff"
                    value={true} style={{
                    position: 'absolute',
                    top: 5,
                    right: 14,
                    alignSelf: 'center',
                    tintColor: 'white',
                }}/>
            </View>
            <Text style={{marginStart: 30, color: "grey", fontStyle: "italic", height: 20}}>{item.hint}</Text>
        </View>
    }


    renderRowapp(item) {
        return <View style={{
            flexDirection: "row",
            width: "100%",
            height: 60,
            marginTop: 10
        }}>
            <View style={{width: "20%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                <Image resizeMode={"contain"} source={item.ic} style={{width: 40, height: 40}}/>
            </View>
            <View style={{width: "80%", height: "100%", justifyContent: "center", marginStart: 10}}>
                <Text style={{fontSize: 12, color: "white"}}>
                    {item.text1}
                </Text>
                <Text style={{fontSize: 12, color: "#6D757D"}}>
                    {item.text2}
                </Text>
            </View>
        </View>
    }

    renderRowBox(item) {
        return <View style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <TouchableOpacity style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Image source={item.img} style={{resizeMode: "contain", height: 25, width: 25}}/>
                <Text style={{fontWeight: "bold", fontSize: 16, color: "white"}}>
                    {item.title}
                </Text>
            </TouchableOpacity>
            <View style={{width: 0.5, backgroundColor: "#52525D", marginStart: 50}}></View>
        </View>
    }

    renderRowButtons(item) {
        return <View style={{flexDirection: 'row', height: "100%", marginStart: 30}}>
            <TouchableOpacity
                style={{
                    width: 100,
                    flexDirection: "row",
                    height: 28,
                    marginTop: 8,
                    bottom: 20,
                    marginBottom: 70,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    borderWidth: 0.2,
                    borderColor: "white",
                    backgroundColor: "#626371"
                }}>
                <Image source={require("../../../assets/images/tick.png")}
                       style={{resizeMode: "contain", height: 15, width: 15}}/>
                <Text style={[globalStyles.receiptButtonText, {marginStart: 5, fontWeight: "bold"}]}>{item.text}</Text>

            </TouchableOpacity></View>
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "SURGE PRICING", style: {color: "#fff"}}}
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
                    <View style={{flexDirection: "column"}}>
                        <View style={{height: 300, width: "100%"}}>
                            <View style={{width: "100%", height: 200}}>
                                <Image resizeMode={"cover"} source={require("../../../assets/images/banner_surge.png")}
                                       style={{width: "100%", height: "100%"}}/>
                            </View>
                            <View style={{
                                flexDirection: "column",
                                width: "100%",
                                position: "absolute",
                                alignItems: "center",
                                top: 120
                            }}>
                                <Image resizeMode={"contain"} source={require("../../../assets/images/user_surge.png")}
                                       style={[styles.profileImage, {position: "absolute", width: 150, height: 150}]}/>
                                <Text style={{marginTop: 155, fontSize: 16, color: "white", fontWeight: "bold"}}>Grarad
                                    Pequie</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                            height: 80,
                            backgroundColor: "grey",
                            marginTop: 15
                        }}>
                            <View style={{width: "33.3%", backgroundColor: "#5BD900", height: "100%"}}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/tick-2.png"),
                                    title: "Complete"
                                })}
                            </View>
                            <View style={{width: "33.3%", backgroundColor: "#A5AAAE", height: "100%"}}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/-.png"),
                                    title: "No-Show"
                                })}
                            </View>
                            <View style={{width: "33.3%", backgroundColor: "#F7001E", height: "100%"}}>
                                {this.renderRowBox({
                                    img: require("../../../assets/images/x.png"),
                                    title: "Cancel"
                                })}
                            </View>
                        </View>
                        {this.renderRowapp({
                            ic: require("../../../assets/images/calender.png"),
                            text1: "Wednesday, November 23,2019",
                            text2: "11:00AM - 11:45AM ",
                        })}
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Receipt")}>
                            {this.renderRowapp({
                                ic: require("../../../assets/images/surg_price.png"),
                                text1: "$35",
                                text2: "SURGE PRICE : $17.50"
                            })}
                        </TouchableOpacity>
                        <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 90, marginTop: 10}}></View>
                        <Text style={{
                            fontSize: 11,
                            color: "#6D757D",
                            marginStart: 25,
                            marginTop: 10,
                            fontWeight: "bold"
                        }}>SERVICES
                            SELECTED </Text>
                        <View style={{flexDirection: "row", width: "100%", marginTop: 25}}>
                            {this.renderRowButtons({
                                text: "Haircut",
                            })}
                            {this.renderRowButtons({
                                text: "Beard Trim",
                            })}
                        </View>
                    </View>

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
        marginTop: 10,
        marginLeft: 8,
        alignSelf: 'center',
        resizeMode: "contain"
    },
    leftIcon2: {
        height: 16,
        width: 16,
        marginTop: 6,
        marginRight: 8,
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
