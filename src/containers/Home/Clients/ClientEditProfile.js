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
    TextInput,
} from "react-native";
import colors from "../../../themes/colors";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import {RedButton} from "../../../components/Buttons";
import {Colors, Metric} from "../../../themes";
import ImagePicker from 'react-native-image-picker';
import {constants} from "../../../utils/constants";
import Preference from "react-native-preference";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const {height, width} = Dimensions.get("window");

export default class ClientEditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            userName: "Enter your Name",
            userAddress: "Enter your address",
            editLocation: false,
            editName: false,
            isConnected: true,
            places: [],
        }

    }

    componentDidMount(): void {
        if (Preference.get("userName") != null) {
            this.setState({userName: Preference.get("userName")})
        }
        if (Preference.get("userAddress") != null) {
            this.setState({userAddress: Preference.get("userAddress")})
        }
    }

    renderGooglePlacesInput = () => {
        return (
            <GooglePlacesAutocomplete
                placeholder='Enter Address'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='false'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null,) => { // 'details' is provided when fetchDetails = true
                    console.log("hello" + data, details);

                    this.setState({places: []});

                    this.state.places.push(details);
                    this.setState({places: this.state.places});
                    console.log("hello2" + JSON.stringify(this.state.places));
                }}
                getDefaultValue={() => ''}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyD5YuagFFL0m0IcjCIvbThN25l0m2jMm2w',
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}

                styles={{
                    textInput: {
                        backgroundColor: colors.gray,
                        color: 'white',
                        fontSize:13,
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
                        color: "white",
                        backgroundColor: "transparent"
                    },
                    predefinedPlacesDescription: {
                        color: 'red'
                    },
                    poweredContainer: {color: "red"},

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
                    fields: ["name", 'formatted_address']
                }}


                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                renderRightButton={() =>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Image source={require('../../../assets/images/edit.png')}
                               style={{resizeMode: "contain", width: 20, height: 20, marginEnd: 15}}/>
                    </View>

                }
                renderLeftButton={() => <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text style={{marginStart:10,fontSize:12,color:Colors.grey}}>{"Location :"}</Text>
                </View>
                }
                enablePoweredByContainer={false}

            />
        );
    };

    renderRowED2(item) {
        return <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
            <Text style={{color: "grey", fontSize: 10, marginStart: 10, marginTop: 10}}>{item.hintText}</Text>
            {!this.state.editLocation &&
            <Text style={[styles.row_title, {marginTop: 10, alignItems: "center", fontSize: 11, marginStart: 5}
            ]}>{item.title}</Text>}
            {this.state.editLocation &&
            <TextInput value={this.state.userAddress}
                       onChangeText={(text) => this.setState({userAddress: text})}
                       style={{color: "white", fontSize: 10, height: 50, width: "70%", marginTop: 10}}/>}
            <TouchableOpacity onPress={() => this.setState({editLocation: true})}
                              style={[styles.right_arrow, {resizeMode: "contain", height: 30, top: 5}]}>
                <Image style={{resizeMode: "contain", height: 15, marginTop: 5}} source={item.ic}/>
            </TouchableOpacity>

        </View>;
    }

    saveData = () => {
        //this.props.navigation.push("PaymentMethod");
        if (this.state.isConnected) {
            if (this.state.userName === "" || this.state.userAddress === "" || this.state.userName === "Enter your Name" || this.state.userAddress === "Enter your address") {
                alert("Please enter full data.");
            } else {
                const {email, password} = this.state;
                var details = {
                    client_id: Preference.get("userId"),
                    address: this.state.userAddress,
                    username: this.state.userName,
                };

                // client_image:"",


                let formdata = new FormData();

                for (var property in details) {
                    formdata.append(property, details[property])
                }

                if (this.state.avatarSource) {
                    let photo = {uri: this.state.avatarSource.uri}
                    formdata.append("client_image", {uri: photo.uri, name: 'image.jpg', type: 'image/jpeg'})
                }/*else{
                    alert("Please select profile image.");
                    return;
                }*/

                this.props.navigation.goBack();

                // fetch(constants.ClientProfileUpdate, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     },
                //     body: formdata
                // }).then(response => response.json())
                //     .then(response => {
                //         console.log('ClientProfileEdit -- response -- '+ JSON.stringify(response))
                //         if (response.ResultType === 1) {
                //             Preference.set({
                //                 userName: this.state.userName,
                //                 userAddress: this.state.userAddress,
                //             });
                //             this.props.navigation.push("PaymentMethod");
                //         } else {
                //             if (response.ResultType === 0) {
                //                 alert(response.Message);
                //             }
                //         }
                //     })
                //     .catch(error => {
                //         console.error('Error:', error);
                //     });
            }
        } else {
            alert("Please connect Internet");
        }

    }


    selectImage = () => {
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
                            {this.state.avatarSource === null && <Image
                                source={require("../../../assets/images/clientedit.png")}
                                style={styles.profileImage}/>}
                            {this.state.avatarSource != null && <Image
                                source={this.state.avatarSource}
                                style={styles.profileImage}/>}
                            <TouchableOpacity onPress={() => this.selectImage()} style={{
                                position: "absolute",
                                right: 5,
                                bottom: 5,
                                borderWidth: 4,
                                borderRadius: 20,
                                borderColor: "black",
                                width: 40,
                                height: 40,
                            }}>
                                <Image
                                    source={require("../../../assets/images/dpchange.png")}
                                    resizeMode='contain'
                                    style={{
                                        width: '100%', height: '100%',
                                    }}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={[styles.infoContainer]}>
                                <View style={{
                                    flexDirection: "row",
                                    width: "80%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    {!this.state.editName &&
                                    <Text style={{
                                        fontWeight: "bold",
                                        marginTop: 15,
                                        marginBottom: 15,
                                        fontSize: 16,
                                        color: "white"
                                    }}>{this.state.userName}</Text>}
                                    {this.state.editName &&
                                    <TextInput Color={"white"} placeholder={"Enter your Name"}
                                               placeholderTextColor={"white"}
                                               onChangeText={(text) => this.setState({userName: text})}
                                               style={{
                                                   fontWeight: "bold",
                                                   fontSize: 16,
                                                   color: "white"
                                               }}/>}
                                    <TouchableOpacity style={{width: "20%"}}
                                                      onPress={() => this.setState({editName: true})}>
                                        <Image style={{
                                            height: 15,
                                            width: 15,
                                            marginStart: 10,
                                            marginTop: 5,
                                        }}
                                               source={require("../../../assets/images/edit.png")}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.row, {height: 200}]}>
                            {this.renderGooglePlacesInput()}
                        </View>
                        <RedButton label="SAVE" onPress={() => {
                            console.log("onSavePress()")
                            this.saveData()
                        }} style={styles.btnContainer}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 0,
            backgroundColor: colors.themeBackground
        },
        row: {
            flexDirection: 'column',
            height: 100,
            width: "90%",
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
            alignItems: "flex-end",
            borderRadius: width / 6
        },
        infoContainer: {

            justifyContent: "center",
            width: "100%",
            alignItems: "center",

        },
        allFontStyle: {
            color: "#535361",

        },
        name: {
            height: 50,
            fontSize: 16,
            fontWeight: "bold",
            color: "white", marginRight: 30
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

        },
        btnContainer: {
            marginTop: 10
        },


    });