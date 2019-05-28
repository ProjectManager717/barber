import React, {Component} from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    FlatList,
} from "react-native";
import colors from "../../../themes/colors";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";

const {height, width} = Dimensions.get("window");

export default class BarberEditProfile extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            houseCall: false,
            ListData: [
                {
                    id: 1,
                    service: "Service",
                    service_type: "Haircut",
                    duration: "Duration",
                    duration_type: "30 mins",
                    prize: "Price",
                    prize_type: "$20",
                    imagePath: require('../../../assets/images/edit.png'),
                    imagePath2: require("../../../assets/images/delete.png"),
                    showLine: true

                },
                {
                    id: 2,
                    service: "Service",
                    service_type: "Beard Trim",
                    duration: "Duration",
                    duration_type: "15 mins",
                    prize: "Price",
                    prize_type: "$15",
                    imagePath: require('../../../assets/images/edit.png'),
                    imagePath2: require("../../../assets/images/delete.png"),
                    showLine: true

                },

                {
                    id: 3,
                    service: "Service",
                    service_type: "Design",
                    duration: "Duration",
                    duration_type: "20 mins",
                    prize: "Price",
                    prize_type: "$30",
                    imagePath: require('../../../assets/images/edit.png'),
                    imagePath2: require("../../../assets/images/delete.png"),
                    showLine: true

                },
                {
                    id: 4,
                    service: "Service",
                    service_type: "Hot Towel Shave",
                    duration: "Duration",
                    duration_type: "45 mins",
                    prize: "Price",
                    prize_type: "$40",
                    imagePath: require('../../../assets/images/edit.png'),
                    imagePath2: require("../../../assets/images/delete.png"),
                    showLine: false
                }


            ]
        }
    }

    changeHouseCall() {
        console.log("housecall clicked");
        if (this.state.houseCall === true)
            this.setState({houseCall: false})
        else
            this.setState({houseCall: true})
    }

    renderRowSurge(item) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row', height: 36}}>

                <Text style={[styles.row_title, {fontWeight: "bold", fontSize: 17}]}>{item.title}</Text>
                <Switch
                    onTintColor="#00D200"
                    thumbTintColor="#fff"
                    value={this.state.houseCall}
                    onValueChange={() => this.changeHouseCall()}
                    style={{
                        position: 'absolute',
                        top: 5,
                        right: 14,
                        alignSelf: 'center',
                        tintColor: 'white',
                    }}/>
            </View>
            <Text style={{marginStart: 10, color: "grey", fontStyle: "italic", height: 25,}}>{item.hint}</Text>
        </View>
    }


    renderRowED(item) {
        return <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
            <Text style={{color: "grey", fontSize: 9, marginStart: 10, marginTop: 10, top: 5}}>{item.hintText}</Text>
            <Text style={[styles.row_title, {marginTop: 10, alignItems: "center", top: 5}
            ]}>{item.title}</Text>
            <TouchableOpacity style={[styles.right_arrow, {resizeMode: "contain", height: 10}]}>
                <Image style={{resizeMode: "contain", height: 15, marginTop: 5}} source={item.ic}/>
            </TouchableOpacity>
        </View>;
    }

    renderRowED2(item) {
        return <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
            <Text style={{color: "grey", fontSize: 9, marginStart: 10, marginTop: 10}}>{item.hintText}</Text>
            <Text style={[styles.row_title, {marginTop: 10, alignItems: "center", fontSize: 11, marginStart: 5}
            ]}>{item.title}</Text>
            <TouchableOpacity style={[styles.right_arrow, {resizeMode: "contain", height: 10, top: 5}]}>
                <Image style={{resizeMode: "contain", height: 15, marginTop: 5}} source={item.ic}/>
            </TouchableOpacity>

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
                    centerComponent={{text: "EDIT PROFILE", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image
                                style={{tintColor: 'white', height: 20, resizeMode: 'contain'}}
                                source={require("../../../assets/images/ic_back.png")}/></TouchableOpacity>}/>
                <ScrollView>
                    <View style={styles.detailsContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={require("../../../assets/images/personface.png")}
                                style={styles.profileImage}/>
                            <TouchableOpacity style={{
                                position: "absolute",
                                right: 10, bottom: 0
                            }}>
                                <Image
                                    source={require("../../../assets/images/dpchange.png")}
                                    style={{
                                        width: 40, height: 40, borderWidth: 4, borderRadius: 20, borderColor: "black"
                                    }}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={[styles.infoContainer]}>
                                <Text style={[styles.allFontStyle, styles.name]}>
                                    Anthony Martial</Text>
                                <View style={{flexDirection: "row",}}>
                                    <Text style={{color: colors.white, fontSize: 12}}>
                                        CLYPR Barbershop</Text>
                                    <TouchableOpacity>
                                        <Image style={{height: 15, width: 15, marginStart: 10}}
                                               source={require("../../../assets/images/edit.png")}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.review}>
                                    <Text style={[styles.allFontStyle, styles.reviewText, {
                                        color: "white",
                                        fontFamily: "AvertaStd-Extrathin"
                                    }]}>
                                        9 Years of Experience</Text>
                                    <TouchableOpacity>
                                        <Image style={{marginStart: 10, top: 1}}
                                               source={require("../../../assets/images/arrow_down.png")}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowED({
                            hintText: "Instagram Username",
                            title: "CLYPR_OFFICIAL",
                            ic: require("../../../assets/images/edit.png")
                        })}
                        <View style={{marginStart: 30, height: 15, marginBottom: 3}}>
                        </View>
                    </View>
                    <View style={[globalStyles.rowBackground, styles.row, {marginTop: 5}]}>
                        <FlatList renderItem={({item}) =>
                            <View style={{flexDirection: "column"}}>
                                <View style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    height: 40,
                                }}>
                                    <View style={{
                                        width: "40%",

                                        flexDirection: "row", marginTop: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            marginStart: 10,
                                            alignItems: "center",
                                            color: "grey"
                                        }}>{item.service}</Text>
                                        <Text style={{
                                            fontSize: 11,
                                            marginStart: 3, color: "white"
                                        }}>{item.service_type}</Text>
                                    </View>
                                    <View style={{
                                        width: "30%",

                                        flexDirection: "row", marginTop: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            marginStart: 10, color: "grey"
                                        }}>{item.duration}</Text>
                                        <Text style={{
                                            fontSize: 11,
                                            marginStart: 3, color: "white"
                                        }}>{item.duration_type}</Text>
                                    </View>
                                    <View style={{width: "30%", flexDirection: "row", marginTop: 10}}>
                                        <Text style={{
                                            fontSize: 10,
                                            marginStart: 10, color: "grey"
                                        }}>{item.prize}</Text>
                                        <Text style={{
                                            fontSize: 11,
                                            marginStart: 3, color: "white"
                                        }}>{item.prize_type}</Text>
                                        <Image style={{
                                            width: 11,
                                            height: 14, left: 11, resizeMode: 'contain'
                                        }} source={item.imagePath}/>
                                        <Image style={{
                                            width: 11, resizeMode: 'contain',
                                            height: 14, left: 16
                                        }} source={item.imagePath2}/>
                                    </View>
                                </View>
                                {item.showLine && <View style={{height: 0.5, backgroundColor: "#868791"}}/>}
                            </View>}
                                  data={this.state.ListData}
                                  keyExtractor={item => item.id}
                                  showsVerticalScrollIndicator={true}
                                  removeClippedSubviews={false}
                                  numColumns={1}/>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <TouchableOpacity>
                                <Image style={{
                                    resizeMode: "contain",
                                    height: 20,
                                    right: 15,
                                    marginBottom: 10,
                                    tintColor: "white",
                                }} source={require("../../../assets/images/plus.png")}/>
                            </TouchableOpacity>
                            <Text style={{color: "grey", right: 32, marginBottom: 10}}>
                                Add New Service
                            </Text>
                        </View>


                    </View>

                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowSurge({
                            title: "Housecall",

                            hint: "Supreme MemberShip Only"
                        })}

                    </View>

                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowED2({
                            hintText: "Location",
                            title: "3828 Delmas Terrace, Culver City, CA 90232 ",
                            ic: require("../../../assets/images/edit.png")
                        })}
                        <View style={{marginStart: 30, height: 15,}}>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        height: 150,
                        flexDirection: "column",
                        width: "90%",
                        marginStart: 19,
                        marginEnd: 19,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginBottom: 20,
                        marginTop: 5
                    }}>
                        <TouchableOpacity>
                            <Image source={require("../../../assets/images/plus.png")}
                                   style={{
                                       resizeMode: "contain",
                                       height: 50
                                   }}/>
                        </TouchableOpacity>
                        <Text
                            style={{color: "grey", marginTop: 10}}

                        >Add New Pictures</Text>


                    </View>


                </ScrollView>
            </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: colors.themeBackground
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
        color: colors.lightGrey,
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
        color: colors.white,

        marginLeft: 10,
        alignSelf: 'center',
        fontFamily: "AvertaStd-Regular"
    },
    right_arrow: {
        position: 'absolute',
        top: 10,

        right: 20,
        alignSelf: 'center',
        height: 20,
        width: 20,
        tintColor: 'white'
    },

    detailsContainer: {
        flex: 1,
        marginTop: 100,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",


    },


    profileImageContainer: {
        height: width / 2.7,
        width: width / 2.7,

        alignItems: "center",
        justifyContent: "center",
        marginTop: -width / 5,

    },
    icon: {
        height: 45,
        width: 45,
        borderWidth: 4,
        borderRadius: width / 2.7 / 2,
        borderColor: "black",
        position: 'absolute',
        bottom: 0,
        right: 0
        //right: width / 2 - width / 2.7 / 2
    },
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
        color: "#535361",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    review: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rating: {height: 30, width: width / 4},
    reviewText: {
        fontSize: 16,
        color: colors.white,

    }


});