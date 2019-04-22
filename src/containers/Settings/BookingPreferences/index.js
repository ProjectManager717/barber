import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";


export default class BookingPreferences extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobilePayCheck: false,
            inShopCheck: false,
        };
        console.disableYellowBox = true;
    }

    renderRowWithCheck(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 22, marginLeft: 40}}>
            <CheckBoxSquare onClick={() => {
            }} isChecked={true} style={{alignSelf: 'center'}}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    renderRow(item) {
        return <View style={{flex: 1, flexDirection: 'column', height: 46}}>
            <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                <Image style={styles.leftIcon} source={item.ic}/>
                <Image style={styles.leftIcon} source={require("../../../assets/images/radio_selected.png")}/>
               {/* <CheckBoxSquare
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={false}
                    style={{alignSelf: 'center',marginStart:5}}
                />*/}
                <Text style={styles.row_title}>{item.title}</Text>
            </View>
            <Text style={{marginStart:30,color: "grey",fontSize:12,fontStyle:"italic"}}>{item.hint}</Text>
        </View>;
    }

    renderRowAppointment(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 36}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={styles.row_title}>{item.title}</Text>
            <Switch
                onTintColor="#00D200"
                thumbTintColor="#fff"
                value={true} style={{
                position: 'absolute',
                right: 14,
                alignSelf: 'center',
                tintColor: 'white'
            }}/>
        </View>;
    }
    renderRowTimer(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 36}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    renderSeperator() {
        return <View style={{marginLeft: 40, height: 0.5, backgroundColor: Colors.lightGrey}}></View>
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "BOOKING PREFERENCES", style: {color: "#fff"}}}
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

                    <Text style={styles.txtHeader}>ACCEPT PAYMENT OPTIONS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRow({
                            title: "Mobile Pay",
                            ic: require("../../../assets/images/mobile_pay.png"),
                            hint: "Payment through the App"
                        })}
                        {this.renderSeperator()}
                        {this.renderRow({
                            title: "In Shop",
                            ic: require("../../../assets/images/inshop.png"),
                            hint: "Cash,Card and Other"
                        })}
                    </View>

                    <Text style={styles.txtHeader}>APPOINTMENTS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowAppointment({
                            title: "Auto Confirm",
                            ic: require("../../../assets/images/AUTO.png")
                        })}
                        {this.renderSeperator()}
                        {this.renderRowAppointment({
                            title: "Multiple Services",
                            ic: require("../../../assets/images/multiple_service.png")
                        })}
                    </View>

                    <Text style={styles.txtHeader}>LAST MINUTE BOOKING</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowTimer({
                            title: "30 Minutes",
                            ic: require("../../../assets/images/mins_30.png")
                        })}
                        <Text  style={{marginStart:30,color: "grey",fontSize:12,fontStyle:"italic"}}>{"Limited"}</Text>
                        <View style={{marginStart: 30, marginEnd:10,height: 15,marginBottom:3, backgroundColor:"#5A5B68",
                            borderRadius:10  }}>
                            <Text style={{
                                marginStart:5,

                                fontSize: 10,
                                color: "white",

                            }}>{"Client can Book Appointment with you up until last minutes "}</Text>
                        </View>
                    </View>
                    {this.renderRowWithCheck({title: "Every 15 Minutes"})}
                    {this.renderRowWithCheck({title: "Every 20 Minutes"})}
                    {this.renderRowWithCheck({title: "Every 30 Minutes"})}

                    <Text style={styles.txtHeader}>AVAILABILITY</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowTimer({
                            title: "Every 30 Minutes",
                            ic: require("../../../assets/images/every_30_min.png"),
                        })}
                        <Text  style={{marginStart:30,color: "grey",fontSize:12,fontStyle:"italic"}}>{"Calender Interval"}</Text>
                    </View>
                    {this.renderRowWithCheck({title: "Every 15 Minutes"})}
                    {this.renderRowWithCheck({title: "Every 20 Minutes"})}
                    {this.renderRowWithCheck({title: "Every 30 Minutes"})}

                    <TouchableOpacity style={[globalStyles.button, {marginTop: 70, marginBottom: 30, width: '70%'}]}
                                      onPress={() => {
                                          this.props.navigation.goBack();
                                      }}>
                        <Text style={globalStyles.buttonText}>DONE</Text>
                    </TouchableOpacity>
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
