import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";


export default class SurgePricing extends Component {

    renderRowWithCheck(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 22, marginLeft: 40}}>
            <CheckBoxSquare onClick={() => {
            }} isChecked={true} style={{alignSelf: 'center'}}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    renderRowSurge(item) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row',height:36}}>
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
                    {this.renderRowWithCheck({title: "Holidays"})}
                    {this.renderRowWithCheck({title: "Birthday"})}
                    {this.renderRowWithCheck({title: "Any Day After 10 PM"})}
                    {this.renderRowWithCheck({title: "HouseCall"})}

                    <View
                        style={[globalStyles.rowBackground, styles.row, {marginTop: 20, marginLeft: 40, height: 30,}]}>
                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            {this.renderRowSurge2({
                                hint: "Radius Limit",
                                value: "50"
                            })}
                            {this.renderRowSurge2({
                                hint: "Duration",
                                value: "1 hr"
                            })}
                            {this.renderRowSurge2({
                                hint: "Price",
                                value: "$100"
                            })}
                            <TouchableOpacity>
                                <Image style={styles.leftIcon2} source={require("../../../assets/images/edit.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>


                </ScrollView>

                <TouchableOpacity style={[globalStyles.button, {
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