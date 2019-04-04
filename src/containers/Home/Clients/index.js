import React, {Component} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    ScrollView,
    Switch,
} from "react-native";

import {Header, AirbnbRating} from "react-native-elements";

import {Colors} from "../../../themes";
import {styles} from "./styles";
import {globalStyles} from "../../../themes/globalStyles";


export default class ClientHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{
                id: 0,
                imgPathh: require("../../../assets/images/anthony.png"),
                title: "Anthony Martial",
                duration: "10:00 AM",
                date: "September 4th",
                btnTxt: "Confirmed",
                btnClr: "#0CACF0",
            }, {
                id: 1,
                imgPathh: require("../../../assets/images/stefan.png"),
                title: "Stefan Danillo",
                duration: "10:00 AM",
                date: "September 4th",
                btnTxt: "Completed",
                btnClr: "#5BD701",
            }, {
                id: 2,
                imgPathh: require("../../../assets/images/stefan.png"),
                title: "Stefan Danillo",
                duration: "10:30 AM",
                date: "April 15th",
                btnTxt: "Cancelled",
                btnClr: "#EF0525",
            }
            ],

            dataSource2: [{
                id: 0,
                imgPathh2: require("../../../assets/images/imgbck1.png"),
                title2: "RENATO SANCHEZ",
                address: "Anfield Barbershop",
                time: "10:00 AM",
                surgeImg: require("../../../assets/images/price.png")

            }, {
                id: 1,
                imgPathh2: require("../../../assets/images/imgbck2.png"),
                title2: "ROBERT LEWANDOWSKI",
                time: "10:00 AM",
                address: "Santiago Bernabeu Barbershop",
                surgeImg: require("../../../assets/images/price.png")

            },
            ]

        }


    }

    renderRowSurge(item) {
        return <View
            style={{
                flexDirection: 'row',
                marginTop: 10,
                width: "100%",
                alignItems: "center",
                height: 70,
                backgroundColor: "#474857",
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "white"
            }}>
            <Image resizeMode={"contain"} source={item.imgPathh} style={{
                marginStart: 10, height: "100%", width: 50
            }}/>
            <View style={{flexDirection: "column", marginStart: 10}}>
                <Text
                    style={{fontSize: 15, color: "white"}}
                >{item.title}</Text>
                <View style={{flexDirection: "row", marginTop: 5}}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/time.png")}
                           style={{height: 12, width: 12}}/>
                    <Text style={{fontSize: 10, color: "#939FB1", marginStart: 4}}>{item.duration}</Text>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/date.png")}
                           style={{height: 12, width: 12, marginStart: 12}}/>
                    <Text style={{fontSize: 10, color: "#939FB1", marginStart: 4}}>{item.date}</Text>
                </View>


            </View>
            <TouchableOpacity
                style={{
                    top: 0,
                    right: 0,
                    position: "absolute",
                    height: 26,
                    width: 75,
                    marginTop: 10,
                    marginEnd: 10,
                    alignItems: 'center',
                    justifyContent:"center",
                    borderRadius: 12,
                    borderWidth: 1, borderColor: item.btnClr,
                    backgroundColor: "#626371"
                }}>
                <Text style={{marginTop: 3, color: "white", fontSize: 10, fontWeight: "bold"}}>{item.btnTxt}</Text>
            </TouchableOpacity>


        </View>
    }

    renderRowSurge2(item) {
        let ratings = Math.floor(Math.random() * 5 + 1);
        return <View
            style={{
                flexDirection: 'row',
                marginTop: 10,
                width: "100%",
                alignItems: "center",
                height: 150,


                borderRadius: 30,

            }}>
            <ImageBackground source={item.imgPathh2}
                             style={{width: "100%", height: "100%", borderRadius: 7, overflow: 'hidden'}}>
                <View style={{flexDirection: "row", width: "100%", height: "100%",}}>

                    <View style={{
                        flexDirection: "column",
                        width: "60%",
                        height: "100%",
                        marginTop: 75,
                        marginStart: 10
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textShadowColor:"black",
                            textShadowOffset: {width: -2, height: 1},
                            textShadowRadius: 3,
                            color: Colors.white
                        }}>{item.title2}</Text>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Image source={require("../../../assets/images/shop.png")} resizeMode={"contain"}
                                   style={{width: 20, height: 20}}/>
                            <Text style={{fontSize: 12, color: Colors.white,
                                textShadowColor:"black",
                                textShadowOffset: {width: -2, height: 1},
                                textShadowRadius: 3,

                            }}>{item.address}</Text>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <AirbnbRating
                                showRating={false}
                                count={5}
                                defaultRating={ratings}
                                size={10}
                                style={{marginStart: 10, height: 30}}
                            />
                            <Text style={{marginStart: 5, fontSize: 10, color: Colors.white,
                                textShadowColor:"black",
                                textShadowOffset: {width: -2, height: 1},
                                textShadowRadius: 3,}}>{"(17 Reviews)"}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "column", width: "40%", height: "100%"}}>
                        <View style={{alignItems: "flex-end", marginEnd: 20}}>
                            <TouchableOpacity>
                                <Image resizeMode={"contain"} source={require("../../../assets/images/star.png")}
                                       style={{width: 20, height: 20,marginTop:10}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image resizeMode={"contain"} source={require("../../../assets/images/price.png")}
                                       style={{width: 20, height: 20,marginTop:10}}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("ClientBarberProfile")}
                                style={{width: "100%", alignItems: "flex-end"}}>
                                <View style={{
                                    marginTop: 20,
                                    flexDirection: "row",
                                    width: "95%",
                                    backgroundColor: "white",
                                    height: 27,
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{marginStart: 5, fontSize: 10, color: "red"}}>{"Next Available"}</Text>
                                    <Image resizeMode={"contain"}
                                           source={require("../../../assets/images/nextarrow.png")}
                                           style={{width: 8, height: 8, marginStart: 5}}/>
                                </View>
                            </TouchableOpacity>
                            <View style={{
                                marginTop: 2,
                                flexDirection: "row",
                                width: "95%",
                                backgroundColor: "red",
                                opacity: 0.9,
                                height: 27,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{fontSize: 12, color: "white"}}>{"10:00 AM"}</Text>
                            </View>
                        </View>
                    </View>


                </View>


            </ImageBackground>


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
                    leftComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("QRCheckIn");
                            }}
                        >
                            <Image
                                style={{
                                    tintColor: "white",
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={require("../../../assets/images/qr.png")}
                            />
                        </TouchableOpacity>
                    }

                    centerComponent={{text: "WELCOME", style: {color: "#fff"}}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <ScrollView>
                    <View>
                        <Text style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginStart: 20,
                            marginTop: 20
                        }}>{"Recent Bookings"} </Text>
                    </View>
                    <View style={{marginTop: 0, marginStart: 20, marginEnd: 20}}>
                        <FlatList renderItem={({item}) => this.renderRowSurge(item)}
                                  data={this.state.dataSource}
                                  keyExtractor={(item, index) => index}
                                  numColumns={1}
                        />
                    </View>
                    <View>
                        <Text style={{
                            color: "white",
                            fontWeight: 'bold',
                            marginStart: 20,
                            marginTop: 20,

                        }}>{"Favorite Barbers"} </Text>
                    </View>

                    <View style={{marginTop: 0, marginStart: 20, marginEnd: 20, marginBottom: 20}}>
                        <FlatList renderItem={({item}) => this.renderRowSurge2(item)}
                                  data={this.state.dataSource2}
                                  keyExtractor={(item, index) => index}
                                  numColumns={1}
                        />
                    </View>


                </ScrollView>

            </View>

        )
    }
}









