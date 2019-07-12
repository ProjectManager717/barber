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
    Dimensions,Alert,
    FlatList, Picker, TextInput,
} from "react-native";
import colors from "../../../themes/colors";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import ImagePicker from 'react-native-image-picker';
import {RedButton} from "../../../components/Buttons";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from "../../../themes";
import PopupDialog from 'react-native-popup-dialog';
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";

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
            serviceEditId: "",
            showLoading: false,
            barberInsta: "",
            barberName: "",
            barberShopName: "",
            imagesData: [],
            imagesDataServer: [],
            barberRating: 0,
            barberReviews: 0,
            NoExperience:false,
            barberPackage: "basic",
            houseCall: false,
            Experience: "1",
            pickMonth: false,
            experience: "0",
            userShopName: "",
            barberAddress: "",
            DialogVisible: false,
            DialogBarberShop: false,
            DialogInstaUsername: false,
            DialogEditService: false,
            DialogAddService: false,
            serviceName: "",
            serviceDuration: "",
            servicePrice: "",
            serviceIndex: undefined,
            InstaUsername: Preference.get("userInsta"),
            places: [],
            avatarSource: require("../../../assets/images/personface.png"),
            avatarForServer:"",
            /* ListData: [
                 {
                     id: 1,
                     service_type: "Haircut",
                     duration_type: "30 mins",
                     prize_type: "20",
                     showLine: true

                 },
                 {
                     id: 2,
                     service_type: "Beard Trim",
                     duration_type: "15 mins",
                     prize_type: "15",
                     showLine: true

                 },
                 {
                     id: 3,
                     service_type: "Design",
                     duration_type: "20 mins",
                     prize_type: "30",
                     showLine: true

                 },
                 {
                     id: 4,
                     service_type: "Hot Towel Shave",
                     duration_type: "45 mins",
                     prize_type: "40",
                     showLine: false
                 }
             ],*/
            ListData: [],
        }
    }

    componentDidMount(): void {
        if (this.state.userShopName === "" || this.state.userShopName === null) {
            this.setState({userShopName: "Enter Shop name"})
        }
        this.getBarberDetails();
    }

    getBarberDetails() {
        this.setState({showLoading: true})
        fetch(constants.ClientBarbersProfile + "/" + Preference.get("userId") + "/profile", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getBarberDetails-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    let barberData = response.Data;
                    this.setState({
                        avatarSource: {uri: barberData.user_image},
                        barberInsta: barberData.username,
                        barberName: barberData.firstname,
                        barberShopName: barberData.shop_name,
                        imagesData: barberData.portoflios,
                        ListData: barberData.services,
                        barberRating: barberData.rating,
                        barberReviews: barberData.reviews,
                        barberAddress: barberData.location,
                        experience: barberData.experience,
                    });

                    if (barberData.supreme_barber === 0)
                        this.setState({barberPackage: "Basic"})
                    else
                        this.setState({barberPackage: "Supreme"})
                    //this.setState({barberData: response.Data});
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

    saveData() {
        let requestBody = new FormData();
        requestBody.append("user_id",Preference.get("userId"))
        requestBody.append("firstname", this.state.barberName)
        requestBody.append("lastname", "")
        requestBody.append("shop_name", this.state.barberShopName)
        requestBody.append("experience", this.state.experience)
        requestBody.append("location", this.state.barberAddress)
        requestBody.append("house_call", 0)
        requestBody.append("username", this.state.barberInsta)
        for(let i=0;i<this.state.imagesDataServer.length;i++)
        {

            requestBody.append("portfolios[]", {
                uri: this.state.imagesDataServer[i],
                name: "imageAvatar.png",
                type: 'image/jpeg'
            })
        }
        if (this.state.avatarForServer) {
            requestBody.append("user_image", {
                uri: this.state.avatarForServer,
                name: "imageAvatar.png",
                type: 'image/jpeg'
            })
        }

        console.log("SendingData::",JSON.stringify(requestBody));
        this.setState({showLoading:true});
        fetch(constants.BarbersProfileUpdate, {
            method: 'POST',
            body: requestBody,
            headers: {
                /*'Content-Type': 'application/x-www-form-urlencoded',*/
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                console.log("saveDataForBarberProfile-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading:false})
                    Alert.alert("Success!","Your Profile updated.");
                    if (Preference.get("newUser") === true)
                        this.props.navigation.push("ChooseTimings");
                    else
                        this.props.navigation.goBack();

                    /*if (Preference.get("newUser") === true)
                        this.props.navigation.push("Subscription")
                    else
                        this.props.navigation.goBack();*/

                } else {
                    this.setState({showLoading:false})
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading:false})
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
        //console.log("OutPutData::",details);
    }

    changeHouseCall() {
        console.log("housecall clicked");
        if (this.state.barberPackage === "Basic") {
            alert("To activate this feature please get Supreme Membership.");
        } else {
            if (this.state.houseCall === true)
                this.setState({houseCall: false,houseCallBit:0})
            else
                this.setState({houseCall: true,houseCallBit:1})
        }
    }

    renderGooglePlacesInput = () => {
        return (
            <GooglePlacesAutocomplete
                placeholder="Location Address"
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
                    if (this.state.places.length > 0) {
                        this.setState({barberAddress:this.state.places[0].formatted_address})
                        Preference.set("userAddress", this.state.places[0].formatted_address);
                    } else {
                        Preference.set("userAddress", "");
                    }
                    //console.log("hello2" + JSON.stringify(this.state.places[0].formatted_address));
                }}
                getDefaultValue={() => this.state.barberAddress}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyD5YuagFFL0m0IcjCIvbThN25l0m2jMm2w',
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}

                styles={{
                    textInput: {
                        backgroundColor: colors.gray,
                        color: 'white'
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
                enablePoweredByContainer={false}
            />
        );
    };

    renderRowSurge(item) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'row', height: 36}}>

                <Text style={[styles.row_title, {fontWeight: "bold", fontSize: 17}]}>{item.title}</Text>
                <Switch
                    trackColor="#00D200"
                    thumbColor="#fff"
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
            <TouchableOpacity onPress={() => this.setState({DialogInstaUsername: true})}
                              style={[styles.right_arrow, {resizeMode: "contain"}]}>
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
                    avatarSource: source,avatarForServer:response.uri
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
                let imgDataServer=this.state.imagesDataServer;
                imgDataServer.push(response.uri)
                imageDta.push({image_url: source});
                this.setState({imagesData: imageDta,imagesDataServer:imgDataServer});
            }
        });
    }

    deleteImage(indx) {
        //alert("deleting "+indx);
        let imageDta = this.state.imagesData;
        imageDta.splice(indx, 1);
        this.setState({imagesData: imageDta});
        console.log("imagesData+ " + JSON.stringify(this.state.imagesData))
    }

    setServiceData() {
        let indx = this.state.serviceIndex;
        this.setState({DialogEditService: false});
        let services = this.state.ListData;
        services[indx].service_type = this.state.serviceName;
        services[indx].duration_type = this.state.serviceDuration;
        services[indx].prize_type = this.state.servicePrice;
        this.setState({ListData: services, showLoading: true});


        var details = {
            service_id: this.state.serviceEditId,
            name: this.state.serviceName,
            duration: this.state.serviceDuration,
            price: this.state.servicePrice
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.BarberUpdateService, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    //alert("Service updated");
                    this.getBarberDetails();
                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {
                this.setState({showLoading: false});
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });
    }

    deleteService(idx) {
        let services = this.state.ListData;
        services.splice(idx, 1);
        this.setState({ListData: services});
    }

    addServiceData() {
        let services = this.state.ListData;
        services.push({
            id: this.state.ListData.length + 1,
            service_type: this.state.serviceName,
            duration_type: this.state.serviceDuration,
            prize_type: this.state.servicePrice,
            showLine: true
        });
        this.setState({ListData: services, DialogAddService: false, showLoading: true});

        var details = {
            user_id: Preference.get("userId"),
            name: this.state.serviceName,
            duration: this.state.serviceDuration,
            price: this.state.servicePrice
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.BarberAddService, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseClientlogin-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false});
                    alert("Service Added");
                } else {
                    this.setState({showLoading: false});
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {
                this.setState({showLoading: false});
                //console.error('Errorr:', error);
                console.log('Error:', error);
                alert("Error: " + error);
            });
    }

    setInstagramID() {
        this.setState({DialogInstaUsername: false});
        Preference.set("userInsta", this.state.InstaUsername);
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
                                    {this.state.barberName}</Text>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={{color: colors.white, fontSize: 12,}}>
                                        {this.state.barberShopName}</Text>
                                    <TouchableOpacity onPress={() => this.setState({DialogBarberShop: true})}>
                                        <Image style={{height: 15, width: 15, marginStart: 10}}
                                               source={require("../../../assets/images/edit.png")}/>
                                    </TouchableOpacity>
                                    <PopupDialog
                                        visible={this.state.DialogBarberShop}
                                        width={0.6}
                                        onTouchOutside={() => {
                                            this.setState({DialogBarberShop: false});
                                        }}
                                        ref={(popupDialog) => {
                                            this.popupDialog = popupDialog;
                                        }}>
                                        <ScrollView>
                                            <View style={{flexDirection: "column", alignItems: "center"}}>
                                                <View style={{
                                                    width: "100%",
                                                    height: 0,
                                                    marginTop: 3,
                                                    marginBottom: 3,
                                                    backgroundColor: "black",
                                                    flexDirection: "column",
                                                }}/>
                                                <Text style={{fontSize: 16, marginTop: 5, color: "black"}}>Barber Shop
                                                    Name</Text>
                                                <TextInput Color={"white"} placeholder={"Enter Shop Name"}
                                                           placeholderTextColor={"grey"}
                                                           onChangeText={(text) => {
                                                               this.setState({barberShopName: text});
                                                               Preference.set("userShopname", this.state.userShopName)
                                                           }}
                                                           style={{
                                                               fontWeight: "bold",
                                                               fontSize: 16,
                                                               color: "black"
                                                           }}/>

                                                <TouchableOpacity
                                                    onPress={() => this.setState({DialogBarberShop: false})}
                                                    style={[globalStyles.button, {
                                                        height: 35,
                                                        width: "80%",
                                                        backgroundColor: "red",
                                                        marginTop: 20,
                                                        marginBottom: 20,
                                                    }]}>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontWeight: "bold",
                                                        color: "white"
                                                    }}>{"Save"}</Text>

                                                </TouchableOpacity>

                                            </View>
                                        </ScrollView>
                                    </PopupDialog>
                                </View>
                                <View style={[styles.review, {flexDirection: "row"}]}>
                                    <TouchableOpacity onPress={() => this.setState({DialogVisible: true})}>
                                        {this.state.experience==="0" ?
                                            <Text style={[styles.allFontStyle, styles.reviewText, {
                                                color: "white",
                                                fontFamily: "AvertaStd-Extrathin",
                                            }]}>{"Set your years of experience"}</Text>
                                            :
                                        <Text style={[styles.allFontStyle, styles.reviewText, {
                                            color: "white",
                                            fontFamily: "AvertaStd-Extrathin",
                                        }]}>{"Years of Experience " + this.state.experience}</Text>}
                                        <PopupDialog
                                            visible={this.state.DialogVisible}
                                            width={0.6}
                                            onTouchOutside={() => {
                                                this.setState({DialogVisible: false});
                                            }}
                                            ref={(popupDialog) => {
                                                this.popupDialog = popupDialog;
                                            }}>
                                            <ScrollView>
                                                <View style={{flexDirection: "column", alignItems: "center"}}>
                                                    <View style={{
                                                        width: "100%",
                                                        height: 0,
                                                        marginTop: 3,
                                                        marginBottom: 3,
                                                        backgroundColor: "black",
                                                        flexDirection: "column",
                                                    }}/>
                                                    <Text style={{fontSize: 16, marginTop: 5, color: "black"}}>Select
                                                        Years of Experience</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "01",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>01</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "02",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>02</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "03",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>03</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "04",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>04</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "05",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>05</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "06",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>06</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "07",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>07</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "08",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>08</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "09",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>09</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "10",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>10</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "11",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>11</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "12",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>12</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "13",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>13</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "14",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>14</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "15",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>15</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "16",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>16</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "17",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>17</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "18",
                                                        DialogVisible: falseadb
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>18</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "19",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>19</Text>
                                                    <Text onPress={() => this.setState({
                                                        experience: "20",
                                                        DialogVisible: false
                                                    })}
                                                          style={{fontSize: 15, marginTop: 5, color: "black"}}>20</Text>
                                                </View>
                                            </ScrollView>
                                        </PopupDialog>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[globalStyles.rowBackground, styles.row]}>
                        {this.renderRowED({
                            hintText: "Instagram Username",
                            title: this.state.barberInsta,
                            ic: require("../../../assets/images/edit.png")
                        })}
                        <PopupDialog
                            visible={this.state.DialogInstaUsername}
                            width={0.6}
                            onTouchOutside={() => {
                                this.setState({DialogInstaUsername: false});
                            }}>
                            <ScrollView>
                                <View style={{flexDirection: "column", alignItems: "center"}}>
                                    <View style={{
                                        width: "100%",
                                        height: 0,
                                        marginTop: 3,
                                        marginBottom: 3,
                                        backgroundColor: "black",
                                        flexDirection: "column",
                                    }}/>
                                    <Text style={{fontSize: 16, marginTop: 5, color: "black"}}>Instagram User
                                        Name</Text>
                                    <TextInput Color={"white"} placeholder={"Enter Instagram username"}
                                               placeholderTextColor={"grey"}
                                               onChangeText={(text) => this.setState({barberInsta: text})}
                                               style={{
                                                   fontWeight: "bold",
                                                   fontSize: 16,
                                                   color: "black"
                                               }}/>

                                    <TouchableOpacity onPress={() => this.setInstagramID()}
                                                      style={[globalStyles.button, {
                                                          height: 35,
                                                          width: "80%",
                                                          backgroundColor: "red",
                                                          marginTop: 20,
                                                          marginBottom: 20,
                                                      }]}>
                                        <Text style={{fontSize: 15, fontWeight: "bold", color: "white"}}>{"Save"}</Text>
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>
                        </PopupDialog>
                        <View style={{marginStart: 30, height: 15, marginBottom: 3}}>
                        </View>
                    </View>
                    <View style={[globalStyles.rowBackground, styles.row, {marginTop: 5}]}>
                        {this.state.ListData.length > 0 && <FlatList renderItem={({item, index}) =>
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
                                        }}>{"Service"}</Text>
                                        <Text style={{
                                            fontSize: 11,
                                            marginStart: 3, color: "white"
                                        }}>{item.name}</Text>
                                    </View>
                                    <View style={{
                                        width: "30%",

                                        flexDirection: "row", marginTop: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 10,
                                            marginStart: 10, color: "grey"
                                        }}>{"Duration "}</Text>
                                        <Text style={{
                                            fontSize: 11,
                                            marginStart: 3, color: "white"
                                        }}>{item.duration}</Text>
                                    </View>
                                    <View style={{width: "30%", flexDirection: "row", marginTop: 10}}>
                                        <Text style={{
                                            fontSize: 10,
                                            marginStart: 10, color: "grey"
                                        }}>{"Price"}</Text>
                                        <Text style={{
                                            fontSize: 11,
                                            marginStart: 3, color: "white"
                                        }}>{"$" + item.price}</Text>
                                        <TouchableOpacity onPress={() => this.setState({
                                            DialogEditService: true,
                                            serviceEditId: item._id,
                                            serviceName: item.name,
                                            serviceDuration: item.duration,
                                            servicePrice: item.price,
                                            serviceIndex: index,
                                        })}>
                                            <Image style={{
                                                width: 14,
                                                height: 14, marginStart: 8, resizeMode: 'contain'
                                            }} source={require('../../../assets/images/edit.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.deleteService(index)}>
                                            <Image style={{
                                                width: 14, resizeMode: 'contain',
                                                height: 14, marginStart: 5
                                            }} source={require('../../../assets/images/delete.png')}/>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                {item.showLine && <View style={{height: 0.5, backgroundColor: "#868791"}}/>}
                            </View>}
                                                                     data={this.state.ListData}
                                                                     extraData={this.state}
                                                                     keyExtractor={item => item.id}
                                                                     showsVerticalScrollIndicator={true}
                                                                     removeClippedSubviews={false}
                                                                     numColumns={1}/>}
                        {this.state.ListData.length < 1 &&
                        <View style={{width: "100%", height: 60, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 15, color: "white"}}>{"You don't have any Services"}</Text>
                        </View>}
                        <PopupDialog
                            visible={this.state.DialogEditService}
                            width={0.6}
                            onTouchOutside={() => {
                                this.setState({DialogEditService: false});
                            }}>
                            <View style={{flexDirection: "column"}}>
                                <View style={{
                                    width: "100%",
                                    height: 0,
                                    marginTop: 3,
                                    marginBottom: 3,
                                    backgroundColor: "black",
                                    flexDirection: "column",
                                }}/>
                                <Text style={{
                                    fontSize: 16,
                                    marginTop: 5,
                                    color: "black",
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}>Edit Service</Text>
                                <TextInput Color={"white"} placeholder={"Enter Service name"}
                                           placeholderTextColor={"grey"}
                                           value={this.state.serviceName}
                                           onChangeText={(text) => this.setState({serviceName: text})}
                                           style={{
                                               fontSize: 14,
                                               color: "black",
                                               marginStart: 10
                                           }}/>
                                <TextInput Color={"white"} placeholder={"Enter Duration"}
                                           placeholderTextColor={"grey"}
                                           value={this.state.serviceDuration}
                                           onChangeText={(text) => this.setState({serviceDuration: text})}
                                           style={{
                                               fontSize: 14,
                                               color: "black",
                                               marginStart: 10
                                           }}/>
                                <TextInput Color={"white"} placeholder={"Enter Price"}
                                           placeholderTextColor={"grey"}
                                           value={this.state.servicePrice}
                                           onChangeText={(text) => this.setState({servicePrice: text})}
                                           style={{
                                               fontSize: 14,
                                               color: "black",
                                               marginStart: 10
                                           }}/>

                                <TouchableOpacity
                                    onPress={() => this.setServiceData()}
                                    style={[globalStyles.button, {
                                        height: 35,
                                        width: "80%",
                                        backgroundColor: "red",
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }]}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>{"Save"}</Text>
                                </TouchableOpacity>
                            </View>
                        </PopupDialog>

                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center", marginTop: 5}}
                                          onPress={() => this.setState({DialogAddService: true})}>
                            <Image style={{
                                resizeMode: "contain",
                                height: 20,
                                right: 15,
                                marginBottom: 10,
                                tintColor: "white",
                            }} source={require("../../../assets/images/plus.png")}/>
                            <Text style={{color: "grey", right: 32, marginBottom: 10}}>
                                Add New Service
                            </Text>
                        </TouchableOpacity>

                        <PopupDialog
                            visible={this.state.DialogAddService}
                            width={0.6}
                            onTouchOutside={() => {
                                this.setState({DialogAddService: false});
                            }}>
                            <View style={{flexDirection: "column"}}>
                                <View style={{
                                    width: "100%",
                                    height: 0,
                                    marginTop: 3,
                                    marginBottom: 3,
                                    backgroundColor: "black",
                                    flexDirection: "column",
                                }}/>
                                <Text style={{
                                    fontSize: 16,
                                    marginTop: 5,
                                    color: "black",
                                    fontWeight: "bold",
                                    textAlign: "center"
                                }}>Edit Service</Text>
                                <TextInput Color={"white"} placeholder={"Enter Service name"}
                                           placeholderTextColor={"grey"}
                                           value={this.state.serviceName}
                                           onChangeText={(text) => this.setState({serviceName: text})}
                                           style={{
                                               fontSize: 14,
                                               color: "black",
                                               marginStart: 10
                                           }}/>
                                <TextInput Color={"white"} placeholder={"Enter Duration"}
                                           placeholderTextColor={"grey"}
                                           value={this.state.serviceDuration}
                                           onChangeText={(text) => this.setState({serviceDuration: text})}
                                           style={{
                                               fontSize: 14,
                                               color: "black",
                                               marginStart: 10
                                           }}/>
                                <TextInput Color={"white"} placeholder={"Enter Price"}
                                           placeholderTextColor={"grey"}
                                           value={this.state.servicePrice}
                                           onChangeText={(text) => this.setState({servicePrice: text})}
                                           style={{
                                               fontSize: 14,
                                               color: "black",
                                               marginStart: 10
                                           }}/>

                                <TouchableOpacity
                                    onPress={() => this.addServiceData()}
                                    style={[globalStyles.button, {
                                        height: 35,
                                        width: "80%",
                                        backgroundColor: "red",
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }]}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        color: "white"
                                    }}>{"Save"}</Text>
                                </TouchableOpacity>
                            </View>
                        </PopupDialog>

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
                            keyExtractor={(item, index) => index}
                            extraData={this.state}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item, index}) =>
                                <View style={{width: 100, height: 140, marginStart: 10}}>
                                    <Image  source={{uri:constants.portfolioImagePath+item.image_url}} style={{borderRadius: 10, width: 100, height: 140}}
                                           resizeMode={"contain"}/>
                                    <TouchableOpacity style={{position: "absolute", top: 5, right: 5}}
                                                      onPress={() => this.deleteImage(index)}>
                                        <Image resizeMode={"contain"}
                                               source={require("../../../assets/images/delete.png")}
                                               style={{width: 20, height: 20,}}/>
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
                        <TouchableOpacity onPress={() => this.saveData()} style={[globalStyles.button, {
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