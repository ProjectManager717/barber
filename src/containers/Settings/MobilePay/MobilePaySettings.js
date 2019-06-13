import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";

export default class MobilePaySettings extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {text: 'Useless Placeholder'};
    }

    renderRowMP(item) {
        return <View style={{flex: 1, flexDirection: 'row',}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={styles.row_title}>{item.title}</Text>

        </View>;
    }

    renderRowInput(item) {
        return <View style={{flex: 1, flexDirection: 'column', width: "100%"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TextInput
                    style={{height: 40, color: "#52525D", marginStart: 50}}
                    onChangeText={(text) => this.setState({text})}
                    value={item.hintText}
                />
                {item.showIC && <Image resizeMode={"contain"} source={require("../../../assets/images/question.png")}
                                       style={{
                                           width: 20,
                                           height: 20,
                                           position: "absolute",
                                           right: 20,
                                           visibility: "hidden"
                                       }}/>}
            </View>
            <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 50}}></View>

        </View>;
    }

    renderRowWithChecks(item) {
        return <View style={{flexDirection: 'row', height: 22, marginStart: 50}}>
            <CheckBoxSquare onClick={() => {
            }} isChecked={true} style={{alignSelf: 'center'}}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }


    render() {
        return (<View style={styles.container}>


            <Header
                statusBarProps={{barStyle: "light-content"}}
                barStyle="light-content" // or directly
                style={{backgroundColor: "yellow"}}
                outerContainerStyles={{backgroundColor: "#1999CE"}}
                centerComponent={{text: "MOBILE PAY", style: {color: "#fff"}}}
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
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{color: "white", marginTop:25 ,justifyContent: "center", fontWeight:"bold" ,alignItems: "center", fontSize: 13}}>
                        By enabling Mobile Pay, </Text>
                    <Text style={{color: "white", justifyContent: "center", alignItems: "center", fontSize: 13,fontWeight:"bold"}}>
                        You agree to CLYPR Terms and Services </Text>

                    <View style={[globalStyles.rowBackground, styles.col, {marginTop: 20, height: 30, width: 320}]}>
                        {this.renderRowMP({
                            title: "LEGAL PERSONAL INFORMATION",
                            ic: require("../../../assets/images/legalInfo.png"),
                        })}
                    </View>
                    {this.renderRowInput({
                        hintText: "First Name",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "Last Name",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "Date Of Birth (MM/DD/YY)",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "Personal ID Number",
                        showIC: true
                    })}
                    <View style={[globalStyles.rowBackground, styles.col, {marginTop: 20, height: 30, width: 320}]}>
                        {this.renderRowMP({
                            title: "ADDRESS",
                            ic: require("../../../assets/images/address.png"),
                        })}
                    </View>
                    {this.renderRowInput({
                        hintText: "Street Address",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "City",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "State/Region",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "Zip Code",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "Country",
                        showIC: true
                    })}

                    <View style={{
                        marginTop: 10, marginEnd: 35, height: 20, marginBottom: 3, backgroundColor: "#5A5B68",
                        borderRadius: 10,justifyContent:"center"
                    }}>
                        <Text style={{
                            marginStart: 5,
                            fontSize: 10,
                            color: "white",
                        }}>{" This Should be Your Current Home Address    "}</Text>
                    </View>

                    <View style={[globalStyles.rowBackground, styles.col, {marginTop: 20, height: 30, width: 320}]}>
                        {this.renderRowMP({
                            title: "BANK DIRECT DEPOSIT",
                            ic: require("../../../assets/images/deposit.png"),
                        })}
                    </View>
                    <View style={{flexDirection: "row", width: "100%", marginTop: 10}}>
                        {this.renderRowWithChecks({title: "Checking"})}
                        {this.renderRowWithChecks({title: "Savings"})}
                    </View>
                    {this.renderRowInput({
                        hintText: "Bank Account Holder Name",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "Bank Routing Number",
                        showIC: false
                    })}
                    {this.renderRowInput({
                        hintText: "Bank Account Number",
                        showIC: false
                    })}


                </View>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("TabNavigator");
                }}
                    style={[globalStyles.button, {
                    marginTop:70,
                    height: 40,
                    width: 260,
                    marginBottom:30


                }]}>
                    <Text style={globalStyles.buttonText}>DONE</Text>
                </TouchableOpacity>

            </ScrollView>




        </View>);
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