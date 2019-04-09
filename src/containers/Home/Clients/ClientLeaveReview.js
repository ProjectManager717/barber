import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity, TouchableWithoutFeedback, TextInput,

} from "react-native";
import Header from "../../../components/Header/CustomHeader";
import {ScrollView} from "react-native-gesture-handler";
import colors from "../../../themes/colors";
import CheckBoxSquare from "../../../components/CheckBox";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {AirbnbRating} from "react-native-elements";


const {height, width} = Dimensions.get("window");
let ratings = Math.floor(Math.random() * 5 + 1);
export default class ClientLeaveReview extends Component {
    rightAction() {
        this.props.navigation.goBack();
    }

    state = {
        unselected: require("../../../assets/images/greentick.png"),
        unselected2: require("../../../assets/images/greentick.png"),
        unselected3: require("../../../assets/images/greentick.png"),
        unselected4: require("../../../assets/images/greentick.png")
    };

    Selected() {
        this.setState({unselected: require("../../../assets/images/greenticked.png")})
    }

    Selected2() {

        this.setState({unselected2:require("../../../assets/images/greenticked.png")})
    }

    Selected3() {
        this.setState({unselected3: require("../../../assets/images/greenticked.png")})
    }

    Selected4() {
        this.setState({unselected4: require("../../../assets/images/greenticked.png")})
    }

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header
                        rightAction={this.rightAction.bind(this)}
                        leftAction={this.rightAction.bind(this)}
                        bgIcon={require("../../../assets/images/Reviewimage.png")}
                        centerComponent={{text: "RECEIPT", style: {color: "#fff"}}}
                        leftIcon={require("../../../assets/images/ic_back.png")}/>
                    <View style={styles.detailsContainer}>
                        <View style={styles.profileImageContainer}>
                            <ImageBackground
                                source={require("../../../assets/images/personface.png")}
                                style={styles.profileImage}
                            >
                            </ImageBackground>
                        </View>


                        <View>
                            <View style={[styles.infoContainer]}>
                                <Text style={[styles.allFontStyle, styles.name]}>
                                    Anthony Martial
                                </Text>
                                <View style={{flexDirection: "row",}}>
                                    <Image resizeMode={"contain"}
                                           style={{height: 15, width: 15, position: "absolute", top: 10}}
                                           source={require("../../../assets/images/colonstart.png")}/>
                                    <Text style={{
                                        color: colors.white,
                                        fontFamily: 'AvertaStd-Thin',
                                        fontSize: 20,
                                        marginTop: 20,
                                        marginStart: 16,
                                        marginEnd: 17
                                    }}>
                                        AWESOME CLYPR!
                                    </Text>
                                    <Image resizeMode={"contain"}
                                           style={{height: 15, width: 15, position: "absolute", bottom: -5, right: -3}}
                                           source={require("../../../assets/images/colonend.png")}/>
                                </View>
                                <View style={styles.review}>

