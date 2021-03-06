import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image, Alert,
    TouchableOpacity, Linking, AsyncStorage, Platform,
} from "react-native";
import Header from "../../components/Header/";
import {ScrollView} from "react-native-gesture-handler";
import TopTabs from "../../components/ScreenTabs";
import colors from "../../themes/colors";
import GraphComp from "../../components/Graph/";
import Clients from "./Clients/Clients";
import Notifications from "./Notifications";
import Preference from "react-native-preference";
import {AirbnbRating} from "react-native-elements";
import {constants} from "../../utils/constants";
import {NavigationActions} from "react-navigation";
import firebase from 'react-native-firebase'


const {height, width} = Dimensions.get("window");

export default class Home extends Component {
    leftAction() {
        this.props.navigation.navigate("QRCheckIn");
    }

    rightAction() {
        this.props.navigation.navigate('Share',/*{
            profile_image: this.state.barberImage,
            barberName: this.state.barberName,
            barberShopName: this.state.barberShopName,
            barberAddress: this.state.barberAddress,
            barberInsta:this.state.barberInsta,
        }*/);
    }

    constructor(props) {
        super(props);
        console.disableYellowBox=true;
        this.state = {
            showLoading: false,
            barberName: Preference.get("userName"),
            barberImage: null,
            barberExperiance: null,
            barberShopName: "",
            barberRating: 0,
            barberReviews: "",
            barberInsta: "",
            barberAddress: "",
            bannerImage:null
        }
    }


    componentDidMount(): void {
        const {navigation} = this.props;

        this.initDeepLinking()

        this.focusListener = navigation.addListener("didFocus", payload => {
            this.getBarberDetails();
        });
        //this.getBarberDetails();
    }

    initDeepLinking() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                if (url) {
                    this.navigate(url);
                }
            })
        }

        Linking.addEventListener('url', this.handleOpenURL);
        firebase.links().getInitialLink().then(url => {
            console.log('initDeepLinking-getInitialLink', JSON.stringify(url))
            if (url) {
                this.navigate(url);
            }
        })
        this.firebaseUniversalLinking = firebase.links().onLink(url => {
            console.log('initDeepLinking-firebase', JSON.stringify(url))
            if (url) {
                this.navigate(url);
            }
        })
    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    }

    navigate = (url) => {
        const { navigate } = this.props.navigation;

        console.log("Deep linking1: " + JSON.stringify(url))

        const route = url.replace('clypr://', '');
        console.log("Deep linking2: " + JSON.stringify(route))
        const params = route.split('/')
        console.log("Deep linking3: " + JSON.stringify(params))

        if (params[0] == 'profile') {
            navigate({ routeName: 'Profile' ,
                params:{
                    id: params[1],
                    isShared: true,
                }
            })
        }
    }

    componentWillUnmount(): void {
        Linking.removeEventListener('url', this.handleOpenURL);
    }


    getBarberDetails() {
        this.setState({showLoading: true})
        fetch(constants.BarbersProfile + "/" + Preference.get("userId") + "/profile", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("responseBarbersProfileMain-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    let barberData = response.Data;
                    console.log("USerImage===>" + barberData.user_image);
                    if (barberData.supreme_barber === 0)
                        Preference.set("supremeBarber", false)
                    else
                        Preference.set("supremeBarber", true)
                    this.setState({
                        barberImage: {uri: barberData.user_image},
                        barberShopName: barberData.shop_name,
                        barberName: barberData.firstname,
                        barberRating: barberData.average_Rating,
                        barberReviews: barberData.total_Reviews,
                        barberExperiance: barberData.experience,
                        barberInsta: barberData.username,
                        barberAddress: barberData.location,
                        bannerImage:{uri:barberData.banner_image}
                    });
                    //this.setState({barberData: response.Data});
                    if (barberData.total_Reviews === undefined) {
                        this.setState({barberReviews: "You don’t have any reviews yet"})
                    } else {
                        this.setState({barberReviews: barberData.total_Reviews + " Reviews"})
                    }
                    if (barberData.experience === null) {
                        this.setState({barberExperiance: "Set your years of experience"})
                    }
                    if(barberData.experience === "0"){
                        this.setState({barberExperiance: "Set your years of experience"})
                    }
                     else {
                        this.setState({barberExperiance: "Barber with " + this.state.barberExperiance + " years of experience"})
                    }
                } else {
                    this.setState({showLoading: false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            this.setState({showLoading: false})
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }

    render() {
        return (<View>
                <ScrollView>
                    <View style={styles.container}>
                        <Header
                            leftAction={this.leftAction.bind(this)}
                            rightAction={this.rightAction.bind(this)}
                            bgIcon={this.state.bannerImage}
                            rightIcon={require("../../assets/images/share.png")}
                            leftIcon={require("../../assets/images/qr.png")}/>
                        <View style={styles.detailsContainer}>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    source={this.state.barberImage}
                                    style={styles.profileImage}
                                >
                                </Image>
                            </View>
                            <TouchableOpacity
                                style={{position: 'absolute', top: 10, right: width / 2 - width / 2.7 / 2}}
                                onPress={() => Linking.openURL('https://www.instagram.com/'+this.state.barberInsta)}>
                                <Image
                                    source={require("../../assets/images/insta.png")}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                            <View>
                                <View style={styles.infoContainer}>
                                    <Text style={[styles.allFontStyle, styles.name]}>
                                        {this.state.barberName}
                                    </Text>
                                    <Text style={{color: colors.white, fontSize: 12}}>
                                        {this.state.barberExperiance}
                                    </Text>
                                    <View style={styles.review}>
                                        {/*<Image
                                        resizeMode="contain"
                                        source={require("../../assets/images/start.png")}
                                        style={styles.rating}
                                    />*/}
                                        <AirbnbRating
                                            showRating={false}
                                            count={5}
                                            isDisabled={true}
                                            defaultRating={this.state.barberRating}
                                            size={10}
                                            style={{marginStart: 10, height: 30}}
                                        />
                                        <Text style={[styles.allFontStyle, styles.reviewText]}>
                                            {"(" + this.state.barberReviews + ")"}
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={styles.button} onPress={() => {
                                        this.props.navigation.navigate('Profile',);
                                    }}>
                                        <Text style={styles.buttonText}>View Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TopTabs
                            data={[
                                () => <GraphComp/>,
                                () => <Clients props={this.props}/>,
                                () => <Notifications/>
                            ]}
                        />
                    </View>
                </ScrollView>
                {this.state.showLoading && <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    position: "absolute",
                    opacity: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Image resizeMode={"contain"} source={require("../../assets/images/loading.gif")}
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}
            </View>
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
    icon: {height: 50, width: 50,},
    iconContainer: {},
    profileImage: {
        height: width / 3,
        width: width / 3,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderRadius: (width / 3) / 2
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
        color: "white",
        width:180,textAlign:"center",
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
    buttonText: {color: "white", fontSize: 15, fontWeight: "500",width:100,textAlign:"center"},
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
