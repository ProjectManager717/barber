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
import {Metric} from "../../../themes";
import ImagePicker from 'react-native-image-picker';

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
            userName: null,
            userAddress: "",
            editLocation: false,
        }

    }

    editLocation = () => {
        this.setState({editLocation: true});

    }

    renderRowED2(item) {
        return <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
            <Text style={{color: "grey", fontSize: 10, marginStart: 10, marginTop: 10}}>{item.hintText}</Text>
            {!this.state.editLocation &&
            <Text style={[styles.row_title, {marginTop: 10, alignItems: "center", fontSize: 11, marginStart: 5}
            ]}>{item.title}</Text>}
            {this.state.editLocation &&
            <TextInput Color={"white"} value={this.state.userAddress}
                       onChangeText={(text) => this.setState({userAddress: text})}
                       style={{height: "100%", backgroundColor: "red", width: "70%"}}/>}
            <TouchableOpacity onPress={() => this.editLocation}
                              style={[styles.right_arrow, {resizeMode: "contain", height: 30, top: 5}]}>
                <Image style={{resizeMode: "contain", height: 15, marginTop: 5}} source={item.ic}/>
            </TouchableOpacity>

        </View>;
    }

    saveData = () => {
        this.props.navigation.push("PaymentMethod");
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
                                right: 5, bottom: 5, borderWidth: 4, borderRadius: 20, borderColor: "black"
                            }}>
                                <Image
                                    source={require("../../../assets/images/dpchange.png")}
                                    style={{
                                        width: 40, height: 40,
                                    }}/>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={[styles.infoContainer]}>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={[styles.allFontStyle, styles.name]}>Gerard Pique</Text>
                                    <TouchableOpacity onPress={()=>alert("hello")}>
                                        <Image  style={{
                                            height: 15,
                                            width: 15,
                                            marginStart: 20,
                                            marginTop: 2,
                                        }}
                                               source={require("../../../assets/images/edit.png")}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={[globalStyles.rowBackground, styles.row,]}>
                            {this.renderRowED2({
                                hintText: "Location",
                                title: "208 Carlos Street,Los angeles America",
                                ic: require("../../../assets/images/edit.png")
                            })}
                            <View style={{marginStart: 30, height: 15,}}>
                            </View>
                        </View>
                        <RedButton label="SAVE" onPress={this.saveData} style={styles.btnContainer}/>
                    </View>
                </ScrollView>


            </View>


        )
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
        height: 40,
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
        alignItems: "flex-end",
        borderRadius: width / 6
    },
    infoContainer: {
        height: 20,
        justifyContent: "space-around",
        width,
        alignItems: "center",
        marginBottom: 15
    },
    allFontStyle: {
        color: "#535361",

    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        left: 15
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
        marginTop: Metric.height / 10
    },


});