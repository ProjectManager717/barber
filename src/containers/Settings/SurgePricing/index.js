import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity,TextInput} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import PopupDialog from 'react-native-popup-dialog';
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";


export default class SurgePricing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surgePrice: false,
            holidays: false,
            birthday: false,
            anyDayAfter10: false,
            houseCall: false,
            radiousLimit:0,
            duration:0,
            price:0,
            DialogVisible: false,
        }
    }

    setSurgePrice() {
        if (this.state.surgePrice === true)
            this.setState({surgePrice: false})
        else
            this.setState({surgePrice: true})
    }

    checkBox(val) {
        if (val === "Holidays") {
            if (this.state.holidays === false)
                this.setState({holidays: true})
            else
                this.setState({holidays: false})
        } else if (val === "Birthday") {
            if (this.state.birthday === false)
                this.setState({birthday: true})
            else
                this.setState({birthday: false})
        } else if (val === "Any Day After 10 PM") {
            if (this.state.anyDayAfter10 === false)
                this.setState({anyDayAfter10: true})
            else
                this.setState({anyDayAfter10: false})
        } else if (val === "HouseCall") {
            if (this.state.houseCall === false)
                this.setState({houseCall: true})
            else
                this.setState({houseCall: false})
        }

    }


    renderRowWithCheck(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 22, marginLeft: 40}}>
            <CheckBoxSquare onClick={() =>this.checkBox(item.title)} isChecked={item.value}
                            style={{alignSelf: 'center'}}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    renderRowSurge(item) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                <Image style={styles.leftIcon} source={item.ic}/>
                <Text style={styles.row_title}>{item.title}</Text>
                <Switch
                    trackColor="#00D200"
                    thumbColor="#fff"
                    onChange={()=> this.setSurgePrice()}
                    value={this.state.surgePrice} style={{
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

    renderRowSurge2(item) {
        return <View style={{flex: 1, flexDirection: 'row', marginStart: 15, marginTop: 5}}>
            <Text style={{color: "grey", fontSize: 9}}>{item.hint}</Text>
            <Text style={{marginLeft: 7, fontSize: 10, fontWeight: "bold", color: "white"}}>{item.value}</Text>
        </View>
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
                    <View style={[globalStyles.rowBackground, styles.row, {marginTop: 20}]}>
                        {this.renderRowSurge({
                            title: "Surge Pricing",
                            ic: require("../../../assets/images/surge_pricing.png"),
                            hint: "Supreme MemberShip Only"
                        })}
                        <View style={{marginStart: 30, height: 15, marginBottom: 3}}>

                        </View>
                    </View>
                    {this.renderRowWithCheck({title: "Holidays",value:this.state.holidays})}
                    {this.renderRowWithCheck({title: "Birthday",value:this.state.birthday})}
                    {this.renderRowWithCheck({title: "Any Day After 10 PM",value:this.state.anyDayAfter10})}
                    {this.renderRowWithCheck({title: "HouseCall",value:this.state.houseCall})}

                    <View
                        style={[globalStyles.rowBackground, styles.row, {marginTop: 20, marginLeft: 40, height: 30,}]}>
                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            {this.renderRowSurge2({
                                hint: "Radius Limit",
                                value: this.state.radiousLimit
                            })}
                            {this.renderRowSurge2({
                                hint: "Duration",
                                value: this.state.duration
                            })}
                            {this.renderRowSurge2({
                                hint: "Price",
                                value: this.state.price
                            })}
                            <TouchableOpacity onPress={()=>this.setState({DialogVisible:true})}>
                                <Image style={styles.leftIcon2} source={require("../../../assets/images/edit.png")}/>
                            </TouchableOpacity>
                            <PopupDialog
                                visible={this.state.DialogVisible}
                                width={0.6}
                                onTouchOutside={() => {
                                    this.setState({DialogVisible: false});
                                }}
                                ref={(popupDialog) => {
                                    this.popupDialog = popupDialog;
                                }}>
                                <View style={{flexDirection: "column", alignItems: "center"}}>
                                    <View style={{
                                        width: "100%",
                                        height: 0,
                                        marginTop: 3,
                                        marginBottom: 3,
                                        backgroundColor: "black"
                                    }}/>
                                   {/* <Text>Radious Limit</Text>*/}
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text)=>this.setState({radiousLimit:text})}
                                        value={this.state.radiousLimit}
                                        keyboardType="numeric"
                                        maxLength={5}
                                        placeholder={"Radoius Limit"}
                                        autoFocus={true}
                                    />
                                    <View style={{
                                        width: "100%",
                                        height: 0.2,
                                        marginTop: 3,
                                        marginBottom: 3,
                                        backgroundColor: "black"
                                    }}/>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text)=>this.setState({duration:text})}
                                        value={this.state.duration}
                                        keyboardType="numeric"
                                        placeholder={"Duration"}
                                        maxLength={5}
                                    />
                                    <View style={{
                                        width: "100%",
                                        height: 0.2,
                                        marginTop: 3,
                                        marginBottom: 3,
                                        backgroundColor: "black"
                                    }}/>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text)=>this.setState({price:text})}
                                        value={this.state.price}
                                        keyboardType="numeric"
                                        placeholder={"Price"}
                                        maxLength={5}
                                    />
                                    <View style={{
                                        width: "100%",
                                        height: 0.2,
                                        marginTop: 3,
                                        marginBottom: 3,
                                        backgroundColor: "black"
                                    }}/>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({DialogVisible:false});
                                    }} style={[globalStyles.button, {
                                        marginTop:10,
                                        marginBottom:10,
                                        height: 40,
                                        width: "80%",
                                    }]}>
                                        <Text style={globalStyles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </PopupDialog>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Settings");
                }} style={[globalStyles.button, {
                    marginTop: 70,
                    height: 40,
                    width: 260,
                    position: "absolute",
                    bottom: 40
                }]}>
                    <Text style={globalStyles.buttonText}>DONE</Text>
                </TouchableOpacity>
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