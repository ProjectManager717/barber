import React, { Component } from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight, Clipboard,
    TextInput, Dimensions, ImageBackground, Alert, Platform,
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from "../../../themes";
import { globalStyles } from "../../../themes/globalStyles";
import { Header } from "react-native-elements";
import Preference from 'react-native-preference';
import ViewShot from "react-native-view-shot";
import { constants } from "../../../utils/constants";
import { SafeAreaView } from "react-navigation";
import moment from 'moment';
import { Firebase } from "react-native-firebase";
import { Linking } from "react-native";


var RNFS = require('react-native-fs');

const { width, height } = Dimensions.get("window");

const link = "https://www.clypr.co/pro/" + Preference.get("userName");
export default class Share extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLoading: false,
            text2: 'Your Message...',
            clipboardContent: null,
            barberName: "",
            barberImage: "",
            barberShopName: "",
            barberAddress: "",
            barberInsta: ""
        };

    }

    componentDidMount(): void {
        this.getBarberDetails()
    }

    getBarberDetails() {
        this.setState({ showLoading: true })
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
                    this.setState({ showLoading: false })
                    let barberData = response.Data;
                    this.setState({
                        barberName: barberData.firstname,
                        barberImage: { uri: barberData.user_image },
                        barberShopName: barberData.shop_name,
                        barberAddress: barberData.location,
                        barberInsta: barberData.username,
                    })

                } else {
                    this.setState({ showLoading: false })
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
                //console.error('Errorr:', error);
                this.setState({ showLoading: false })
                console.log('Error:', error);
                alert("Error: " + error);
            });
    }

    saveToClipboard = async (val) => {
        const sharedUrl = val
        Clipboard.setString(val);
        // const link = new Firebase.links.DynamicLink(sharedUrl, 'https://clypr.page.link')
        //     .android.setPackageName('com.barber')
        //     .ios.setBundleId('com.reactjs.native.Barber')
        //     .ios.setCustomScheme('CLYPR')

        // firebase.links()
        //     .createShortDynamicLink(link, 'SHORT')
        //     .then((url) => {
                // Clipboard.setString(url);
        //     })

    };

    downloadImage() {
        this.refs.viewShot1.capture().then(uri => {

            /*    console.log("\n\n\nfile uri: "+ JSON.stringify(uri));
                console.log("\n pic MainBundlePath: " + RNFS.MainBundlePath)
                console.log("\n pic CachesDirectoryPath: " + RNFS.CachesDirectoryPath)
                console.log("\n pic ExternalCachesDirectoryPath: " + RNFS.ExternalCachesDirectoryPath)
                console.log("\n pic DocumentDirectoryPath: " + RNFS.DocumentDirectoryPath)
                console.log("\n pic ExternalDirectoryPath: " + RNFS.ExternalDirectoryPath)
                console.log("\n pic ExternalStorageDirectoryPath: " + RNFS.ExternalStorageDirectoryPath)
                console.log("\n pic TemporaryDirectoryPath: " + RNFS.TemporaryDirectoryPath)
                console.log("\n pic LibraryDirectoryPath: " + RNFS.LibraryDirectoryPath)
                console.log("\n pic PicturesDirectoryPath: " + RNFS.PicturesDirectoryPath)
                console.log("\n pic FileProtectionKeys: " + RNFS.FileProtectionKeys)
                let destPath = RNFS.LibraryDirectoryPath + "/"+moment().format("x")+".jpg";*/

            console.log("\n\n\nfile uri: " + JSON.stringify(uri));
            const directory = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.PicturesDirectoryPath
            let destPath = directory + "/" + moment().format("x") + ".jpg";

            RNFS.copyFile(uri, destPath)
                .then((success) => {
                    console.log('ShareScreen', 'file copied1!' + destPath);

                    if (Platform.OS === 'ios') {
                        CameraRoll.saveToCameraRoll(destPath)
                            .then(res => {
                                console.log('ShareScreen', 'download-image-CameraRoll-result', JSON.stringify(res))
                                alert("Image saved to camera-roll successfully");
                            })
                            .catch(err => {
                                console.log('ShareScreen', 'download-image-CameraRoll-err', err)
                            })
                    } else {
                        alert("Image saved to gallery successfully");
                    }
                })
                .catch((err) => {
                    console.log('ShareScreen', 'Error copying file: ' + err.message);
                    alert('Error copying file: ' + err.message);
                });
        });
    }


    downloadImage1() {
        this.refs.viewShot2.capture().then(uri => {
            console.log("\n\n\nfile uri: " + JSON.stringify(uri));
            const directory = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.PicturesDirectoryPath
            let destPath = directory + "/clypr_" + moment().format("x") + ".jpg";
            RNFS.copyFile(uri, destPath)
                .then((success) => {
                    console.log('ShareScreen', 'file copied1!' + destPath);

                    if (Platform.OS === 'ios') {
                        CameraRoll.saveToCameraRoll(destPath)
                            .then(res => {
                                console.log('ShareScreen', 'download-image-CameraRoll-result', JSON.stringify(res))
                                alert("Image saved to camera-roll successfully");
                            })
                            .catch(err => {
                                console.log('ShareScreen', 'download-image-CameraRoll-err', err)
                            })
                    } else {
                        alert("Image saved to gallery successfully");
                    }
                })
                .catch((err) => {
                    console.log('ShareScreen', 'Error copying file: ' + err.message);
                    alert('Error copying file: ' + err.message);
                });
        });
    }


    render() {
        return (<View style={styles.container}>
            <Header
                statusBarProps={{ barStyle: "light-content" }}
                barStyle="light-content" // or directly
                outerContainerStyles={{ backgroundColor: "#1999CE" }}
                centerComponent={{ text: "SHARE", style: { color: "#fff" } }}
                rightComponent={{ color: "#fff" }}
                containerStyle={{
                    backgroundColor: Colors.dark,
                    justifyContent: "space-around"
                }}
                leftComponent={
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Image
                            style={{
                                tintColor: "white",
                                height: 20,
                                resizeMode: "contain"
                            }}
                            source={require("../../../assets/images/ic_back.png")}
                        />
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                <View style={{ flexDirection: "column", width: "100%", height: "100%", alignItems: "center" }}>
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        width: "80%",
                    }}>
                        <View style={{
                            flexDirection: "row", width: "100%",
                            justifyContent: "center", alignItems: "center", marginTop: 5
                        }}>
                            <Image source={require("../../../assets/images/insta3.png")} resizeMode={"contain"}
                                style={{ width: 13, height: 13, }} />
                            <Text
                                style={{ marginStart: 5, color: "grey", fontFamily: "AvertaStd-Thin" }}
                            >{"Copy & Paste the below link"}</Text></View>
                        <TouchableOpacity
                            onPress={() => {
                                this.saveToClipboard('http://appcrates.net/barber/profile/' + Preference.get("userId"))
                                // this.saveToClipboard("https://www.clypr.co/pro/" + this.state.barberInsta)
                            }}>
                            <Text style={{
                                color: "white",
                                fontSize: 15,
                                fontFamily: "AvertaStd-Bold"
                            }}>{"www.clypr.co/pro/" + this.state.barberInsta}</Text>
                        </TouchableOpacity>

                    </View>
                    <ViewShot style={{ width: "100%", height: height / 2.1 }} ref="viewShot1"
                        options={{ format: "jpg", quality: 0.9 }}>

                        <Image
                            source={require("../../../assets/images/shareimgbg1.png")}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode={"cover"}
                        />

                        <View style={{ position: "absolute", top: 5, left: 15, alignItems: "center" }}>
                            <Image source={this.state.barberImage} style={{
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                            }} />
                            <Text style={{
                                fontWeight: "bold",
                                color: "black",
                                fontSize: 10,
                            }}
                            >{this.state.barberName}</Text>
                            <Text
                                style={{
                                    color: "black",
                                    fontSize: 8,
                                }}
                            >{this.state.barberShopName}</Text>
                            <Text
                                style={{
                                    color: "black",
                                    fontSize: 8,
                                }}
                            >{"(" + this.state.barberAddress + ")"}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            position: "absolute",
                            alignItems: "center",
                            right: 10,
                            top: 10
                        }}>
                            <Text style={{
                                color: "black",
                                fontSize: 12
                            }}>{"www.clypr.co/pro/" + this.state.barberInsta}</Text>
                            <TouchableOpacity onPress={() => this.downloadImage()}>
                                <Image
                                    style={{ width: 40, height: 40, marginStart: 20 }}
                                    source={require("../../../assets/images/download.png")} />
                            </TouchableOpacity>
                        </View>
                        {/*<View style={{
                                flexDirection: "row",
                                position: "absolute",
                                alignItems: "center",
                                left: 10,
                                bottom: 10,
                                backgroundColor: "white",
                                borderRadius: 20
                            }}>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 11,
                                        margin: 5,
                                        marginStart: 7,
                                        marginEnd: 7,
                                        color: "red",
                                        fontWeight: "bold"
                                    }}>{"Book your appointment"}</Text>
                                </TouchableOpacity>
                            </View>*/}
                        {/*<View style={{
                                flexDirection: "row",
                                position: "absolute",
                                bottom: 0,
                                left: 170,
                            }}>
                                <Image resizeMode={"contain"} source={require("../../../assets/images/clypr.png")}
                                       style={{height: 65, width: 65}}/>
                            </View>*/}
                        <View style={{
                            flexDirection: "row",
                            position: "absolute",
                            alignItems: "center",
                            justifyContent: "center",
                            right: 10,
                            bottom: 5,

                        }}>
                            <Image resizeMode={"contain"} source={require("../../../assets/images/android.png")}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                resizeMode={"cover"}
                            />

                            <View style={{ position: "absolute", top: 5, left: 15, alignItems: "center" }}>
                                <Image source={this.state.barberImage} style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 35,
                                }} />
                                <Text style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: 10,
                                    width: "100%",
                                    textAlign: "center"
                                }}
                                >{this.state.barberName}</Text>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 8,
                                    }}
                                >{this.state.barberShopName}</Text>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 8, width: "70%"
                                    }}
                                >{"(" + this.state.barberAddress + ")"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                position: "absolute",
                                alignItems: "center",
                                right: 10,
                                top: 10
                            }}>
                                <Text style={{
                                    color: "black",
                                    fontSize: 12
                                }}>{"www.clypr.co/pro/" + this.state.barberInsta}</Text>
                                <TouchableOpacity onPress={() => this.downloadImage()}>
                                    <Image
                                        style={{ width: 40, height: 40, marginStart: 20 }}
                                        source={require("../../../assets/images/download.png")} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: 150,
                                flexDirection: "row",
                                position: "absolute",
                                alignItems: "center",
                                left: 10,
                                bottom: 10,
                                backgroundColor: "white",
                                borderRadius: 20
                            }}>
                                <Text style={{
                                    fontSize: 10,
                                    margin: 5,
                                    color: "red",
                                    fontWeight: "bold",
                                    width: "100%",
                                    textAlign: "center"
                                }}>{"Book your appointment"}</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                position: "absolute",
                                bottom: 0,
                                left: 170,
                            }}>
                                <Image resizeMode={"contain"} source={require("../../../assets/images/clypr.png")}
                                    style={{ height: 65, width: 65 }} />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                position: "absolute",
                                alignItems: "center",
                                justifyContent: "center",
                                right: 10,
                                bottom: 30,

                            }}>
                                <Image resizeMode={"contain"} source={require("../../../assets/images/apple.png")}
                                    style={{ height: 20, width: 20, marginEnd: 3, marginTop: 3 }}
                                />
                                <View style={{
                                    flexDirection: "row",
                                    borderRadius: 30,
                                    borderWidth: 0.5,
                                    borderColor: "grey",
                                    marginTop: 5,
                                    padding: 3,
                                    width: 120
                                }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: 9,
                                        fontWeight: "bold",
                                        width: "100%",
                                        textAlign: "center"
                                    }}>{" Available on App Store "}</Text>

                                </View>

                            </View>

                            <View style={{
                                flexDirection: "row",
                                position: "absolute",
                                alignItems: "center",
                                justifyContent: "center",
                                right: 10,
                                bottom: 5,

                            }}>
                                <Image resizeMode={"contain"} source={require("../../../assets/images/android.png")}
                                    style={{
                                        height: 20, width: 20, marginEnd: 3,
                                        marginTop: 5,
                                    }} />
                                <View style={{
                                    flexDirection: "row",
                                    borderColor: "grey",
                                    borderWidth: 0.5,
                                    borderRadius: 30,
                                    marginTop: 5,
                                    padding: 3,
                                    width: 120

                                }}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: "white",
                                        fontSize: 9,
                                        width: "100%",
                                        textAlign: "center"
                                    }}>{' Get It on Google Play    '}</Text>
                                </View>
                            </View>
                        </View>

                    </ViewShot>
                    <ViewShot style={{ width: "100%", height: height / 2.1, }} ref="viewShot2"
                        options={{ format: "jpg", quality: 0.9 }}>
                        <Image
                            source={require("../../../assets/images/shareimgbg2.png")}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode={"cover"}
                        />

                        <View style={{ position: "absolute", top: 5, left: 25, alignItems: "center" }}>
                            <Image source={this.state.barberImage} style={{
                                width: 70,
                                height: 70, borderRadius: 35,
                            }} />
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: 10,
                                    width: "100%",
                                    textAlign: "center"
                                }}>{this.state.barberName}</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 10,
                            }}>{this.state.barberName}</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 8,

                            }}>{this.state.barberShopName}</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 8,

                            }}>{"(" + this.state.barberAddress + ")"}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            position: "absolute",
                            alignItems: "center",
                            right: 10,
                            top: 10
                        }}>
                            <TouchableOpacity onPress={() => this.downloadImage1()}>
                                <Image
                                    style={{ width: 40, height: 40, marginStart: 20 }}
                                    source={require("../../../assets/images/download.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            position: "absolute",
                            alignItems: "center",
                            justifyContent: "center",
                            left: 20,
                            bottom: 0,
                            top: 0
                        }}>
                            <Image resizeMode={"contain"}
                                source={require("../../../assets/images/androidblack.png")}
                                style={{ height: 20, width: 20, marginEnd: 3, marginTop: 5, }} />
                            <View style={{
                                flexDirection: "row",
                                borderRadius: 30,
                                borderWidth: 0.5,
                                borderColor: "grey",
                                marginTop: 7,
                                padding: 3,
                                width: 120,
                            }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: 9,
                                    width: "100%",
                                    textAlign: "center"
                                }}>{' Get It on Google Play    '}</Text>

                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            position: "absolute",
                            alignItems: "center",
                            justifyContent: "center",
                            left: 20,
                            bottom: 50,
                            top: 0
                        }}>
                            <Image resizeMode={"contain"}
                                source={require("../../../assets/images/appleblack.png")}
                                style={{ height: 20, width: 20, marginEnd: 3, marginTop: 3 }}
                            />
                            <View style={{
                                flexDirection: "row",
                                borderRadius: 30,
                                borderWidth: 0.5,
                                borderColor: "grey",
                                padding: 3,
                                width: 120
                            }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    color: "black",
                                    fontSize: 9,
                                    width: "100%",
                                    textAlign: "center"
                                }}>{" Available on App Store "}</Text>

                            </View>
                            <View style={{
                                flexDirection: "column",
                                position: "absolute",
                                left: 20, bottom: 50, height: 25
                            }}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={['#5E2047', '#F4002E']}
                                    style={{
                                        borderRadius: 25,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%"
                                    }}>
                                    <Text
                                        style={{
                                            color: "white",
                                            fontSize: 10,
                                            marginStart: 25,
                                            marginEnd: 25,
                                            fontWeight: "bold",
                                            width: "100%",
                                            textAlign: "center"
                                        }}
                                    >{"Book your appointment"}</Text>
                                </LinearGradient>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 11, marginTop: 10
                                    }}
                                >{"www.clypr.co/pro/" + this.state.barberInsta}</Text>
                            </View>
                        </View>
                    </ViewShot>
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
                    style={{ width: 60, height: 60, opacity: 1, }} />
            </View>}
        </View>


        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: Colors.themeBackground
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
        color: Colors.lightGrey,
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
        color: Colors.white,
        marginTop: 5,
        marginLeft: 10,
        alignSelf: 'center',
        fontFamily: "AvertaStd-Regular"
    },
    right_arrow: {
        position: 'absolute',
        right: 14,
        alignSelf: 'center',
        height: 9,
        width: 5,
        tintColor: 'white'
    }
});
