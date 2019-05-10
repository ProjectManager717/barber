import React, {Component} from "react";
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,

} from "react-native";
import Header from "../../../components/Header";
import {ScrollView} from "react-native-gesture-handler";
import colors from "../../../themes/colors";
import CheckBoxSquare from "../../../components/CheckBox";


const {height, width} = Dimensions.get("window");

export default class BarberProfile extends Component {

    rightAction() {
        this.props.navigation.navigate('BarberEditProfile');
    }

    leftAction() {

        this.props.navigation.goBack();

    }

    constructor(props) {
        super(props);
        this.state = {
            barberName: "Anthony Martial",
            barberImage: "",
            barberShopName: "CLYPR Barbershop",
            barberRatting: 5,
            barberReviews: 17,
            ListData: [
                {
                    id: 1,
                    imagePath: require('../../../assets/images/vp2.png')
                },
                {
                    id: 2,
                    imagePath: require('../../../assets/images/vp2.png')
                },
                {
                    id: 3,
                    imagePath: require('../../../assets/images/vp2.png')
                }],
            ListData2: [
                {
                    id: 1,
                    check: true,
                    title: "Haircut",
                    duration: "30 mins",
                    prize: "$20"
                },
                {
                    id: 2,
                    check: true,
                    title: "Beard Trim",
                    duration: "15 mins",
                    prize: "$15"
                },
                {
                    id: 3,
                    check: false,
                    title: "Design",
                    duration: "30 mins",
                    prize: "$20"
                },
                {
                    id: 4,
                    check: false,
                    title: "Hot Towel Shape",
                    duration: "45 mins",
                    prize: "$40"
                },
                {
                    id: 5,
                    check: false,
                    title: "Housecall",
                    duration: "1 hr",
                    prize: "$100"
                }

            ]
        }
        this.getBarberProfileData = this.getBarberProfileData.bind(this);
    }

    componentDidMount(): void {
        //this.getBarberProfileData();
    }

    getBarberProfileData() {
        fetch("https://CYLPR.app/api/get_profile", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({
                user_id: Prefrence.get("userId"),
            }), // data can be `string` or {object}!
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("response-->", "-" + JSON.stringify(response));
                if (response.code === 200) {
                    this.setState({
                        barberName: Prefrence.get("userName"),
                        barberImage: "",
                        barberShopName: "",
                        barberRatting: "",
                        barberReviews: "",
                        ListData: "",
                        ListData2: ""
                    });
                } else {
                    if (response.code === 100) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        //Keyboard.dismiss();
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Header
                        rightAction={this.rightAction.bind(this)}
                        leftAction={this.leftAction.bind(this)}
                        bgIcon={require("../../../assets/images/bannerprofile.png")}
                        rightIcon={require("../../../assets/images/ic_navbar_edit.png")}
                        leftIcon={require("../../../assets/images/ic_back.png")}/>
                    <View style={styles.detailsContainer}>
                        <View style={styles.profileImageContainer}>
                            <ImageBackground
                                source={require("../../../assets/images/personface.png")}
                                style={styles.profileImage}
                            >
                            </ImageBackground>
                        </View>

                        <Image
                            source={require("../../../assets/images/insta.png")}
                            style={styles.icon}
                        />

                        <View>
                            <View style={[styles.infoContainer]}>
                                <Text style={[styles.allFontStyle, styles.name]}>
                                    {this.state.barberName}
                                </Text>
                                <View style={{flexDirection: "row",}}>
                                    <Text style={{color: colors.white, fontSize: 12}}>
                                        {this.state.barberShopName}
                                    </Text>
                                    <Image resizeMode={"contain"}
                                           style={{height: 8, width: 8, marginStart: 10, marginTop: 5}}
                                           source={require("../../../assets/images/arrow_down.png")}/>
                                </View>
                                <View style={styles.review}>
                                    <Image
                                        resizeMode="contain"
                                        source={require("../../../assets/images/start.png")}
                                        style={styles.rating}
                                    />
                                    <Text style={[styles.allFontStyle, styles.reviewText]}>
                                        {"(" }{this.state.barberReviews}{" Reviews)"}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{height: 25}}/>
                    <Text style={styles.row_title}>{"EXPERIENCE"}</Text>
                    <View style={[{
                        flex: 1,
                        width: '100%',
                        height: "100%",
                        flexDirection: "row"
                    }]}>

                        <FlatList
                            data={this.state.ListData}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={({item}) =>
                            <View>
                                <Image style={{
                                    borderRadius: 10,
                                    marginStart: 8,
                                    height: 140,
                                    width: 160,
                                    backgroundColor: "grey"
                                }}
                                       resizeMode='cover'
                                       source={item.imagePath}/>
                            </View>}
                                  />
                        <Image resizeMode={"contain"} source={require("../../../assets/images/arrow1.png")}
                               style={{position: "absolute", width: 35, height: 35, right: 10, top: 50}}/>

                    </View>

                    <View style={{height: 15}}/>

                    <View style={[{
                        backgroundColor: "grey",
                        color: "white",
                        margin: 20,
                        borderRadius: 12
                    }]}>

                        <View
                            style={[{
                                width: "100%",
                                flexDirection: "row",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                alignItems: "center",
                                height: 35,
                                backgroundColor: "#868791",
                            }]}>
                            <View style={{
                                width: "45%", height: "100%", justifyContent: "center"
                                , marginStart: 10
                            }}>
                                <Text style={{color: "white", fontSize: 12}}>Type</Text>
                            </View>
                            <View style={{
                                width: "30%", height: "100%", alignItems: "center"
                                , flexDirection: "row"
                            }}>
                                <View style={{width: 3, height: "100%", backgroundColor: "#686975"}}/>
                                <Text style={{color: "white", marginStart: 15, fontSize: 12}}>Duration </Text>
                                <View style={{width: 3, height: "100%", marginStart: 10, backgroundColor: "#686975"}}/>
                            </View>
                            <View style={[{width: "25%", right: 5, flexDirection: "row"}]}>
                                <View style={{width: 1, height: "100%", backgroundColor: "#686975"}}/>
                                <Text style={{color: "white", fontSize: 12}}>Prizes </Text>
                            </View>
                        </View>

                        <FlatList
                            data={this.state.ListData2}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={true}
                            removeClippedSubviews={false}
                            initialNumToRender={5}
                            numColumns={1}
                            style={{
                                borderBottomLeftRadius: 12,
                                borderBottomRightRadius: 12, paddingBottom: 12, backgroundColor: "#686975"
                            }}
                            renderItem={({item}) =>
                                <View style={{flexDirection: "column"}}>
                                    <View style={[{flexDirection: "row", height: 30, backgroundColor: "#686975"}]}>
                                        <View style={[{
                                            flexDirection: "row",
                                            width: "50%",
                                            marginStart: 10,
                                            alignItems: "center"
                                        }]}>
                                            <CheckBoxSquare isChecked={item.check} uncheckedCheckBoxColor={"#84858C"}/>
                                            <Text style={{color: "white", fontSize: 12}}>   {item.title} </Text>
                                        </View>
                                        <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                            <Text style={{color: "white", fontSize: 12}}>{item.duration}</Text>
                                        </View>
                                        <View style={[{flexDirection: "row", width: "25%", alignItems: "center"}]}>
                                            <Text style={{color: "white", fontSize: 12}}>{item.prize}</Text>
                                        </View>
                                    </View>
                                    <View style={{height: 0.5, backgroundColor: "#868791"}}/>
                                </View>}
                           />
                    </View>


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
        height: 80,
        justifyContent: "space-around",
        width,
        alignItems: "center"
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
