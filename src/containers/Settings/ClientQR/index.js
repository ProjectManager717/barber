import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import QRCode from 'react-native-qrcode-svg';


let qrCode;
export default class ClientQR extends Component {

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        qrCode = navigation.getParam('qr_code');
        this.state = {
            text: qrCode,
            showQR:true
        };
    }




    render() {
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "CHECK IN", style: {color: "#fff"}}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    rightComponent={
                        <TouchableOpacity style={{marginRight:20}} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image
                                style={{tintColor: 'white', height: 20, resizeMode: 'contain'}}
                                source={require("../../../assets/images/right_arrow.png")}
                            />
                        </TouchableOpacity>
                    }
                />
                <View style={{ flexDirection: "column", alignItems: "center",}}>
                    <Text style={{color: "white", fontSize: 16, fontWeight: "bold", marginTop: 20,width:"100%",textAlign:"center"}}>Your barber will scan
                        your code</Text>
                    <View  style={{margin: 30,overflow:"hidden"}}>
                        {/*<Image source={require("../../../assets/images/QR_code.png")}
                                style={{width:250,height:250}}/>*/}
                        {/* {this.state.showQR &&<QRCode
                            value={this.state.text}
                            size={120}
                            bgColor='black'
                            fgColor='#fffff0'/>} */}
                            {this.state.showQR &&<QRCode
                                value={this.state.text}
                                color={'#000000'}
                                backgroundColor={'white'}
                                size={180}
                                //logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
                                //logoMargin={2}
                                //logoSize={20}
                                //logoBorderRadius={10}
                                //logoBackgroundColor={‘transparent’}
                                />}
                    </View>
                </View>
            </View>
        );
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
