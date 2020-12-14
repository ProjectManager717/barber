import React, { Component } from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    FlatList, Dimensions, TextInput
} from "react-native";
import { Colors } from "../../../themes";
import { globalStyles } from "../../../themes/globalStyles";
//import { styles } from "./styles";
import { Header, AirbnbRating } from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import { constants } from "../../../utils/constants";
import Preference from "react-native-preference";
import PopupDialog from 'react-native-popup-dialog';
var moment = require('moment');
let appointmentId = "";
const { height, width } = Dimensions.get("window");
export default class ReceiptUpcoming extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLoading: false,
            invoiceNo: "",
            invoiceDate: "",
            invoiceTime: "",
            barberName: "",
            barberShopName: "",
            barberLocation: "",
            barberServices: "",
            subTotal: "",
            ServiceFee: "",
            tipLeft: 0,
            surgePrice: "",
            totalMain: 0,
            rating: "",
            goodQuality: false,
            cleanliness: false,
            punctuality: false,
            professional: false,
            DialogCancelAppointment: false
        }
        const { navigation } = this.props;
        appointmentId = navigation.getParam('appointmentId');
    }

    componentDidMount(): void {
        this.getRecieptDetails();
    }

    getRecieptDetails() {
        this.setState({ showLoading: true })
        fetch(constants.ClientReciept + "?appointment_id=" + appointmentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(response => response.json())
            .then(response => {
                console.log("getRecieptDetails-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({ showLoading: false })
                    let recieptData = response.Data;
                    let receptDate = recieptData.date;
                    receptDate = receptDate.split("T");
                    this.setState({
                        invoiceNo: recieptData.invoice_no,
                        invoiceDate: receptDate[0],
                        invoiceTime: moment(recieptData.createdAt).format("LT"),
                        barberName: recieptData.barber_firstname + " " + recieptData.barber_lastname,
                        barberShopName: recieptData.barber_shop_name,
                        barberLocation: recieptData.location,
                        barberServices: recieptData.selected_services,
                        subTotal: recieptData.total_price,
                        ServiceFee: recieptData.service_fee,
                        //tipLeft: recieptData.tip_price,
                        surgePrice: "",
                        totalMain: 0,
                        rating: recieptData.rating,
                        goodQuality: recieptData.good_quality,
                        cleanliness: recieptData.cleanliness,
                        punctuality: recieptData.punctuality,
                        professional: recieptData.professionol,
                    })
                    let totalServices=0;
                    for(let i=0;i<recieptData.selected_services.length;i++)
                    {
                        totalServices=parseInt(totalServices+recieptData.selected_services[i].price);
                    }
                    this.setState({
                        subTotal: totalServices,
                    })
                    let tipPrice=0
                    if(!!recieptData.tip_price)
                    {
                        tipPrice=recieptData.tip_price
                        this.setState({tipLeft:recieptData.tip_price.toFixed(2)})
                    }

                    if (recieptData.selected_surge_price === true) {
                        let surgePricee = totalServices / 2;

                        let TotalMains =(((parseInt(totalServices) + 2) + (parseInt(surgePricee)+(tipPrice)) ));

                        console.log("totalMain::::", TotalMains)

                        this.setState({ surgePrice: surgePricee, totalMain: TotalMains.toFixed(2) });
                    } else {
                        let surgePricee = 0;

                        let TotalMain =(((parseInt(totalServices) + 2) + (parseInt(surgePricee)+((tipPrice)) )));
                        this.setState({ surgePrice: surgePricee, totalMain: TotalMain.toFixed(2) });
                    }
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

    renderRow(item) {
        return <View style={{ flex: 1, flexDirection: 'row', height: 30 }}>
            <Image style={styles.leftIcon} source={item.ic} />
            <Text style={styles.row_title}>{item.title}</Text>
        </View>;
    }

    renderRow2(item) {
        return (
            <View style={{ width: "100%", flexDirection: 'row', height: 30 }}>
                <View style={{ width: "70%", flexDirection: 'row', height: '100%' }}>
                    <Text style={[styles.row_title, {
                        width: "100%",
                        justifyContent: "flex-start",
                        marginStart: 10
                    }]}>{item.title}</Text>
                </View>
                <View style={{ width: "30%", flexDirection: 'row', height: '100%' }}>
                    <Text style={[styles.row_title, { width: "100%", justifyContent: "flex-end", }]}>{item.value}</Text>
                </View>
            </View>
        )
    }


    renderSeperator() {
        return <View style={{ height: 0.5, backgroundColor: Colors.lightGrey }}></View>
    }

    cancelAppointment() {
        let Appointmentstatus = 5;

        this.setState({ showLoading: true })
        var details = {
            appointment_id: appointmentId,
            appointment_type: Appointmentstatus,
        };
        console.log("Credentials", JSON.stringify(details));
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.ClientUpdateAppointmentStatus, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responseCancelAppointment-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({ showLoading: false, DialogCancelAppointment: false }, () => {
                        this.props.navigation.goBack();
                    })


                } else {
                    this.setState({ showLoading: false })
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            })
            .catch(error => {
                this.setState({ showLoading: false })
                //console.error('Errorr:', error);
                console.log('Error:', error);
                //alert("Error: " + error);
            });
    }

    render() {
        let ratings = Math.floor(Math.random() * 5 + 1);
        return (
            <View style={styles.container}>
                <Header
                    statusBarProps={{ barStyle: "light-content" }}
                    barStyle="light-content" // or directly
                    style={{ backgroundColor: "yellow" }}
                    outerContainerStyles={{ backgroundColor: "#1999CE" }}
                    centerComponent={{ text: "RECEIPT", style: { color: "#fff" } }}
                    rightComponent={{ color: "#fff" }}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image
                                style={{ tintColor: 'white', height: 20, resizeMode: 'contain' }}
                                source={require("../../../assets/images/ic_back.png")}
                            />
                        </TouchableOpacity>
                    }
                />
                <ScrollView>


                    <View
                        style={{ flex: 1, flexDirection: "column", marginBottom: 150 }}>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Image
                                source={require("../../../assets/images/logo.png")}
                                style={{ marginTop: 20, resizeMode: 'contain', width: 200 }} />
                        </View>
                        <Text style={styles.txtHeader}>UPCOMING</Text>
                        <View style={{ width: "85%", flexDirection: "row", marginStart: 30, marginEnd: 30 }}>
                            <Text
                                style={{ color: "white", justifyContent: "flex-start", fontSize: 10 }}>Invoice
                                No.{this.state.invoiceNo}</Text>
                            <Text style={{
                                color: "white",
                                position: "absolute",
                                right: 0,
                                fontSize: 12
                            }}>{this.state.invoiceDate} - {this.state.invoiceTime}</Text>
                        </View>
                        <View style={[globalStyles.rowBackground, styles.row]}>
                            <Text style={{
                                color: "white",
                                alignItems: "flex-start",
                                fontSize: 16,
                                fontWeight: "bold",
                                marginStart: 10,
                                marginTop: 10
                            }}>To be paid to:</Text>
                            {this.renderRow({
                                title: this.state.barberName + " (" + this.state.barberShopName + ")",
                                ic: require("../../../assets/images/ic_barbershop.png"),
                            })}
                            {this.renderRow({
                                title: this.state.barberLocation,
                                ic: require("../../../assets/images/location.png"),
                            })}
                            <FlatList renderItem={({ item }) => this.renderRow2({
                                title: item.name,
                                value: "$" + item.price,
                            })}
                                data={this.state.barberServices}
                                keyExtractor={(item, index) => index}
                                numColumns={1}
                            />
                            {this.renderSeperator()}
                            <View style={{ width: "100%", flexDirection: 'row', height: 36 }}>
                                <View style={{ width: "70%", flexDirection: 'row', height: '100%' }}>
                                    <Text style={{
                                        color: "white",
                                        alignItems: "flex-start",
                                        fontSize: 16,
                                        width: "100%",
                                        fontWeight: "bold",
                                        marginStart: 10,
                                        marginTop: 10
                                    }}>{"Subtotal:"}</Text>
                                </View>
                                <View style={{ width: "30%", flexDirection: 'row', height: '100%' }}>
                                    <Text style={{
                                        color: "white",
                                        width: "100%",
                                        alignItems: "flex-end",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        marginStart: 10,
                                        marginTop: 10
                                    }}>{"$" + this.state.subTotal + ".00"}</Text>
                                </View>
                            </View>
                            {this.renderRow2({
                                title: "Service Fee",
                                value: "$2.00",
                            })}

                            {this.renderRow2({
                                title: "Surge Price",
                                value: "$" + this.state.surgePrice,
                            })}
                            {this.renderRow2({
                                title: "Tip Left",
                                value: "$" + this.state.tipLeft,
                            })}
                            <View style={{ width: "100%", flexDirection: 'row', height: 36 }}>
                                <View style={{ width: "70%", flexDirection: 'row', height: '100%' }}>
                                    <Text style={{
                                        color: "white",
                                        alignItems: "flex-start",
                                        fontSize: 16,
                                        width: "100%",
                                        fontWeight: "bold",
                                        marginStart: 10,
                                        marginTop: 5
                                    }}>{"Total:"}</Text>
                                </View>
                                <View style={{ width: "30%", flexDirection: 'row', height: '100%' }}>
                                    <Text style={{
                                        color: "white",
                                        width: "100%",
                                        alignItems: "flex-end",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        marginStart: 10,
                                        marginTop: 5
                                    }}>{"$" + this.state.totalMain}</Text>
                                </View>
                            </View>



                            {this.renderSeperator()}
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            //this.props.navigation.navigate('Profile',);
                            this.setState({ DialogCancelAppointment: true })
                        }}>
                            <Text style={[styles.buttonText, { width: "100%", textAlign: "center" }]}>{"Cancel Appointment"}</Text>
                        </TouchableOpacity>
                        <PopupDialog
                            visible={this.state.DialogCancelAppointment}
                            width={0.8}
                            onTouchOutside={() => {
                                this.setState({ DialogCancelAppointment: false });
                            }}

                            dialog
                            ref={(popupDialog) => {
                                this.popupDialog = popupDialog;
                            }}>
                            <View style={{ flexDirection: "column", alignItems: "center" }}>
                                <View style={{
                                    width: "100%",
                                    height: 0,
                                    marginTop: 3,
                                    marginBottom: 3,
                                    backgroundColor: "white",
                                    flexDirection: "column",
                                }} />
                                <Text style={{ fontSize: 20, marginTop: 5, color: "black" }}>{"Do you want to cancel?"}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center", marginTop: 30 }}>
                                    <TouchableOpacity
                                        onPress={() => this.cancelAppointment()}
                                        style={[globalStyles.button, {
                                            height: 35,
                                            width: "40%",
                                            backgroundColor: "green",
                                            marginTop: 20,
                                            marginBottom: 20,
                                        }]}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: "white",
                                            width: '100%',
                                            textAlign: 'center'
                                        }}>{"YES"}</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ DialogCancelAppointment: false })}
                                        style={[globalStyles.button, {
                                            height: 35,
                                            width: "40%",
                                            backgroundColor: "red",
                                            marginTop: 20,
                                            marginBottom: 20,
                                            marginStart: 20
                                        }]}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: "white",
                                            width: '100%',
                                            textAlign: 'center'
                                        }}>{"NO"}</Text>

                                    </TouchableOpacity>
                                </View>


                            </View>
                        </PopupDialog>

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
    button: {
        width: width / 2.2,
        backgroundColor: "#FF0000",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 30,
        height: height / 19,
        alignItems: "center"
    },
    buttonText: { color: "white", fontSize: 15, fontWeight: "500" },
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
