import React, {Component} from "react";
import {
    FlatList,
    Image,
    ImageBackground,
    ScrollView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Linking
} from "react-native";

var moment = require("moment");
import {AirbnbRating, Header} from "react-native-elements";

import {Colors, Metric} from "../../../themes";
import {styles} from "./styles";
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {RedButton, WhiteButton} from "../../../components/Buttons";
import colors from "../../../themes/colors";
import {NavigationActions, StackActions} from "react-navigation";


export default class ClientBarberSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBarbers: [],
            showLoading: false,
            setLocationToggle: true,
            LocationToggle: require("../../../assets/images/location1.png"),
            dataSource2: [],
            searchText: "",
            filterLocation: "",
            filterDistance: 10000,
            filterCost: "",
            blendQuality: 0,
            shapeUpAbility: 0,
            scissorTechnique: 0,
            comboverSkill: 0,
            latitude: "",
            longitude: "",
            dataSource3: [],
            Address: "",
            TopRatedBarbers: [],
            topRatedText: 'TOP RATED BARBERS IN YOUR AREA',
        }
        this.setFilters = this.setFilters.bind(this);
    }

    componentDidMount=async()=> {
        if (Preference.get("clientlogin"))
            this.getFavoriteBarbers();
        // this.setLocationImage();
        this.TopRatedBarbers();
        if(this.state.setLocationToggle)
            await this.getCurrentLocation();
    }

    /*componentWillMount(): void {
        this.getFavoriteBarbers();
        //this.setLocationImage();
        this.TopRatedBarbers();

    }*/

    searchBarber(txt) {
        const {searchText} = this.state;

        console.log("getSearchDetails-txt->", "-" + constants.ClientBarbersSearch + "?search_barber=" + this.state.searchText
            + "&bliend_quality=" + this.state.blendQuality
            + "&shape_up_ability=" + this.state.shapeUpAbility
            + "&scissor_technique=" + this.state.scissorTechnique
            + "&combover_skills=" + this.state.comboverSkill
            + "&lat=" + this.state.latitude
            + "&long=" + this.state.longitude
            + "&distance=" + this.state.filterDistance
            + "&price=" + this.state.filterCost
        );
        this.setState({showLoading: true})
        fetch(constants.ClientBarbersSearch + "?search_barber=" + this.state.searchText
            + "&bliend_quality=" + this.state.blendQuality
            + "&shape_up_ability=" + this.state.shapeUpAbility
            + "&scissor_technique=" + this.state.scissorTechnique
            + "&combover_skills=" + this.state.comboverSkill
            + "&lat=" + this.state.latitude
            + "&long=" + this.state.longitude
            + "&distance=" + this.state.filterDistance
            + "&price=" + this.state.filterCost
            , {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
            .then(response => {

                console.log("getSearchDetails-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    if (searchText === "") {
                        this.setState({
                            showLoading: false,
                            dataSource3: response.Data,

                        }, () => {
                            console.log("DATASOURCE" + JSON.stringify(this.state.dataSource3))
                        })
                    } else {
                        this.setState({
                            showLoading: false,
                            searchBarbers: response.Data,

                        })

                    }

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
            //alert("Error: " + error);
        });
    }

    TopRatedBarbers() {
        fetch(constants.TopRatedBarbers, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("TopRatedBarbers-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    if (response.Data.length < 1) {
                        this.setState({topRatedText: "THERE ARE NOT ANY TOP RATED BARBERS IN YOUR AREA"})
                    }
                    this.setState({TopRatedBarbers: response.Data});
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            //alert("Error: " + error);
        });


    }


    getFavoriteBarbers() {
        fetch(constants.ClientFavoritBarbers + "?client_id=" + Preference.get("userId"), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getFavoriteBarbers-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({dataSource2: response.Data});
                    this.searchBarber("");
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            //console.error('Errorr:', error);
            console.log('Error:', error);
            //alert("Error: " + error);
        });
    }

    renderRowInput() {
        return <View style={{width: "100%"}}>
            <View style={{height: 50, flexDirection: "row", alignItems: "center",}}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginStart: 10, width: "5%"}}>
                    <Image resizeMode={"contain"} source={require("../../../assets/images/searchicon.png")}
                           style={{
                               width: 16,
                               height: 16,
                           }}/>
                </View>
                <View style={{marginStart: 10, width: "90%", flexDirection: "row"}}>
                    <TextInput
                        style={{
                            color: "white",
                            fontSize: 12,
                            fontFamily: "AvertaStd-RegularItalic",
                            width: "80%"
                        }}
                        onChangeText={(text) => {
                            this.setState({searchText: text})
                            if (text === "")
                                this.setState({searchBarbers: []});
                        }}
                        placeholder={"Search by Instagram, Name, or Barbershop"}
                        placeholderTextColor={"grey"}
                    />
                    <TouchableOpacity onPress={() => this.searchBarber(this.state.searchText)}
                                      style={{justifyContent: 'center', width: "20%"}}>
                        <Text style={{color: "white", fontSize: 14, fontWeight: "bold"}}>Search</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>;
    }

    renderRowSurge2(item) {
        if (item.avilabeSlot != 'Tomorrow') {
            item.avilabeSlot = moment(item.avilabeSlot, "hh:mm").format("hh:mm a");
        }
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
            <ImageBackground source={{uri: item.banner_image}}
                             style={{
                                 width: "100%",
                                 height: "100%",
                                 borderRadius: 7,
                                 overflow: 'hidden',
                                 borderColor: "#84858f",
                                 borderWidth: 1,
                             }}>
                <View style={{flexDirection: "row", width: "100%", height: "100%",}}>
                    <View style={{
                        flexDirection: "column",
                        width: "60%",
                        height: "100%",
                        marginTop: 75,
                        marginStart: 10
                    }}>
                        <View style={{
                            flexDirection: "row", alignItems: "center", backgroundColor: "#454656",
                            borderRadius: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: "darkgrey",
                            opacity: 0.8
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                textShadowColor: "black",
                                textShadowOffset: {width: -2, height: 1},
                                textShadowRadius: 3,
                                color: Colors.white,
                                width: "90%",
                                textAlign: "left",
                                marginStart: 10
                            }}>{item.barber_name}</Text>
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
                                onPress={() => {
                              
                                    this.props.navigation.push("ClientBarberProfile", {
                                    barberId: item.barber_id,
                                    barberRating: item.average_rating,
                                    barberReviews: item.total_reviews,
                                    barberMobilePay: item.mobilePayEnabled
                                })}}
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
                                        fontWeight: 'bold',
                                        width: "100%",
                                        textAlign: "center"
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
                                <Text style={{
                                    fontSize: 12,
                                    color: "white",
                                    fontWeight: "bold",
                                    width: "100%",
                                    textAlign: "center"
                                }}>{item.avilabeSlot}</Text>

                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>


        </View>


    }

    getCurrentLocation() {
        console.log("GeoLocation-->1");
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("GeoLocation-->2");
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            };
            console.log("GeoLocation-->", region);
            this.setState({latitude: region.latitude, longitude: region.longitude}, () => {
                this.searchBarber();
            })
            //this.onRegionChange(region, region.latitude, region.longitude);
        }, (error) => console.log("error--->", error));
    }

    async setLocationImage() {
        console.log("LocationSelected: ", this.state.setLocationToggle);
        if (this.state.setLocationToggle == false) {
            this.setState({
                LocationToggle: require("../../../assets/images/location1.png"),
                setLocationToggle: true
            }, () => {
                this.forceUpdate();
            });
            await this.getCurrentLocation();

        } else {
            this.setState({
                LocationToggle: require("../../../assets/images/LocationOff.png"),
                setLocationToggle: false,
                latitude: "", longitude: ""
            });
        }
    }

    setFilters(filterlocation, filterdistance, filtercost, blendquality, shapeupability, scissortecnique, comboverskill, lat, long, address) {
        this.setState({
            filterLocation: filterlocation,
            filterDistance: filterdistance,
            filterCost: filtercost,
            blendQuality: blendquality,
            shapeUpAbility: shapeupability,
            ScissorTecnique: scissortecnique,
            comboverSkills: comboverskill,
            latitude: lat,
            longitude: long,
            Address: address
        }, () => {
            this.searchBarber(this.state.searchText)
        })


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
                    rightComponent={<>{(Preference.get("clientlogin")) && <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.push("ClientFilter", {
                                onFilter: (filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8, filter9, filter10) => {
                                    this.setFilters(filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8, filter9, filter10)
                                },
                                filterLocation: this.state.filterLocation,
                                filterDistance: this.state.filterDistance,
                                filterCost: this.state.filterCost,
                                blendQuality: this.state.blendQuality,
                                shapeUpAbility: this.state.shapeUpAbility,
                                scissorTecnique: this.state.scissorTecnique,
                                comboverSkill: this.state.comboverSkill,
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                address: this.state.Address
                            });
                        }}>
                        <Image
                            style={{
                                tintColor: "white",
                                height: 25,
                                resizeMode: "contain"
                            }}
                            source={require("../../../assets/images/filter-2.png")}
                        />
                    </TouchableOpacity>}</>}
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
                                top: 12,
                                width: "100%",
                                textAlign: "center"
                            }}>{this.state.topRatedText}</Text>

                            <View style={{
                                width: "90%",
                                height: 60,
                                position: "absolute",
                                top: 32,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <FlatList
                                    horizontal={true}
                                    initialNumToRender={5}
                                    contentContainerStyle={{justifyContent: 'center'}}
                                    renderItem={({item, index}) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                onPress={() => {
                                                    this.props.navigation.navigate("ClientBarberProfile", {
                                                        barberId: item.barber_id,
                                                        barberRating: item.average_rating,
                                                        barberReviews: item.total_reviews,
                                                        barberMobilePay: item.mobilePayEnabled
                                                    });
                                                }}
                                                style={{
                                                    borderRadius: 25,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginEnd: 5
                                                }}>
                                                <Image resizeMode={"cover"}
                                                       source={{uri: item.barber_image}}
                                                       style={{
                                                           height: 50,
                                                           width: 50,
                                                           borderRadius: 25,
                                                       }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    }}
                                    keyExtractor={({item, index}) => index}
                                    // data={this.state.TopRatedBarbers}
                                    data={this.state.TopRatedBarbers}/>
                            </View>
                        </View>}
                        {(this.state.searchBarbers.length < 1) && <View>
                            {(Preference.get("clientlogin")) && <View>
                                <Text style={{
                                    color: "white",
                                    fontWeight: 'bold',
                                    marginStart: 20,
                                    marginTop: 20,

                                }}>{"Favorite Barbers"} </Text>
                            </View>}

                            {(Preference.get("clientlogin")) &&
                            <View style={{marginTop: 0, marginStart: 20, marginEnd: 20, marginBottom: 20}}>
                                {(this.state.dataSource2.length > 0) &&
                                <FlatList renderItem={({item}) => this.renderRowSurge2(item)}
                                          data={this.state.dataSource2}
                                          keyExtractor={(item, index) => index}
                                          numColumns={1}
                                />}
                                {!(this.state.dataSource2.length > 0) && <View
                                    style={{width: "100%", height: 80, alignItems: "center", justifyContent: "center"}}>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: "white"
                                        }}>{"You don't have a favorite Barber yet"}</Text>
                                </View>}
                            </View>}

                            <View>
                                <Text style={{
                                    color: "white",
                                    fontWeight: 'bold',
                                    marginStart: 20,
                                    marginBottom: 10

                                }}>{"Nearby Barbers"} </Text>
                            </View>
                            <View style={{marginTop: 0, marginStart: 20, marginEnd: 20, marginBottom: 30}}>
                                {(this.state.dataSource3.length > 0) &&
                                <FlatList renderItem={({item}) => this.renderRowSurge2(item)}
                                          data={this.state.dataSource3}
                                          style={{marginBottom:75}}
                                          keyExtractor={(item, index) => index}
                                          numColumns={1}
                                />}
                                {!(this.state.dataSource3.length > 0) && <View
                                    style={{width: "100%", height: 80, alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: "white"
                                    }}>{"There aren't any barbers nearby.\n Please update your search location."}</Text>
                                </View>}
                            </View>
                        </View>}


                        {(this.state.searchBarbers.length > 0) &&
                        <View style={{marginTop: 0, marginStart: 20, marginEnd: 20, marginBottom: 30}}>
                            <FlatList renderItem={({item}) => this.renderRowSurge2(item)}
                                      data={this.state.searchBarbers}
                                      extraData={this.state}
                                      keyExtractor={(item, index) => index}
                                      numColumns={1}
                            /></View>}
                    </View>
                </ScrollView>
                {!Preference.get('clientlogin') &&<View style={{width: "100%", height: 75, position: "absolute", bottom: 0, alignItems: "center",backgroundColor:colors.themeBackground}}>
                    <View style={{
                        width: "80%",
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: "space-between",
                        backgroundColor:Colors.themeBackground,
                        marginTop: 10
                    }}>
                        <TouchableOpacity onPress={()=>{
                            //this.props.navigation.goBack();
                            const goToIntoScreen = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'SelectScreen' })],
                            });
                            this.props.navigation.dispatch(goToIntoScreen);
                        }} style={{width: "40%", backgroundColor: Colors.red, height: 40, borderRadius: 20,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{color:"white"}}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                //this.props.navigation.goBack();
                                const goToIntoScreen = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'SelectScreen' })],
                                });
                                this.props.navigation.dispatch(goToIntoScreen);
                            }}
                            style={{width: "40%", backgroundColor: "white", height: 40, borderRadius: 20,alignItems:"center",justifyContent:"center"}}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
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
                           style={{width: 60, height: 60, opacity: 1,}}/>
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





