import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBox from "../../../components/CheckBox";


export default class Cancellations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            policy: false,
            twoHour: false,
            oneHour: false,
            thirtyMin: false,
            noShowPolicy: false,
            bookingPrefrence: false,
            cancellationNoShow: false,
            surgePrice: true
        }
    }

    checkBox(val) {
        if (val === "2 Hours Ahead,No Fee, 1 Reschedule") {
            if (this.state.twoHour === false)
                this.setState({twoHour: true})
            else
                this.setState({twoHour: false})
        } else if (val === "1 Hour Ahead, 25% Fee, 1 Reschedule") {
            if (this.state.oneHour === false)
                this.setState({oneHour: true})
            else
                this.setState({oneHour: false})
        } else if (val === "30 Minutes Ahead, 75% Fee, 0 Reschedule") {
            if (this.state.thirtyMin === false)
                this.setState({thirtyMin: true})
            else
                this.setState({thirtyMin: false})
        } else if (val === "Booking Preferences") {
            if (this.state.bookingPrefrence === false)
                this.setState({bookingPrefrence: true})
            else
                this.setState({bookingPrefrence: false})
        } else if (val === "Cancellations & No-Shows") {
            if (this.state.cancellationNoShow === false)
                this.setState({cancellationNoShow: true})
            else
                this.setState({cancellationNoShow: false})
        } else if (val === "Surge Pricing") {
            if (this.state.surgePrice === false)
                this.setState({surgePrice: true})
            else
                this.setState({surgePrice: false})
        }

    }

    setPolicy()
    {
        if(this.state.policy===true)
            this.setState({policy:false})
        else
            this.setState({policy:true})
    }
    setNoShowPolicy()
    {
        if(this.state.noShowPolicy===true)
            this.setState({noShowPolicy:false})
        else
            this.setState({noShowPolicy:true})
    }

    renderRow(item) {
        return <View style={{flex: 1, flexDirection: 'row', height: 22, marginLeft: 40}}>
            <CheckBox onClick={() => this.checkBox(item.title)
            } isChecked={item.value} style={{alignSelf: 'center'}}/>
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "CANCELLATIONS & NO-SHOWS", style: {color: "#fff"}}}
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
                    <Text style={styles.txtHeader}>CANCELLATIONS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                            <Image style={styles.leftIcon}
                                   source={require("../../../assets/images/ic_cancellation_policy.png")}/>
                            <Text style={styles.row_title}>Cancellation Policy</Text>
                            <Switch onChange={()=>this.setPolicy()} value={this.state.policy} style={{
                                position: 'absolute',
                                right: 14,
                                alignSelf: 'center',
                                tintColor: 'white'
                            }}/>
                        </View>
                    </View>
                    {this.renderRow({title: "2 Hours Ahead,No Fee, 1 Reschedule", value: this.state.twoHour})}
                    {this.renderRow({title: "1 Hour Ahead, 25% Fee, 1 Reschedule", value: this.state.oneHour})}
                    {this.renderRow({title: "30 Minutes Ahead, 75% Fee, 0 Reschedule", value: this.state.thirtyMin})}
                    <Text style={styles.txtHeader}>NO-SHOWS</Text>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        <View style={{flex: 1, flexDirection: 'row', height: 36}}>
                            <Image style={styles.leftIcon} source={require("../../../assets/images/ic_no_show.png")}/>
                            <Text style={styles.row_title}>No-Show Policy</Text>
                            <Switch onChange={()=>this.setNoShowPolicy()} value={this.state.noShowPolicy} style={{
                                position: 'absolute',
                                right: 14,
                                alignSelf: 'center',
                                tintColor: 'white'
                            }}/>
                        </View>
                    </View>
                    {this.renderRow({title: "Booking Preferences", value: this.state.bookingPrefrence})}
                    {this.renderRow({title: "Cancellations & No-Shows", value: this.state.cancellationNoShow})}
                    {this.renderRow({title: "Surge Pricing", value: this.state.surgePrice})}

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
