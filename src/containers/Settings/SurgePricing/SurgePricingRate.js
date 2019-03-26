import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";


export default class SurgePricingRate extends Component {

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
                                source={require("../../../assets/images/ic_back.png")}/>
                        </TouchableOpacity>
                    }/>
                <ScrollView>
                    <View style={{flexDirection: "column",alignItems:"center"}}>
                        <View style={[styles.row, {marginTop: 20}]}>
                            <Text style={[{textAlign: "center", color: "white",fontWeight:"bold",fontSize:13}]}>
                                Your price on this session</Text>
                            <Text style={[{textAlign: "center", color: "white",fontWeight:"bold",fontSize:13}]}>
                                will be higher than normal,when</Text>
                            <Text style={[{textAlign: "center", color: "white",fontWeight:"bold",fontSize:13}]}>
                                demand is high we increase the rates.</Text>
                        </View>
                        <Image resizeMode={"contain"} style={{width:300,height:300}}
                               source={require("../../../assets/images/circle_rates.png")}/>
                        <View style={{alignItems: "center",flexDirection:"column"}}>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 25,
                                    width: 160,
                                    backgroundColor: "#494A56",
                                }}>
                                <Text style={[globalStyles.buttonText, {color: "#16ABDB"}]}>Surge Price</Text>
                                <Text style={[globalStyles.buttonText, {color: "#16ABDB",marginBottom:5}]}>+$12.50</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[globalStyles.button, {
                                height: 35,
                                width: 250,
                                backgroundColor: "red",
                                marginTop:20,
                            }]}>
                                <Text style={{fontSize:14,fontWeight:"bold",color:"white"}}>Accept Higher Rate</Text>
                            </TouchableOpacity>
                            <Text style={{textAlign: "center", color: "white",marginTop:20,fontSize:12}}>
                                Current Rate Expires in 10 Minutes</Text>
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
