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
import ClientQR from "../../Settings/ClientQR";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";
import {SafeAreaView} from "react-navigation";


export default class ClientHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading:false,
            dataSource:[],
           /* dataSource: [{
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
            ],*/
           dataSource2:[],

           /* dataSource2: [{
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
            ]*/

        }


    }

    componentDidMount(): void {
        this.getRecentBookings();
    }

    getRecentBookings()
    {
        this.setState({showLoading:true});
        fetch(constants.ClientRecentBookings + "?client_id=" +Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getRecentBookings-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading:false});
                    this.setState({dataSource:response.Data});
                    this.getFavoriteBarbers();
                } else {
                    this.setState({showLoading:false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading:false});
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: "+error);
        });
    }

    getFavoriteBarbers()
    {
        fetch(constants.ClientFavoritBarbers + "?client_id=" +Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getFavoriteBarbers-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({dataSource2:response.Data}) ;
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: "+error);
        });
    }


    renderRecentBookings(item) {
        var date=item.date;
        date=date.split("T");
        var time=item.selected_slot_id[0].start_time;
        time=time.split(":");
        var timeShow="";
        if(time[0]<12)
        {
            timeShow=time[0]+":"+time[1]+" AM";
        }else {
            timeShow=time[0]+":"+time[1]+" PM";
        }
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
            <Image resizeMode={"contain"} source={{uri:item.barber_image}} style={{
                marginStart: 10, height: 50, width: 50,borderRadius:25,
            }}/>
            <View style={{flexDirection: "column", marginStart: 10}}>
                <Text
                    style={{fontSize: 15, color: "white"}}
                >{item.barber}</Text>
                <View style={{flexDirection: "row", marginTop: 5}}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/time.png")}
                           style={{height: 12, width: 12}}/>
                    <Text style={{fontSize: 10, color: "#939FB1", marginStart: 4}}>{timeShow}</Text>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/date.png")}
                           style={{height: 12, width: 12, marginStart: 12}}/>
                    <Text style={{fontSize: 10, color: "#939FB1", marginStart: 4}}>{date[0]}</Text>
                </View>
            </View>
            {item.appointment_type === "Completed" ?
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Receipt")}
                    style={{
                        top: 0,
                        right: 0,
                        position: "absolute",
                        height: 26,
                        width: 75,
                        marginTop: 10,
                        marginEnd: 10,
                        alignItems: 'center',
                        justifyContent: "center",
                        borderRadius: 12,
                        borderWidth: 1, borderColor: item.btnClr,
                        backgroundColor: "#626371"
                    }}>

                    <Text style={{marginTop: 3, color: "white", fontSize: 10, fontWeight: "bold"}}>{item.appointment_type}</Text>
                </TouchableOpacity>
                : item.appointment_type === "Cancelled" ?
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("ReceiptCancelled")}
                        style={{
                            top: 0,
                            right: 0,
                            position: "absolute",
                            height: 26,
                            width: 75,
                            marginTop: 10,
                            marginEnd: 10,
                            alignItems: 'center',
                            justifyContent: "center",
                            borderRadius: 12,
                            borderWidth: 1, borderColor: item.btnClr,
                            backgroundColor: "#626371"
                        }}>
                        <Text style={{
                            marginTop: 3,
                            color: "white",
                            fontSize: 10,
                            fontWeight: "bold"
                        }}>{item.appointment_type}</Text>
                    </TouchableOpacity> :
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
                            justifyContent: "center",
                            borderRadius: 12,
                            borderWidth: 1, borderColor: item.btnClr,
                            backgroundColor: "#626371"
                        }}>

                        <Text style={{
                            marginTop: 3,
                            color: "white",
                            fontSize: 10,
                            fontWeight: "bold"
                        }}>{item.appointment_type}</Text>
                    </TouchableOpacity>
            }

        </View>
    }

    renderFavBarbers(item) {
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
            <ImageBackground source={require("../../../assets/images/imgbck1.png")}
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
                            textShadowColor: "black",
                            textShadowOffset: {width: -2, height: 1},
                            textShadowRadius: 3,
                            color: Colors.white,
                            backgroundColor: "#454656",
                            borderRadius: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "darkgrey",
                            paddingStart: 5,
                            opacity: 0.8
                        }}>{item.barber_name}</Text>
                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: "#454656",
                            borderRadius: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: "darkgrey",
                            opacity: 0.8
                        }}>
                            <Image source={require("../../../assets/images/shop.png")} resizeMode={"contain"}
                                   style={{width: 20, height: 20}}/>
                            <Text style={{
                                fontSize: 12, color: Colors.white,
                                textShadowColor: "black",
                                textShadowOffset: {width: -2, height: 1},
                                textShadowRadius: 3,
                            }}>{item.shop_name}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: "#454656",
                            borderRadius: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: "darkgrey",
                            opacity: 0.8
                        }}>
                            <AirbnbRating
                                showRating={false}
                                count={5}
                                defaultRating={item.average_rating}
                                size={10}
                                style={{marginStart: 10, height: 30}}
                            />
                            <Text style={{
                                marginStart: 5, fontSize: 10, color: Colors.white,
                                textShadowColor: "black",
                                textShadowOffset: {width: -2, height: 1},
                                textShadowRadius: 3,
                            }}>{"("+item.total_reviews+" Reviews)"}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "column", width: "40%", height: "100%"}}>
                        <View style={{alignItems: "flex-end", marginEnd: 20}}>

                                <Image resizeMode={"contain"} source={require("../../../assets/images/star.png")}
                                       style={{width: 20, height: 20, marginTop: 10}}/>
                            {item.mobilePayEnabled &&<Image resizeMode={"contain"} source={require("../../../assets/images/price.png")}
                                       style={{width: 20, height: 20, marginTop: 10}}/>}
                            {!item.mobilePayEnabled &&<Image resizeMode={"contain"} style={{width: 20, height: 20, marginTop: 10}}/>}
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push("ClientBarberProfile",{
                                    barberId:item.barber_id,
                                    barberRating:item.average_rating,
                                    barberReviews:item.total_reviews,
                                    barberMobilePay:item.mobilePayEnabled
                                })}
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
                                this.props.navigation.navigate("ClientQR");
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
                        {(this.state.dataSource.length>0) &&<FlatList renderItem={({item}) => this.renderRecentBookings(item)}
                                  data={this.state.dataSource}
                                  keyExtractor={(item, index) => index}
                                  numColumns={1}
                        />}

                        {!(this.state.dataSource.length>0) &&<View style={{width:"100%",height:80,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontSize:15,color:"white"}}>{"You don't have any recent Bookings"}</Text>
                        </View>}

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
                        {(this.state.dataSource2.length>0) &&<FlatList renderItem={({item}) => this.renderFavBarbers(item)}
                                  data={this.state.dataSource2}
                                  keyExtractor={(item, index) => index}
                                  numColumns={1}
                        />}

                        {!(this.state.dataSource2.length>0) &&<View style={{width:"100%",height:80,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontSize:15,color:"white",textAlign:"center"}}>{"You don't have any Favorite Barbers \n Please make search for making favorites"}</Text>
                        </View>}
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
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")} style={{width:100,height:100, opacity: 1,}}/>
                </View>}

            </View>

        )
    }
}









