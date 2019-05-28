import React, {Component} from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {Header} from "react-native-elements";
import {NavigationActions, StackActions} from "react-navigation";

export default class PaymentMethod extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        //this.state = {text: ' 4242 - 4242 - 4242- 4242'};
    }

    saveCard = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'ClientTabNavigator'})],
        });
        this.props.navigation.dispatch(resetAction);
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

                            <View style={[globalStyles.rowBackground, {flex: 1, flexDirection: 'row', height: 40}]}>

                                <Image style={[styles.right_arrow]}
                                       source={require("../../../assets/images/vcircle.png")}/>
                                <TextInput style={{fontSize: 15, color: 'white', marginStarts: 5}}
                                           placeholder={" 4242 - 4242 - 4242 - 4242"}
                                           placeholderTextColor={"white"}/>
                            </View>
                            <View style={{flexDirection: "row", width: "100%"}}>
                                <View style={{width: "65%"}}>
                                    <Text style={styles.txtHeader}>EXPIRATION DATE</Text>
                                </View>
                                <View style={{width: "35%"}}>
                                    <Text style={styles.txtHeader}>CVV/CVC</Text>
                                </View>

                            </View>

                            <View style={{width: "100%", flexDirection: "row"}}>
                                <View style={[styles.row_back, {width: "25%", marginStart: 10}]}>
                                    <TextInput style={{fontSize: 15, color: 'white', marginStart: 5}} placeholder={"04"}
                                               placeholderTextColor={"white"}/>
                                    <Image resizeMode={"contain"} style={[styles.dropDown]}
                                           source={require("../../../assets/images/dropdown.png")}/>
                                </View>
                                <View style={[styles.row_back, {width: "25%", marginStart: 5}]}>
                                    <TextInput style={{fontSize: 15, color: 'white', marginStart: 5}} placeholder={"24"}
                                               placeholderTextColor={"white"}/>
                                    <Image resizeMode={"contain"} style={[styles.dropDown]}
                                           source={require("../../../assets/images/dropdown.png")}/>
                                </View>
                                <View style={{width: "17%",}}>

                                </View>

                                <View style={[styles.row_back, {width: "25%"}]}>
                                    <TextInput style={{fontSize: 15, color: 'white', marginStart: 5}}
                                               placeholder={"424"}
                                               placeholderTextColor={"white"}/>
                                </View>
                            </View>
                            <Text style={styles.txtHeader}>CARD HOLDER NAME</Text>
                            <View style={{flex: 1, flexDirection: 'column', width: "100%"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <TextInput
                                        style={{height: 40, color: "#52525D", marginStart: 28}}
                                        placeholder={"Massimiliano Allegri"}
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
