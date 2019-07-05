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
    Switch, TextInput,
} from "react-native";

import {Header, AirbnbRating} from "react-native-elements";

import {Colors} from "../../../themes";
import {styles} from "./styles";
import {globalStyles} from "../../../themes/globalStyles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";


export default class ClientBarberSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarbers: [],
            showLoading: false,
            setLocationToggle: false,
            LocationToggle: require("../../../assets/images/LocationOff.png"),
            dataSource2: [{
                id: 0,
                imgPathh2: require("../../../assets/images/imgbck1.png"),
                title2: "RENATO SANCHEZ",
                address: "Anfield Barbershop",
                time: "10:00 AM",
                surgeImg: require("../../../assets/images/price.png"),
                starimg: require("../../../assets/images/star.png")

            }, {
                id: 1,
                imgPathh2: require("../../../assets/images/imgbck2.png"),
                title2: "ROBERT LEWANDOWSKI",
                time: "10:00 AM",
                address: "Santiago Bernabeu Barbershop",
                surgeImg: require("../../../assets/images/price.png"),
                starimg: require("../../../assets/images/star.png")
            },
            ],
            dataSource3: [{
                id: 0,
                imgPathh2: require("../../../assets/images/imgbck-3.png"),
                title2: "PAUL POGBA",
                address: "Santiago Bernabeu Barbershop",
                time: "10:00 AM",
                surgeImg: require("../../../assets/images/price.png"),
                starimg: require("../../../assets/images/star-unselected.png")

            }, {
                id: 1,
                imgPathh2: require("../../../assets/images/imgbck-4.png"),
                title2: "NEMANJA GIGGS",
                time: "10:00 AM",
                address: "Old Trafford Barbershop",
                surgeImg: require("../../../assets/images/price.png"),
                starimg: require("../../../assets/images/star-unselected.png")

            },
            ]
        }
    }

    searchBarber(txt) {
        this.setState({showLoading: true})
        fetch(constants.ClientBarbersSearch + "?search_barber=" + txt, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getSearchDetails-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({
                        showLoading: false,
                        searchBarbers: response.Data
                    })
                    console.log("getSearchDetails-->", "-" + JSON.stringify(this.state.searchBarbers));
                } else {
                    this.setState({showLoading: false, searchBarbers: []})
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

    renderRowInput() {
        return <View style={{width: "100%"}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Image resizeMode={"contain"} source={require("../../../assets/images/searchicon.png")}
                       style={{
                           width: 16,
                           height: 16,
                       }}/>
                <View style={{marginStart: 10}}>
                    <TextInput
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontFamily: "AvertaStd-RegularItalic",
                        }}
                        onChange={(text) => this.searchBarber(text)}
                        placeholder={"Search by Instagram, Name, or Barbershop"}
                        placeholderTextColor={"grey"}
                    />
                </View>
            </View>
        </View>;
    }

    renderRowSurge2(item) {
        console.log("Barber Detail---->" + JSON.stringify(item));
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
            <ImageBackground source={require("../../../assets/images/imgbck-3.png")}
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
                            }}>{"(" + item.total_reviews + " Reviews)"}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "column", width: "40%", height: "100%"}}>
                        <View style={{alignItems: "flex-end", marginEnd: 20}}>
                            <View>
                                <Image resizeMode={"contain"} source={item.starimg}
                                       style={{width: 20, height: 20, marginTop: 10}}/>
                            </View>
                            <View style={{width: 20, height: 20}}>
                                {item.mobilePayEnabled &&
                                <Image resizeMode={"contain"} source={require("../../../assets/images/price.png")}
                                       style={{width: 20, height: 20, marginTop: 10}}/>}
                            </View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.push("ClientBarberProfile", {
                                    barberId: item.barber_id,
                                    barberRating: item.average_rating,
                                    barberReviews: item.total_reviews,
                                    barberMobilePay: item.mobilePayEnabled
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
                                    <Text style={{
                                        marginStart: 5,
                                        fontSize: 10,
                                        color: "red",
                                        fontWeight: 'bold'
                                    }}>{"Next Available"}</Text>
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
                                opacity: 0.7,
                                height: 27,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                                <Text style={{fontSize: 12, color: "white", fontWeight: "bold"}}>{"10:00 AM"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>


        </View>


    }

    setLocationImage() {
        if (this.state.setLocationToggle === false) {
            this.setState({LocationToggle: require("../../../assets/images/location1.png"), setLocationToggle: true});
        } else {
            this.setState({
                LocationToggle: require("../../../assets/images/LocationOff.png"),
                setLocationToggle: false
            });
        }
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
                        <TouchableOpacity onPress={() => this.setLocationImage()}>
                            <Image
                                style={{
                                    height: 25,
                                    resizeMode: "contain"
                                }}
                                source={this.state.LocationToggle}
                            />
                        </TouchableOpacity>
                    }
                    rightComponent={<TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("ClientFilter");
                        }}>
                        <Image
                            style={{
                                tintColor: "white",
                                height: 25,
                                resizeMode: "contain"
                            }}
                            source={require("../../../assets/images/filter-2.png")}
                        />
                    </TouchableOpacity>}

                    centerComponent={{text: "BARBERS", style: {color: "#fff"}}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                />
                <ScrollView>
                    <View>
                        <View style={{
                            marginTop: 20,
                            marginStart: 20, marginEnd: 20,
                            backgroundColor: "#474857",
                            borderWidth: 0.5,
                            borderColor: "grey",
                            borderRadius: 6
                        }}>
                            {this.renderRowInput({})}
                        </View>

                        {(this.state.searchBarbers.length < 1) && <View style={{
                            flexDirection: "row",
                            marginTop: 20,
                            marginStart: 20,
                            marginEnd: 20,
                            borderRadius: 8,
                            height: 65,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 25
                        }}>
                            <Image resizeMode={"cover"}
                                   source={require("../../../assets/images/red_bg.png")}
                                   style={{width: "100%", height: "100%", borderRadius: 7}}/>
                            <Text style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 12,
                                position: "absolute",
                                top: 12
                            }}>TOP RATED PROFESSIONALS IN YOUR AREA</Text>

                            <View style={{
                                width: "90%",
                                height: 60,
                                position: "absolute",
                                top: 32,
                                justifyContent: "center",
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.navigate("ClientBarberProfile")}>

                                    <Image resizeMode={"contain"} source={require("../../../assets/images/img-1.png")}
                                           style={{
                                               borderRadius: 25,
                                               height: 50,
                                               width: "16%",
                                           }}

                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.navigate("ClientBarberProfile")}>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/img-2.png")}
                                           style={{
                                               borderRadius: 25,
                                               marginStart: 10,
                                               height: 50,
                                               width: "16%"
                                           }}/>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.navigate("ClientBarberProfile")}>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/img-3.png")}
                                           style={{
                                               borderRadius: 25,
                                               marginStart: 10,
                                               height: 50,
                                               width: "16%"
                                           }}/>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.navigate("ClientBarberProfile")}>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/img-4.png")}
                                           style={{
                                               borderRadius: 25,
                                               marginStart: 10,
                                               height: 50,
                                               width: "16%"
                                           }}/>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.navigation.navigate("ClientBarberProfile")}>
                                    <Image resizeMode={"contain"} source={require("../../../assets/images/img-5.png")}
                                           style={{
                                               borderRadius: 25,
                                               marginStart: 10,
                                               height: 50,
                                               width: "16%"
                                           }}/>
                                </TouchableWithoutFeedback>
                            </View>

                        </View>}

                        {(this.state.searchBarbers.length < 1) && <View>
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

                            <View>
                                <Text style={{
                                    color: "white",
                                    fontWeight: 'bold',
                                    marginStart: 20,
                                    marginBottom: 10

                                }}>{"Nearby Barbers"} </Text>
                            </View>
                            <View style={{marginTop: 0, marginStart: 20, marginEnd: 20, marginBottom: 30}}>
                                <FlatList renderItem={({item}) => this.renderRowSurge2(item)}
                                          data={this.state.dataSource3}
                                          keyExtractor={(item, index) => index}
                                          numColumns={1}
                                />
                            </View>
                        </View>}


                        {(this.state.searchBarbers.length > 0) &&
                        <View style={{marginTop: 0, marginStart: 20, marginEnd: 20, marginBottom: 30}}>
                            <FlatList renderItem={({item}) => this.renderRowSurge2(item)}
                                      data={this.state.searchBarbers}
                                      extraData={this.state.searchBarbers}
                                      keyExtractor={(item, index) => index}
                                      numColumns={1}
                            /></View>}
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
                    <Image resizeMode={"contain"} source={require("../../../assets/images/loading.gif")}
                           style={{width: 100, height: 100, opacity: 1,}}/>
                </View>}
            </View>

        )
    }
}


const searchData = [
    {
        "barber_id": "5ccc53909919464b892ed656",
        "barber_name": "",
        "shop_name": "CLYPR Barber Shop",
        "mobilePayEnabled": false,
        "total_reviews": 0,
        "average_rating": 0
    },
    {
        "barber_id": "5cd522fd463a0a2f38557c85",
        "barber_name": "test123",
        "shop_name": "CLYPR Barber Shop",
        "mobilePayEnabled": false,
        "total_reviews": 9,
        "average_rating": 4.133333333333334
    },
    {
        "barber_id": "5ce6c62a3ab19d406b89f1a3",
        "barber_name": "Clypr",
        "shop_name": "CLYPR Barber Shop",
        "mobilePayEnabled": false,
        "total_reviews": 0,
        "average_rating": 0
    }
]





