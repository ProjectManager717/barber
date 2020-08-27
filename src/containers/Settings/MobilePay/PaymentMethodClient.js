import React, {Component} from "react";
import {
    View,
    Switch,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ScrollView, Alert,
    TouchableOpacity,
    TextInput, Picker,
    ImageBackground, BackHandler
} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import {Header} from "react-native-elements";
import {NavigationActions, StackActions} from "react-navigation";
import Preference from "react-native-preference";
import {constants} from "../../../utils/constants";
import PopupDialog from 'react-native-popup-dialog';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import stripe from 'tipsi-stripe'

stripe.setOptions({
    //publishableKey: 'pk_test_5f4q3aLF1SgN7kQdEV6WBSnn',
    publishableKey: 'pk_test_U4Ri0H7rP3PClZwTI5Z2r78J',
    androidPayMode: 'test', // Android only
})
let client_id, barber_id, barberImage, barberName, barberShopName, appointmentPrice=0, selected_services, date,
    selected_slot_id, total_price=0, service_fee, selected_surge_price,tip_price=0;
let cus_stripe_id, transaction_id, balance_transaction, destination, destination_payment, source_transaction,
    stripedate, created,surgeprice=0;
export default class PaymentMethodClient1 extends Component {


    constructor(props) {
        super(props);
        const {navigation} = this.props;
        client_id = navigation.getParam('client_id');
        barber_id = navigation.getParam('barber_id');
        barberImage = navigation.getParam('barberImage');
        barberName = navigation.getParam('barberName');
        barberShopName = navigation.getParam('barberShopName');
        tip_price=navigation.getParam('tip_price'),
        selected_surge_price = navigation.getParam('selected_surge_price');
        total_price = navigation.getParam('total_price');
        if(selected_surge_price)
        {
            surgeprice = parseInt(total_price) / 2;
        }
        selected_services = navigation.getParam('selected_services');
        date = navigation.getParam('date');
        selected_slot_id = navigation.getParam('selected_slot_id');

        service_fee = navigation.getParam('service_fee');
        console.log("TipPricez: ", tip_price)
        appointmentPrice =parseFloat(total_price)+parseFloat(service_fee)+parseFloat(surgeprice)+parseFloat(tip_price);
        // alert("total_price:"+total_price+"\n"+
        //     "selected_surge_price:"+selected_surge_price+"\n"+
        //     "surgeprice:"+surgeprice+"\n"+
        //     "appointmentPrice:"+appointmentPrice+"\n"
        // )
        console.log("Data transfered::", JSON.stringify(selected_services))
        console.log("Data transfered::", JSON.stringify(selected_slot_id))
        this.state = {
            showLoading: false,
            cardNumber: "4242424242424242",
            paymentCardLast4Digits: "",
            month: 12,
            year: 21,
            cvc: "123",
            cardHolderName: "",
            pickMonth: false,
            isConnected: true,
            DialogVisible: false,
            SelectedCard: [],
            pay: false,
            DialogVisible1: false,
            DialogVisible2: false,
            loading: false,
            token: null,
            error: null,
            selectedCardData: [],
            params: {
                number: '',
                expMonth: 1,
                expYear: 19,
                cvc: "",
                name: '',
                currency: 'usd',

                addressLine1: '123 Test Street',
                addressLine2: 'Apt. 5',
                addressCity: 'Test City',
                addressState: 'Test State',
                addressCountry: 'Test Country',
                addressZip: '55555',
                CardHolderNameColor: "#000000",
                EndingInColor: "grey",
                CardDigitsColor: "#000000",
                tick: false,
            },

            CardData: []
            ,
            errorParams: {
                number: '4242424242424241',
                expMonth: 12,
                expYear: 24,
                cvc: '223',
                name: 'Test User',
                currency: 'usd',
                addressLine1: '123 Test Street',
                addressLine2: 'Apt. 5',
                addressCity: 'Test City',
                addressState: 'Test State',
                addressCountry: 'Test Country',
                addressZip: '55555',
            },
            TokenId: null,
        }
        console.disableYellowBox = true;
        this.selected = this.selected.bind(this)
        //this.state = {text: ' 4242 - 4242 - 4242- 4242'};
    }