                                    <AirbnbRating
                                        showRating={false}
                                        count={5}
                                        defaultRating={ratings}
                                        size={20}
                                        style={{marginStart: 10, height: 30}}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                            <Text style={{color: "white", marginTop: 20, fontFamily: "AvertaStd-Thin"}}> What did
                                Anthony do well? </Text></View>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 20,
                            width: "90%",
                            height: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            marginStart: 30,
                            marginEnd: 20
                        }}>
                            <View style={{
                                flexDirection: "column",
                                width: "50%",
                                marginEnd: 10
                            }}>
                                <TouchableOpacity onPress={() => this.Selected()}>
                                    <View style={{
                                        flexDirection: "row",
                                        backgroundColor: "#474857",
                                        width: "100%",
                                        height: 40,
                                        marginBottom: 10,
                                        borderRadius: 20,
                                        borderWidth: 0.5,
                                        borderColor: "grey",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={require("../../../assets/images/goodquality.png")}/>
                                        <Text style={{
                                            color: "white", marginStart: 10,
                                            marginEnd: 10,

                                        }}>Good Quality</Text>
                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={this.state.unselected}/>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.Selected2()}>
                                    <View style={{
                                        flexDirection: "row",
                                        backgroundColor: "#474857",
                                        width: "100%",
                                        height: 40,
                                        marginBottom: 10,
                                        borderRadius: 20,
                                        borderWidth: 0.5,
                                        borderColor: "grey",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={require("../../../assets/images/punctuality.png")}/>
                                        <Text style={{
                                            color: "white", marginStart: 10,
                                            marginEnd: 20
                                        }}>Punctuality</Text>
                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={this.state.unselected2}/>
                                    </View></TouchableOpacity>
                            </View>

                            <View style={{
                                flexDirection: "column",
                                width: "50%",
                                marginEnd: 10
                            }}>
                                <TouchableOpacity onPress={() => this.Selected3()}>
                                    <View style={{
                                        flexDirection: "row",
                                        backgroundColor: "#474857",
                                        width: "100%",
                                        height: 40,
                                        marginBottom: 10,
                                        borderRadius: 20,
                                        borderWidth: 0.5,
                                        borderColor: "grey",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={require("../../../assets/images/cleanliness.png")}/>
                                        <Text style={{
                                            color: "white",
                                            marginStart: 10,
                                            marginEnd: 15

                                        }}>Cleanliness</Text>
                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={this.state.unselected3}/>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.Selected4()}>
                                    <View style={{
                                        flexDirection: "row",
                                        backgroundColor: "#474857",
                                        width: "100%",
                                        height: 40,
                                        marginBottom: 10,
                                        borderRadius: 20,
                                        borderWidth: 0.5,
                                        borderColor: "grey",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>

                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={require("../../../assets/images/professional.png")}/>
                                        <Text style={{
                                            color: "white", marginStart: 10,
                                            marginEnd: 10
                                        }}>Professional</Text>
                                        <Image style={{height: 20, width: 20}} resizeMode={"contain"}
                                               source={this.state.unselected4}/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 20,
                            width: "90%",
                        }}>
                            <View style={{
                                width: "100%",
                                height: 50,
                                borderRadius: 5,
                                borderWidth: 0.3,
                                borderColor: "white",
                                backgroundColor: "#2F3041"
                            }}>
                            </View>

                            <TextInput style={{
                                fontFamily: "AvertaStd-RegularItalic", width: "100%",
                                color: "white", position: "absolute", bottom: 0, top: 0, left: 5, fontSize: 14
                            }}
                                       multiline={true}
                                       numberOfLines={4}
                                       onChangeText={(text) => this.setState({text})}
                                       placeholder={"Add a comment ..."}
                                       placeholderTextColor={"#9C9CA2"}
                            />


                        </View>
                        <View style={{
                            flexDirection: "row",
                            width: "90%",
                            height: 50,

                            marginTop: 20,
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                            <View style={{flexDirection: "column", width: "60%",}}>
                                <View style={{flexDirection: "row", marginTop: 10}}>
                                    <CheckBoxSquare isChecked={true} style={{marginTop: 4}}/>
                                    <Text style={{color: "white", marginStart: 10, fontSize: 15,}}>Add a Tip</Text>
                                </View>
                                <Text style={{
                                    fontSize: 11,
                                    fontFamily: "AvertaStd-RegularItalic",
                                    marginStart: 20,
                                    color: "grey"
                                }}>(100% goes to your
                                    barber)</Text>
                            </View>
                            <View style={{flexDirection: "row", width: "40%"}}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    marginStart: 10
                                }}>$8.00</Text>
                                <View style={{
                                    flexDirection: "row",
                                    backgroundColor: "#474857",
                                    marginStart: 20,
                                    borderRadius: 20,
                                    height: 25,
                                    width: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 3
                                }}>
                                    <Text style={{color: "white", fontSize: 13, marginStart: 10}}>
                                        25%
                                    </Text>
                                    <Image
                                        resizeMode={"contain"}
                                        style={{
                                            height: 7,
                                            width: 7,
                                            marginStart: 5,
                                            marginEnd: 10
                                        }}
                                        source={require("../../../assets/images/arrow_down.png")}/>
                                </View>
                            </View>


                        </View>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ReceiptCancelled');
                        }}
                                          style={[globalStyles.button, {
                                              height: 35,
                                              width: 250,
                                              backgroundColor: "red",
                                              marginTop: 20,
                                              marginBottom: 20,
                                          }]}>
                            <Text style={{fontSize: 15, fontWeight: "bold", color: "white"}}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: colors.themeBackground
    },
    detailsContainer: {
        flex: 1,
        alignItems: "center",
        marginBottom: 40,
        bottom: 40

    },
    profileImageContainer: {
        height: width / 2.7,
        width: width / 2.7,

        alignItems: "center",
        justifyContent: "center",
        marginTop: -width / 5
    },
    icon: {height: 50, width: 50, position: 'absolute', top: 10, right: width / 2 - width / 2.7 / 2},
    iconContainer: {},
    profileImage: {
        height: width / 3,
        width: width / 3,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    infoContainer: {
        height: 80,
        justifyContent: "space-around",
        width,
        alignItems: "center",
        marginTop: 10,
    },
    allFontStyle: {
        color: "#535361"
    },
    row_title: {
        color: "#697078",
        marginLeft: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        fontFamily: "AvertaStd-Regular"
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    button: {
        width: width / 2.2,
        backgroundColor: "#FF0000",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 30,
        height: height / 19,
        alignItems: "center"
    },
    buttonText: {color: "white", fontSize: 15, fontWeight: "500"},
    review: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    reviewText: {
        fontSize: 12,
        color: colors.white
    },
    rating: {height: 50, width: width / 3},
    tip_price_container: {
        backgroundColor: Colors.border,
        marginTop: 8,
        width: 80,
        height: 24,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 12
    },
    MainContainer: {
        justifyContent: "center",
        flex: 1,
    },
    avatar_conatiner: {
        alignSelf: "center",
        marginLeft: 10,
        height: 60,
        width: 60
    },
    icon_header: {
        height: 20,
        width: 20
    },


    calendar_weekly_header: {
        height: 60,
        flexDirection: "row"
    },
    week_day_container: {
        alignSelf: "center",
        color: "white",
        fontFamily: "AvertaStd-Semibold",
        fontSize: 12
    }


});