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
    FlatList, Picker,
} from "react-native";
import colors from "../../../themes/colors";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import ImagePicker from 'react-native-image-picker';
import {RedButton} from "../../../components/Buttons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Colors} from "../../../themes";

const {height, width} = Dimensions.get("window");
const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
        //places: [],
    },
};

export default class BarberEditProfile extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            houseCall: false,
            Experience: "1",
            pickMonth: false,
            places: [],
            avatarSource: require("../../../assets/images/personface.png"),
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
            ],
            imagesData: []
        }
    }

    changeHouseCall() {
        console.log("housecall clicked");
        if (this.state.houseCall === true)
            this.setState({houseCall: false})
        else
            this.setState({houseCall: true})
    }

    renderGooglePlacesInput = () => {
        return (
            <GooglePlacesAutocomplete
                placeholder='Location'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='false'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null,) => { // 'details' is provided when fetchDetails = true
                    console.log("hello"+data, details);

                    this.setState({places:[]});

                    this.state.places.push(details);
                    this.setState({places:this.state.places});
                    console.log("hello2"+JSON.stringify(this.state.places));
                }}
                getDefaultValue={() => ''}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyD5YuagFFL0m0IcjCIvbThN25l0m2jMm2w',
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}

                styles={{
                    textInput:{
                        backgroundColor:colors.gray,
                        color:'white'
                    },

                    textInputContainer: {

                        backgroundColor: Colors.gray,
                        borderWidth: 0.5,
                        borderColor: Colors.border,
                        borderRadius: 5,

                        flexDirection: "row",
                        margin: 1

                    },
                    description: {

                        color:"white",
                        backgroundColor:"transparent"
                    },
                    predefinedPlacesDescription: {
                        color: 'red'
                    },
                    poweredContainer:{color:"red"},

                }}
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}
                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: ["name",'formatted_address']
                }}


                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                renderRightButton={()  =>
                    <View style={{justifyContent:"center",alignItems:"center"}} >
                        <Image source={require('../../../assets/images/edit.png')}
                               style={{resizeMode:"contain",width:20,height:20,marginEnd:15}} />

                    </View>

                }
                enablePoweredByContainer={false}

            />
        );
    };

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

    selectImage = () => {
        //alert("hello");
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    selectImage2 = () => {
        //alert("hello");
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};
                let imageDta = this.state.imagesData;

                imageDta.push({id: imageDta.length + 1, imagePath: source})
                this.setState({imagesData: imageDta});
            }
        });
    }
    deleteImage(indx)
    {
        //alert("deleting "+indx);
        let imageDta = this.state.imagesData;
        imageDta.splice(indx,1);
        this.setState({imagesData: imageDta});
        console.log("imagesData+ "+JSON.stringify(this.state.imagesData))
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
                                source={this.state.avatarSource}
                                style={styles.profileImage}/>
                            <TouchableOpacity onPress={() => this.selectImage()} style={{
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
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{color: colors.white, fontSize: 12}}>
                                        CLYPR Barbershop</Text>
                                    <TouchableOpacity>
                                        <Image style={{height: 15, width: 15, marginStart: 10}}
                                               source={require("../../../assets/images/edit.png")}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.review, {flexDirection: "row"}]}>
                                    <Text style={[styles.allFontStyle, styles.reviewText, {
                                        color: "white",
                                        fontFamily: "AvertaStd-Extrathin"
                                    }]}>
                                        {this.state.month}Years of Experience</Text>
                                    <TouchableOpacity onPress={() => this.setState({pickMonth: true})}>
                                        <Picker style={{width: 90, height: 20, color: "white", marginBottom: 5}}
                                                onValueChange={(txt) => this.setState({month: txt})}>
                                            <Picker.Item label="1" value="1"/>
                                            <Picker.Item label="2" value="2"/>
                                            <Picker.Item label="3" value="3"/>
                                            <Picker.Item label="4" value="4"/>
                                            <Picker.Item label="5" value="5"/>
                                            <Picker.Item label="6" value="6"/>
                                            <Picker.Item label="7" value="7"/>
                                            <Picker.Item label="8" value="8"/>
                                            <Picker.Item label="9" value="9"/>
                                            <Picker.Item label="10" value="10"/>
                                            <Picker.Item label="11" value="11"/>
                                            <Picker.Item label="12" value="12"/>
                                            <Picker.Item label="13" value="13"/>
                                            <Picker.Item label="14" value="14"/>
                                            <Picker.Item label="15" value="15"/>
                                            <Picker.Item label="16" value="16"/>
                                            <Picker.Item label="17" value="17"/>
                                            <Picker.Item label="18" value="18"/>
                                            <Picker.Item label="19" value="19"/>
                                            <Picker.Item label="20" value="20"/>
                                            <Picker.Item label="21" value="21"/>
                                            <Picker.Item label="22" value="22"/>
                                            <Picker.Item label="23" value="23"/>
                                            <Picker.Item label="24" value="24"/>
                                            <Picker.Item label="25" value="25"/>
                                            <Picker.Item label="26" value="26"/>
                                            <Picker.Item label="27" value="27"/>
                                            <Picker.Item label="28" value="28"/>
                                            <Picker.Item label="29" value="29"/>
                                            <Picker.Item label="30" value="30"/>
                                            <Picker.Item label="31" value="31"/>
                                            <Picker.Item label="32" value="32"/>
                                            <Picker.Item label="33" value="33"/>
                                            <Picker.Item label="34" value="34"/>
                                            <Picker.Item label="35" value="35"/>
                                            <Picker.Item label="36" value="36"/>
                                            <Picker.Item label="37" value="37"/>
                                            <Picker.Item label="38" value="38"/>
                                            <Picker.Item label="39" value="39"/>
                                            <Picker.Item label="40" value="40"/>
                                            <Picker.Item label="41" value="41"/>
                                            <Picker.Item label="42" value="42"/>
                                            <Picker.Item label="43" value="43"/>
                                            <Picker.Item label="44" value="44"/>
                                            <Picker.Item label="45" value="45"/>
                                            <Picker.Item label="46" value="46"/>
                                            <Picker.Item label="47" value="47"/>
                                            <Picker.Item label="48" value="48"/>
                                            <Picker.Item label="49" value="49"/>
                                            <Picker.Item label="50" value="50"/>
                                        </Picker>
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

                    <View style={[styles.row,]}>
                        {this.renderGooglePlacesInput()}
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        height: 150,
                        flexDirection: "row",
                        width: "90%",
                        marginStart: 19,
                        marginEnd: 19,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginBottom: 20,
                        marginTop: 5
                    }}>

                        {this.state.imagesData.length > 0 && <FlatList
                            data={this.state.imagesData}
                            keyExtractor={(item,index) =>index }
                            extraData={this.state}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item,index}) =>
                                <View style={{width: 100, height: 140, marginStart: 10}}>
                                    <Image source={item.imagePath} style={{borderRadius: 10, width: 100, height: 140}}
                                           resizeMode={"contain"}/>
                                    <TouchableOpacity style={{position: "absolute", top: 5, right: 5}} onPress={()=>this.deleteImage(index)}>
                                        <Image resizeMode={"contain"}
                                               source={require("../../../assets/images/delete.png")}
                                               style={{width: 20, height: 20, }}/>
                                    </TouchableOpacity>
                                </View>}/>}
                        <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <TouchableOpacity onPress={() => this.selectImage2()}>
                                <Image source={require("../../../assets/images/plus.png")}
                                       style={{
                                           resizeMode: "contain",
                                           height: 50
                                       }}/>
                            </TouchableOpacity>
                            {this.state.imagesData.length < 1 && <Text
                                style={{color: "grey", marginTop: 10}}
                            >Add New Pictures</Text>}
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: "center", width: "100%"}}>
                        <TouchableOpacity style={[globalStyles.button, {
                            height: 35,
                            width: 250,
                            backgroundColor: "red",
                            marginTop: 20,
                            marginBottom: 20,
                        }]}>
                            <Text style={{fontSize: 15, fontWeight: "bold", color: "white"}}>{"Save"}</Text>

                        </TouchableOpacity>
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
        borderRadius: width / 6,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    infoContainer: {
        flexDirection: "column",
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