    CardList() {
        if (this.state.isConnected) {
            this.setState({showLoading: true})
            var details = {
                clientEmail: Preference.get("userEmail"),
            };
            console.log("CARD Email----->" + JSON.stringify(details));
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(constants.CardList, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json())
                .then(response => {
                    console.log("responsePaymentCard1-->", "-" + JSON.stringify(response));
                    if (response.ResultType === 1) {
                        this.setState({showLoading: false})
                        let cardImage = "";
                        let allCards = [];
                        for (let g = 0; g < response.Data.length; g++) {
                            if (response.Data[g].brand === "Visa") {
                                cardImage = require("../../../assets/images/visa.png");

                            }
                            if (response.Data[g].brand === "Discover") {
                                cardImage = require("../../../assets/images/discover.png");

                            }
                            if (response.Data[g].brand === "MasterCard") {
                                cardImage = require("../../../assets/images/master.png");

                            }
                            if (response.Data[g].brand === "American Express") {
                                cardImage = require("../../../assets/images/american.png");

                            }
                            if (response.Data[g].brand === "UnionPay") {
                                cardImage = require("../../../assets/images/unionpay.png");

                            }
                            if (response.Data[g].brand === "Diners Club") {
                                cardImage = require("../../../assets/images/dinnerclub.png");

                            }
                            if (response.Data[g].brand === "JCB") {
                                cardImage = require("../../../assets/images/jcb.png");

                            }
                            let Card = {
                                tick: false,
                                Delete: false,
                                colortext: "#000000",
                                default: false,
                                cardInfo: response.Data[0],
                                cardImage: cardImage
                            }
                            if (g == 0) {
                                Card.tick = true
                                Card.Delete = true
                                Card.colortext = "#56A5FC"
                                Card.default = true
                            }

                            allCards.push(Card);

                        }
                        this.setState({CardData: allCards}, () => {
                            console.log("AllcardsData--", JSON.stringify(this.state.CardData))
                        })

                    } else {
                        if (response.ResultType === 0) {
                            this.setState({showLoading: false})
                            alert(response.Message);

                        }
                    }
                })
                .catch(error => {
                    //console.error('Errorr:', error);
                    console.log('Error:', error);
                    this.setState({showLoading: false})
                    alert("Error: " + error);
                });

        } else {
            alert("Please connect Internet");
        }


    }


