import React, {Component} from "react";
import {View, Switch, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert} from "react-native";
import {Colors} from "../../../themes";
import {globalStyles} from "../../../themes/globalStyles";
import Preference from "react-native-preference";
//import { styles } from "./styles";
import {Header} from "react-native-elements";
import CheckBoxSquare from "../../../components/CheckBox";
import {constants} from "../../../utils/constants";
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class MobilePaySettings extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            phone:'',
            showLoading: false,
            firstName: "",
            lastName: "",
            DOB: "",
            personIdNumber: "",
            streetAddress: "",
            city: "",
            region: "",
            zipCode: "",
            country: "",
            checking: false,
            saving: false,
            bankAccountType: "",
            bankAccountHolderName: "",
            bankRoutingNumber: "",
            bankAccountNumber: "",
            ssn_last_4:'',
            text: 'Useless Placeholder',
            avatarSource: {uri:"Identity front Image"},
            avatarSource1:{uri:"Identity back Image"},
        };
    }

    renderRowMP(item) {
        return <View style={{flex: 1, flexDirection: 'row',}}>
            <Image style={styles.leftIcon} source={item.ic}/>
            <Text style={styles.row_title}>{item.title}</Text>

        </View>;
    }

    setText(itm, txt) {
        if (itm.hintText === "First Name") {
            this.setState({firstName: txt});
        }
        if (itm.hintText === "Last Name") {
            this.setState({lastName: txt});
        }
        if (itm.hintText === "Date Of Birth (MM/DD/YYYY)") {
            this.setState({DOB: txt});
            Preference.set("userDOB",txt)
        }
       /* if (itm.hintText === "Personal ID Number") {
            this.setState({personIdNumber: txt});
        }*/
        if (itm.hintText === "Phone") {
            this.setState({phone: txt});
        }
        if (itm.hintText === "Street Address") {
            this.setState({streetAddress: txt});
        }
        if (itm.hintText === "City") {
            this.setState({city: txt});
        }
        if (itm.hintText === "State/Region") {
            this.setState({region: txt});
        }
        if (itm.hintText === "Zip Code") {
            this.setState({zipCode: txt});
        }
        if (itm.hintText === "Country") {
            this.setState({country: txt});
        }
        if (itm.hintText === "Bank Account Holder Name") {
            this.setState({bankAccountHolderName: txt});
        }
        if (itm.hintText === "Bank Routing Number") {
            this.setState({bankRoutingNumber: txt});
        }
        if (itm.hintText === "Bank Account Number") {
            this.setState({bankAccountNumber: txt});
        }
        if (itm.hintText === "Last 4 SSN Number") {
            this.setState({ssn_last_4: txt});
        }

    }


    selectImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User canceled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({avatarSource: source});
            }
        });
    }

    selectImage1 = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User canceled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({avatarSource1: source});
            }
        });
    }

    renderRowInput(item) {

       /* if(item.hintText==="Front Identity")
        {
            this.selectImage()
        }else if(item.hintText==="Back Identity"){
            this.selectImage1()
        }*/
        return <View style={{flex: 1, flexDirection: 'column', width: "100%"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TextInput
                    style={{width:"70%",height: 40, color: "#ffffff", marginStart: 50,}}
                    onChangeText={(text) => this.setText(item, text)}
                    placeholder={item.hintText}
                    placeholderTextColor={"#52525D"}
                    value={item.value}
                />
                 <TouchableOpacity  onPress={()=>alert("PERSONAL ID NUMBER is a NINE-DIGIT number & Country must be AMERICA")} style={{ position: "absolute",
                     right: 20,}}  >
                {item.showIC && <Image   resizeMode={"contain"} source={require("../../../assets/images/question.png")}
                                       style={{
                                           width: 20,
                                           height: 20,

                                           visibility: "hidden"
                                       }}/>}</TouchableOpacity>
            </View>
            <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 50}}></View>
        </View>;
    }

    checkBoxChecked(item) {
        if (item.title === "Checking") {
            if (this.state.checking === true) {
                this.setState({checking: false, bankAccountType: 0})
            } else
                this.setState({checking: true,saving:false})

        }
        if (item.title === "Savings") {
            if (this.state.saving === true)
                this.setState({saving: false, bankAccountType: 1})
            else
                this.setState({saving: true,checking:false})

        }

    }

    renderRowWithChecks(item) {
        return <View style={{flexDirection: 'row', height: 22, marginStart: 50}}>
            <CheckBoxSquare rightText={item.title} onClick={() => {
                this.checkBoxChecked(item)
            }} isChecked={item.value} style={{width:120}}/>
            {/*<Text style={styles.row_title}>{item.title}</Text>*/}
        </View>;
    }

    SaveMobilePay() {
        if (this.checkAllFields()) {

            let dob=this.state.DOB;
            let dobSplit=dob.split("/");
            const REGEX_DOB = /^\d{2}[.\/-]\d{2}[.\/-]\d{4}$/ig;
            if(!REGEX_DOB.test(dob)){
                Alert.alert("Error!","Please enter correct date of birth by given format.")
                return false;
            }

            this.setState({showLoading: true})
            let requestBody = new FormData();
            requestBody.append("barberEmail",Preference.get("userEmail"))
            requestBody.append("firstName", this.state.firstName)
            requestBody.append("lastName", this.state.lastName)
            requestBody.append("phone_no", this.state.phone)
            requestBody.append("accountHolderName",this.state.bankAccountHolderName)
            requestBody.append("accountNumber", this.state.bankAccountNumber)
            requestBody.append("routingNumber",this.state.bankRoutingNumber)
            requestBody.append("dateOfBirthDay", dobSplit[1])
            requestBody.append("dateOfBirthMonth", dobSplit[0])
            requestBody.append("dateOfBirthYear", dobSplit[2])
            requestBody.append("streeAddress", this.state.streetAddress)
            requestBody.append("city", this.state.city)
            requestBody.append("country", "US")
            requestBody.append("state",  this.state.region)
            requestBody.append("zipcode", this.state.zipCode)
            //requestBody.append("id_number", this.state.personIdNumber)
            requestBody.append("ssn_last_4", this.state.ssn_last_4)
            if(!(this.state.avatarSource.uri===""))
            {
                requestBody.append("identity_front", {
                    uri: this.state.avatarSource.uri,
                    name: "imageIdentity_back.png",
                    type: 'image/jpeg'
                })
            }
            if(!(this.state.avatarSource1.uri===""))
            {
                requestBody.append("identity_back", {
                    uri: this.state.avatarSource1.uri,
                    name: "imageIdentity_back.png",
                    type: 'image/jpeg'
                })
            }
           /* var details = {
                barberEmail: Preference.get("userEmail"),
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone_no:this.state.phone,
                accountHolderName: this.state.bankAccountHolderName,
                accountNumber: this.state.bankAccountNumber,
                routingNumber: this.state.bankRoutingNumber,
                dateOfBirthDay:dobSplit[1],
                dateOfBirthMonth: dobSplit[0],
                dateOfBirthYear: dobSplit[2],
                streetAddress: this.state.streetAddress,
                city: this.state.city,
                country: "US",
                state: this.state.region,
                zipcode: this.state.zipCode,
                id_number: this.state.personIdNumber,
                ssn_last_4: this.state.ssn_last_4,
            };
            console.log("Credentials::",JSON.stringify(details));
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");*/
            fetch(constants.BarberAddMobilePaySetting, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
                body: requestBody
            }).then(response => response.json())
                .then(response => {
                    console.log("updateBookingPrefrence-->", "-" + JSON.stringify(response));
                    if (response.ResultType === 1) {
                        this.setState({showLoading: false});
                        Preference.set("userMobilePay", true);
                        Alert.alert("Success!", response.Message);
                        //this.props.navigation.navigate("Settings");
                        if (Preference.get("newUser") === true) {
                            Preference.set({
                                MobilePayActivation:response.Data.Mobile_Pay_Activation,
                            });
                            this.props.navigation.navigate("Cancellations")}
                        else {
                            Preference.set({MobilePayActivation:response.Data.Mobile_Pay_Activation});
                            this.props.navigation.navigate("Settings");

                        }
                    } else {
                        this.setState({showLoading: false})
                        if (response.ResultType === 0) {
                            alert(response.Data.message);
                        }

                    }
                }).catch(error => {
                //console.error('Errorr:', error);
                this.setState({showLoading: false})
                console.log('Error:', error);
                alert("Invalid Banking Details" + error);

            });
        }

    }

    checkAllFields() {
        if (this.state.firstName === "") {
            Alert.alert("Missing Field", "Please enter first name.");
            return false;
        }
        if (this.state.lastName === "") {
            Alert.alert("Missing Field", "Please enter last name.");
            return false;
        }
        if (this.state.DOB === "") {
            Alert.alert("Missing Field", "Please enter Date of birth.");
            return false;
        }
        /*if (this.state.personIdNumber === "") {
            Alert.alert("Missing Field", "Please enter person Id number.");
            return false;
        }*/
        if (this.state.phone === "") {
            Alert.alert("Missing Field", "Please enter phone number.");
            return false;
        }
        if (this.state.streetAddress === "") {
            Alert.alert("Missing Field", "Please enter street Address.");
            return false;
        }
        if (this.state.city === "") {
            Alert.alert("Missing Field", "Please enter city.");
            return false;
        }
        if (this.state.region === "") {
            Alert.alert("Missing Field", "Please enter region.");
            return false;
        }
        if (this.state.zipCode === "") {
            Alert.alert("Missing Field", "Please enter zipCode.");
            return false;
        }
        if (this.state.country === "") {
            Alert.alert("Missing Field", "Please enter country.");
            return false;
        }
        if (this.state.bankAccountHolderName === "") {
            Alert.alert("Missing Field", "Please enter bank Account Holder Name.");
            return false;
        }

        if (this.state.bankRoutingNumber === "") {
            Alert.alert("Missing Field", "Please enter bank Routing Number.");
            return false;
        }
        if (this.state.bankAccountNumber === "") {
            Alert.alert("Missing Field", "Please enter bank Account Number.");
            return false;
        }
        if (this.state.ssn_last_4 === "") {
            Alert.alert("Missing Field", "Please enter Last 4 SSN Number.");
            return false;
        }
        if (this.state.avatarSource.uri === "") {
            Alert.alert("Missing Field", "Please attach front identity picture.");
            return false;
        }
        if (this.state.avatarSource1.uri === "") {
            Alert.alert("Missing Field", "Please attach back identity picture.");
            return false;
        }

        return true;
    }


    render() {
        return (<View style={styles.container}>
            <Header
                statusBarProps={{barStyle: "light-content"}}
                barStyle="light-content" // or directly
                style={{backgroundColor: "yellow"}}
                outerContainerStyles={{backgroundColor: "#1999CE"}}
                centerComponent={{text: "MOBILE PAY", style: {color: "#fff"}}}
                rightComponent={{color: "#fff"}}
                containerStyle={{
                    backgroundColor: Colors.dark,
                    justifyContent: "space-around"
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Image
                            style={{tintColor: 'white', height: 20, resizeMode: 'contain'}}
                            source={require("../../../assets/images/ic_back.png")}
                        />
                    </TouchableOpacity>
                }
            />


            <KeyboardAwareScrollView>
                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: "white",
                        marginTop: 25,
                        justifyContent: "center",
                        fontWeight: "bold",
                        alignItems: "center",
                        fontSize: 13
                    }}>
                        By enabling Mobile Pay, </Text>
                    <Text style={{
                        color: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 13,
                        fontWeight: "bold",
                        width:"100%",
                        textAlign:"center"
                    }}>
                        You agree to CLYPR Terms and Conditions </Text>

                    <View style={[globalStyles.rowBackground, styles.col, {marginTop: 20, height: 30, width: 320}]}>
                        {this.renderRowMP({
                            title: "LEGAL PERSONAL INFORMATION",
                            ic: require("../../../assets/images/legalInfo.png"),
                        })}
                    </View>
                    {this.renderRowInput({
                        hintText: "First Name",
                        showIC: false,
                        value: this.state.firstName,
                    })}
                    {this.renderRowInput({
                        hintText: "Last Name",
                        showIC: false,
                        value: this.state.lastName,
                    })}
                    {this.renderRowInput({
                        hintText: "Date Of Birth (MM/DD/YYYY)",
                        showIC: false,
                        value: this.state.DOB,
                    })}
                     {this.renderRowInput({
                        hintText: "Phone",
                        showIC: false,
                        value: this.state.phone,
                    })}
                   {/* {this.renderRowInput({
                        hintText: "Personal ID Number",
                        showIC: true,
                        value: this.state.personIdNumber,
                    })}*/}
                    <TouchableOpacity onPress={()=>{this.selectImage()}} style={{flex: 1, flexDirection: 'column', width: "100%"}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{width:"70%",height: 40, color: "grey", marginStart: 50,textAlignVertical: "center"}}>{this.state.avatarSource.uri}</Text>
                        </View>
                        <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 50}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.selectImage1()}} style={{flex: 1, flexDirection: 'column', width: "100%"}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{width:"70%",height: 40, color: "grey", marginStart: 50,textAlignVertical: "center"}}>{this.state.avatarSource1.uri}</Text>
                        </View>
                        <View style={{height: 0.5, backgroundColor: "#52525D", marginStart: 50}}></View>
                    </TouchableOpacity>
                   {/* {this.renderRowInput({
                        hintText: "Front Identity",
                        showIC: true,
                        value: this.state.avatarSource.uri,
                    })}
                    {this.renderRowInput({
                        hintText: "Back Identity",
                        showIC: true,
                        value: this.state.avatarSource1.uri,
                    })}*/}
                    <View style={[globalStyles.rowBackground, styles.col, {marginTop: 20, height: 30, width: 320}]}>
                        {this.renderRowMP({
                            title: "ADDRESS",
                            ic: require("../../../assets/images/address.png"),
                        })}
                    </View>
                    {this.renderRowInput({
                        hintText: "Street Address",
                        showIC: false,
                        value: this.state.streetAddress,
                    })}
                    {this.renderRowInput({
                        hintText: "City",
                        showIC: false,
                        value: this.state.city,
                    })}
                    {this.renderRowInput({
                        hintText: "State/Region",
                        showIC: false,
                        value: this.state.region,
                    })}
                    {this.renderRowInput({
                        hintText: "Zip Code",
                        showIC: false,
                        value: this.state.zipCode,
                    })}
                    {this.renderRowInput({
                        hintText: "Country",
                        showIC: true,
                        value: this.state.country,
                    })}

                    <View style={{
                        marginTop: 10, marginEnd: 35, height: 20, marginBottom: 3, backgroundColor: "#5A5B68",
                        borderRadius: 10, justifyContent: "center"
                    }}>
                        <Text style={{
                            marginStart: 5,
                            fontSize: 10,
                            color: "white",
                        }}>{" This Should be Your Current Home Address    "}</Text>
                    </View>

                    <View style={[globalStyles.rowBackground, styles.col, {marginTop: 20, height: 30, width: 320}]}>
                        {this.renderRowMP({
                            title: "BANK DIRECT DEPOSIT",
                            ic: require("../../../assets/images/deposit.png"),
                        })}
                    </View>
                    <View style={{flexDirection: "row", width: "100%", marginTop: 10}}>
                        {this.renderRowWithChecks({title: "Checking", value: this.state.checking})}
                        {this.renderRowWithChecks({title: "Savings", value: this.state.saving})}
                    </View>
                    {this.renderRowInput({
                        hintText: "Bank Account Holder Name",
                        showIC: false,
                        value: this.state.bankAccountHolderName,
                    })}
                    {this.renderRowInput({
                        hintText: "Bank Routing Number",
                        showIC: false,
                        value: this.state.bankRoutingNumber,
                    })}
                    {this.renderRowInput({
                        hintText: "Bank Account Number",
                        showIC: false,
                        value: this.state.bankAccountNumber,
                    })}
                     {this.renderRowInput({
                        hintText: "Last 4 SSN Number",
                        showIC: false,
                        value: this.state.ssn_last_4,
                    })}
                </View>
                <TouchableOpacity onPress={() => {
                    this.SaveMobilePay()
                }}
                                  style={[globalStyles.button, {
                                      marginTop: 70,
                                      height: 40,
                                      width: 260,
                                      marginBottom: 30
                                  }]}>
                    <Text style={globalStyles.buttonText}>DONE</Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
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

        </View>);
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
