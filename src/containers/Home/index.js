import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
} from "react-native";
import Header from "../../components/Header/";
import {ScrollView} from "react-native-gesture-handler";
import TopTabs from "../../components/ScreenTabs";
import colors from "../../themes/colors";
import GraphComp from "../../components/Graph/";
import Clients from "./Clients/Clients";
import Notifications from "./Notifications";

const {height, width} = Dimensions.get("window");

export default class Home extends Component {
    leftAction() {
        this.props.navigation.navigate("QRCheckIn");
    }

    rightAction() {
        this.props.navigation.navigate('Share');
    }

    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header
                        leftAction={this.leftAction.bind(this)}
                        rightAction={this.rightAction.bind(this)}
                        bgIcon={require("../../assets/images/header.png")}
                        rightIcon={require("../../assets/images/share.png")}
                        leftIcon={require("../../assets/images/qr.png")}/>
                    <View style={styles.detailsContainer}>
                        <View style={styles.profileImageContainer}>
                            <ImageBackground
                                source={require("../../assets/images/personface.png")}
                                style={styles.profileImage}
                            >
                            </ImageBackground>
                        </View>

                        <Image
                            source={require("../../assets/images/insta.png")}
                            style={styles.icon}
                        />

                        <View>
                            <View style={styles.infoContainer}>
                                <Text style={[styles.allFontStyle, styles.name]}>
                                    Anthony Martial
                                </Text>
                                <Text style={{color: colors.white, fontSize: 12}}>
                                    Barber with 9 years of experience
                                </Text>
                                <View style={styles.review}>
                                    <Image
                                        resizeMode="contain"
                                        source={require("../../assets/images/start.png")}
                                        style={styles.rating}
                                    />
                                    <Text style={[styles.allFontStyle, styles.reviewText]}>
                                        (17 Reviews)
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.button} onPress={() => {
                                    this.props.navigation.navigate('Profile');
                                }}>
                                    <Text style={styles.buttonText}>View Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TopTabs
                        data={[
                            () => <GraphComp/>,
                            () => <Clients/>,
                            () => <Notifications/>
                        ]}
                    />
                </View>
            </ScrollView>
        );
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
        marginBottom: 20
    },
    profileImageContainer: {
        height: width / 2.7,
        width: width / 2.7,
        borderRadius: width / 2.7 / 2,
        borderWidth: 1,
        borderColor: "white",
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
        height: height / 5,
        justifyContent: "space-around",
        width,
        alignItems: "center"
    },
    allFontStyle: {
        color: "#535361"
    },
    name: {
        fontSize: 18,
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
        alignItems: "center"
    },
    reviewText: {
        fontSize: 12,
        color: colors.white
    },
    rating: {height: 30, width: width / 4}
});