    bookApointment(data) {
        this.setState({showLoading: true});
        var details = {
            client_id: Preference.get("userId"),
            barber_id: barber_id,
            selected_services: selected_services,
            date: date,
            selected_slot_id: selected_slot_id,
            total_price: total_price+surgeprice  ,
            service_fee: "1.50",
            tip_price:tip_price,
            selected_surge_price: selected_surge_price,
            cus_stripe_id: data.cus_stripe_id,
            transaction_id: data.transaction_id,
            balance_transaction: data.balance_transaction,
            destination: data.destination,
            destination_payment: data.destination_payment,
            source_transaction: data.source_transaction,
            payment_date: data.date,
            payment_created: data.created
        };
        console.log("Outputdata::::" + JSON.stringify(details));
        fetch(constants.ClientBookAppointment, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details),
        }).then(response => response.json())
            .then(response => {
                console.log("ClientBookAppointment-->", "-" + JSON.stringify(response));
                this.setState({showLoading: false})
                if (response.ResultType === 1) {
                    this.props.navigation.navigate("Calendar");
                    /*   this.props.navigation.navigate('ClientLeaveReview', {
                           client_id: Preference.get("userId"),
                           barber_id: barber_id,
                           barberImage: barberImage,
                           barberName: barberName,
                           barberShopName: barberShopName,
                           appointmentPrice: appointmentPrice,
                           selected_services: selected_services,
                           date: date,
                           selected_slot_id: selected_slot_id,
                           total_price: total_price,
                           service_fee: "1",
                           selected_surge_price: false,
                           appointmentId: response.Data._id
                       });*/
                } else {
                    if (response.ResultType === 0) {
                        alert(response.Message);
                    }
                }
            }).catch(error => {
            this.setState({showLoading: false})
            //console.error('Errorr:', error);
            console.log('Error:', error);
            alert("Error: " + error);
        });
    }


    PaymentFlow() {
        let selectedcard = this.state.SelectedCard;
        if (this.state.isConnected) {
            this.setState({showLoading: true})

            var details = {
                barberID: barber_id,
                clientID: client_id,
                amount: (appointmentPrice) * 100,
                card_id: selectedcard.cardInfo.id,
            };


            console.log("CARD Email----->" + JSON.stringify(details));
            console.log("APi URL ----->" + JSON.stringify(constants.PaymentFLow));
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(constants.PaymentFLow, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(response => response.json())
                .then(response => {
                    console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                    this.setState({showLoading: false})
                    if (response.ResultType === 1) {
                        this.bookApointment(response.Data)
                    } else {
                        if (response.ResultType === 0) {
                            alert(response.Message);
                        }
                    }
                })
                .catch(error => {
                    //console.error('Errorr:', error);
                    console.log('Error:', error);
                    this.setState({showLoading: false})
                    //alert("Error: "+error);
                });

        } else {
            alert("Please connect Internet");
        }
    }

    saveCard = async (shouldPass = true) => {
        this.setState({showLoading: true})
        /*const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'ClientTabNavigator'})],
        });
        this.props.navigation.dispatch(resetAction);*/
        let usertype = "";
        if (Preference.get("userType") === "Barber")
            usertype = "barber";
        else
            usertype = "client";
        try {

            /* const source = await stripe.createSourceWithParams({
                 type: 'card',
                 number: '4242424242424242',
                 expMonth: 11,
                 expYear: 22,
                 cvc: '123',
             })*/
            this.setState({showLoading: true})
            console.log("CardNumber:-->", this.state.cardNumber)
            console.log("CardNumber:-->", this.state.month)
            console.log("CardNumber:-->", this.state.year)
            console.log("CardNumber:-->", this.state.cvc)
            console.log("CardNumber:-->", this.state.cardHolderName);


            const params = this.state.params;
            const token = await stripe.createTokenWithCard(params)
            let tokenId = token.tokenId;
            this.setState({TokenId: tokenId})
            console.log("CArdReponse", tokenId);
            this.setState({showLoading: false});
        } catch (error) {
            this.setState({showLoading: false});
            Alert.alert("Error!", "Your card details are invalid")
            console.log("CArdReponse error", error);


        }
        this.setState({showLoading: true});
        if (this.state.isConnected) {
            if (this.state.params.number === "" || this.state.params.number.length < 16 ||
                this.state.params.expMonth === "" || this.state.params.expYear === "" || this.state.params.cvc === "" || this.state.params.name === "") {
                alert("Please enter full data.");
                this.setState({showLoading: false})
            } else {
                var details = {
                    clientEmail: Preference.get("userEmail"),
                    stripeToken: this.state.TokenId
                };
                console.log("CARD DETAIls----->" + JSON.stringify(details));
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                fetch(constants.clientAddCard, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formBody
                }).then(response => response.json())
                    .then(response => {
                        console.log("responsePaymentCardadded-->", "-" + JSON.stringify(response));
                        this.setState({showLoading: false})
                        if (response.ResultType === 1) {
                            this.setState({popupDialog2: false})
                            this.CardList();
                            this.setState({showLoading: false})
                            //alert(JSON.stringify(response));
                            this.setState({DialogVisible2: false})
                            alert("Card Added successfully");


                        } else {
                            this.setState({showLoading: false})
                            if (response.ResultType === 0) {
                                alert(response.Message);
                            }
                        }
                    })
                    .catch(error => {
                        //console.error('Errorr:', error);
                        console.log('Error:', error);
                        this.setState({showLoading: false})
                        alert("Error: " + error);
                    });
            }
        } else {
            alert("Please connect Internet");
            this.setState({showLoading: false})
        }
    }

    componentDidMount(): void {
        this.CardList();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            //this.goBack(); // works best when the goBack is async
            return true;
        });

    }

    selected(index) {
        let CardDataTemp = this.state.CardData

        for (let i = 0; i < CardDataTemp.length; i++) {
            if (i == index) {
                CardDataTemp[i].colortext = "#56A5FC";
                CardDataTemp[i].tick = true;
                CardDataTemp[i].Delete = true;

            } else {
                CardDataTemp[i].colortext = "#000000";
                CardDataTemp[i].tick = false;
                CardDataTemp[i].Delete = false;

            }

        }
        this.setState({CardData: CardDataTemp, SelectedCard: CardDataTemp[index]}, () => {
            console.log("AllcardsDataselect-", JSON.stringify(this.state.CardData))
            console.log("AllcardsDataselectitem-", JSON.stringify(CardDataTemp[index]));
            console.log("SELECTED DATA OF CARD----->" + JSON.stringify(this.state.SelectedCard))
            this.setState({pay: true})

        })
        this.setState({selectedCardData: CardDataTemp[index]}, () => {
                console.log("selectedCardData" + JSON.stringify(this.state.selectedCardData));
                this.setState({paymentCardLast4Digits: this.state.selectedCardData.cardInfo.last4});
            }
        )


    }

    DeleteCard() {

        this.setState({showLoading: true})
        var details = {
            clientEmail: Preference.get("userEmail"),
            clientCard: this.state.selectedCardData.cardInfo.id
        };
        console.log("card Delete Details " + JSON.stringify(details))
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(constants.ClientDeleteCard, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => response.json())
            .then(response => {
                console.log("responsePaymentCard-->", "-" + JSON.stringify(response));
                if (response.ResultType === 1) {
                    this.setState({showLoading: false})
                    this.CardList()


                } else {
                    if (response.ResultType === 0) {
                        this.setState({showLoading: false})
                        alert(response.Message);

                    }
                }
            })
            .catch(error => {
                //console.error('Errorr:', error);
                console.log('Error:', error);
                this.setState({showLoading: false})
                alert("Error: " + error);
            });

    }

    renderpaymentitems(item, index) {
        return <TouchableOpacity onPress={() => {
            this.selected(index)
        }}>
            <View style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: "lightgrey"
                }}>
                    <View style={{width: "70%", flexDirection: "row"}}>
                        <Image style={{resizeMode: "contain", height: 20, width: 20, marginStart: 20}}
                               source={item.cardImage
                               }/>
                        <Text style={{
                            marginStart: 10,
                            color: item.colortext,
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>{item.cardInfo.brand}</Text>
                        <Text style={{color: item.colortext}}>{" Ending In"}</Text>
                        <Text style={{color: item.colortext, fontWeight: 'bold',width:70,textAlign:"left"}}>{" " + item.cardInfo.last4}</Text>
                    </View>
                    {item.tick &&
                    <View style={{alignItems: "flex-end", width: "15%"}}>
                        <Image source={require("../../../assets/images/tickblue.png")} resizeMode={"contain"}
                               style={{width: 20, height: 20,}}/>
                    </View>
                    }
                    {item.Delete &&
                    <TouchableOpacity onPress={() => this.DeleteCard()} style={{alignItems: "flex-end", width: "10%",}}>
                        <Image source={require("../../../assets/images/delete.png")} resizeMode={"contain"}
                               style={{width: 20, height: 20,}}/>
                    </TouchableOpacity>
                    }

                </View>
            </View>
        </TouchableOpacity>
    }


    render() {
        return (<View style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "light-content"}}
                    barStyle="light-content" // or directly
                    style={{backgroundColor: "yellow"}}
                    outerContainerStyles={{backgroundColor: "#1999CE"}}
                    centerComponent={{text: "PAYMENT METHOD", style: {color: "#fff"}}}
                    rightComponent={{color: "#fff"}}
                    containerStyle={{
                        backgroundColor: Colors.dark,
                        justifyContent: "space-around"
                    }}
                    leftComponent={<TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Image
                            style={{
                                tintColor: 'white',
                                height: 20,
                                resizeMode: 'contain'
                            }}
                            source={require("../../../assets/images/ic_back.png")}
                        />
                    </TouchableOpacity>}
                />
                <ScrollView>
                    <View style={{flexDirection: "column", width: "100%", height: "100%"}}>
                        <View style={{width: "100%"}}>
                            <View style={{width: "100%", flexDirection: "column", alignItems: "center"}}>

                                <View style={{
                                    width: "100%",
                                    height: 200,
                                    backgroundColor: "#F2F2F5",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        width: 190,
                                        height: 120,
                                        borderWidth: 2,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderColor: "#56A5FC"
                                    }}>
                                        <View style={{
                                            width: 180,
                                            height: 110,
                                            borderWidth: 0.5,
                                            borderRadius: 10,
                                            borderColor: "#56A5FC"
                                        }}>
                                            <View style={{
                                                width: 30,
                                                height: 30,
                                                backgroundColor: "#56A5FC",
                                                borderRadius: 5,
                                                opacity: 0.4,
                                                marginStart: 5,
                                                marginTop: 5
                                            }}/>
                                            <View style={{
                                                width: "100%",
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 45,
                                                flexDirection: "row"
                                            }}>
                                                <Text style={{
                                                    fontSize: 7,
                                                    fontWeight: 'bold',
                                                    color: '#56A5FC'
                                                }}>{'\u2B24' + " " + '\u2B24' + " " + '\u2B24' + " " + '\u2B24' + "  " + '\u2B24' + " " + '\u2B24' + " " + '\u2B24' + " " + '\u2B24' + "  " + '\u2B24' + " " + '\u2B24' + " " + '\u2B24' + " " + '\u2B24'}</Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: '#56A5FC'
                                                }}>{" " + this.state.paymentCardLast4Digits}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{width: "100%"}}>

                            <FlatList

                                keyExtractor={index => index.id}
                                data={this.state.CardData}
                                extraData={this.state}
                                renderItem={({item, index}) => this.renderpaymentitems(item, index)}
                            />

                            <TouchableOpacity onPress={() => this.setState({DialogVisible2: true})} style={{
                                backgroundColor: "white",
                                width: "100%",
                                height: 40,
                                flexDirection: 'row',
                                alignItems: "center",
                                marginTop: 40
                            }}>
                                <Image source={require("../../../assets/images/add.png")}
                                       resizeMode={"contain"} style={{width: 20, height: 20, marginStart: 20}}
                                />
                                <Text style={{marginStart: 20, color: "#0077FF"}}>{"Add New Card..."}</Text>
                            </TouchableOpacity>

                        </View>

                        <PopupDialog
                            visible={this.state.DialogVisible2}
                            width={0.9}
                            height={0.5}
                            dialogStyle={{backgroundColor: "#29243A"}}
                            onTouchOutside={() => {
                                this.setState({DialogVisible2: false});
                            }}
                            ref={(popupDialog2) => {
                                this.popupDialog2 = popupDialog2;
                            }}>
                            <View style={{marginStart: 10, marginEnd: 10}}>
                                <Text style={styles.txtHeader}>CARD NUMBER</Text>
                                <View>
                                    <View style={[globalStyles.rowBackground, {flexDirection: 'row', height: 40}]}>
                                        <Image style={{
                                            width: 30,
                                            height: 25,
                                            position: "absolute",
                                            right: 5,
                                            top: 5,
                                            borderRadius: 5
                                        }}
                                               resizeMode={"contain"}
                                               source={require("../../../assets/images/vcircle.png")}/>
                                        <TextInput style={{fontSize: 15, color: 'white', marginStart: 10, width: "80%"}}
                                        placeholder={"Enter card number"}
                                        value={this.state.params.number}
                                       onChangeText={(text) => {
                                           if (text.length == 16) {

                                               var pho =  text.substring(0, 4) + " " + text.substring(4, 8) + " " + text.substring(8, 12)+" "+ text.substring(12, 16)
                                               this.setState({
                                                   params: {
                                                       ...this.state.params,
                                                        number: pho,
                                                   }
                                               })
                                           }  else
                                               this.setState({
                                                   params: {
                                                       ...this.state.params,
                                                       number: text,
                                                   }
                                               })
                                           }
                                       }
                                       placeholderTextColor={"grey"}
                                                  /*  placeholder={"Enter card number"}
                                                   onChangeText={(text) => {
                                                       if (text.length == 16) {
                                                           var pho = + text.substring(0, 4) + " " + text.substring(4, 8) + " " + text.substring(8, 12)+" "+ text.substring(12, 16)
                                                           this.setState({
                                                               params: {
                                                                   ...this.state.params,
                                                                   number: pho,
                                                               }
                                                           })
                                                       } else
                                                           this.setState({
                                                               params: {
                                                                   ...this.state.params,
                                                                   number: text,
                                                               }
                                                           })

                                                   }}
                                                   placeholderTextColor={"grey"} *//>
                                    </View>
                                </View>

                                <View style={{flexDirection: "row", width: "100%"}}>
                                    <View style={{width: "65%"}}>
                                        <Text style={styles.txtHeader}>EXPIRATION DATE</Text>
                                    </View>
                                    <View style={{width: "35%"}}>
                                        <Text style={styles.txtHeader}>CVV/CVC</Text>
                                    </View>
                                </View>


                                <View style={{width: "100%", flexDirection: "row"}}>
                                    <TouchableOpacity onPress={() => this.setState({DialogVisible: true})}
                                                      style={[styles.row_back, {width: "25%", marginStart: 10}]}>
                                        <Text style={{fontSize: 15, color: 'white', marginStart: 10, marginTop: 10}}
                                              placeholder={this.state.params.expMonth}
                                              placeholderTextColor={"grey"}>{this.state.params.expMonth}</Text>
                                        <Image resizeMode={"contain"} style={[styles.dropDown]}
                                               source={require("../../../assets/images/dropdown.png")}/>

                                        <PopupDialog
                                            visible={this.state.DialogVisible}
                                            width={0.6}
                                            onTouchOutside={() => {
                                                this.setState({DialogVisible: false});
                                            }}
                                            ref={(popupDialog) => {
                                                this.popupDialog = popupDialog;
                                            }}>
                                            <View style={{flexDirection: "column", alignItems: "center"}}>
                                                <View style={{
                                                    width: "100%",
                                                    height: 0,
                                                    marginTop: 3,
                                                    marginBottom: 3,
                                                    backgroundColor: "black",
                                                    flexDirection: "column",
                                                }}/>
                                                <Text style={{
                                                    fontSize: 20,
                                                    marginTop: 5,
                                                    color: "black",
                                                    fontWeight: "bold"
                                                }}>Select
                                                    Month</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 1
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>01</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 2
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>02</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 3
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>03</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 4
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>04</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 5
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>05</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 6
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>06</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 7
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>07</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 8
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>08</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 9
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>09</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 10
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>10</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 11
                                                    }, DialogVisible: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>11</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expMonth: 12
                                                    }, DialogVisible: false
                                                })}
                                                      style={{
                                                          fontSize: 18,
                                                          marginTop: 20,
                                                          color: "black",
                                                          marginBottom: 20
                                                      }}>12</Text>
                                            </View>
                                        </PopupDialog>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({DialogVisible1: true})}
                                                      style={[styles.row_back, {width: "25%", marginStart: 5}]}>
                                        <Text style={{fontSize: 15, color: 'white', marginStart: 10, marginTop: 10}}
                                              placeholder={this.state.year}
                                              placeholderTextColor={"grey"}>{this.state.params.expYear}</Text>
                                        <Image resizeMode={"contain"} style={[styles.dropDown]}
                                               source={require("../../../assets/images/dropdown.png")}/>

                                        <PopupDialog
                                            visible={this.state.DialogVisible1}
                                            width={0.6}
                                            onTouchOutside={() => {
                                                this.setState({DialogVisible1: false});
                                            }}
                                            ref={(popupDialog) => {
                                                this.popupDialog = popupDialog;
                                            }}>
                                            <View style={{flexDirection: "column", alignItems: "center"}}>
                                                <View style={{
                                                    width: "100%",
                                                    height: 0,
                                                    marginTop: 3,
                                                    marginBottom: 3,
                                                    backgroundColor: "black",
                                                    flexDirection: "column",
                                                }}/>
                                                <Text style={{
                                                    fontSize: 20,
                                                    marginTop: 5,
                                                    color: "black",
                                                    fontWeight: "bold"
                                                }}>Select
                                                    Year</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 19
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2019</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 20
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2020</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 21
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2021</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 22
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2022</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 23
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2023</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 24
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2024</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 25
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2025</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 26
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2026</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 27
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2027</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 28
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2028</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 29
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{fontSize: 18, marginTop: 20, color: "black"}}>2029</Text>
                                                <Text onPress={() => this.setState({
                                                    params: {
                                                        ...this.state.params,
                                                        expYear: 30
                                                    }, DialogVisible1: false
                                                })}
                                                      style={{
                                                          fontSize: 18,
                                                          marginTop: 20,
                                                          color: "black",
                                                          marginBottom: 20
                                                      }}>2030</Text>
                                            </View>
                                        </PopupDialog>
                                    </TouchableOpacity>
                                    <View style={{width: "17%",}}>

                                    </View>

                                    <View style={[styles.row_back, {width: "25%"}]}>
                                        <TextInput style={{fontSize: 15, color: 'white', marginStart: 5, width: "80%"}}
                                                   placeholder={"123"}
                                                   onChangeText={(text) => this.setState({
                                                       params: {
                                                           ...this.state.params,
                                                           cvc: text
                                                       }
                                                   })}
                                                   placeholderTextColor={"grey"}/>
                                    </View>
                                </View>
                                <Text style={styles.txtHeader}>CARD HOLDER NAME</Text>
                                <View style={{flexDirection: 'column', width: "100%"}}>
                                    <View style={{flexDirection: "row", alignItems: "center",}}>
                                        <TextInput
                                            style={{height: 40, color: "white", marginStart: 28, width: "80%"}}
                                            placeholder={"Card holder name"}
                                            onChangeText={(text) => this.setState({
                                                params: {
                                                    ...this.state.params,
                                                    name: text
                                                }
                                            })}
                                            placeholderTextColor={"grey"}
                                        />
                                    </View>
                                    <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 10}}></View>
                                </View>
                                <TouchableOpacity onPress={this.saveCard} style={[globalStyles.button, {
                                    marginTop: 20,
                                    height: 35,
                                    width: 260,
                                    marginBottom: 30
                                }]}>
                                    <Text style={{fontSize: 14, fontWeight: "bold", color: "white",width:"100%",textAlign:"center"}}>Add My Card</Text>
                                </TouchableOpacity>
                            </View>
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
                        </PopupDialog>
                        {this.state.pay &&
                        <TouchableOpacity onPress={() => this.PaymentFlow()} style={[globalStyles.button, {
                            marginTop: 40,
                            height: 35,
                            width: 260,
                            marginBottom: 30
                        }]}>
                            <Text style={{fontSize: 14, fontWeight: "bold", color: "white",width:"100%",textAlign:"center"}}>PAY</Text>
                        </TouchableOpacity>}
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
                           style={{width: 60, height: 60, opacity: 1,}}/>
                </View>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: "#F2F2F5"
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
        color: "white",
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
        height: 20,
        width: 20,

    },
    row_back: {
        backgroundColor: Colors.gray,
        borderWidth: 0.5,
        borderColor: Colors.border,
        borderRadius: 5,
        flexDirection: "row",
        margin: 1,
        height: 40
    },
    dropDown: {
        position: 'absolute',
        right: 14,
        alignSelf: 'center',
        height: 10,
        width: 10,

    }
});
